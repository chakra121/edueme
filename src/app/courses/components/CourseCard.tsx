// components/CourseCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Courses } from "@prisma/client";

interface CourseCardProps {
  // Assuming your Courses type has these fields, or you adapt the component
  course: Courses & {
    description?: string; // Add description if not in Prisma model
    imageUrl?: string;    // Add imageUrl if not in Prisma model
    tags?: string[];      // Add tags if not in Prisma model
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const primaryColor = "#ffb800"; // orange-500
  const hoverColor = "#ffb800"; // orange-600

  // Provide a default image if course.imageUrl is missing
  const displayImageUrl = course.imageUrl || '/courses/rbai.png'; // ** Adjust placeholder path **

  // Provide a default description if course.description is missing
  const displayDescription = course.description || `Learn ${course.courseName} from scratch. Explore the fundamentals and build practical skills.`;

  return (
    <div
      className="
      group
      relative
      bg-white
      border border-gray-200
      rounded-lg
      overflow-hidden
      shadow-md
      transition-all duration-300 ease-in-out
      hover:shadow-lg hover:shadow-orange-200
      hover:border-orange-400
      hover:scale-[1.03]
      flex flex-col
      "
    >
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
      <div className="relative flex flex-col flex-grow"> {/* Added relative positioning for content */}
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden border-b border-gray-200">
          {/* Optional: Subtle light overlay? Often not needed for light themes */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent z-10"></div> */}

          {/* Image */}
          <Image
            src={displayImageUrl} // Use dynamic or placeholder image URL
            alt={`${course.courseName} illustration`}
            fill // Use fill to cover the container
            style={{ objectFit: 'cover' }} // Cover the area
            className="
              transition-transform duration-500 ease-out
              group-hover:scale-110 // Zoom image slightly on card hover
            "
            // Optional: add placeholder logic if needed, though 'fill' usually handles this
            // onError={(e) => (e.currentTarget.src = '/images/placeholder-course.png')}
          />
          {/* Top Accent Line - appears on hover */}
          <div
            className="absolute top-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-500 ease-out group-hover:w-full"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Link wraps the title */}
          <Link href={`/courses/${course.courseCode}`} className="group/link mb-2">
              <h3
              className="
                  text-xl font-semibold
                  text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 // Gradient text using orange theme
                  group-hover/link:text-orange-600 // Solid color on hover for emphasis
                  group-hover/link:underline // Underline on hover
                  transition-colors duration-300
              "
              >
              {course.courseName}
              </h3>
          </Link>

          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {displayDescription} {/* Use dynamic or generated description */}
          </p>

          {/* Course Fee */}
          <p className="font-semibold text-lg text-orange-700 mb-3">
              ₹{course.courseFee}
          </p>

          {/* Tags Section (Optional - based on your data) */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100"> {/* Add top border */}
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-2 py-1 text-xs rounded
                    bg-orange-100 text-orange-800
                    border border-orange-200
                    group-hover:bg-orange-500/20 group-hover:text-orange-700 group-hover:border-orange-500/50 // Change tag appearance on card hover
                    transition-colors duration-300
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Glow Effect - subtle */}
        <div
          className="h-[2px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>
    </div>
  );
}