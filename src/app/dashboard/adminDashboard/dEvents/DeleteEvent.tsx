"use client";

import { useState, useEffect, useCallback } from "react";
import { deleteEvent } from "@/app/actions/event-actions";

type Event = {
  id: string;
  title: string;
  regFee: string;
  published: boolean;
};

export default function DeleteEvent({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Use useCallback to memoize the fetchEvents function
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events/getEvents", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = (await res.json()) as Event[];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      onToast("Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    // Set up a flag to track whether the component is mounted
    let isMounted = true;

    // Wrap the async operation to respect the mounted state
    const getEvents = async () => {
      if (isMounted) {
        await fetchEvents();
      }
    };

    void getEvents();

    // Cleanup function to prevent state updates if unmounted
    return () => {
      isMounted = false;
    };
  }, [fetchEvents]);

  const handleDeleteClick = (id: string) => {
    setConfirmDelete(id);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleConfirmDelete = async (id: string) => {
    setDeleting(id);

    try {
      const result = await deleteEvent(id);

      if (result.success) {
        onToast("Event deleted successfully!", "success");

        // Remove from local state to avoid refetching
        setEvents((prev) => prev.filter((event) => event.id !== id));
      } else {
        throw new Error(result.error ?? "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      onToast("Failed to delete event", "error");
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Delete Events</h2>
        <button
          onClick={() => void fetchEvents()}
          className="btn btn-outline btn-sm"
        >
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
          Refresh
        </button>
      </div>

      {events.length === 0 ? (
        <div className="alert">
          <p>No events found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-sm font-semibold">
                <th>#</th>
                <th>Title</th>
                <th>Registration Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="hover text-sm">
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.regFee}</td>
                  <td>
                    {event.published ? (
                      <span className="badge badge-success">Published</span>
                    ) : (
                      <span className="badge badge-ghost">Draft</span>
                    )}
                  </td>
                  <td>
                    {confirmDelete === event.id ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => void handleConfirmDelete(event.id)}
                          disabled={!!deleting}
                        >
                          {deleting === event.id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={handleCancelDelete}
                          disabled={!!deleting}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDeleteClick(event.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
