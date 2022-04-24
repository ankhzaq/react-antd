import { FiltersPanelHammurabi } from './screens/hammurabi';

export interface BasicObject { [x: string]: any; }
export interface ActionReducer { type: string; payload: any; screen?: string; elements?: string[]; };
export interface rootReducerInterface {
  common: {
    rules: {
      data: any[]
    },
  },
  hammurabi: {
    filtersPanel: {
      data: FiltersPanelHammurabi,
      date: number
    },
    grid: {
      loading: boolean;
      error: boolean;
      data?: {
        data: any[],
        pagination: any
      }
    }
  }
}
