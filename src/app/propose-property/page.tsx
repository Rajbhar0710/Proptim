"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { uploadFileToStorage, uploadFilesToStorage } from "@/lib/firebase-client";


// Logo Component
function Logo() {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-[#0077B5]">PR</span>
        <span className="relative">
          <span className="text-[#0077B5]">O</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#8ED1FC] opacity-60"></span>
          </span>
        </span>
        <span className="text-[#0077B5]">PTIM</span>
      </span>
    </div>
  );
}

// Form Input Component
function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

// Form Textarea Component
function FormTextarea({
  label,
  name,
  placeholder,
  required = false,
  rows = 3,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

// Form Select Component
function FormSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all bg-white"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Form File Upload Component
function FormFileUpload({
  label,
  name,
  accept,
  required = false,
  multiple = false,
  onChange,
  helpText,
}: {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          required={required}
          multiple={multiple}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0077B5]/10 file:text-[#0077B5] hover:file:bg-[#0077B5]/20"
        />
      </div>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
}

// Form Radio Group Component
function FormRadioGroup({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all ${
              value === opt.value
                ? "border-[#0077B5] bg-[#0077B5]/5"
                : "border-gray-200 hover:border-[#0077B5]/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-[#0077B5] focus:ring-[#0077B5]"
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
        <span className="w-1 h-6 bg-[#0077B5] rounded-full"></span>
        {title}
      </h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1 ml-4">{subtitle}</p>}
    </div>
  );
}

// Success Message Component that uses useSearchParams
function SuccessMessage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true);
    }
  }, [searchParams]);

  if (!showSuccess) return null;

  return (
    <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-green-800">Property Submitted Successfully!</h3>
          <p className="text-sm text-green-600">We will review your submission and get back to you soon.</p>
        </div>
      </div>
    </div>
  );
}

export default function ProposePropertyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Refs to store selected files
  const picturesRef = useRef<File[]>([]);
  const videoRef = useRef<File | null>(null);

  const handlePicturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      picturesRef.current = Array.from(e.target.files);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      videoRef.current = e.target.files[0];
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus(null);
    setUploadProgress("");

    try {
      // Upload files directly to Supabase Storage first
      let pictureUrls: string[] = [];
      let videoUrl: string | null = null;

      // Upload pictures
      if (picturesRef.current.length > 0) {
        setUploadProgress("Uploading pictures...");
        pictureUrls = await uploadFilesToStorage(
          picturesRef.current,
          "pictures",
          (uploaded, total) => {
            setUploadProgress(`Uploading pictures (${uploaded}/${total})...`);
          }
        );
      }

      // Upload video
      if (videoRef.current) {
        setUploadProgress("Uploading video...");
        videoUrl = await uploadFileToStorage(videoRef.current, "videos");
      }

      setUploadProgress("Submitting form...");

      // Create form data without files (send URLs instead)
      const formData = new FormData(form);

      // Remove file inputs from formData
      formData.delete("Pictures");
      formData.delete("Video");

      // Add URLs instead
      if (pictureUrls.length > 0) {
        formData.append("PictureUrls", JSON.stringify(pictureUrls));
      }
      if (videoUrl) {
        formData.append("VideoUrl", videoUrl);
      }

      const response = await fetch("/api/submit-property", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        // Reset form and file refs
        form.reset();
        picturesRef.current = [];
        videoRef.current = null;
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  const indianStates = [
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "odisha", label: "Odisha" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "telangana", label: "Telangana" },
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "other", label: "Other" },
  ];

  const fireNOCOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not-applicable", label: "Not Applicable" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f8fafb] to-[#E8F4FC]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-[#0077B5] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#0077B5]/10 rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0077B5] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">Property Evaluation Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal mb-4">
            <span className="text-[#0077B5]">Propose</span> a Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit property details for evaluation. Fields marked with <span className="text-red-500">*</span> are mandatory.
          </p>
        </div>

        {/* Success Message */}
        <Suspense fallback={null}>
          <SuccessMessage />
        </Suspense>

        {/* Status Messages */}
        {submitStatus && (
          <div
            className={`mb-8 p-6 rounded-2xl ${
              submitStatus.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  submitStatus.type === "success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${submitStatus.type === "success" ? "text-green-800" : "text-red-800"}`}>
                  {submitStatus.type === "success" ? "Property Submitted Successfully!" : "Submission Failed"}
                </h3>
                <p className={`text-sm ${submitStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {submitStatus.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Location Details Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
            <SectionHeader title="Location Details" subtitle="Property location and nearby information" />

            <div className="grid md:grid-cols-2 gap-6">
              <FormSelect
                label="State"
                name="State"
                options={indianStates}
                required
              />
              <FormInput
                label="City"
                name="City"
                placeholder="Enter city name"
                required
              />
              <FormInput
                label="Market Name"
                name="Market Name"
                placeholder="Enter market/area name"
                required
              />
              <FormInput
                label="Landmark"
                name="Landmark"
                placeholder="Nearest landmark"
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Google Location"
                  name="Google Location"
                  placeholder="Paste Google Maps link"
                  required
                />
              </div>
              <FormTextarea
                label="Brands Nearby"
                name="Brands Nearby"
                placeholder="List major brands in the vicinity"
              />
              <FormTextarea
                label="Brands on the Same Lane"
                name="Brands on Same Lane"
                placeholder="List brands on the same street/lane"
              />
            </div>
          </div>

          {/* Property Details Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
            <SectionHeader title="Property Details" subtitle="Physical specifications and pricing" />

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Frontage"
                name="Frontage"
                placeholder="e.g., 30 ft"
                required
              />
              <FormInput
                label="Parking"
                name="Parking"
                placeholder="e.g., 5 cars, Basement parking"
              />
              <FormInput
                label="Carpet Area on Each Floor"
                name="Carpet Area"
                placeholder="e.g., 1500 sq ft"
                required
              />
              <FormInput
                label="Total Floors in Building"
                name="Total Floors"
                type="number"
                placeholder="e.g., 4"
                required
              />
              <FormInput
                label="Proposed Floor Level"
                name="Proposed Floor Level"
                placeholder="e.g., Ground + 1st Floor"
                required
              />
              <FormInput
                label="Slab to Slab Height & Bottom Beam Height"
                name="Slab Height and Beam Height"
                placeholder="e.g., 12 ft slab, 10 ft beam"
                required
              />
              <FormInput
                label="Expected Rent"
                name="Expected Rent"
                placeholder="e.g., Rs. 1,50,000/month"
                required
              />
              <FormInput
                label="Lease Current Status"
                name="Lease Status"
                placeholder="e.g., Vacant, Occupied till March"
              />
              <FormInput
                label="Handover Time"
                name="Handover Time"
                placeholder="e.g., Immediate, 30 days"
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
            <SectionHeader title="Property Media" subtitle="Upload photos and videos of the property" />

            <div className="space-y-6">
              <div>
                <label htmlFor="pictures" className="block text-sm font-medium text-gray-700 mb-2">
                  Pictures (Front View, Left, Right)
                </label>
                <div className="relative">
                  <input
                    id="pictures"
                    name="Pictures"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePicturesChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0077B5]/10 file:text-[#0077B5] hover:file:bg-[#0077B5]/20"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload multiple images showing front view, left side, and right side of the property (max 25MB total)</p>
              </div>
              <div>
                <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
                  Video (360 Video)
                </label>
                <div className="relative">
                  <input
                    id="video"
                    name="Video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0077B5]/10 file:text-[#0077B5] hover:file:bg-[#0077B5]/20"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload a 360-degree video tour of the property (optional, max 50MB)</p>
              </div>
            </div>
          </div>

          {/* Utilities & Compliance Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
            <SectionHeader title="Utilities & Compliance" subtitle="Infrastructure and legal compliance details" />

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Power Supply"
                name="Power Supply"
                placeholder="e.g., 3-phase, 50 kVA"
              />
              <FormInput
                label="Water Supply"
                name="Water Supply"
                placeholder="e.g., Municipal, Borewell"
              />
              <FormInput
                label="Washroom"
                name="Washroom"
                placeholder="e.g., 2 attached, Common"
              />
              <FormInput
                label="Sanction Plan"
                name="Sanction Plan"
                placeholder="e.g., Approved, Applied"
                required
              />
              <div className="md:col-span-2">
                <FormTextarea
                  label="Building Commencement Letter / Sanction Letter / Anugya Patra"
                  name="Building Commencement"
                  placeholder="Details about building commencement certificate, sanction letter, or Anugya Patra"
                />
              </div>
              <FormInput
                label="Branding Height"
                name="Branding Height"
                placeholder="e.g., 15 ft signage allowed"
              />
              <div className="md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fire NOC</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:border-[#0077B5]/50">
                      <input type="radio" name="Fire NOC" value="Yes" className="w-4 h-4 text-[#0077B5] focus:ring-[#0077B5]" />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:border-[#0077B5]/50">
                      <input type="radio" name="Fire NOC" value="No" className="w-4 h-4 text-[#0077B5] focus:ring-[#0077B5]" />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:border-[#0077B5]/50">
                      <input type="radio" name="Fire NOC" value="Not Applicable" className="w-4 h-4 text-[#0077B5] focus:ring-[#0077B5]" />
                      <span className="text-sm text-gray-700">Not Applicable</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Details Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
            <SectionHeader title="Submission Details" subtitle="Your contact information" />

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Submitted By"
                name="Submitted By"
                placeholder="Your name"
                required
              />
              <FormInput
                label="Mobile No."
                name="Mobile No"
                type="tel"
                placeholder="+91 98765 43210"
                required
              />
              <FormInput
                label="Owner's Name"
                name="Owner Name"
                placeholder="Property owner's name"
              />
              <FormInput
                label="Owner's Contact"
                name="Owner Contact"
                type="tel"
                placeholder="Owner's phone number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-[#0077B5] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#005a8c] shadow-xl shadow-[#0077B5]/25 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {uploadProgress || "Submitting..."}
                </>
              ) : (
                <>
                  Submit Property
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-10 py-4 rounded-full text-lg font-medium border border-gray-200 hover:border-[#0077B5] hover:text-[#0077B5] transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Need help? Contact us at{" "}
          <a href="tel:9165477999" className="text-[#0077B5] hover:underline">
            9165477999
          </a>{" "}
          or{" "}
          <a href="mailto:adhish@proptim.in" className="text-[#0077B5] hover:underline">
            adhish@proptim.in
          </a>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PROPTIM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
