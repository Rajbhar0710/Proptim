import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getAdminApp(): App {
  if (getApps().length) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel stores the key with literal "\n" — convert back to real newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export function getDb(): Firestore {
  const db = getFirestore(getAdminApp());
  db.settings({ ignoreUndefinedProperties: true });
  return db;
}

export function getBucket() {
  return getStorage(getAdminApp()).bucket();
}

// Types for property submission
export interface PropertySubmission {
  id?: string;
  created_at?: string;

  // Location Details
  state: string;
  city: string;
  market_name: string;
  landmark?: string;
  google_location: string;
  brands_nearby?: string;
  brands_on_same_lane?: string;

  // Property Details
  frontage: string;
  parking?: string;
  carpet_area: string;
  total_floors: number;
  proposed_floor_level: string;
  slab_height_beam_height: string;
  expected_rent: string;
  lease_status?: string;
  handover_time?: string;

  // Media
  pictures?: string[];
  video?: string;

  // Utilities & Compliance
  power_supply?: string;
  water_supply?: string;
  washroom?: string;
  sanction_plan: string;
  building_commencement?: string;
  branding_height?: string;
  fire_noc?: string;

  // Submission Details
  submitted_by: string;
  mobile_no: string;
  owner_name?: string;
  owner_contact?: string;

  // Status
  status?: string;
}
