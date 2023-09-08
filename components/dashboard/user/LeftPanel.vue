<template>
    <section class="user-left-panel">
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
                            <v-list-item-icon class="primary rounded-pill mt-0" style="width: 40px !important; height: 40px !important">
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
        <div class="calendar">
            <div class="icon-text">
                <img width="20" height="20" src="/assets/icons/patient/list-checked.png" alt="" class="ml-2">
                نوبت های اخذ شده
            </div>
            <v-card class="card" flat>
                <v-date-picker no-title full-width locale="fa" lang="fa" color="primary" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right" v-model="today" />
                <div class="calendar-details">
                    <div class="avatar">
                        <v-img class="img" :src="user.avatar" />
                    </div>
                    <div class="text">
                        <div class="name">{{ doctor.name }}</div>
                        <div class="expert">{{ doctor.expert }}</div>
                        <div class="call-type">{{ doctor.callType }}</div>
                    </div>
                    <div class="timer">
                        <img src="/assets/icons/patient/alarm.png" alt="">
                        <div class="time">{{ doctor.clock }}</div>
                    </div>
                </div>
            </v-card>
        </div>
        <div class="list-turns">
            <div class="icon-text">
                <img width="20" height="20" src="/assets/icons/patient/list-checked.png" alt="" class="ml-2">
                نمایش لیستی نوبت ها
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
                clock: ['شنبه','یک شنبه','دو شنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه' ],
                days:[],
                day: 0,
                today:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                user:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز و ریه'
                },
                doctor:{
                    name: 'دکتر سعید قادری',
                    expert:'فوق تخصص اعصاب و گوارش',
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    callType:'تماس تصویری',
                    clock: '17:00'
                },
                couters:[
                    { icon:'mdi-calendar-month', count:'25', title:'نوبت های امروز' },
                    { icon:'mdi-face-mask', count:'18', title:'تعداد بیماران امروز' }
                ],
                doctors:[
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', name:'دکتر سعید قادری اصل', expert:'فوق تخصص اعصاب و گوارش', callType:'تماس تصویری', clock:'17:00', date:'2022-03-30' },
                ]
            }
        },
        mounted(){
            // this.$refs.calendar.checkChange()
            // let months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی ', 'بهمن', 'اسفند']
            // this.days = months
        },
        methods:{
            openNotifs(){},
            // let option = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}
            getDay(){
                let option = { day: 'numeric'}
                let today = new Date().toLocaleDateString('fa-IR', option)
                return today;
            },
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
        }
    }
</script>