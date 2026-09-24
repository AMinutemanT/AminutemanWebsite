/** Publishable configuration only; Vite embeds these values in the browser bundle. */
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

export const enquiryFormAvailable = Boolean(accessKey);
export const applicationFormAvailable = Boolean(accessKey && cloudName && uploadPreset);

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!cloudName || !uploadPreset) throw new Error('Resume upload is not configured.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/raw/upload`, {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(60000),
  });
  const data = await response.json();
  if (!response.ok || typeof data.secure_url !== 'string' || !data.secure_url.startsWith('https://')) {
    throw new Error('Resume upload failed. Please try again.');
  }
  return data.secure_url;
};

export const submitToWeb3Forms = async (formData: Record<string, unknown>): Promise<void> => {
  if (!accessKey) throw new Error('Enquiry delivery is not configured.');

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, access_key: accessKey }),
    signal: AbortSignal.timeout(30000),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) {
    throw new Error('Submission failed. Please try again.');
  }
};
