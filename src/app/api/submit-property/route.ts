import { NextRequest, NextResponse } from "next/server";
import { getDb, getBucket, PropertySubmission } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { generatePropertyPDF } from "@/lib/pdf-generator";
import { sendPropertySubmissionEmail } from "@/lib/email";

// Configure route segment for file uploads
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds timeout

// Helper function to upload file to Cloud Storage (server-side)
async function uploadToStorage(file: File, folder: string): Promise<string | null> {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${timestamp}-${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const blob = getBucket().file(filePath);
    await blob.save(buffer, { contentType: file.type });
    await blob.makePublic();

    return `https://storage.googleapis.com/${blob.bucket.name}/${filePath}`;
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

    // Handle media - check for direct upload URLs first, then fall back to file upload
    const pictureUrlsJson = formData.get("PictureUrls") as string | null;
    const videoUrlDirect = formData.get("VideoUrl") as string | null;

    // If URLs were provided (direct upload from client), use them
    if (pictureUrlsJson) {
      try {
        const urls = JSON.parse(pictureUrlsJson);
        if (Array.isArray(urls) && urls.length > 0) {
          propertyData.pictures = urls;
        }
      } catch (e) {
        console.error("Error parsing picture URLs:", e);
      }
    } else {
      // Fall back to server-side upload for backward compatibility
      const picturesFiles = formData.getAll("Pictures") as File[];
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
    }

    // Handle video URL
    if (videoUrlDirect) {
      propertyData.video = videoUrlDirect;
    } else {
      // Fall back to server-side upload for backward compatibility
      const videoFile = formData.get("Video") as File | null;
      if (videoFile && videoFile.size > 0) {
        const videoUrl = await uploadToStorage(videoFile, 'videos');
        if (videoUrl) propertyData.video = videoUrl;
      }
    }

    console.log("Processing property submission:", propertyData.city, propertyData.state);

    // 1. Save to Firestore
    let docId: string;
    try {
      const docRef = await getDb().collection("property_submissions").add({
        ...propertyData,
        status: propertyData.status ?? "pending",
        created_at: FieldValue.serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to save submission to database. Please try again.`,
          error: String(dbError),
        },
        { status: 500 }
      );
    }

    console.log("Saved to Firestore with ID:", docId);

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
        data: { id: docId },
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
        data: { id: docId },
      });
    }

    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Property submitted successfully! We will review your submission and get back to you soon.",
      data: { id: docId },
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
