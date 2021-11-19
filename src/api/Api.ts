import axios, {AxiosInstance} from "axios";
import {FlightState} from "@/interface/FlightState"
import {WorkerState} from "@/interface/WorkerState"

export class Api {
    private client: AxiosInstance;

    constructor (uri: string)  {
        this.client  = axios.create({
            baseURL: uri
        })
    }

    getWorkers(): Promise<{ data: Array<WorkerState>; }> {
        return this.client.get(`api/workers/`);
    }

    getFlights(id: number): Promise<{ data: Array<FlightState>; }> {
        return this.client.get(`api/workers/` + id);
    }
}