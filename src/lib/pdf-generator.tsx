import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer, Link } from "@react-pdf/renderer";
import { PropertySubmission } from "./supabase";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottom: "2px solid #0077B5",
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077B5",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0077B5",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1px solid #E0E0E0",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    fontSize: 10,
    color: "#666666",
    fontWeight: "bold",
  },
  value: {
    width: "60%",
    fontSize: 10,
    color: "#333333",
  },
  link: {
    fontSize: 9,
    color: "#0077B5",
    textDecoration: "underline",
  },
  mediaItem: {
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999999",
    borderTop: "1px solid #E0E0E0",
    paddingTop: 10,
  },
  timestamp: {
    fontSize: 10,
    color: "#666666",
    marginTop: 10,
  },
});

// Field row component
const FieldRow = ({ label, value }: { label: string; value?: string | number }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "Not provided"}</Text>
  </View>
);

// PDF Document component
const PropertySubmissionPDF = ({ data }: { data: PropertySubmission }) => {
  const submissionDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>PROPTIM</Text>
          <Text style={styles.subtitle}>Commercial Real Estate Consultants</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Property Submission Details</Text>
        <Text style={styles.timestamp}>Submitted on: {submissionDate}</Text>

        {/* Location Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <FieldRow label="State" value={data.state} />
          <FieldRow label="City" value={data.city} />
          <FieldRow label="Market Name" value={data.market_name} />
          <FieldRow label="Landmark" value={data.landmark} />
          <FieldRow label="Google Location" value={data.google_location} />
          <FieldRow label="Brands Nearby" value={data.brands_nearby} />
          <FieldRow label="Brands on Same Lane" value={data.brands_on_same_lane} />
        </View>

        {/* Property Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <FieldRow label="Frontage" value={data.frontage} />
          <FieldRow label="Parking" value={data.parking} />
          <FieldRow label="Carpet Area (per floor)" value={data.carpet_area} />
          <FieldRow label="Total Floors" value={data.total_floors} />
          <FieldRow label="Proposed Floor Level" value={data.proposed_floor_level} />
          <FieldRow label="Slab & Beam Height" value={data.slab_height_beam_height} />
          <FieldRow label="Expected Rent" value={data.expected_rent} />
          <FieldRow label="Lease Status" value={data.lease_status} />
          <FieldRow label="Handover Time" value={data.handover_time} />
        </View>

        {/* Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Media</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Pictures:</Text>
            <View style={{ width: "60%" }}>
              {data.pictures && data.pictures.length > 0 ? (
                data.pictures.map((url, index) => (
                  <View key={index} style={styles.mediaItem}>
                    <Link src={url} style={styles.link}>
                      View Image {index + 1}
                    </Link>
                  </View>
                ))
              ) : (
                <Text style={styles.value}>Not provided</Text>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Video:</Text>
            <View style={{ width: "60%" }}>
              {data.video ? (
                <Link src={data.video} style={styles.link}>
                  View Video
                </Link>
              ) : (
                <Text style={styles.value}>Not provided</Text>
              )}
            </View>
          </View>
        </View>

        {/* Utilities & Compliance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Utilities & Compliance</Text>
          <FieldRow label="Power Supply" value={data.power_supply} />
          <FieldRow label="Water Supply" value={data.water_supply} />
          <FieldRow label="Washroom" value={data.washroom} />
          <FieldRow label="Sanction Plan" value={data.sanction_plan} />
          <FieldRow label="Building Commencement" value={data.building_commencement} />
          <FieldRow label="Branding Height" value={data.branding_height} />
          <FieldRow label="Fire NOC" value={data.fire_noc} />
        </View>

        {/* Submission Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <FieldRow label="Submitted By" value={data.submitted_by} />
          <FieldRow label="Mobile No." value={data.mobile_no} />
          <FieldRow label="Owner's Name" value={data.owner_name} />
          <FieldRow label="Owner's Contact" value={data.owner_contact} />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          PROPTIM - Commercial Real Estate Consultants | Contact: 9165477999 | Email: adhish@proptim.in
        </Text>
      </Page>
    </Document>
  );
};

// Function to generate PDF buffer
export async function generatePropertyPDF(data: PropertySubmission): Promise<Buffer> {
  const pdfBuffer = await renderToBuffer(<PropertySubmissionPDF data={data} />);
  return pdfBuffer as Buffer;
}
