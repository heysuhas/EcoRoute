import { TransportMode, emissionFactors, type EmissionResult } from "@shared/schema";
import { calculateRouteDistance, type Location } from "./locations";

export async function calculateEmissions(
  fromLoc: Location,
  toLoc: Location,
  modes: TransportMode[]
): Promise<EmissionResult[]> {
  // Calculate distances for each mode
  const results = await Promise.all(
    modes.map(async (mode) => {
      const distance = await calculateRouteDistance(
        { lat: fromLoc.lat, lon: fromLoc.lon },
        { lat: toLoc.lat, lon: toLoc.lon },
        mode
      );

      return {
        mode,
        distance,
        emissions: Math.round(distance * emissionFactors[mode] * 100) / 100
      };
    })
  );

  // Calculate savings compared to highest emission option
  const maxEmissions = Math.max(...results.map(r => r.emissions));

  return results.map(result => ({
    ...result,
    savings: Math.round((maxEmissions - result.emissions) * 100) / 100
  }));
}

export function getBestOption(results: EmissionResult[]): EmissionResult {
  return results.reduce((best, current) => 
    current.emissions < best.emissions ? current : best
  );
}