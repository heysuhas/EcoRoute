import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trees, Car, Home, Leaf } from "lucide-react";
import { calculateEnvironmentalImpact } from "@/lib/environmental-impact";
import { type EmissionResult } from "@shared/schema";

interface EnvironmentalImpactProps {
  result: EmissionResult;
}

export function EnvironmentalImpact({ result }: EnvironmentalImpactProps) {
  const impact = calculateEnvironmentalImpact(result);

  const metrics = [
    {
      title: "Trees Growing for a Year",
      value: impact.treesSaved,
      icon: Trees,
      description: "Equivalent to trees absorbing CO₂"
    },
    {
      title: "Car-Free Days",
      value: impact.carDaysReduced,
      icon: Car,
      description: "Days of car usage avoided"
    },
    {
      title: "Household Energy Days",
      value: impact.householdDays,
      icon: Home,
      description: "Days of household electricity saved"
    },
    {
      title: "Total CO₂ Saved",
      value: `${impact.totalEmissionsSaved}kg`,
      icon: Leaf,
      description: "Direct carbon emissions reduced"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Environmental Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <metric.icon className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}