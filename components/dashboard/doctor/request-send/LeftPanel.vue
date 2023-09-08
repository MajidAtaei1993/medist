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
                        <v-list-item dense v-for="(item, i) in notifications" :key="i" class="pr-0 py-1">
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
        <div class="head pr-6">
            <img src="/assets/icons/doctor/calendar-b.png" alt="" class="img">
            <div class="text">simple chat detail mode</div>
        </div>
        <div class="chat-detail">
            <div class="lists">
                <div class="list" v-for="(item, i) in lists" :key="i">
                    <v-checkbox dense hide-details :label="item.label" :input-value="i" class="checkbox" />
                    <div class="price">mablag: {{ item.price }}</div>
                    <div class="time">zaman: {{ item.time }}</div>
                </div>
            </div>
        </div>
        <div class="calendar">
            <div class="head">
                <img src="/assets/icons/doctor/calendar-b.png" alt="" class="img">
                <div class="text">نوبت ها بر اساس تقویم</div>
            </div>
            <v-calendar ref="calendar" lang="fa" locale="fa" class="medist-calendar" v-model="today" type="week"  />
            <div class="slider">
                <v-btn depressed fab class="slider-btn" @click="$refs.calendar.next()">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn depressed fab class="slider-btn" @click="$refs.calendar.prev()">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="all-turns">
            <div class="scroll">
                <div class="list" v-for="(doctor, i) in doctors" :key="i">
                    <div class="avatar">
                        <v-img class="img" :src="doctor.avatar" alt="" />
                    </div>
                    <div class="text">
                        <div class="name">{{ doctor.name }}</div>
                        <div class="expert">{{ doctor.expert }}</div>
                        <div class="call-type">{{ doctor.callType }}</div>
                    </div>
                    <div class="timer">
                        <div class="date">{{ doctor.date }}</div>
                        <div class="time">{{ doctor.clock }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards-all-turns">
            <v-col cols="12" sm="6" class="py-1 px-3"  v-for="(card, i) in cards" :key="i">
                <div class="card">
                    <img :src="card.img" class="img" alt="">
                    <div class="text">
                        <div class="count">{{ card.count }}</div>
                        <div class="text">{{ card.text }}</div>
                    </div>
                </div>
            </v-col>
        </div>
    </section>
</template>

<script>
    export default {
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
                today: new Date().toDateString(),
                value:'',
                user:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز و ریه'
                },
                lists:[
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                    {label:'chat', price:'300.000 Rial', time:'30 min' },
                    {label:'video', price:'300.000 Rial', time:'30 min' },
                    {label:'tell', price:'300.000 Rial', time:'30 min' },
                ],
                cards:[
                    { img:'/assets/icons/doctor/list_of_thumbnails.png', count:'108', text:'تعداد کل رزروها' },
                    { img:'/assets/icons/doctor/descending_sorting.png', count:'346', text:'تعداد کل ویزیت ها' },
                    { img:'/assets/icons/doctor/insert_credit_card.png', count:'12,300,000', text:'مبلغ پرداختی' },
                    { img:'/assets/icons/doctor/insert_credit_card.png', count:'12,300,000', text:'سهم شما' }
                ],
                doctors:[
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'/assets/images/avatar.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                ]
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