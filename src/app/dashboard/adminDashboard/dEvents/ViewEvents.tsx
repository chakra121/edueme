"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClassNames } from "@emotion/react";

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

export default function ViewEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events/getEvents", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError("An error occurred while fetching events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">View Events</h2>
        <button onClick={fetchEvents} className="btn btn-outline btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Data
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-xl text-gray-500">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="card bg-base-100 border-2 transition duration-300 ease-out hover:scale-105 hover:shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {event.title}
                  {event.published && (
                    <div className="badge badge-success">Published</div>
                  )}
                  {!event.published && (
                    <div className="badge badge-ghost">Draft</div>
                  )}
                </h2>
                <p className="text-base text-gray-500">{event.eventVenue}</p>
                <div className="card-actions mt-2 justify-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal(event)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Detail Modal */}
      {modalOpen && selectedEvent && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="bg-base-100 relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6">
            <button
              onClick={closeModal}
              className="btn btn-circle btn-sm absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="mb-2 text-2xl font-bold">{selectedEvent.title}</h2>
            {selectedEvent.subTitle && (
              <h3 className="mb-4 text-xl text-gray-600">
                {selectedEvent.subTitle}
              </h3>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
              <div
                className={`badge ${selectedEvent.published ? "badge-success" : "badge-ghost"}`}
              >
                {selectedEvent.published ? "Published" : "Draft"}
              </div>
              <div className="badge badge-neutral badge-outline">
                {selectedEvent.category}
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-bold">Description</h4>
                <p className="mb-4 whitespace-pre-line">
                  {selectedEvent.description}
                </p>

                <h4 className="mb-2 font-bold">Programs</h4>
                <ul className="list-inside list-disc">
                  {selectedEvent.programs.map((program, idx) => (
                    <li key={idx}>{program}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold">Event Details</h4>
                <ul className="mb-4 space-y-2">
                  <li>
                    <span className="mb-2 font-medium">Date:</span>{" "}
                    {selectedEvent.eventdate}
                  </li>
                  <li>
                    <span className="mb-2 font-medium">Venue:</span>{" "}
                    {selectedEvent.eventVenue}
                  </li>
                  <li>
                    <span className="mb-2 font-medium">Fee:</span>{" "}
                    {selectedEvent.regFee}
                  </li>
                  {selectedEvent.regEndDate && (
                    <li>
                      <span className="mb-2 font-medium">
                        Registration Ends:
                      </span>{" "}
                      {new Date(selectedEvent.regEndDate).toLocaleDateString()}
                    </li>
                  )}
                  <li>
                    <span className="mb-2 font-medium">Contact:</span>{" "}
                    {selectedEvent.contactUs}
                  </li>
                </ul>

                {selectedEvent.note && (
                  <>
                    <h4 className="mb-2 font-bold">Note</h4>
                    <p>{selectedEvent.note}</p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <a
                href={selectedEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Registration Form
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
