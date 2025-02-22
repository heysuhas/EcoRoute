// Pre-defined city data with coordinates for accurate distance calculation
export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export const cities: City[] = [
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
  { name: "Boston", country: "USA", lat: 42.3601, lng: -71.0589 },
  { name: "Washington DC", country: "USA", lat: 38.9072, lng: -77.0369 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298 },
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Hyderabad", country: "India", lat: 17.3850, lng: 78.4867 },
  { name: "Hyderabad", country: "Pakistan", lat: 25.3960, lng: 68.3578 },
  // Add more cities as needed
];

export function searchCities(query: string): City[] {
  const lowercaseQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.country.toLowerCase().includes(lowercaseQuery)
  );
}

// Calculate distance using Haversine formula
export function calculateDistance(city1: City, city2: City): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(city2.lat - city1.lat);
  const dLon = toRad(city2.lng - city1.lng);
  const lat1 = toRad(city1.lat);
  const lat2 = toRad(city2.lat);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c); // Distance in km
}

function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
}
