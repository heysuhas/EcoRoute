import { type EmissionResult } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Train, Car, Plane, Bus, Bike } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const modeIcons = {
  train: Train,
  car: Car,
  plane: Plane,
  bus: Bus,
  bike: Bike,
};

interface EmissionsComparisonProps {
  results: EmissionResult[];
}

export function EmissionsComparison({ results }: EmissionsComparisonProps) {
  const maxEmissions = Math.max(...results.map((r) => r.emissions));

  // Transform data for the chart
  const chartData = results.map((result) => ({
    name: result.mode.charAt(0).toUpperCase() + result.mode.slice(1),
    emissions: result.emissions,
    savings: result.savings || 0,
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Emissions Comparison</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ 
                value: "CO₂ Emissions (kg)", 
                angle: -90, 
                position: "insideLeft" 
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border rounded p-2">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm">{data.emissions} kg CO₂</p>
                      {data.savings > 0 && (
                        <p className="text-sm text-green-500">
                          Save {data.savings} kg CO₂
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="emissions"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          const Icon = modeIcons[result.mode];
          const percentage = (result.emissions / maxEmissions) * 100;

          return (
            <Card key={result.mode} className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <Icon className="h-6 w-6" />
                <div className="flex-1">
                  <h3 className="font-semibold capitalize">{result.mode}</h3>
                  <div className="text-sm text-muted-foreground">
                    {result.distance}km • {result.emissions}kg CO₂
                  </div>
                </div>
                {result.savings && result.savings > 0 && (
                  <div className="text-green-500 text-sm font-medium">
                    Save {result.savings}kg CO₂
                  </div>
                )}
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}