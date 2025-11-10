import type { Route } from '../domain/types';

export interface RouteRepo {
  getAll(): Promise<Route[]>;
  setBaseline(id: string): Promise<void>;
  getBaseline(): Promise<Route | undefined>;
}
