"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ToastState = {
  show: boolean;
  message: string;
  type: "success" | "error";
};

export default function CreateEvent({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    subTitle: string;
    description: string;
    eventVenue: string;
    eventdate: string;
    contactUs: string;
    programs: string[];
    category: string;
    regFee: string;
    registrationLink: string;
    note: string;
    regEndDate: string;
    published: boolean;
  }>({
    title: "",
    subTitle: "",
    description: "",
    eventVenue: "",
    eventdate: "",
    contactUs: "",
    programs: [],
    category: "",
    regFee: "",
    registrationLink: "",
    note: "",
    regEndDate: "",
    published: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProgramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Split comma-separated programs into an array
    const programsArray = e.target.value.split(",").map((prog) => prog.trim());
    setFormData({ ...formData, programs: programsArray });
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, published: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();

      // Clear form
      setFormData({
        title: "",
        subTitle: "",
        description: "",
        eventVenue: "",
        eventdate: "",
        contactUs: "",
        programs: [],
        category: "",
        regFee: "",
        registrationLink: "",
        note: "",
        regEndDate: "",
        published: false,
      });

      // Show success toast
      onToast("Event created successfully!", "success");

      // Refresh data
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      onToast("Failed to create event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-2 bg-base-100 p-4">
      <h2 className="card-title mb-4 text-2xl font-bold">Create New Event</h2>
<div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Sub-Title:</span>
          </label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </div>

        {/* Venue */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Event Venue</span>
          </label>
          <input
            type="text"
            name="eventVenue"
            value={formData.eventVenue}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Event Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Event Date</span>
          </label>
          <input
            type="text"
            name="eventdate"
            value={formData.eventdate}
            onChange={handleChange}
            className="input input-bordered"
            required
            placeholder="e.g., April 15-17, 2025"
          />
        </div>

        {/* Contact */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Contact Information</span>
          </label>
          <input
            type="text"
            name="contactUs"
            value={formData.contactUs}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Programs */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">
              Programs (comma-separated)
            </span>
          </label>
          <input
            type="text"
            name="programs"
            value={formData.programs.join(", ")}
            onChange={handleProgramsChange}
            className="input input-bordered"
            required
            placeholder="e.g., Workshop, Seminar, Panel Discussion"
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Category</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Registration Fee */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Registration Fee</span>
          </label>
          <input
            type="text"
            name="regFee"
            value={formData.regFee}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Registration Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Registration Link</span>
          </label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Note */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Note (Optional)</span>
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="textarea textarea-bordered"
          ></textarea>
        </div>

        {/* Registration End Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Registration End Date</span>
          </label>
          <input
            type="datetime-local"
            name="regEndDate"
            value={formData.regEndDate}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        {/* Published Status */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">Published</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={formData.published}
              onChange={handlePublishedChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
