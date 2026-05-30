import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);
const storage = getStorage(app);

// Upload a single file to Cloud Storage
export async function uploadFileToStorage(
  file: File,
  folder: string
): Promise<string | null> {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${timestamp}-${sanitizedName}`;

    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file, { contentType: file.type });
    return await getDownloadURL(storageRef);
  } catch (err) {
    console.error("File upload error:", err);
    return null;
  }
}

// Upload multiple files to Cloud Storage
export async function uploadFilesToStorage(
  files: File[],
  folder: string,
  onProgress?: (uploaded: number, total: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file && file.size > 0) {
      const url = await uploadFileToStorage(file, folder);
      if (url) urls.push(url);
      onProgress?.(i + 1, total);
    }
  }

  return urls;
}
