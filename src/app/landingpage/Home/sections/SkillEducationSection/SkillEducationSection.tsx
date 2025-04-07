import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SkillEducationSection = (): JSX.Element => {
  const points = [
    {
      title: "Enhances Employability",
      description:
        "Skill-based education equips individuals with practical abilities, making them more attractive to employers and bridging the gap between education and employment.",
      image: "/yskills/img1.png",
    },
    {
      title: "Promotes Lifelong Learning",
      description:
        "Focusing on skills encourages continuous personal development, fostering adaptability in a rapidly changing world.",
      image: "/yskills/img2.jpg",
    },
    {
      title: "Bridges Education and Industry",
      description:
        "Skill education aligns academic learning with industry needs, ensuring graduates are job-ready and reducing unemployment rates.",
      image: "/yskills/img3.jpg",
    },
    {
      title: "Fosters Innovation",
      description:
        "Practical skills empower individuals to think critically and solve problems creatively, driving innovation and entrepreneurship.",
      image: "/yskills/img4.jpg",
    },
    {
      title: "Develops Critical Thinking",
      description:
        "Skill-based learning emphasizes analytical thinking, enabling individuals to assess situations effectively and make informed decisions.",
      image: "/yskills/img5.png",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why is <span className="text-yellow-500">Skill Education</span> Important?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {points.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl shadow-lg border border-gray-300 p-6 flex flex-col gap-4 bg-white transition"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="rounded-full shadow-md object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold leading-5">{item.title}</h3>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            <p className="text-gray-700 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

