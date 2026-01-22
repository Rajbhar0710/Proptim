import { NextRequest, NextResponse } from "next/server";
import { supabase, PropertySubmission } from "@/lib/supabase";
import { generatePropertyPDF } from "@/lib/pdf-generator";
import { sendPropertySubmissionEmail } from "@/lib/email";

// Configure route segment for file uploads
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds timeout

// Helper function to upload file to Supabase Storage
async function uploadToStorage(file: File, folder: string): Promise<string | null> {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${timestamp}-${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('property-files')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Storage upload error:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('property-files')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error('File upload error:', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data and map to database fields
    const propertyData: PropertySubmission = {
      // Location Details
      state: formData.get("State") as string || "",
      city: formData.get("City") as string || "",
      market_name: formData.get("Market Name") as string || "",
      landmark: formData.get("Landmark") as string || undefined,
      google_location: formData.get("Google Location") as string || "",
      brands_nearby: formData.get("Brands Nearby") as string || undefined,
      brands_on_same_lane: formData.get("Brands on Same Lane") as string || undefined,

      // Property Details
      frontage: formData.get("Frontage") as string || "",
      parking: formData.get("Parking") as string || undefined,
      carpet_area: formData.get("Carpet Area") as string || "",
      total_floors: parseInt(formData.get("Total Floors") as string) || 0,
      proposed_floor_level: formData.get("Proposed Floor Level") as string || "",
      slab_height_beam_height: formData.get("Slab Height and Beam Height") as string || "",
      expected_rent: formData.get("Expected Rent") as string || "",
      lease_status: formData.get("Lease Status") as string || undefined,
      handover_time: formData.get("Handover Time") as string || undefined,

      // Utilities & Compliance
      power_supply: formData.get("Power Supply") as string || undefined,
      water_supply: formData.get("Water Supply") as string || undefined,
      washroom: formData.get("Washroom") as string || undefined,
      sanction_plan: formData.get("Sanction Plan") as string || "",
      building_commencement: formData.get("Building Commencement") as string || undefined,
      branding_height: formData.get("Branding Height") as string || undefined,
      fire_noc: formData.get("Fire NOC") as string || undefined,

      // Submission Details
      submitted_by: formData.get("Submitted By") as string || "",
      mobile_no: formData.get("Mobile No") as string || "",
      owner_name: formData.get("Owner Name") as string || undefined,
      owner_contact: formData.get("Owner Contact") as string || undefined,
    };

    // Handle file uploads - upload to Supabase Storage and get URLs
    const picturesFiles = formData.getAll("Pictures") as File[];
    const videoFile = formData.get("Video") as File | null;

    // Upload pictures and collect URLs
    const pictureUrls: string[] = [];
    for (const file of picturesFiles) {
      if (file && file.size > 0) {
        const url = await uploadToStorage(file, 'pictures');
        if (url) pictureUrls.push(url);
      }
    }
    if (pictureUrls.length > 0) {
      propertyData.pictures = pictureUrls;
    }

    // Upload video and get URL
    if (videoFile && videoFile.size > 0) {
      const videoUrl = await uploadToStorage(videoFile, 'videos');
      if (videoUrl) propertyData.video = videoUrl;
    }

    console.log("Processing property submission:", propertyData.city, propertyData.state);

    // 1. Save to Supabase database
    const { data: dbData, error: dbError } = await supabase
      .from("property_submissions")
      .insert([propertyData])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save submission to database. Please try again.",
          error: dbError.message,
        },
        { status: 500 }
      );
    }

    console.log("Saved to database with ID:", dbData.id);

    // 2. Generate PDF
    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await generatePropertyPDF(propertyData);
      console.log("PDF generated successfully");
    } catch (pdfError) {
      console.error("PDF generation error:", pdfError);
      // Continue without PDF if generation fails
      return NextResponse.json({
        success: true,
        message: "Property saved to database! PDF generation failed, but your submission was recorded.",
        data: { id: dbData.id },
      });
    }

    // 3. Send email with PDF attachment
    const emailResult = await sendPropertySubmissionEmail(propertyData, pdfBuffer);

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
      // Still return success since data is saved
      return NextResponse.json({
        success: true,
        message: "Property saved successfully! Email notification could not be sent, but your submission was recorded.",
        data: { id: dbData.id },
      });
    }

    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Property submitted successfully! We will review your submission and get back to you soon.",
      data: { id: dbData.id },
    });

  } catch (error) {
    console.error("Error processing property submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit property. Please try again or contact us directly.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
