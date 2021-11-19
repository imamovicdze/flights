<template>
  <div class="col-3 border border-dark">
    <table class="table">
      <thead>
      <tr>
        <th>Plane Number</th>
        <td>{{ flight.plane }}</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">Duration</th>
        <td>{{ flight.duration | formatDuration}}</td>
      </tr>
      <tr>
        <th scope="row">Origin gate</th>
        <td>{{ flight.from_gate }}</td>
      </tr>
      <tr>
        <th scope="row">Destination gate</th>
        <td>{{ flight.to_gate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {FlightState} from "@/interface/FlightState";

@Component({
  filters: {
    formatDuration: function (value: string) {
      if (!value) return ''
      const hours = Math.floor(parseInt(value) / 60)
      const minutes = parseInt(value) % 60
      const days = Math.floor(hours / 24)
      const daysHours = days > 0 ? `${days}d ${hours % 24}h` :  `${hours > 0 ? `${hours}h` : ''}`
      return `${daysHours}  ${minutes > 0 ? `${minutes}m` : ``}`
    }
  }
})
export default class FlightDetails extends Vue {
  get flight(): FlightState {
    return this.$store.getters.getSelectedFlight
  }
}
</script>

<style scoped>
</style>
