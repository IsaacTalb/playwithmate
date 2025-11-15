# Photo Gallery Setup Guide

This guide explains how to set up the photo gallery feature with Google Drive and Apps Script.

## Overview

The photo gallery allows users to:
- Upload photos to Google Drive
- Display photos instantly on the PlayWithMate website
- Delete photos from the gallery
- View photos in full size

## Setup Steps

### 1. Create a Google Drive Folder for Photos

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder named `PlayWithMate Photos`
3. Right-click the folder and select "Get link"
4. Copy the folder ID from the URL (it's the long string between `/folders/` and the end)
   - Example URL: `https://drive.google.com/drive/folders/1abc2def3ghi4jkl5mno6pqr7stu8vwx?usp=sharing`
   - Folder ID: `1abc2def3ghi4jkl5mno6pqr7stu8vwx`

### 2. Create a Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Name it `PlayWithMate Photo Service`
4. Delete the default code and paste the code from `apps-script/Code.gs`

### 3. Add the Folder ID to Apps Script

1. In the Apps Script editor, click "Project Settings" (gear icon)
2. Add a new script property:
   - Property: `PHOTOS_FOLDER_ID`
   - Value: (paste your folder ID from step 1)
3. Save

### 4. Deploy as Web App

1. Click "Deploy" button (top right)
2. Select "New deployment"
3. Choose type: **Web app**
4. Execute as: Your Google account (the one that owns the Drive folder)
5. Who has access: **Anyone**
6. Click "Deploy"
7. You'll see a deployment URL. Copy it.

### 5. Configure Your Next.js Project

1. Create or edit `.env.local` in the project root:
   ```
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/d/{DEPLOYMENT_ID}/usercopy
   ```
   Replace `{DEPLOYMENT_ID}` with the ID from your deployment URL.

2. Save and restart your dev server:
   ```powershell
   npm run dev
   ```

### 6. Test the Gallery

1. Open your app at `http://localhost:3000`
2. Scroll to the "Photo Gallery" section
3. Click to upload a photo
4. Wait for it to appear in the gallery

## Troubleshooting

### Photos not appearing?
- Check that the Apps Script deployment URL is correct in `.env.local`
- Verify the folder ID is correct
- Check that the Apps Script has access to the folder

### Upload fails?
- Make sure the file is an image (JPG, PNG, GIF)
- Check file size (max 5MB)
- Verify Apps Script is deployed as "Anyone"

### CORS errors?
- This is a known limitation of Google Apps Script
- If you see CORS errors, try redeploying the Apps Script with a new version
- Alternatively, use a backend API (see `Backend Integration` section below)

## Backend Integration (Optional)

For production, consider using a backend API instead:

1. Create an API endpoint in your Next.js `pages/api/photos.js`
2. Store photos in a cloud service (Cloudinary, AWS S3, etc.)
3. Update `googleDriveService.js` to use your API endpoint instead

Example:
```javascript
export async function uploadPhoto(file) {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/photos', {
    method: 'POST',
    body: formData,
  })
  
  return response.json()
}
```

## Removing the Photo Gallery

To disable the photo gallery:
1. Remove the `<PhotoGallery />` component from `pages/index.js`
2. Delete `.env.local` entry (or set `NEXT_PUBLIC_APPS_SCRIPT_URL` to empty)

## Security Notes

- The Apps Script web app is accessible to anyone
- Photos are shared publicly on Google Drive
- Do not store sensitive information
- Users should only upload appropriate party game photos

## Support

For issues, check:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Drive API Documentation](https://developers.google.com/drive)
