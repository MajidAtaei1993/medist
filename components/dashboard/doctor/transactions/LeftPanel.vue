<template>
    <section class="user-left-panel">
        <!-- user and notifs -->
        <div class="avatar-notifications">
            <div class="avatar">
                <v-img class="img" :src="user.avatar" />
                <div class="text">
                    <div class="name">{{ user.name }}</div>
                    <div class="expert">{{ user.expert }}</div>
                </div>
            </div>
            <div class="notifs">
                <v-btn small color="primary" class="btn ml-2" fab>
                    <v-icon color="white">mdi-chat</v-icon>
                    <div class="notification">{{ notifs }}</div>
                </v-btn>
                <v-menu offset-y content-class="white">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small elevation="2" color="primary" class="btn" fab v-on="on" v-bind="attrs" >
                            <v-icon color="white">mdi-bell</v-icon>
                            <div class="notification">{{ notifs }}</div>
                        </v-btn>
                    </template>
                    <v-list class="medist-notifs-scroll">
                        <v-list-item dense v-for="(item, i) in notifications" :key="i" class="pr-0 py-1" @click="openNotifs">
                            <v-list-item-icon class="primary rounded-pill ma-0" style="width: 40px !important; height: 40px !important">
                                <v-icon color="white" class="mx-auto">mdi-bell-ring-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="mr-4" style="width: 230px !important">
                                <v-list-item-title class="font-normal mb-1">{{ item.title }}</v-list-item-title>
                                <v-list-item-title class="font-normal mb-1">{{ item.title1 }}</v-list-item-title>
                                <v-list-item-subtitle class="font-small info--text">{{ item.date }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <!-- end user and notifs -->
        <!-- cards -->
        <div class="cards-transactions">
            <div class="card" v-for="(item, i) in couters" :key="i">
                <img :src="item.img" alt="" class="img">
                <div class="total">{{ item.count }}</div>
                <div class="subject">{{ item.title }}</div>
            </div>
        </div>
        <!-- end cards -->
        <!-- chart -->
        <div class="chart">
            <div class="head">
                <img src="/assets/icons/doctor/chart.png" alt="">
                <div class="text">نمودار پیشرفت درآمد این ماه</div>
            </div>
            <Chart />
        </div>
        <!-- end chart -->
    </section>
</template>

<script>
import Chart from './Chart.vue';
    export default {
        components:{ Chart },
        data(){
            return{
                notifs:'4',
                notifications:[
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                ],
                picker: null,
                clock: ['شنبه','یک شنبه','دو شنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه' ],
                days:[],
                day: 0,
                value:'',
                today: new Date().toDateString(),
                user:{
                    avatar:'/assets/images/avatar.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز و ریه'
                },
                couters:[
                    { img:'/assets/icons/doctor/tomorrow.png', count:'4.500.000', title:'درامد دیروز' },
                    { img:'/assets/icons/doctor/today.png', count:'12.300.000', title:'درامد امروز' },
                    { img:'/assets/icons/doctor/prev-month.png', count:'34.650.000', title:'درامد ماه گذشته' },
                    { img:'/assets/icons/doctor/month.png', count:'90.000.000', title:'درامد این ماه' }
                ],
                items:[
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                ],
                labels: [
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                ],
                value: [ 400, 250, 600, 500 ],
            }
        },
        mounted(){
            // this.$refs.calendar.checkChange()
            // let months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی ', 'بهمن', 'اسفند']
            // this.days = months
        },
        methods:{
            // let option = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}
            // getDay(){
            //     let option = { day: 'numeric'}
            //     let today = new Date().toLocaleDateString('fa-IR', option)
            //     return today;
            // },
            // getWeekday(){
            //     let option = { weekday: 'long'}
            //     let weekDay = new Date().toLocaleDateString('fa-IR', option)
            //     return weekDay;
            // },
            getMonth(){
                let option = { month: 'long'}
                let month = new Date().toLocaleDateString('fa-IR', option)
                return month;
            },
            prev(){
                this.$refs.calendar.prev()
            },
            next(){
                this.$refs.calendar.next()
            }
        }
    }
</script>