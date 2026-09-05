import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { userStore, useUser } from '@/store';

type EditProfileProps = {
  onSave?: () => void;
};

export default function EditProfile({ onSave }: EditProfileProps) {
  const theme = useTheme();
  const user = useUser();
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [bio, setBio] = useState(user.bio);
  const [skills, setSkills] = useState(user.skills.join(', '));

  const fields = [
    { label: 'Full name', value: name, onChange: setName },
    { label: 'Job title', value: title, onChange: setTitle },
  ];

  const save = () => {
    userStore.update({
      name: name.trim() || user.name,
      title: title.trim() || user.title,
      bio: bio.trim() || user.bio,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
    });
    onSave?.();
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Edit profile</ThemedText>

        {fields.map((field) => (
          <View key={field.label} style={styles.field}>
            <ThemedText type="smallBold">{field.label}</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={theme.textSecondary}
            />
          </View>
        ))}

        <View style={styles.field}>
          <ThemedText type="smallBold">Skills</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={skills}
            onChangeText={setSkills}
            placeholder="Comma-separated skills"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.field}>
          <ThemedText type="smallBold">Bio</ThemedText>
          <TextInput
            style={[styles.input, styles.bio, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={bio}
            onChangeText={setBio}
            placeholderTextColor={theme.textSecondary}
            multiline
          />
        </View>

        <Pressable onPress={save} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Save changes
          </ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  field: {
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
  },
  bio: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
});