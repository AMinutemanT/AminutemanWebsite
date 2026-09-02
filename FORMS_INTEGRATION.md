# Forms Integration Documentation

## Overview

The AminutemanWebsite now has integrated forms using Web3Forms for form submissions and Cloudinary for file uploads. This implementation covers both the Contact form and Careers form.

## Features Implemented

### 1. Contact Form (`/src/pages/Contact.tsx`)
- Direct submission to Web3Forms
- Fields: Name, Email, Subject, Message
- Success/Error feedback
- Form validation

### 2. Careers Form (`/src/pages/Careers.tsx`)
- Resume upload to Cloudinary
- Form submission to Web3Forms with resume URL
- Fields: Name, Email, Phone, Position, Experience, Resume, Cover Letter
- File validation (PDF, DOC, DOCX, max 5MB)
- Upload progress indicators
- Success/Error feedback

## Configuration

### Environment Variables (`.env`)

Copy `.env.example` to `.env` and fill it in. `.env` is gitignored and must stay that way.

```env
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_WEB3FORMS_ACCESS_KEY=
```

Everything in a `VITE_`-prefixed variable is compiled into the public JavaScript
bundle and is readable by anyone. Only ever put publishable values here: the
Cloudinary cloud name, an *unsigned* upload preset, and the Web3Forms access key
(which is designed to be public). A Cloudinary API secret, or any signing key,
must never appear in this file or anywhere else in this repository.

### Cloudinary Settings
- **Cloud Name**: `dhi6p6erz`
- **API Key**: `696776578481646`
- **API Secret**: not used by the frontend, and never committed. Keep it in the Cloudinary dashboard only.
- **Upload Folder**: `aminuteman_resumes`

### Web3Forms Settings
- **Access Key**: `087ad74a-490c-4bcb-a331-228bbb69f1d8`

## Implementation Details

### File Structure
```
src/
├── utils/
│   └── cloudinary.ts          # Cloudinary upload & Web3Forms utilities
├── pages/
│   ├── Contact.tsx            # Updated contact form
│   └── Careers.tsx            # Updated careers form with file upload
```

### Key Functions

#### `uploadToCloudinary(file: File): Promise<string>`
- Uploads file to Cloudinary
- Returns secure URL of uploaded file
- Handles error cases
- Uses unsigned upload with preset

#### `submitToWeb3Forms(formData: any): Promise<void>`
- Submits form data to Web3Forms API
- Handles success/error responses
- Supports both contact and careers forms

## File Upload Process (Careers Form)

1. User selects resume file
2. File is validated (type, size)
3. On form submission:
   - File is uploaded to Cloudinary
   - Upload URL is obtained
   - Form data (including resume URL) is sent to Web3Forms
4. Success/Error feedback is displayed

## Form Data Structure

### Contact Form
```json
{
  "access_key": "087ad74a-490c-4bcb-a331-228bbb69f1d8",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Message content",
  "form_type": "contact"
}
```

### Careers Form
```json
{
  "access_key": "087ad74a-490c-4bcb-a331-228bbb69f1d8",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "position": "UAV Engineer",
  "experience": "3",
  "resume_url": "https://res.cloudinary.com/dhi6p6erz/...",
  "cover_letter": "Cover letter content",
  "form_type": "careers"
}
```

## Error Handling

### File Upload Errors
- File size validation (max 5MB)
- File type validation (PDF, DOC, DOCX)
- Cloudinary upload failures
- Network connectivity issues

### Form Submission Errors
- Web3Forms API failures
- Network connectivity issues
- Invalid form data

## User Feedback

### Success States
- Contact form: "Message sent successfully! We'll get back to you soon."
- Careers form: "Application submitted successfully! We'll review your application and get back to you soon."

### Error States
- File validation errors
- Upload failure messages
- Form submission failure messages

## Security Considerations

1. **Unsigned Upload**: Using Cloudinary's unsigned upload to avoid exposing API secrets
2. **File Validation**: Client-side validation for file type and size
3. **Environment Variables**: Sensitive keys stored in environment variables
4. **HTTPS**: All API calls use HTTPS endpoints

## Setup Instructions

1. **Cloudinary Setup**:
   - Create an unsigned upload preset (or use 'ml_default')
   - Configure upload folder as 'aminuteman_resumes'
   - Enable unsigned uploads for the preset

2. **Web3Forms Setup**:
   - Already configured with provided access key
   - Forms will be delivered to the associated email

3. **Environment Setup**:
   - Copy `.env` file with correct values
   - Restart development server after changes

## Testing

1. **Contact Form**:
   - Fill all fields and submit
   - Check Web3Forms dashboard for submissions

2. **Careers Form**:
   - Upload a valid resume file
   - Fill all required fields
   - Submit and verify both Cloudinary upload and Web3Forms submission

## Monitoring

- Check Web3Forms dashboard for form submissions
- Monitor Cloudinary dashboard for file uploads
- Check browser console for any JavaScript errors

## Future Enhancements

1. **File Preview**: Add preview functionality for uploaded resumes
2. **Progress Bar**: Detailed upload progress indicators
3. **Email Templates**: Custom email templates in Web3Forms
4. **File Management**: Admin panel to manage uploaded files
5. **Validation**: Server-side file validation for additional security