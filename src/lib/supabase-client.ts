import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client for direct uploads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Upload a single file to Supabase Storage
export async function uploadFileToStorage(
  file: File,
  folder: string
): Promise<string | null> {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${timestamp}-${sanitizedName}`;

    const { data, error } = await supabaseClient.storage
      .from("property-files")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabaseClient.storage
      .from("property-files")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error("File upload error:", err);
    return null;
  }
}

// Upload multiple files to Supabase Storage
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
      if (url) {
        urls.push(url);
      }
      onProgress?.(i + 1, total);
    }
  }

  return urls;
}
