"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { countryOptions, regionOptions, remoteOptions } from "../hiring/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const remoteLocations = remoteOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));
const regionLocations = regionOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));
const countryLocations = countryOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

export function JobFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(searchParams.get("location") || "");

  const onSelectLocation = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set("location", currentValue);
    replace(`${pathname}?${params.toString()}`);
  };

  // return (
  //   <Dialog open={open} onOpenChange={setOpen}>
  //     <DialogTrigger asChild>
  //       <Button variant="outline">More Filters</Button>
  //     </DialogTrigger>
  //     <DialogContent className="sm:max-w-[425px]">
  //       <DialogHeader>
  //         <DialogTitle>More Filters</DialogTitle>
  //       </DialogHeader>
  //       <div className="grid gap-4 py-4">
  //         <MultipleSelector
  //           onSearch={async (value) => {
  //             const res = await mockSearch(value);
  //             return res;
  //           }}
  //           defaultOptions={[]}
  //           creatable
  //           groupBy="group"
  //           placeholder="trying to search 'a' to get more options..."
  //           loadingIndicator={
  //             <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
  //               searching...
  //             </p>
  //           }
  //           emptyIndicator={
  //             <p className="w-full text-center text-lg leading-10 text-muted-foreground">
  //               no tags found.
  //             </p>
  //           }
  //         />
  //       </div>
  //       <Button
  //         className="w-full bg-green-500 hover:bg-green-600"
  //         onClick={() => setOpen(false)}
  //       >
  //         Apply
  //       </Button>
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? remoteLocations.find((location) => location.value === value)
                ?.label ||
              regionLocations.find((location) => location.value === value)
                ?.label ||
              countryLocations.find((location) => location.value === value)
                ?.label
            : "Select location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search country, region..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup heading="Remote">
              {remoteLocations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={onSelectLocation}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Regions">
              {regionLocations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={onSelectLocation}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Countries">
              {countryLocations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={onSelectLocation}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
