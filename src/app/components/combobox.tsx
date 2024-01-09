"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { AllOpNames } from "@/lib/operators";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface comboboxProps {
  names: AllOpNames;
}

export function ComboboxDemo({ names }: comboboxProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? names.find((name) => name.id === value)?.name
            : "Select operator..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-1/2 p-0">
        <Command>
          <CommandInput placeholder="Search operator..." />
          <CommandEmpty>No operator found.</CommandEmpty>
          <CommandGroup>
            {names.map((name) => (
              <CommandItem
                key={name.id}
                value={name.id}
                onSelect={() => {
                  router.push(`/operators/${name.id.replace(/char_/, "")}`)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === name.id ? "opacity-100" : "opacity-0",
                  )}
                />
              <Link href={`/operators/${name.id.replace(/char_/, "")}`}>
                  {name.name}
              </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
