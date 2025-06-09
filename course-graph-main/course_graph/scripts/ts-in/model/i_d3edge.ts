import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import {D3Node} from "./i_d3node.js";

//source and targets are ids of nodes
export interface D3Edge extends SimulationLinkDatum<SimulationNodeDatum>{
    // source : D3Node; //required for d3.forcelink.id
    // target : D3Node;
    source : string; //required for d3.forcelink.id
    target : string;
}