import RangeGrid from "./range";
import Traits from "./traits";
import Talents from "./talents";
import SkillTables from "./skills";
import Modules from "./modules";
import Potentials from "./potentials";
import Tags from "./tags";
import BaseSkills from "./base_skill";
import Stats from "./stats";
import { buttonVariants } from "@/components/button";
import { getOpData } from "@/lib/operators";
import { getModules } from "@/lib/modules_data";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { getPortraitId } from "@/lib/skin_table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

interface operatorProps {
  id: string;
}

async function Operator({ id }: operatorProps) {
  const opData = await getOpData("char_" + id);
  const modules = await getModules(id);
  const skins = await getPortraitId(id);

  const isSingleTrait =
    !opData.trait || (opData.trait && opData.trait.candidates.length === 1);
  return (
    <div className="container flex flex-col flex-initial gap-6">
      <div className="flex flex-row space-x-4 py-4">
        <h1 className="text-2xl">
          {opData.name} - {convertRarity(opData.rarity)}
        </h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`${id}/profile`}
          prefetch={false}
        >
          Profile
        </Link>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`${id}/voice`}
          prefetch={false}
        >
          Voice Lines
        </Link>
      </div>
      <Carousel className="w-1/2 border rounded-lg">
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
                    alt={skin.displaySkin.skinName ?? id}
                    src={`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/${encodeURIComponent(
                      skin.portraitId,
                    )}.png`}
                  />
                </CardContent>
                <CardFooter>
                  Artist: {skin.displaySkin.drawerList.join(" ")}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div>
        <RangeGrid phases={opData.phases} />
      </div>
      <Traits
        input={opData.description}
        traits={opData.trait}
        isSingleTrait={isSingleTrait}
      />
      <Tags position={opData.position} tagList={opData.tagList} />
      <Stats phases={opData.phases} favorKeyFrames={opData.favorKeyFrames} />
      {opData.talents && <Talents talents={opData.talents} />}
      {opData.potentialRanks && (
        <Potentials potentitalRanks={opData.potentialRanks} />
      )}
      <BaseSkills charId={"char_" + id} />
      <SkillTables skills={opData.skills} />
      {modules &&
        modules.map((module, i) => (
          <Modules
            key={`mod-${i}`}
            phases={module.phases}
            equipDict={module.equipDict}
            missions={module.missions}
          />
        ))}
    </div>
  );
}

export default Operator;
