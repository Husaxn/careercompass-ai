import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ResponsiveContainer } from '@/components/layout/responsive-container';
import { ThemedText } from '@/components/themed-text';
import type { AnalysisSource, SourceKind } from '@/services/analyzer-service';
import { Spacing } from '@/constants/theme';

type SourceUploadProps = {
  /** Which kind of source is being analyzed (resume, screenshot, session...). */
  sourceKind?: SourceKind;
  /** Called with the selected source when the user starts the analysis. */
  onStart: (source: AnalysisSource) => void;
};

const LABELS: Partial<Record<SourceKind, { title: string; hint: string }>> = {
  resume: {
    title: 'Analyze your resume',
    hint: 'Upload a resume or a job description to get an AI-powered skills analysis.',
  },
  document: {
    title: 'Analyze a document',
    hint: 'Upload a PDF, DOCX, or TXT up to 10MB for AI analysis.',
  },
  image: {
    title: 'Analyze a screenshot',
    hint: 'Upload a screenshot of your screen or session to get an AI-powered analysis.',
  },
  screen: {
    title: 'Analyze screen data',
    hint: 'Provide screen or session data to get an AI-powered analysis.',
  },
  session: {
    title: 'Analyze session data',
    hint: 'Provide session data to get an AI-powered analysis.',
  },
};

const SAMPLE_RESUME =
  'Experienced frontend engineer with 3 years of React and TypeScript experience. ' +
  'Built scalable web applications, led a small team, and shipped accessible, ' +
  'performant products used by thousands of users.';

export default function SourceUpload({ sourceKind = 'resume', onStart }: SourceUploadProps) {
  const label = LABELS[sourceKind] ?? LABELS.resume!;
  const isWeb = Platform.OS === 'web';

  const handleFile = (file: File) => {
    if (!file) return;
    const fileName = file.name || 'resume';
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      if (sourceKind === 'image') {
        onStart({ kind: 'image', uri: file.name });
      } else {
        onStart({ kind: 'resume', fileName, content });
      }
    };
    reader.readAsText(file);
  };

  const startSample = () => {
    onStart({ kind: 'resume', fileName: 'sample-resume.txt', content: SAMPLE_RESUME });
  };

  return (
    <ResponsiveContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">{label.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{label.hint}</ThemedText>

        {isWeb ? (
          <label style={styles.dropzone}>
            <ThemedText type="smallBold">Choose a file</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              PDF, DOC, or image — we&apos;ll read what we can.
            </ThemedText>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFile(event.currentTarget.files?.[0] as File)}
            />
          </label>
        ) : (
          <Pressable onPress={startSample} style={({ pressed }) => [styles.dropzone, pressed && styles.pressed]}>
            <ThemedText type="smallBold">Choose a file</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              On mobile, tap to analyze a sample resume.
            </ThemedText>
          </Pressable>
        )}

        {!isWeb && (
          <Pressable onPress={startSample} style={styles.sample}>
            <ThemedText type="linkPrimary">Use a sample resume instead</ThemedText>
          </Pressable>
        )}

        <Pressable
          onPress={startSample}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Start analysis
          </ThemedText>
        </Pressable>
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  content: {
    gap: Spacing.four,
  },
  dropzone: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    borderRadius: Spacing.three,
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: '#3c87f7',
    borderStyle: 'dashed',
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  sample: {
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});