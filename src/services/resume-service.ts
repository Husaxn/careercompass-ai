import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const BUCKET_NAME = 'resume';

export async function pickResumeFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;
  return result.assets[0]; // { uri, name, size, mimeType }
}

export async function uploadResume(userId: string, file: DocumentPicker.DocumentPickerAsset) {
  // Enforce 5MB limit client-side too
  if (file.size && file.size > 5 * 1024 * 1024) {
    throw new Error('File exceeds 5MB limit');
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  // Read file as base64, then convert to ArrayBuffer for upload
  const base64 = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, decode(base64), {
      contentType: file.mimeType,
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Insert DB record
  const { data, error: dbError } = await supabase
    .from('resumes')
    .insert({
      user_id: userId,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.mimeType,
      is_active: false,
    })
    .select()
    .single();

  if (dbError) throw dbError;
  return data;
}

export async function getUserResumes(userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function setActiveResume(resumeId: string, userId: string) {
  const { error } = await supabase.rpc('set_active_resume', {
    resume_id: resumeId,
    uid: userId,
  });
  if (error) throw error;
}

export async function getResumeSignedUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, 60 * 60); // 1 hour expiry

  if (error) throw error;
  return data.signedUrl;
}

export async function deleteResume(resumeId: string, filePath: string) {
  const { error: storageError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);
  if (storageError) throw storageError;

  const { error: dbError } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId);
  if (dbError) throw dbError;
}