"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { CharSkin } from "@/lib/skin_table";

interface skinCarouselProps {
  skins: CharSkin[];
  name: string;
}

function SkinCarousel({ skins, name }: skinCarouselProps) {
  return (
    <Carousel className="md:w-1/2 border rounded-lg p-1">
      <CarouselContent>
        {skins.map((skin) => (
          <CarouselItem key={skin.portraitId}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {skin.displaySkin.skinName ??
                    "E" + skin.displaySkin.skinGroupId.replace(/ILLUST_/, "")}
                </CardTitle>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                      {skin.displaySkin.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardHeader>
              <CardContent>
                <Image
                  width={600}
                  height={600}
                  alt={skin.displaySkin.skinName ?? name}
                  src={`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/${encodeURIComponent(
                    skin.portraitId,
                  )}.png`}
                />
              </CardContent>
              <CardFooter>
                {skin.displaySkin.drawerList &&
                  `Artist: ${skin.displaySkin.drawerList.join(" ")}`}
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default SkinCarousel;
