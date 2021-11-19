<template>
  <div class="home pt-5">
    <div class="container">
      <div class="row border border-dark">
        <workers/>
        <flights/>
        <flight-details/>
      </div>
    </div>
  </div>
</template>

<script>
import Workers from '@/components/Workers.vue'
import Flights from '@/components/Flights.vue'
import FlightDetails from '@/components/FlightDetails.vue'

export default {
  name: 'Home',
  components: {
    Workers,
    Flights,
    FlightDetails
  }
}
</script>

<style>
.table tr {
  cursor: pointer;
}
</style>
