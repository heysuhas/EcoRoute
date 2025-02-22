import { useState } from "react";
import { type Route, type EmissionResult, transportModes } from "@shared/schema";
import { type Location } from "@/lib/locations";
import { RouteForm } from "@/components/route-form";
import { EmissionsComparison } from "@/components/emissions-comparison";
import { EcoTips } from "@/components/eco-tips";
import { ShareResult } from "@/components/share-result";
import { calculateEmissions, getBestOption } from "@/lib/emissions";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { EnvironmentalImpact } from "@/components/environmental-impact";

export default function Home() {
  const [results, setResults] = useState<EmissionResult[]>();
  const [bestOption, setBestOption] = useState<EmissionResult>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Route, fromLoc: Location, toLoc: Location) => {
    try {
      setLoading(true);
      const calculatedResults = await calculateEmissions(
        fromLoc,
        toLoc,
        transportModes
      );
      setResults(calculatedResults);
      setBestOption(getBestOption(calculatedResults));
    } catch (error) {
      console.error('Failed to calculate emissions:', error);
      // You could add a toast notification here for errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">EcoRoute</h1>
          <p className="mt-2 text-muted-foreground">
            Calculate and compare the carbon footprint of your travel options
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <RouteForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Calculating routes and emissions...</span>
          </div>
        )}

        {results && !loading && (
          <div className="space-y-8">
            <EmissionsComparison results={results} />

            {bestOption && bestOption.savings && (
              <>
                <EnvironmentalImpact result={bestOption} />
                <ShareResult savings={bestOption.savings} />
              </>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4">Eco-Friendly Tips</h2>
              <EcoTips />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}