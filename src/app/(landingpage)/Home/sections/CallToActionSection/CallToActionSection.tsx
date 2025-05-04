import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="w-full py-12 px-4 md:px-6 lg:px-[100px]">
      <Card className="w-full bg-grey rounded-[45px] border-none overflow-hidden relative">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="p-8 lg:p-[60px] max-w-[500px]">
              <h3 className="text-black text-[32px] font-bold tracking-tight leading-tight mb-[26px]">
                Our Products
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-[26px]">
                At EduMe, we provide a range of cutting-edge solutions designed
                to enhance education and streamline learning experiences for
                students, educators, and institutions.
              </p>
              <Button className="bg-black text-white rounded-[14px] px-[35px] py-5 h-auto">
                <span className="font-space-grotesk font-normal text-xl leading-7">
                  Get Your Demo Now
                </span>
              </Button>
            </div>

            <div className="relative w-full lg:w-[494px] h-[394px]">
              <div className="absolute w-[359px] h-[394px] top-0 left-0">
                <div className="absolute w-[359px] h-[394px] top-0 left-0 rotate-180">
                  <div className="relative h-[394px]">
                    <div className="absolute w-[338px] h-[71px] top-40 left-[21px] rounded-[169px/35.5px] border border-solid border-[#000000] rotate-180" />
                    <div className="absolute w-[338px] h-[71px] top-[135px] left-[21px] rounded-[169px/35.5px] border border-solid border-[#000000] rotate-180" />
                    <div className="absolute w-[338px] h-[71px] top-[110px] left-[21px] rounded-[169px/35.5px] border border-solid border-[#000000] rotate-180" />
                    <Image
                    width={199}
                    height={209}
                      className="absolute w-[199px] h-[209px] top-[185px] left-[19px] -rotate-180"
                      alt="Star"
                      src="/prodcuts/star-2.svg"
                    />
                    <div className="absolute w-[164px] h-[164px] top-[53px] left-0">
                      <Image
                      width={160}
                      height={164}
                        className="absolute w-[160px] h-[156px] top-0 left-0.5"
                        alt="Star"
                        src="/prodcuts/star-4.svg"
                      />
                    </div>
                    <Image
                      width={130}
                      height={130}
                      className="absolute w-[130px] h-[130px] top-0 left-[159px] -rotate-180"
                      alt="Group"
                      src="/prodcuts/group-2.png"
                    />
                    <div className="absolute w-[125px] h-[125px] top-[145px] left-36 bg-[#000000] rounded-[62.5px] border border-solid rotate-180" />
                    <div className="absolute w-5 h-10 top-[201px] left-[217px] bg-white rounded-[10px/20px] rotate-180" />
                    <div className="absolute w-5 h-10 top-[201px] left-44 bg-white rounded-[10px/20px] rotate-180" />
                  </div>
                </div>
                <Image
                  width={74}
                  height={74}
                  className="absolute w-[74px] h-[74px] top-[68px] left-[203px] object-cover"
                  alt="Image"
                  src="/prodcuts/image-11.png"
                />
              </div>
              <div className="absolute w-[188px] h-[202px] top-[62px] left-[-198px] bg-[url(/star-2.svg)] bg-[100%_100%]">
                <Image
                  width={89}
                  height={85}
                  className="absolute w-[89px] h-[85px] top-[58px] left-[49px] object-cover"
                  alt="Image"
                  src="/prodcuts/image.png"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
