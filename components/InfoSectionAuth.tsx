import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import global from "@/public/signup.png";
import folder from "@/public/folder.png";
import security from "@/public/security.png";
import { Badge } from "./ui/badge";

const InfoSectionAuth = () => {
  return (
    <div className="h-screen flex-1 p-2">
      <div className="flex h-full flex-col justify-between rounded-lg bg-[#5138ee] p-8">
        <div>
          <Badge variant="secondary" className="font-semibold">
            SIMPLE TEAM
          </Badge>
          <p className="mt-8 max-w-[440px] font-['samsungsharpsans'] text-4xl font-semibold tracking-wide text-white">
            Very good works are waiting for you{" "}
            <span className="text-2xl">🫰</span>
          </p>
          <p className="mt-3 max-w-[400px] font-['samsungsharpsans'] text-3xl font-semibold text-white">
            Login now
          </p>
        </div>
        <div className="mt-8">
          <Carousel
            className="w-full cursor-grab overflow-hidden"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex h-[240px] items-center justify-center">
                      <Image
                        src={global}
                        alt="Global connection"
                        className="mt-6 h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <Card className="">
                    <CardContent className="flex h-[240px] items-center justify-center">
                      <Image
                        src={folder}
                        alt="Global connection"
                        className="mt-6 h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <Card className="">
                    <CardContent className="flex h-[240px] items-center justify-center">
                      <Image
                        src={security}
                        alt="Global connection"
                        className="mt-6 h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default InfoSectionAuth;
