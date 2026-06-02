/**
 * Email utilities for notifying clients
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const notifyGalleryReady = async (
  email: string,
  galleryName: string,
  galleryLink: string,
  adminToken: string
) => {
  try {
    const response = await fetch(`${API_BASE}/api/notify-gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': adminToken,
      },
      body: JSON.stringify({
        email,
        galleryName,
        galleryLink,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send gallery notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error notifying gallery:', error);
    throw error;
  }
};

export const sendInquiry = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    const response = await fetch(`${API_BASE}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send inquiry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending inquiry:', error);
    throw error;
  }
};
