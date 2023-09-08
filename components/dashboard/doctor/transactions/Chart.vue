<template>
  <div class="mx-auto">
    <line-chart :data="chartData" :options="options" :height="200" class="medist-chart" />
  </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    LineChart
  }
}
</script>