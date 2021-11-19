<template>
  <div class="col-7 border border-dark">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Flight Number</th>
        <th scope="col">Origin</th>
        <th scope="col">Origin Date</th>
        <th scope="col">Destination</th>
        <th scope="col">Destination Date</th>
      </tr>
      </thead>
      <tbody>
      <tr class="pointer-event" v-for="flight in flights" :key="flight.num"
          :class="{ 'bg-light': selectedFlight.num === flight.num }"
          @click="selectFlight(flight)">
        <td>{{ flight.num }}</td>
        <td>{{ flight.from }}</td>
        <td>{{ flight.from_date }}</td>
        <td>{{ flight.to }}</td>
        <td>{{ flight.to_date }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {FlightState} from "@/interface/FlightState";

@Component
export default class Flight extends Vue {
  
  selectFlight(flight: FlightState): void {
    this.$store.commit('setSelectedFlight', flight)
  }

  get flights(): Array<FlightState> {
    return this.$store.getters.getFlights
  }

  get selectedFlight(): FlightState {
    return this.$store.getters.getSelectedFlight
  }
}
</script>

<style scoped>
</style>
