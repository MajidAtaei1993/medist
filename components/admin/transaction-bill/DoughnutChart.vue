<script>
import { Doughnut } from 'vue-chartjs'
    export default {
        extends: Doughnut,
        data(){
            return{
                chartdata:{
                    labels: [ 'نوبت های باز','نوبت های اخذ شده' ],
                    datasets: [
                        {
                            backgroundColor: [ '#5e73fb', '#805add' ],
                            data: [ this.getRandomInt(), this.getRandomInt() ]
                        },
                    ]
                },
                options:{
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted(){
            this.renderChart(this.chartdata, this.options)
            // Chart.defaults.global.defaultFontColor = '#835ADE';
            Chart.defaults.global.defaultFontFamily = 'iransans-medium';
            Chart.defaults.global.defaultFontSize = 10;
            Chart.defaults.global.defaultFontStyle = 'normal';
        },
        methods:{
            getRandomInt(){
                return Math.floor(Math.random()*(50-5+1))+5
            }
        }
    }
</script>