<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 600);

    this.gradient.addColorStop(0, "rgba(173, 38, 249)");
    this.gradient.addColorStop(0.5, "rgba(117, 39, 255, 1)");
    this.gradient.addColorStop(1, "rgba(117, 39, 255, 1)");
    Chart.defaults.global.defaultFontColor = '#835ADE';
    Chart.defaults.global.defaultFontFamily = 'iransans-medium';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontStyle = 'normal';
    
    this.renderChart(
      {
        labels: [ 'تخصص', 'تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص','تخصص', ],
        datasets: [
          {
            label: "نمودار پیشرفت ماهانه",
            // borderColor: "#f87979",
            pointBackgroundColor: "white",
            pointBorderColor: "#835ADE",
            borderWidth: 8,
            backgroundColor: this.gradient,
            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
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
