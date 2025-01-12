import React from "react";

interface AnnouncementScrollerProps {
  announcements: string[];
}

const AnnouncementScroller: React.FC<AnnouncementScrollerProps> = ({
  announcements,
}) => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-2 text-slate-800">
      <div
        className="animate-scroll flex whitespace-nowrap"
        style={{ animationDuration: "25s" }}
      >
        {announcements.map((announcement, index) => (
          <span
            key={index}
            className="mx-8 inline-block text-lg font-bold md:text-lg"
          >
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementScroller;
