/**
 * Profile service — persists profile data (currently avatar uploads).
 *
 * Follows the same async pattern as the other services: it simulates a network
 * upload (with a small delay) and returns the persisted reference to store. When
 * no backend is configured it stores the image data URI locally so the change
 * still reflects immediately without failing silently.
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

/** Simulated latency so the avatar shows a realistic loading state. */
function delay(ms = 500) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Upload a profile avatar and return its persisted reference.
 * On failure it throws so callers can keep the previous photo and surface an
 * error instead of wiping the user's picture.
 */
export async function saveProfileAvatar(imageDataUri: string): Promise<string> {
  if (API_BASE_URL !== 'https://api.example.com') {
    const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: imageDataUri }),
    });
    if (!response.ok) {
      throw new Error(`Avatar upload failed with status ${response.status}`);
    }
    const data = (await response.json()) as { url?: string };
    return data.url ?? imageDataUri;
  }

  await delay();
  return imageDataUri;
}