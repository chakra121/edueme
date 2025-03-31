"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

interface TeacherLink {
  id: string;
  classLink: string;
  topics: string[];
  description: string;
  teacherID: string;
  courseID: string;
  updatedAt: string;
  DateAndTime: string;
}

export default function ClassLinkManager() {
  const [teacherLinks, setTeacherLinks] = useState<TeacherLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [newClassLink, setNewClassLink] = useState<string>("");
  const [newTopics, setNewTopics] = useState<string[]>([]);
  const [newInstructions, setNewInstructions] = useState<string>("");
  const [newDateAndTime, setNewDateAndTime] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  // Fetch Class Links
  useEffect(() => {
    const fetchClassLinks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/classlink/getLink", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch class links");
        }

        const data = (await res.json()) as TeacherLink[];
        setTeacherLinks(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching class links:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchClassLinks();
  }, []);

  // Format date for input field
  const formatDateTimeForInput = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
  };

  // Start Editing
  const startEditing = (link: TeacherLink) => {
    setEditingLinkId(link.id);
    setNewClassLink(link.classLink);
    setNewTopics([...link.topics]);
    setNewInstructions(link.description);
    setNewDateAndTime(formatDateTimeForInput(link.DateAndTime));
  };

  // Update Class Link and Topics
  const updateClassLink = async (classLinkId: string) => {
    try {
      const res = await fetch("/api/classlink/updateLink", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLinkId,
          newClassLink,
          newTopics,
          newInstructions,
          newDateAndTime,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      setMessage("Details Updated Successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
      }, 2000);

      const updatedData = (await res.json()) as TeacherLink;

      // Optimistic UI Update
      setTeacherLinks((prev) =>
        prev.map((cl) =>
          cl.id === classLinkId
            ? {
                ...cl,
                classLink: newClassLink,
                topics: [...newTopics],
                description: newInstructions,
                DateAndTime: updatedData.DateAndTime,
                updatedAt: updatedData.updatedAt,
              }
            : cl,
        ),
      );
    } catch (error) {
      console.error("Error updating class link:", error);
      setMessage("Error updating class link");
      setMessageType("error");
    } finally {
      setEditingLinkId(null);
      setNewClassLink("");
      setNewTopics([]);
      setNewInstructions("");
      setNewDateAndTime("");
    }
  };

  // Add a new topic
  const addTopic = () => setNewTopics([...newTopics, ""]);

  // Edit topic
  const editTopic = (index: number, value: string) => {
    setNewTopics((prev) =>
      prev.map((topic, i) => (i === index ? value : topic)),
    );
  };

  // Delete topic
  const deleteTopic = (index: number) => {
    setNewTopics((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading class links...</p>;

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title mb-4 text-3xl font-bold">Live Class Link</h1>
        {teacherLinks.length === 0 ? (
          <p>No class links found.</p>
        ) : (
          teacherLinks.map((link) => (
            <div key={link.id} className="mb-4">
              {editingLinkId === link.id ? (
                <div>
                  <label className="label">New Class Link:</label>
                  <input
                    type="text"
                    value={newClassLink}
                    onChange={(e) => setNewClassLink(e.target.value)}
                    className="input input-bordered mb-4 w-full"
                  />

                  <label className="label">Instructions:</label>
                  <textarea
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="textarea textarea-bordered mb-4 w-full"
                  ></textarea>

                  <label className="label">Scheduled Date and Time:</label>
                  <input
                    type="datetime-local"
                    value={newDateAndTime}
                    onChange={(e) => setNewDateAndTime(e.target.value)}
                    className="input input-bordered mb-4 w-full"
                  />

                  <label className="label">Edit Topics:</label>
                  {newTopics.map((topic, index) => (
                    <div key={index} className="mb-3 flex items-center">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => editTopic(index, e.target.value)}
                        className="input input-bordered w-full"
                      />
                      <button
                        onClick={() => deleteTopic(index)}
                        className="btn btn-error btn-sm ml-2"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addTopic}
                    className="btn btn-accent btn-md mb-4"
                  >
                    +
                  </button>

                  <button
                    onClick={() => updateClassLink(link.id)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingLinkId(null)}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="pl-6 text-xl">
                  <p className="mb-2 font-bold">Class Link:</p>
                  <p>{link.classLink}</p>
                  <button
                    onClick={() => startEditing(link)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <a
                    href={link.classLink}
                    target="_blank"
                    className="btn btn-primary ml-2"
                  >
                    Start Live Class
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {message && (
        <div
          className={`toast toast-${messageType} fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded p-4 shadow-lg ${
            messageType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
