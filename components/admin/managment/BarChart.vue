<script>
import { Bar } from 'vue-chartjs'
    export default {
        extends: Bar,
        data(){
            return{
                gradient: null,
                gradient1: null,
                gradient2: null,
                gradient3: null,
            }
        },
        // props:{
        //     width:{
        //         type:Number,
        //         default:100
        //     },
        //     StyleSheet:{
        //         type: Object,
        //         default: () => {
        //             borderRadius: 10
        //         }
        //     }
        // },
        mounted () {
            this.renderChart(this.chartdata, this.options)
                Chart.defaults.global.defaultFontColor = '#835ADE';
                Chart.defaults.global.defaultFontFamily = 'iransans-medium';
                Chart.defaults.global.defaultFontSize = 10;
                Chart.defaults.global.defaultFontStyle = 'normal';
                this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
                this.gradient1 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
                this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
                this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
            
                this.gradient.addColorStop(0, '#27FF27')
                // this.gradient.addColorStop(0.5, 'rgba(135, 18,220, 0.25)');
                this.gradient.addColorStop(1, '#00CB00');

                this.gradient1.addColorStop(0, '#278CFF')
                // this.gradient2.addColorStop(0.5, 'rgba(135, 18,220, 0.25)');
                this.gradient1.addColorStop(1, '#0058CB');

                this.gradient2.addColorStop(0, '#B127FF')
                // this.gradient.addColorStop(0.5, 'rgba(135, 18,220, 0.25)');
                this.gradient2.addColorStop(1, '#6600CB');

                this.gradient3.addColorStop(0, '#FFA927')
                // this.gradient2.addColorStop(0.5, 'rgba(135, 18,220, 0.25)');
                this.gradient3.addColorStop(1, '#CB9C00');
        
        
                this.renderChart({
                    // labels = Utils.months({count: 7}),
                    labels: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
                    // labels: this.labels,
                    datasets: [
                        {
                            label:'مطب',
                            // borderColor: '#FC2525',
                            // pointBackgroundColor: 'rgba(104, 2, 202, 1)',
                            // pointBorderColor: 'rgba(104, 2, 202, 1)',
                            // borderWidth: 0,
                            // borderSkipped: true,
                            borderRadius: 10,
                            backgroundColor: this.gradient,
                            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
                        },
                        {
                            label:'چت',
                            backgroundColor: this.gradient1,
                            borderRadius: 10,
                            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
                        },
                        {
                            label:'چت صوتی و تلفنی',
                            backgroundColor: this.gradient2,
                            borderRadius: 10,
                            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
                        },
                        {
                            label:'چت تصویری',
                            backgroundColor: this.gradient3,
                            borderRadius: 10,
                            data: [ this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
                        },
                    ]
                }, 
                {responsive: true, maintainAspectRatio: false})
        },
        methods:{
            getRandomInt(){
                return Math.floor(Math.random()*(50-5+1))+5
            }
        },
        props: {
            chartId: {
            type: String,
            default: 'bar-chart'
            },
            width:{
                type:Number,
                default:100
            },
            StyleSheet:{
                type: Object,
                default: () => {
                    borderRadius: 10
                }
            }
        },
        setup(props) {
            // const chartData = {
            // labels: [ 'January', 'February', 'March' ],
            // datasets: [ { data: [40, 20, 12] } ]
            // }

            // const chartOptions = { responsive: true }

            return () =>
            h(Bar, {
                // chartData,
                // chartOptions,
                // chartId: props.chartId,
                width: props.width,
                // height: props.height,
                // cssClasses: props.cssClasses,
                styles: props.styles,
                // plugins: props.plugins
            })
        }
    }
</script>