import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="w-full h-[8rem]">
      <CarouselContent className="-ml-1">{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
