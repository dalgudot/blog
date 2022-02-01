import { getBlob, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

export const uploadImageToStorage = async (file: File, storageRef: string) => {
  const uploadRef = ref(storage, storageRef);
  await uploadBytes(uploadRef, file);
};

export const getImageDownloadURL = async (storageRef: string) => {
  const downloadRef = ref(storage, storageRef);
  const imageDownloadURL = await getDownloadURL(downloadRef);
  return imageDownloadURL;
};

// CORS 문제 발생
// https://firebase.google.com/docs/storage/web/download-files?hl=ko#cors_configuration
// export const getImageBlob = async () => {
//   const imageBlobUrl = await getBlob(devRef);
//   return imageBlobUrl;
// };
