// Cloudinary upload utility using unsigned upload
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dhi6p6erz';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'resume'; // Using your 'resume' unsigned preset
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('resource_type', 'raw'); // This is key for PDFs and documents
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // Changed from 'auto' to 'raw'
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error response:', errorData);
      throw new Error(errorData.error?.message || 'Failed to upload file to Cloudinary');
    }
    
    const data = await response.json();
    console.log('Cloudinary upload successful:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file. Please try again.');
  }
};

// Web3Forms submission utility
export const submitToWeb3Forms = async (formData: any): Promise<void> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '087ad74a-490c-4bcb-a331-228bbb69f1d8';
  
  const payload = {
    access_key: accessKey,
    ...formData,
  };
  
  console.log('Submitting to Web3Forms:', payload);
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    console.log('Web3Forms response:', result);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || 'Failed to submit form'}`);
    }
    
    if (!result.success) {
      throw new Error(result.message || 'Form submission failed');
    }
  } catch (error) {
    console.error('Web3Forms submission error:', error);
    throw error;
  }
};