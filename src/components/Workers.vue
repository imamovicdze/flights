<template>
  <div class="col-2 border border-dark">
    <div>
      <div>
        <h5 class="text-center p-4">
          Workers
        </h5>
      </div>
    </div>
    <div>
      <div class="text-left">
        <div class="clickable" v-for="worker in workers" :key="worker.id"
             :class="{ 'selected-worker': selectedWorker.id === worker.id }"
             @click="selectWorker(worker)">
          {{ worker.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {WorkerState} from "@/interface/WorkerState";
import {FlightState} from "@/interface/FlightState";

@Component
export default class Worker extends Vue {
  public polling: number | undefined

  created(): void {
    this.$store.dispatch("getWorkers").then((res) => {
      // after load workers, call flights API for first worker
      this.pollData(res[0].id)
    })
  }

  pollData(id: number): void {
    this.polling = setInterval(() => {
      this.$store.dispatch("getFlights", id).then((flights: Array<FlightState>) => {
        // iterates in array of updated flights data for worker looking for a new data for selected flight
        var updatedFlight = flights.find(f => f.num == this.selectedFlight.num)
        this.$store.commit('setSelectedFlight', updatedFlight)
      })
    }, 60 * 1000)
  }

  selectWorker(worker: WorkerState): void {
    // onclick clear previous interval
    clearInterval(this.polling)

    // call flights
    this.$store.dispatch("getFlights", worker.id).then((res) => {
      this.$store.commit('setSelectedFlight', res[0])
    })

    // set selected worker
    this.$store.commit('setSelectedWorker', worker)
    
    // call flights API every 60 seconds
    this.pollData(worker.id)
  }

  get workers(): Array<WorkerState> {
    return this.$store.getters.getWorkers
  }

  get selectedWorker(): WorkerState {
    return this.$store.getters.getSelectedWorker
  }

  get selectedFlight(): FlightState {
    return this.$store.getters.getSelectedFlight
  }
}
</script>

<style scoped>
.selected-worker {
  color: blue;
  text-decoration: underline;
}

.clickable {
  cursor: pointer;
}
</style>
