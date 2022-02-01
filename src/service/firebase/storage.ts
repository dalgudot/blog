import { getBlob, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

const devRef = ref(storage, 'dev.png');
const designRef = ref(storage, 'design');

export const uploadImageToStorage = async (file: File) => {
  await uploadBytes(devRef, file);
  console.log('Uploaded a blob or file!');
};

export const getImageDownloadURL = async () => {
  const imageDownloadURL = await getDownloadURL(devRef);
  return imageDownloadURL;
};

// CORS 문제 발생
// https://firebase.google.com/docs/storage/web/download-files?hl=ko#cors_configuration
export const getImageBlob = async () => {
  const imageBlobUrl = await getBlob(devRef);
  return imageBlobUrl;
};
