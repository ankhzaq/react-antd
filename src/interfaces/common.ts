export interface BasicObject { [x: string]: any; }
export interface ActionReducer { type: string; payload: any; screen?: string; elements?: string[]; };
