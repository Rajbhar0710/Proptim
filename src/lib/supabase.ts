import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

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
