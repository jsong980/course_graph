import { SimulationNodeDatum } from "d3";

export interface D3Node extends SimulationNodeDatum{
   id: string;             // required for d3.forceLink().id() 
   pos: number
}