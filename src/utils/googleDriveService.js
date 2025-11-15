/**
 * Google Drive Photo Service
 * Integrates with Google Apps Script to upload photos and fetch gallery
 */

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

export async function uploadPhoto(file) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Apps Script URL not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('action', 'upload');

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }
    return result;
  } catch (error) {
    console.error('Photo upload error:', error);
    throw error;
  }
}

export async function fetchGallery() {
  if (!APPS_SCRIPT_URL) {
    console.warn('Apps Script URL not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=list`,
      { method: 'GET' }
    );

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch gallery');
    }
    return result.photos || [];
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return [];
  }
}

export async function deletePhoto(fileId) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Apps Script URL not configured');
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', fileId }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Delete failed');
    }
    return result;
  } catch (error) {
    console.error('Photo delete error:', error);
    throw error;
  }
}
