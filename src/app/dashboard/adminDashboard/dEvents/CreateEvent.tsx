"use client";

import { useState } from "react";


export default function CreateEvent({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
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

      await response.json(); // Processed response without assigning to an unused variable

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

    } catch (error) {
      console.error("Error creating event:", error);
      onToast("Failed to create event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Create New Event</h2>
      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Title :</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Subtitle */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Sub-Title :</span>
            </label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Description :</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered h-24 w-full"
              required
            ></textarea>
          </div>

          {/* Venue */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Event Venue :</span>
            </label>
            <input
              type="text"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Event Date */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Event Date :</span>
            </label>
            <input
              type="text"
              name="eventdate"
              value={formData.eventdate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
              placeholder="e.g., April 15-17, 2025"
            />
          </div>

          {/* Contact */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Contact Information :</span>
            </label>
            <input
              type="text"
              name="contactUs"
              value={formData.contactUs}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Programs */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Programs (comma-separated) :</span>
            </label>
            <input
              type="text"
              name="programs"
              value={formData.programs.join(", ")}
              onChange={handleProgramsChange}
              className="input input-bordered w-full"
              required
              placeholder="e.g., Workshop, Seminar, Panel Discussion"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Category :</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Registration Fee */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Registration Fee :</span>
            </label>
            <input
              type="text"
              name="regFee"
              value={formData.regFee}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Registration Link */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Registration Link :</span>
            </label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Note */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Note (Optional) :</span>
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="textarea textarea-bordered h-24 w-full"
            ></textarea>
          </div>

          {/* Registration End Date */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Registration End Date :</span>
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
            <label className="pr-3 text-lg font-medium text-gray-700">
              <span className="label-text">Published :</span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={formData.published}
              onChange={handlePublishedChange}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary btn-block ${loading ? "loading" : ""}`}
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
