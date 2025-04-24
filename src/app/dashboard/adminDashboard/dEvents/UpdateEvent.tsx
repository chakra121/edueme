"use client";

import { useState, useEffect } from "react";
import { updateEvent } from "@/app/actions/event-actions";

type Event = {
  id: string;
  title: string;
  subTitle?: string;
  description: string;
  eventVenue: string;
  eventdate: string;
  contactUs: string;
  programs: string[];
  category: string;
  regFee: string;
  registrationLink: string;
  note?: string;
  published: boolean;
  slug: string;
  regEndDate?: string;
  createdAt: string;
  updatedAt: string;
};

export default function UpdateEvent({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event> | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);
  const [fetchingEventDetails, setFetchingEventDetails] = useState(false);

  // Fetch event list for dropdown (only titles and IDs)
  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        setFetchingEvents(true);
        const res = await fetch("/api/admin/events/dropdown");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json() as Event[];

        // Only store ID and title for dropdown
        const eventsList = data.map((event: Event) => ({
          id: event.id,
          title: event.title,
        }));

        setEvents(eventsList);
      } catch (error) {
        console.error(error);
        onToast("Error loading events", "error");
      } finally {
        setFetchingEvents(false);
      }
    };

    void fetchEventsList();
  }, );

  // Fetch specific event details when selected from dropdown
  const fetchEventDetails = async (eventId: string) => {
    if (!eventId) return;

    try {
      setFetchingEventDetails(true);
      const res = await fetch(`/api/admin/events/${eventId}`);
      if (!res.ok) throw new Error("Failed to fetch event details");
      const eventData = await res.json() as Event;
      return eventData;
    } catch (error) {
      console.error(error);
      onToast("Error loading event details", "error");
      return null;
    } finally {
      setFetchingEventDetails(false);
    }
  };

  const handleEventSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = e.target.value;
    setSelectedEventId(eventId);

    if (!eventId) {
      setSelectedEvent(null);
      setFormData(null);
      return;
    }

    const eventData = await fetchEventDetails(eventId);
    if (eventData) {
      setSelectedEvent(eventData);

      // Format data for the form
      const formattedData = {
        ...eventData,
        regEndDate: eventData.regEndDate
          ? new Date(eventData.regEndDate).toISOString().slice(0, 16)
          : "",
      };

      setFormData(formattedData);
    }
  };

  const openEditModal = () => {
    if (selectedEvent && formData) {
      (
        document.getElementById("edit_event_modal") as HTMLDialogElement
      )?.showModal();
    } else {
      onToast("Please select an event first", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<unknown>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleProgramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const programsArray = e.target.value.split(",").map((p) => p.trim());
    setFormData((prev) => (prev ? { ...prev, programs: programsArray } : null));
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, published: e.target.checked } : null,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.id) return;

    setLoading(true);
    try {
      const result = await updateEvent({
        ...formData,
        regEndDate: formData?.regEndDate ? new Date(formData.regEndDate) : undefined,
      } as Omit<Event, "regEndDate"> & { regEndDate?: Date });
      if (result.success) {
        onToast("Event updated successfully!", "success");
        // Update the cached event data
        setSelectedEvent(formData as Event);

        (
          document.getElementById("edit_event_modal") as HTMLDialogElement
        )?.close();
      } else {
        throw new Error(result.error ?? "Failed to update event");
      }
    } catch (error) {
      console.error(error);
      onToast("Failed to update event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Update Event</h2>

      <div className="card bg-base-100 pb-2">
        <label className="mb-1 block text-lg font-medium text-gray-700">
          Select an Event to Edit :
        </label>
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered w-2/5"
            value={selectedEventId}
            onChange={handleEventSelect}
            disabled={fetchingEvents}
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>

          <button
            className="btn btn-primary"
            onClick={openEditModal}
            disabled={!selectedEventId || fetchingEventDetails}
          >
            {fetchingEventDetails ? "Loading..." : "Edit Selected Event"}
          </button>
        </div>

        {fetchingEvents && <p className="mt-2 text-sm">Loading events...</p>}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_event_modal" className="modal">
        <div className="modal-box max-h-5/6 w-full max-w-3xl">
          <h3 className="mb-4 text-xl font-bold">
            Edit Event: {selectedEvent?.title}
          </h3>

          {formData && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "title", label: "Title", type: "text" },
                { name: "subTitle", label: "Subtitle", type: "text" },
                { name: "description", label: "Description", type: "textarea" },
                { name: "eventVenue", label: "Venue", type: "text" },
                { name: "eventdate", label: "Event Date", type: "text" },
                { name: "contactUs", label: "Contact Info", type: "text" },
                { name: "category", label: "Category", type: "text" },
                { name: "regFee", label: "Registration Fee", type: "text" },
                {
                  name: "registrationLink",
                  label: "Registration Link",
                  type: "url",
                },
                { name: "note", label: "Note", type: "textarea" },
                {
                  name: "regEndDate",
                  label: "Registration End Date",
                  type: "datetime-local",
                },
              ].map((field) => (
                <div className="form-control" key={field.name}>
                  <label className="mb-1 block text-lg font-medium text-gray-700">
                    <span className="label-text text-base">
                      {field.label} :
                    </span>
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData && field.name in formData ? String(formData[field.name as keyof Event] ?? "") : ""}
                      onChange={handleChange}
                      className="textarea textarea-bordered h-20 w-full"
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData && field.name in formData ? String(formData[field.name as keyof Event] ?? "") : ""}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  )}
                </div>
              ))}

              <div className="form-control">
                <label className="mb-1 block text-lg font-medium text-gray-700">
                  <span className="label-text text-base">
                    Programs (comma-separated) :
                  </span>
                </label>
                <input
                  type="text"
                  name="programs"
                  value={formData.programs?.join(", ") ?? ""}
                  onChange={handleProgramsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="pr-3 text-lg font-medium text-gray-700">
                  <span className="label-text text-base">Published :</span>
                </label>
                <input
                  type="checkbox"
                  checked={formData.published ?? false}
                  onChange={handlePublishedChange}
                  className="toggle toggle-primary"
                />
              </div>

              <div className="modal-action flex justify-start gap-2">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    (
                      document.getElementById(
                        "edit_event_modal",
                      ) as HTMLDialogElement
                    )?.close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
