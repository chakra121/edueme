import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ProcessOverviewSection = (): JSX.Element => {
  const processSteps = [
    {
      id: "01",
      title: "Interactive Learning Modules",
      content:
        "Engaging, hands-on lessons designed to simplify complex STEM concepts. Learners explore through experiments, activities, and real-world problem-solving.",
    },
    {
      id: "02",
      title: "Real-World Applications",
      content:
        "Students apply STEM knowledge to real-life scenarios, bridging theory and practice. Projects and case studies enhance understanding and skill development.",
    },
    {
      id: "03",
      title: "Tech & Innovation Focus",
      content:
        "Exposure to coding, robotics, AI, and emerging technologies. Encourages innovation and prepares learners for the future of technology-driven industries.",
    },
    {
      id: "04",
      title: "Critical Thinking & Problem-Solving",
      content:
        "Develops analytical thinking through hands-on challenges and STEM activities. Empowers students to tackle real-world problems creatively and effectively.",
    },
    {
      id: "05",
      title: "Collaborative & Inclusive Learning",
      content:
        "Team-based projects foster communication, teamwork, and diverse perspectives. Creates an inclusive environment where every learner thrives.",
    },
    {
      id: "06",
      title: "Career & Industry Readiness",
      content:
        "Equips students with industry-relevant skills and knowledge. Prepares them for STEM careers with hands-on training and career-focused learning.",
    },
  ];

  return (
    <section className="flex flex-col items-start gap-[30px] w-full max-w-[1240px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Accordion type="single" collapsible className="w-full" defaultValue="01">
        {processSteps.map((step) => (
          <AccordionItem
            key={step.id}
            value={step.id}
            className="mb-[30px] rounded-[45px] overflow-hidden border border-solid border-[#191a23] shadow-[0px_5px_0px_#191a23] transition-colors duration-200 data-[state=open]:bg-[#ffb800]"
          >
            <AccordionTrigger className="group flex items-center justify-between w-full px-[60px] py-[41px] hover:no-underline">
              <div className="flex items-center gap-[25px]">
                <div className="font-['Space_Grotesk',Helvetica] font-medium text-[#000000] text-6xl">
                  {step.id}
                </div>
                <div className="font-['Space_Grotesk',Helvetica] font-medium text-[#000000] text-3xl text-left">
                  {step.title}
                </div>
              </div>

              <div className="w-[58px] ml-300px h-[58px] rounded-full border-2 border-[#191a23] flex items-center justify-center bg-white transition-colors duration-200 group-data-[state=open]:bg-[#ffb800]">
                <PlusIcon className="w-8 h-8 text-[#191a23] group-data-[state=open]:hidden" />
                <MinusIcon className="w-8 h-8 text-[#191a23] hidden group-data-[state=open]:block" />
              </div>
            </AccordionTrigger>

            {step.content && (
              <AccordionContent className="px-[60px] pb-[41px]">
                <div className="w-full h-px bg-[#191a23] mb-[30px]" />
                <div className="font-p text-[#000000] text-lg leading-relaxed">
                  {step.content}
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
