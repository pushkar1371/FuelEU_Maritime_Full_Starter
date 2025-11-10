export type Route = {
  id: string;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumptionTons: number;
  distanceKm: number;
  totalEmissionsTons: number;
  isBaseline?: boolean;
};

export type ComparisonRow = {
  id: string;
  ghgIntensity: number;
  percentDiff: number;
  compliant: boolean;
};
