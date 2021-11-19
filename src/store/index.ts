import Vue from 'vue'
import Vuex from 'vuex'
import {AxiosError} from "axios";
import {Api} from '@/api/Api'
import {FlightState} from "@/interface/FlightState"
import {WorkerState} from "@/interface/WorkerState"

Vue.use(Vuex)
const client = new Api("https://interview-mock.herokuapp.com/")

export default new Vuex.Store({
    state: {
        workers: [],
        flights: [],

        selectedWorker: {},
        selectedFlight: {}
    },
    getters: {
        getWorkers: (state) => state.workers,
        getFlights: (state) => state.flights,

        getSelectedFlight: (state) => state.selectedFlight,
        getSelectedWorker: (state) => state.selectedWorker
    },
    mutations: {
        setWorkers(state, payload) {
            state.workers = payload;
        },
        setFlights(state, payload) {
            state.flights = payload
        },
        setSelectedWorker(state, payload) {
            state.selectedWorker = payload
        },
        setSelectedFlight(state, payload) {
            state.selectedFlight = payload
        }
    },
    actions: {
        getWorkers({commit, dispatch}) {
            return new Promise((resolve) => {
                return client.getWorkers()
                    .then((res: { data: Array<WorkerState>; }) => {
                        commit('setWorkers', res.data)
                        commit('setSelectedWorker', res.data[0])

                        dispatch("getFlights", res.data[0].id).then((flights) => {
                            commit("setSelectedFlight", flights[0])
                        });
                        resolve(res.data)
                    })
                    .catch((error: AxiosError) => {
                        console.log(error)
                    })
            });
        },
        getFlights({commit}, id) {
            return new Promise((resolve) => {
                return client.getFlights(id)
                    .then((res: { data: Array<FlightState>; }) => {
                        commit('setFlights', res.data)
                        resolve(res.data)        
                    })
                    .catch((error: AxiosError) => {
                        console.log(error)
                    })
            });
        },
    }
})
