/**
 * Google Apps Script for PlayWithMate Photo Gallery
 * 
 * Deploy as a web app:
 * 1. Save this as Code.gs in a Google Apps Script project
 * 2. Deploy -> New deployment -> Web app
 * 3. Execute as: Me
 * 4. Who has access: Anyone
 * 5. Copy the deployment URL
 * 6. Add to .env.local: NEXT_PUBLIC_APPS_SCRIPT_URL=<deployment_url>
 * 
 * Create a folder in Google Drive for photos:
 * 1. Create a folder named "PlayWithMate Photos" in Google Drive
 * 2. Copy its folder ID from the URL
 * 3. Add to script: const PHOTOS_FOLDER_ID = "your-folder-id"
 */

// ⚠️ CONFIGURE THIS WITH YOUR GOOGLE DRIVE FOLDER ID
const PHOTOS_FOLDER_ID = PropertiesService.getScriptProperties().getProperty('PHOTOS_FOLDER_ID') || '';

function doGet(e) {
  const action = e.parameter.action || 'list';

  try {
    if (action === 'list') {
      return listPhotos();
    }
    return error('Invalid action');
  } catch (err) {
    return error(err.toString());
  }
}

function doPost(e) {
  const action = e.parameter.action || 'upload';

  try {
    if (!PHOTOS_FOLDER_ID) {
      return error('Photos folder not configured');
    }

    if (action === 'upload') {
      return handleUpload(e);
    } else if (action === 'delete') {
      return handleDelete(e);
    }
    return error('Invalid action');
  } catch (err) {
    return error(err.toString());
  }
}

function handleUpload(e) {
  try {
    const fileBlob = e.fileUpload('file');
    if (!fileBlob) {
      return error('No file provided');
    }

    const folder = DriveApp.getFolderById(PHOTOS_FOLDER_ID);
    const file = folder.createFile(fileBlob);

    // Share publicly
    file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

    const fileUrl = file.getUrl();
    const downloadUrl = `https://drive.google.com/uc?export=view&id=${file.getId()}`;

    return success({
      id: file.getId(),
      name: file.getName(),
      url: downloadUrl,
      thumbnail: downloadUrl,
    });
  } catch (err) {
    return error(`Upload failed: ${err.toString()}`);
  }
}

function handleDelete(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const fileId = data.fileId;

    if (!fileId) {
      return error('No file ID provided');
    }

    const file = DriveApp.getFileById(fileId);
    file.setTrashed(true);

    return success({ message: 'File deleted' });
  } catch (err) {
    return error(`Delete failed: ${err.toString()}`);
  }
}

function listPhotos() {
  try {
    const folder = DriveApp.getFolderById(PHOTOS_FOLDER_ID);
    const files = folder.getFilesByType(MimeType.PNG)
      .concat(folder.getFilesByType(MimeType.JPEG))
      .concat(folder.getFilesByType(MimeType.GIF));

    const photos = [];
    while (files.hasNext()) {
      const file = files.next();
      if (!file.isTrashed()) {
        photos.push({
          id: file.getId(),
          name: file.getName(),
          url: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
          thumbnail: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
        });
      }
    }

    // Return most recent first
    photos.reverse();

    return success({ photos });
  } catch (err) {
    return error(`List failed: ${err.toString()}`);
  }
}

function success(data) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, ...data })
  ).setMimeType(ContentService.MimeType.JSON);
}

function error(message) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: message })
  ).setMimeType(ContentService.MimeType.JSON);
}
