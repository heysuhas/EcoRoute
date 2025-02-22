import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Battery, Route } from "lucide-react";

const tips = [
  {
    title: "Travel Off-Peak",
    description: "Choose off-peak travel times to reduce congestion and emissions",
    icon: Route,
  },
  {
    title: "Share Your Ride",
    description: "Carpooling can significantly reduce per-person emissions",
    icon: Users,
  },
  {
    title: "Consider Electric",
    description: "Electric vehicles produce zero direct emissions",
    icon: Battery,
  },
  {
    title: "Combine Trips",
    description: "Plan multiple stops in one journey to minimize travel",
    icon: Leaf,
  },
];

export function EcoTips() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tips.map((tip, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <tip.icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">{tip.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
