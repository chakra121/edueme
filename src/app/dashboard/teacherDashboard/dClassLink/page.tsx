"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Toast from "@/components/ui/toast";

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
  const [teacherLink, setTeacherLink] = useState<TeacherLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newClassLink, setNewClassLink] = useState<string>("");
  const [newTopics, setNewTopics] = useState<string[]>([]);
  const [newInstructions, setNewInstructions] = useState<string>("");
  const [newDateAndTime, setNewDateAndTime] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  useEffect(() => {
    const fetchClassLink = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/classlink/getLink", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch class link");

        const data = (await res.json()) as TeacherLink;
        setTeacherLink(data);
      } catch (err) {
        console.error("Error fetching class link:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchClassLink();
  }, []);

  const formatDateTimeForInput = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
  };

  const startEditing = () => {
    if (!teacherLink) return;
    setEditing(true);
    setNewClassLink(teacherLink.classLink);
    setNewTopics([...teacherLink.topics]);
    setNewInstructions(teacherLink.description);
    setNewDateAndTime(formatDateTimeForInput(teacherLink.DateAndTime));
  };

  const updateClassLink = async () => {
    if (!teacherLink) return;

    try {
      const res = await fetch("/api/classlink/updateLink", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLinkId: teacherLink.id,
          newClassLink,
          newTopics,
          newInstructions,
          newDateAndTime,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedData = (await res.json()) as TeacherLink;
      setTeacherLink(updatedData);

      setMessage("Details Updated Successfully!");
      setMessageType("success");

      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.error("Error updating class link:", error);
      setMessage("Error updating class link");
      setMessageType("error");
    } finally {
      setEditing(false);
      setNewClassLink("");
      setNewTopics([]);
      setNewInstructions("");
      setNewDateAndTime("");
    }
  };

  const addTopic = () => setNewTopics([...newTopics, ""]);

  const editTopic = (index: number, value: string) => {
    setNewTopics((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const deleteTopic = (index: number) => {
    setNewTopics((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading class link...</p>;

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="mb-4 text-3xl font-bold text-primary">
          Live Class Details
        </h1>

        {teacherLink && (
          <>
            {editing ? (
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

                <div>
                  <button onClick={updateClassLink} className="btn btn-primary">
                    Update
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="pl-6 text-xl">
                <p className="mb-2 font-bold">Class Link:</p>
                <p className="mb-4">{teacherLink.classLink}</p>

                <h2 className="mb-2 font-bold">Description:</h2>
                <p className="mb-4">{teacherLink.description}</p>
                
                <h2 className="mb-2 font-bold">Scheduled Date & Time:</h2>
                <p className="mb-4">
                  {format(new Date(teacherLink.DateAndTime), "PPpp")}
                </p>

                <h2 className="mb-2 font-bold">Topics:</h2>
                <ul className="mb-4 list-disc pl-6">
                  {teacherLink.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>

                <button
                  onClick={startEditing}
                  className="btn btn-secondary mt-2"
                >
                  Edit
                </button>
                <a
                  href={teacherLink.classLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary ml-2"
                >
                  Start Live Class
                </a>
              </div>
            )}
          </>
        )}
      </div>

      {message && messageType && (
        <Toast
          message={message}
          type={messageType}
          isVisible={true}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
}
