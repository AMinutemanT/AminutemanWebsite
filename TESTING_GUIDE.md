# Form Integration Testing Guide

## Testing Steps

### 1. Test Contact Form
1. Navigate to `/contact` page
2. Fill in all fields:
   - Name: "Test User"
   - Email: "test@example.com" 
   - Subject: "Test Contact"
   - Message: "This is a test message"
3. Click "Send Message"
4. Check for success message
5. Verify email received via Web3Forms

### 2. Test Careers Form
1. Navigate to `/careers` page
2. Fill in all fields:
   - Full Name: "Test Applicant"
   - Email: "test@example.com"
   - Phone: "+91 9876543210"
   - Position: Select any position
   - Years of Experience: "2"
   - Resume: Upload a PDF/DOC file (under 5MB)
   - Cover Letter: "This is a test application"
3. Click "Submit Application"
4. Watch for:
   - "Uploading Resume..." message
   - "Submitting Application..." message
   - Success message
5. Verify email received with resume link

## Debugging

### Browser Console
Open browser developer tools (F12) and check Console tab for:
- Cloudinary upload logs
- Web3Forms submission logs
- Any error messages

### Expected Console Messages
```
Uploading resume to Cloudinary...
Cloudinary upload successful: https://res.cloudinary.com/dhi6p6erz/...
Submitting to Web3Forms: {...}
Web3Forms response: {success: true, ...}
```

### Common Issues

1. **"Failed to upload file to Cloudinary"**
   - Check if 'resume' upload preset exists in Cloudinary
   - Verify preset is set to 'Unsigned'
   - Check file size and format

2. **"Failed to submit form"**
   - Check Web3Forms access key
   - Verify internet connection
   - Check browser console for detailed errors

3. **File Upload Errors**
   - Ensure file is PDF, DOC, or DOCX
   - Check file size is under 5MB
   - Try with different file

## Email Content

### Contact Form Email
```
Subject: Contact Form
From: test@example.com

Contact Form Submission

Name: Test User
Email: test@example.com
Subject: Test Contact

Message:
This is a test message
```

### Careers Form Email
```
Subject: New Career Application - UAV Engineer
From: test@example.com

New Career Application Received

Full Name: Test Applicant
Email: test@example.com
Phone: +91 9876543210
Position Applied: UAV Engineer
Years of Experience: 2

Resume: https://res.cloudinary.com/dhi6p6erz/raw/upload/v.../resume.pdf

Cover Letter:
This is a test application
```

## Verification Checklist

- [ ] Contact form submits successfully
- [ ] Careers form submits successfully  
- [ ] Resume uploads to Cloudinary
- [ ] Resume URL appears in email
- [ ] All form fields are included in email
- [ ] Success messages appear correctly
- [ ] Error handling works for invalid files
- [ ] File validation works (size, type)