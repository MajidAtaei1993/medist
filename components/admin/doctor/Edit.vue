<template>
    <!-- doctor Profile -->
    <div class="medist-admin-expert-define">
        <!-- left panel -->
        <div class="left py-4">
            <div class="top-content">
                <img :src="avatar" alt="" class="avatar">
                <div class="text">
                    <div class="name">{{ doctor.name }}</div>
                    <div class="expert">{{ doctor.major }}</div>
                </div>
            </div>
            <div class="calendar-content">
                <div class="head">
                    <img src="/assets/icons/doctor/calendar-b.png" alt="">
                    <div class="text">نوبت ها بر اساس تقویم</div>
                </div>
                <v-calendar ref="calendar" lang="fa" locale="fa" class="medist-calendar" v-model="today" type="week"  />
                <div class="sliders">
                    <v-btn small fab class="btn" @click="$refs.calendar.next()">
                        <v-icon color="#474747">mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-btn small fab class="btn" @click="$refs.calendar.prev()">
                        <v-icon color="#474747">mdi-chevron-left</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="turns-content">
                <div class="turns">
                    <div class="turn" v-for="(task, i) in tasks" :key="i">
                        <img :src="task.avatar" alt="" class="avatar">
                        <div class="text">
                            <div class="name-date">
                                <div class="name">{{ task.title }}</div>
                                <div class="date">{{ today }}</div>
                            </div>
                            <div class="type-time">
                                <div class="type">{{ task.subtitle}}</div>
                                <div class="time">{{ time }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <v-row class="ma-0">
                    <v-col cols="12" lg="6" v-for="(card, i) in cards" :key="i">
                        <div class="card">
                            <img :src="card.icon" alt="">
                            <div class="count">{{ card.counter }}</div>
                            <div class="price">{{ card.price }}</div>
                            <div class="subject">{{ card.subject }}</div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
        <!-- right panel -->
        <div class="right">
            <v-btn depressed class="back-to-all-btn" :to="{ name: 'admin-doctor-list' }">
                <img src="/assets/icons/admin/medical_doctor.png" alt="">
                بازگشت به صفحه تمام پزشکان
            </v-btn>
            <div class="radio-content">
                <div class="head">جامعه هدف کد تخفیف را انتخاب کنید</div>
                <v-radio-group row v-model="visit" class="radio-group">
                    <v-row class="ma-0" justify="space-between" align="center">
                        <v-col cols="12" lg="auto" v-for="(type, i) in visits" :key="i" class="d-flex align-center">
                            <v-radio :value="i" class="mr-n1" />
                            <v-icon :color="type.value == visit ? 'primary' : ''" class="ml-4 mr-2">{{ type.icon }}</v-icon>
                            <label :class="type.value == visit ? 'label primary--text' : 'label' ">{{ type.label }}</label>
                        </v-col>
                    </v-row>
                </v-radio-group>
            </div>
            <div class="date-time-content">
                <div class="head">تاریخ زمان نوبت را انتخاب کنید</div>
                <div class="date-time">
                    <div class="left">
                        <div class="data-table-without-expand pa-0">
                            <!-- windows mode -->
                            <div class="windows-mode">
                                <div class="thead">
                                    <div class="th" v-for="(th, i) in header2" :key="i">
                                        <img :src="th.icon" alt="" class="img">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                </div>
                                <div class="tbody">
                                    <div class="tr" v-for="(tr, i) in body2" :key="i">
                                        <div class="td">
                                            <v-checkbox dense hide-details="" :value="i" class="mb-3" />
                                            {{ tr.dateTime }}
                                        </div>
                                        <div class="td">
                                            <div :class="tr.status ? 'text secondary--text' : 'text error--text'">{{ tr.status ? 'باز' : 'رزور' }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end windows mode -->
                            <!-- tablet mode -->
                            <div class="tablet-mode">
                                <div class="body">
                                    <div class="content" v-for="(tr, i) in body2.slice(0, 8)" :key="i">
                                        <v-checkbox dense hide-details="" :value="i" />
                                        <div class="tr">
                                            <div class="item" v-for="(item, i) in header2.slice(0, 1)" :key="i">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="item primary--text text-decoration-underline">{{ tr.dateTime }}</div>
                                            <div class="item secondary--text">{{ tr.status }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end tablet mode -->
                        </div>
                    </div>
                    <div class="right">
                        <v-date-picker color="primary" @click:date="pickDate" full-width no-title locale="fa" lang="fa" />
                    </div>
                </div>
            </div>
            <div class="actions">
                <v-btn class="confirm-btn" @click="value = 1" depressed>ویرایش نوبت</v-btn>
            </div>
        </div>
    </div>
    <!-- end doctor Profile -->
</template>

<script>
    export default {
        data(){
            return{
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                today: new Date().toLocaleDateString('fa-IR'),
                time: new Date().toLocaleTimeString('fa-IR'),
                step: 1,
                doctor:{
                    name:'سعید قادری',
                    major: 'فوق تخصص مغز و اعصاب'
                },
                user:{
                    avatar:'/assets/images/avatar.png',
                    name:'مجید',
                    family:'عطائی',
                    password:'12345678',
                    email:'majid.ataie@gmail.com',
                    gender:'مرد',
                    townHall:'اردبیل',
                    cardId:'IR1...16',
                    Id:'12345678',
                    expret:'مغز',
                    upperExpert:'مغز و اعصاب',
                    elFile:'دارد',
                },
                cards:[
                    { icon:'/assets/icons/admin/masl-list.png', counter:'108', subject:'تعداد کل رزروها', class:'' },
                    { icon:'/assets/icons/admin/mask-task.png', price:'12.300.000', subject:'مبلغ پرداختی', class:'secondary--text' },
                    { icon:'/assets/icons/admin/mask-internet.png', counter:'346', subject:'تعداد کل ویزیت ها', class:'' },
                    { icon:'/assets/icons/admin/mask-sort.png', price:'5.000.000', subject:'سهم سایت', class:'secondary--text' },
                ],
                tasks:[
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                ],
                header2:[
                    { text:'زمان نوبت', value:'dateTime',iconTablet:'/assets/icons/admin/table/timer-b (2).png', icon:'/assets/icons/admin/table/timer-w.png', align:'right' },
                    { text:'وضعیت نویت', value:'status', icon:'/assets/icons/admin/table/visitType-w.png', align:'center' },
                ],
                body2:[
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                    { dateTime:'17:30 - 17:00', status: true},
                    { dateTime:'17:30 - 17:00', status: false},
                ],
                visits:[
                    { value:0, icon:'mdi-wechat', label:'چت' },
                    { value:1, icon:'mdi-microphone-outline', label:'صوتی' },
                    { value:2, icon:'mdi-phone-in-talk-outline', label:'تلفنی' },
                    { value:3, icon:'mdi-message-video', label:'تصویری' },
                ],
            }
        },
        mounted(){
            this.tab = 0
        },
    }
</script>

<style lang="scss" scoped>

</style>