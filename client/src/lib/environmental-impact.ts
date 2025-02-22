import { type EmissionResult } from "@shared/schema";

// Environmental impact conversion factors
const IMPACT_FACTORS = {
  // One tree absorbs about 22kg CO2 per year
  treesPerYear: (co2Saved: number) => Math.round((co2Saved * 10) / 22) / 10,
  
  // Average car emits 4.6 metric tons of CO2 per year = 4600kg
  carDaysOffset: (co2Saved: number) => Math.round((co2Saved / 4600) * 365),
  
  // Average household emits 5.9 metric tons of CO2 for electricity per year = 5900kg
  householdEnergyDays: (co2Saved: number) => Math.round((co2Saved / 5900) * 365)
};

export interface EnvironmentalImpact {
  treesSaved: number;
  carDaysReduced: number;
  householdDays: number;
  totalEmissionsSaved: number;
}

export function calculateEnvironmentalImpact(result: EmissionResult): EnvironmentalImpact {
  const co2Saved = result.savings || 0;
  
  return {
    treesSaved: IMPACT_FACTORS.treesPerYear(co2Saved),
    carDaysReduced: IMPACT_FACTORS.carDaysOffset(co2Saved),
    householdDays: IMPACT_FACTORS.householdEnergyDays(co2Saved),
    totalEmissionsSaved: co2Saved
  };
}
