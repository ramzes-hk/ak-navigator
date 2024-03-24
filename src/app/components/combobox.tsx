"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { OpName } from "@/lib/operators_types";
import { useRouter } from "next/navigation";

interface comboboxProps {
  names: OpName[];
  itemName?: string;
}

export function ComboboxDemo({ names, itemName = "operator" }: comboboxProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Select {itemName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 overflow-auto max-h-[500px]">
        <Command>
          <CommandInput placeholder={`Search ${itemName}...`} />
          <CommandEmpty>No {itemName} found.</CommandEmpty>
          <CommandGroup>
            {names.map((name) => (
              <CommandItem
                key={name.id}
                value={name.name}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/operators/${name.id}`);
                }}
              >
                {name.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
