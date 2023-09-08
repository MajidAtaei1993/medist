<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 600);

    this.gradient.addColorStop(0, "rgba(131, 90, 222)");
    this.gradient.addColorStop(0.5, "rgba(131, 90, 222, .2)");
    this.gradient.addColorStop(1, "rgba(131, 90, 222, .5)");
    Chart.defaults.global.defaultFontColor = '#835ADE';
    Chart.defaults.global.defaultFontFamily = 'iransans-medium';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontStyle = 'normal';
    
    this.renderChart(
      {
        labels: [ '1400/10/30', '1400/10/15', '1400/09/30', '1400/09/15', '1400/11/15', '1400/11/30' ],
        datasets: [
          {
            label: "نمودار پیشرفت ماهانه",
            // borderColor: "#f87979",
            pointBackgroundColor: "white",
            pointBorderColor: "#835ADE",
            borderWidth: 8,
            backgroundColor: this.gradient,
            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false },
    );
  },
  methods:{
      getRandomInt(){
          return Math.floor(Math.random()*(1200-5+1))+5
      }
  }
};
</script>
