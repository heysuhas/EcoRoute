
# EcoRoute - Carbon Emission Calculator

A web application that helps users calculate and compare carbon emissions for different modes of transportation between two locations.

## Features

- Search locations using OpenStreetMap's Nominatim API
- Calculate carbon emissions for different transport modes:
  - Car
  - Train
  - Plane
  - Bus
  - Bike
- Compare emissions between different transport options
- Real-time distance and emission calculations
- Interactive UI built with React and Shadcn/UI

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Express.js, Node.js
- **API Integration**: OpenStreetMap Nominatim
- **Development**: Vite, TSX

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/heysuhas/EcoRoute.git
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser and navigate to the provided URL
```bash
http://localhost:5000
```

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express.js backend
├── shared/          # Shared types and schemas
└── public/          # Static assets
```

## API Endpoints

- `GET /api/locations/search` - Search locations using Nominatim API


## License

MIT

