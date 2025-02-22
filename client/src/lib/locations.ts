import { useQuery } from "@tanstack/react-query";

export interface Location {
  display_name: string;
  lat: number;
  lon: number;
  type: string;
  importance: number;
}

// Search locations using our proxy to Nominatim API
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.length < 2) return [];

  const response = await fetch(
    `/api/locations/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  const data = await response.json();
  return data.map((item: any) => ({
    display_name: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
    type: item.type,
    importance: item.importance
  }));
}

// Calculate route distance using OSRM API
export async function calculateRouteDistance(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
  mode: string
): Promise<number> {
  // Convert transport mode to OSRM profile
  const profile = mode === 'bike' ? 'bike' : 
                 mode === 'car' ? 'car' : 
                 mode === 'train' ? 'car' : // Use car for train as OSRM doesn't have train
                 mode === 'bus' ? 'car' : // Use car for bus
                 'car'; // Default to car

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/${profile}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to calculate route');
  }

  const data = await response.json();

  if (!data.routes || !data.routes[0]) {
    throw new Error('No route found');
  }

  // Convert distance from meters to kilometers
  return Math.round(data.routes[0].distance / 1000);
}

// React Query hook for location search
export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: () => searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}