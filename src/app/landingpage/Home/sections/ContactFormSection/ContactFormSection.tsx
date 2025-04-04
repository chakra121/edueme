import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export const ContactFormSection = (): JSX.Element => {
  // Form options data
  const formOptions = [
    { id: "say-hi", label: "Say Hi", selected: true },
    { id: "get-quote", label: "Get a Quote", selected: false },
  ];

  // Form fields data
  const formFields = [
    {
      id: "name",
      label: "Name",
      placeholder: "Name",
      required: false,
      type: "input",
    },
    {
      id: "email",
      label: "Email*",
      placeholder: "Email",
      required: true,
      type: "input",
    },
    {
      id: "message",
      label: "Message*",
      placeholder: "Message",
      required: true,
      type: "textarea",
    },
  ];

  return (
    <div className="flex items-center px-[100px] py-0 relative w-full">
      <Card className="flex w-full items-start gap-10 pt-[60px] pb-20 px-[100px] relative bg-grey rounded-[45px] border-none">
        <CardContent className="p-0 w-full flex items-center justify-between">
          {/* Left side: Form */}
          <div className="flex flex-col items-start gap-10 w-[556px]">
            {/* Form type selection */}
            <RadioGroup
              defaultValue="say-hi"
              className="flex items-start gap-[35px]"
            >
              {formOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <div className="relative w-7 h-7">
                    <div className="relative w-[30px] h-[30px] -top-px -left-px bg-white rounded-[29px] border border-solid border-[#000000] flex items-center justify-center">
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className={
                          option.selected ? "w-4 h-4 bg-[#ffb800]" : ""
                        }
                      />
                    </div>
                  </div>
                  <Label
                    htmlFor={option.id}
                    className="font-p font-[number:var(--p-font-weight)] text-[#000000] text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Form fields */}
            <div className="flex flex-col items-start gap-[25px] w-full">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-[5px] w-full">
                  <Label
                    htmlFor={field.id}
                    className="text-[#000000] text-base leading-7 [font-family:'Space_Grotesk',Helvetica] font-normal tracking-[0]"
                  >
                    {field.label}
                  </Label>

                  {field.type === "input" ? (
                    <Input
                      id={field.id}
                      placeholder={field.placeholder}
                      className="w-full px-[30px] py-[18px] bg-white rounded-[14px] border border-solid border-[#000000] text-lg [font-family:'Space_Grotesk',Helvetica] placeholder:text-[#898989]"
                    />
                  ) : (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      className="h-[190px] w-full px-[30px] py-[18px] bg-white rounded-[14px] border border-solid border-[#000000] text-lg [font-family:'Space_Grotesk',Helvetica] placeholder:text-[#898989]"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit button */}
            <Button className="w-full flex items-center justify-center bg-dark gap-2.5 px-[35px] py-5 rounded-[14px] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-7">
              Send Message
            </Button>
          </div>

          {/* Right side: Decorative element */}
          <div className="relative w-[500px] h-[500px] flex-shrink-0 bg-[url(/prodcuts/mask-group.png)] bg-contain bg-no-repeat">
            {/* Black vector */}
            <Image
              width={500}
              height={500}
              className="absolute w-[120px] h-[120px] top-[150px] left-[190px]"
              alt="ntg"
              src="/prodcuts/odiamond.png"
            />
            {/* Yellow vector */}
            <Image
              width={500}
              height={500}
              className="absolute w-[80px] h-[80px] top-[300px] left-[230px]"
              alt="ntg"
              src="/prodcuts/vector-2.svg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
