import { Resend } from "resend";
import { PropertySubmission } from "./firebase-admin";

// Use a placeholder if the key is missing so module construction never throws at build time.
// Sending will simply fail gracefully (handled by the API route) until a real key is set.
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendPropertySubmissionEmail(
  data: PropertySubmission,
  pdfBuffer: Buffer
): Promise<{ success: boolean; error?: string }> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || "adhish@proptim.in";

  // Create HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0077B5; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section-title { color: #0077B5; font-size: 16px; font-weight: bold; border-bottom: 2px solid #0077B5; padding-bottom: 5px; margin-bottom: 10px; }
        .field { margin-bottom: 8px; }
        .field-label { font-weight: bold; color: #666; }
        .field-value { color: #333; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .highlight { background: #e8f4fc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PROPTIM</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">New Property Submission</p>
        </div>

        <div class="content">
          <div class="highlight">
            <strong>New property submission received!</strong><br>
            Submitted by: <strong>${data.submitted_by}</strong><br>
            Contact: <strong>${data.mobile_no}</strong>
          </div>

          <div class="section">
            <div class="section-title">Location Details</div>
            <div class="field"><span class="field-label">State:</span> <span class="field-value">${data.state}</span></div>
            <div class="field"><span class="field-label">City:</span> <span class="field-value">${data.city}</span></div>
            <div class="field"><span class="field-label">Market Name:</span> <span class="field-value">${data.market_name}</span></div>
            <div class="field"><span class="field-label">Google Location:</span> <span class="field-value"><a href="${data.google_location}">${data.google_location}</a></span></div>
          </div>

          <div class="section">
            <div class="section-title">Property Details</div>
            <div class="field"><span class="field-label">Frontage:</span> <span class="field-value">${data.frontage}</span></div>
            <div class="field"><span class="field-label">Carpet Area:</span> <span class="field-value">${data.carpet_area}</span></div>
            <div class="field"><span class="field-label">Total Floors:</span> <span class="field-value">${data.total_floors}</span></div>
            <div class="field"><span class="field-label">Expected Rent:</span> <span class="field-value">${data.expected_rent}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field"><span class="field-label">Submitted By:</span> <span class="field-value">${data.submitted_by}</span></div>
            <div class="field"><span class="field-label">Mobile:</span> <span class="field-value">${data.mobile_no}</span></div>
            ${data.owner_name ? `<div class="field"><span class="field-label">Owner:</span> <span class="field-value">${data.owner_name}</span></div>` : ""}
            ${data.owner_contact ? `<div class="field"><span class="field-label">Owner Contact:</span> <span class="field-value">${data.owner_contact}</span></div>` : ""}
          </div>

          <p style="background: #fff3cd; padding: 10px; border-radius: 5px; font-size: 14px;">
            <strong>Note:</strong> Complete property details are attached as a PDF document.
          </p>
        </div>

        <div class="footer">
          <p>PROPTIM - Commercial Real Estate Consultants</p>
          <p>Raipur, Chhattisgarh | Contact: 9165477999 | adhish@proptim.in</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "PROPTIM <onboarding@resend.dev>", // Use your verified domain in production
      to: [recipientEmail],
      subject: `New Property Submission - ${data.city}, ${data.state} | ${data.submitted_by}`,
      html: htmlContent,
      attachments: [
        {
          filename: `property-submission-${data.city.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", emailData);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: String(error) };
  }
}
