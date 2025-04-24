import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

export const HeroSection = (): JSX.Element => {
  // Navigation items data
  const navItems = [
    { label: "Courses", href: "#" },
    { label: "Events", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Blogs", href: "#" },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-[70px] relative">
      <div className="flex w-full items-center justify-between px-[100px] py-0 relative">
        <div className="relative w-[219.54px] h-14" />

        <NavigationMenu className="flex items-center justify-center gap-10">
          <NavigationMenuList className="flex items-center gap-10">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="font-['Space_Grotesk',Helvetica] font-normal text-black text-xl tracking-[0] leading-7 whitespace-nowrap"
                  href={item.href}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Button
                variant="outline"
                className="px-[35px] py-5 rounded-[14px] border border-solid border-[#191a23]"
              >
                <span className="font-['Space_Grotesk',Helvetica] font-normal text-black text-xl tracking-[0] leading-7 whitespace-nowrap">
                  Login/Signup
                </span>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex w-full h-[520px] items-center px-[100px] py-0 relative">
        <div className="relative w-full h-[584px] mt-[-32.00px] mb-[-32.00px] bg-grey rounded-[45px]">
          <Image
            width={541}
            height={495}
            className="absolute w-[541px] h-[495px] top-[45px] left-16"
            alt="Untitled design"
            src="/about/untitled-design.png"
          />
        </div>

        <div className="flex flex-col w-[531px] items-start gap-[35px] absolute right-[100px] top-1/2 transform -translate-y-1/2">
            <h1 className="font-['Space_Grotesk',Helvetica] font-bold text-black text-6xl tracking-tight leading-tight mb-2">
            Together for Success
            </h1>

          <p className="font-['Space_Grotesk',Helvetica] font-normal text-black text-xl tracking-[0] leading-7">
            At EduMe, we ignite curiosity and nurture innovation through
            hands-on STEM education, empowering learners to become future-ready
            problem solvers. Our mission is to bridge the gap between theory and
            real-world application, inspiring students to turn ideas into
            impact.
          </p>
        </div>
      </div>
    </div>
  );
};
