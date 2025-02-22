import { z } from "zod";

export const transportModes = ["car", "train", "plane", "bus", "bike"] as const;

export type TransportMode = typeof transportModes[number];

export const routeSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  mode: z.enum(transportModes)
});

export type Route = z.infer<typeof routeSchema>;

export interface EmissionResult {
  mode: TransportMode;
  distance: number; // km
  emissions: number; // kg CO2
  savings?: number; // kg CO2 saved vs worst option
}

// Static emission factors (kg CO2 per km)
export const emissionFactors: Record<TransportMode, number> = {
  car: 0.12,
  train: 0.03,
  plane: 0.15,
  bus: 0.08,
  bike: 0
};
