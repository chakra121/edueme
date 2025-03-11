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
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  // Fetch Class Links
  useEffect(() => {
    const fetchClassLinks = async () => {
      try {
        const res = await fetch(`/api/classlink/getLink`, { method: "GET" });

        if (!res.ok) throw new Error("Failed to fetch class links");

        const data = await res.json();
        setTeacherLinks(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching class links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassLinks();
  }, []);

  // Format date for display
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM dd, yyyy hh:mm aa");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Format date for input field
  const formatDateTimeForInput = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch (error) {
      return "";
    }
  };

  // Start Editing
  const startEditing = (
    classLinkId: string,
    currentLink: string,
    currentTopics: string[],
    currentInstructions: string,
    currentDateAndTime: string,
  ) => {
    setEditingLinkId(classLinkId);
    setNewClassLink(currentLink);
    setNewTopics([...currentTopics]);
    setNewInstructions(currentInstructions);
    setNewDateAndTime(formatDateTimeForInput(currentDateAndTime));
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

      if (res.ok) {
        setMessage("Details Updated Successfully!");
        setMessageType("success");

        setTimeout(() => {
          setMessage(null);
        }, 2000);

        const updatedData = await res.json();

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
      } else {
        setMessage(`Error: ${res.statusText}`);
        setMessageType("error");
      }

      setEditingLinkId(null);
      setNewClassLink("");
      setNewTopics([]);
      setNewInstructions("");
      setNewDateAndTime("");
    } catch (error) {
      console.error("Error updating class link:", error);
    }
  };

  // Add a new topic
  const addTopic = () => {
    setNewTopics([...newTopics, ""]);
  };

  // Edit topic
  const editTopic = (index: number, value: string) => {
    const updatedTopics = [...newTopics];
    updatedTopics[index] = value;
    setNewTopics(updatedTopics);
  };

  // Delete topic
  const deleteTopic = (index: number) => {
    setNewTopics(newTopics.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title mb-4 text-3xl font-bold">Live Class Link</h1>
        {teacherLinks.length === 0 ? (
          <p>No class links found.</p>
        ) : (
          teacherLinks.map((teacherLink) => (
            <div key={teacherLink.id} className="mb-4">
              {editingLinkId === teacherLink.id ? (
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      New Class Link:
                    </span>
                  </label>
                  <input
                    type="text"
                    value={newClassLink}
                    onChange={(e) => setNewClassLink(e.target.value)}
                    className="input-bordered input mb-4 w-full"
                  />

                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Instructions:
                    </span>
                  </label>
                  <textarea
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="textarea-bordered textarea mb-4 w-full"
                  ></textarea>

                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Scheduled Date and Time:
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={newDateAndTime}
                    onChange={(e) => setNewDateAndTime(e.target.value)}
                    className="input-bordered input mb-4 w-full"
                  />

                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Edit Topics:
                    </span>
                  </label>
                  {newTopics.map((topic, index) => (
                    <div key={index} className="mb-3 flex items-center">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => editTopic(index, e.target.value)}
                        className="input-bordered input w-full"
                      />
                      <button
                        onClick={() => deleteTopic(index)}
                        className="btn btn-error btn-sm ml-2"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="">
                    <button
                      onClick={addTopic}
                      className="btn btn-accent btn-md mb-4"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => updateClassLink(teacherLink.id)}
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
                <div className="text-xl pl-6">
                  <p className="mb-2 font-bold">Class Link:</p>
                  <p className="mb-4 pl-5">{teacherLink.classLink}</p>
                  <p className="mb-2 font-bold">Topics:</p>
                  <ul className="mb-4 list-decimal pl-10">
                    {teacherLink.topics.map((topic, index) => (
                      <li className="pl-1" key={index}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-2 font-bold">Instructions:</p>
                  <p className="mb-4 pl-5">{teacherLink.description}</p>

                  <p className="mb-2 font-bold">Scheduled Date and Time:</p>
                  <p className="mb-4 pl-5">
                    {formatDateTime(teacherLink.DateAndTime)}
                  </p>

                  <p className="mb-2 font-bold">Last Updated:</p>
                  <p className="mb-4 pl-5">
                    {formatDateTime(teacherLink.updatedAt)}
                  </p>

                  <button
                    onClick={() =>
                      startEditing(
                        teacherLink.id,
                        teacherLink.classLink,
                        teacherLink.topics,
                        teacherLink.description,
                        teacherLink.DateAndTime,
                      )
                    }
                    className="btn btn-secondary mb-4"
                  >
                    Edit Class
                  </button>
                  <a
                    href={teacherLink.classLink}
                    target="_blank"
                    className="btn btn-primary mb-4 ml-2"
                  >
                    Start Live Class
                  </a>

                  {message && (
                    <div
                      className={`alert ${messageType === "success" ? "alert-success" : "alert-error"} mb-2 text-lg`}
                    >
                      <span>{message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
