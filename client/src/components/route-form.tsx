import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { routeSchema, type Route, transportModes } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocationSearch, type Location } from "@/lib/locations";

interface RouteFormProps {
  onSubmit: (data: Route, fromLoc: Location, toLoc: Location) => void;
}

export function RouteForm({ onSubmit }: RouteFormProps) {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [selectedFromLoc, setSelectedFromLoc] = useState<Location | null>(null);
  const [selectedToLoc, setSelectedToLoc] = useState<Location | null>(null);

  const fromLocations = useLocationSearch(fromQuery);
  const toLocations = useLocationSearch(toQuery);

  const form = useForm<Route>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      mode: "car",
    },
  });

  const handleSubmit = (data: Route) => {
    if (!selectedFromLoc || !selectedToLoc) return;
    onSubmit(data, selectedFromLoc, selectedToLoc);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="startLocation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Location</FormLabel>
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {selectedFromLoc
                        ? selectedFromLoc.display_name
                        : "Search location..."}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search any location..."
                      onValueChange={(value) => {
                        setFromQuery(value);
                      }}
                    />
                    {fromLocations.isLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : fromLocations.data?.length === 0 ? (
                      <CommandEmpty>No locations found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {fromLocations.data?.map((loc) => (
                          <CommandItem
                            key={loc.display_name}
                            value={loc.display_name}
                            onSelect={() => {
                              setSelectedFromLoc(loc);
                              form.setValue("startLocation", loc.display_name);
                              setOpenFrom(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedFromLoc?.display_name === loc.display_name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {loc.display_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endLocation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Destination</FormLabel>
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {selectedToLoc
                        ? selectedToLoc.display_name
                        : "Search location..."}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search any location..."
                      onValueChange={(value) => {
                        setToQuery(value);
                      }}
                    />
                    {toLocations.isLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : toLocations.data?.length === 0 ? (
                      <CommandEmpty>No locations found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {toLocations.data?.map((loc) => (
                          <CommandItem
                            key={loc.display_name}
                            value={loc.display_name}
                            onSelect={() => {
                              setSelectedToLoc(loc);
                              form.setValue("endLocation", loc.display_name);
                              setOpenTo(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedToLoc?.display_name === loc.display_name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {loc.display_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!selectedFromLoc || !selectedToLoc}
        >
          Calculate Emissions
        </Button>
      </form>
    </Form>
  );
}