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
            <div class="tabs">
                <v-btn @click="tab = 0" :class="tab == 0 ? 'active-tab' : 'tab'" class="ml-3" depressed>
                    <img :src="tab == 0 ? '/assets/icons/doctor/account-card.png' : '/assets/icons/doctor/account-card-c.png'" alt="">
                    اطلاعات شخصی
                </v-btn>
                <v-btn @click="tab = 1" :class="tab == 1 ? 'active-tab' : 'tab'" depressed>
                    <img :src="tab == 1 ? '/assets/icons/doctor/dna.png' : '/assets/icons/doctor/dna-c.png'" alt="">
                    اطلاعات تخصصی
                </v-btn>
            </div>
            <v-tabs-items v-model="tab" class="transparent">
                <!-- doctor info -->
                <v-tab-item class="tab-item">
                    <div class="user-avatar mt-n12">
                        <img :src="user.avatar" alt="" class="avatar">
                        <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed" placeholder="عکس پروفایل">
                            <template v-slot:prepend-inner>
                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                            </template>
                        </v-text-field>
                    </div>
                    <div class="doctor-form">
                        <v-row class="ma-0">
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/account.png" alt="">
                                    <div class="text">نام</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/account.png" alt="">
                                    <div class="text">نام خانوادگی</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/lock.png" alt="">
                                    <div class="text">رمز</div>
                                    <div class="password-text">تغییر رمز</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/email.png" alt="">
                                    <div class="text">
                                        ایمیل
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/cell_phone-b.png" alt="">
                                    <div class="text">
                                        mobile
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/gender.png" alt="">
                                    <div class="text">جنسیت</div>
                                    <v-select :items="gender" hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-list dense>
                                                <v-list-item>
                                                    <v-list-item-icon>
                                                        <v-checkbox dense hide-details :input-value="item.value" :label="item.text" />
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/town-hall.png" alt="">
                                    <div class="text">شهر</div>
                                    <v-select :items="townHall" hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-list dense>
                                                <v-list-item>
                                                    <v-list-item-icon>
                                                        <v-checkbox dense hide-details :input-value="item.value" :label="item.text" />
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/shaba.png" alt="">
                                    <div class="text">شماره شبا</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
                <!-- expert info -->
                <v-tab-item class="tab-item">
                    <div class="define-steeps">
                        <div :class="step == 1 ? 'step-active' : 'step'">{{ step == 1 ? 'صفحه 1' : '1' }}</div>
                        <div :class="step == 2 ? 'step-active' : 'step'">{{ step == 2 ? 'صفحه 2' : '2' }}</div>
                        <div :class="step == 3 ? 'step-active' : 'step'">{{ step == 3 ? 'صفحه 3' : '3' }}</div>
                    </div>
                    <div v-if="step == 1">
                        <div class="doctor-form">
                            <v-row class="ma-0">
                                <v-col cols="12" lg="6">
                                    <div class="column">
                                        <img src="/assets/icons/doctor/barcode.png" alt="">
                                        <div class="text">شماره نظام پزشکی</div>
                                        <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                            <template v-slot:prepend-inner>
                                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <div class="column">
                                        <img src="/assets/icons/doctor/lab-coat.png" alt="">
                                        <div class="text">تخصص</div>
                                        <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                            <template v-slot:prepend-inner>
                                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-col>
                                <!-- <v-col cols="12" lg="6">
                                    <div class="column">
                                        <img src="/assets/icons/doctor/lab-coat.png" alt="">
                                        <div class="text">فوق تخصص</div>
                                        <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                            <template v-slot:prepend-inner>
                                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-col> -->
                                <v-col cols="12" lg="6">
                                    <div class="column">
                                        <img src="/assets/icons/doctor/graduation.png" alt="">
                                        <div class="text">
                                            مدرک تحصیلی
                                            <div class="status">
                                                وضعیت
                                                <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                                <div class="btn" @click="step = 3">مدیریت مدارک بارگذاری شده</div>
                                            </div>
                                        </div>
                                        <v-file-input solo flat background-color="white" class="input un-confirmed" prepend-icon="" hide-details="">
                                            <template v-slot:prepend-inner>
                                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                            </template>
                                            <template v-slot:hint>
                                            </template>
                                        </v-file-input>
                                    </div>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <div class="column">
                                        <img src="/assets/icons/doctor/receipt.png" alt="">
                                        <div class="text">نسخه الکترونیک</div>
                                        <v-select :items="elFile" hide-details="" solo flat background-color="white" class="input un-confirmed">
                                            <template v-slot:prepend-inner>
                                                <v-checkbox dense hide-details="" off-icon="mdi-circle-outline" color="secondary" on-icon="mdi-check-circle" class="mt-n1" />
                                            </template>
                                            <template v-slot:item="{item}">
                                                <v-list dense>
                                                    <v-list-item>
                                                        <v-list-item-icon>
                                                            <v-checkbox dense hide-details :label="item.text" :input-value="item.value" />
                                                        </v-list-item-icon>
                                                    </v-list-item>
                                                </v-list>
                                            </template>
                                        </v-select>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                    <div v-if="step == 2">
                        <div class="">
                            <v-row class="ma-0">
                                <v-col cols="12">
                                    <div class="column flex-wrap">
                                        <div class="text d-flex align-center">
                                            <img src="/assets/icons/doctor/study.png" alt="" class="ml-2">
                                            بیو و رزومه
                                            <v-checkbox dense hide-details on-icon="mdi-check-circle" color="secondary" off-icon="mdi-circle-outline" class="mt-n1" />
                                        </div>
                                        <tiptap-vuetify class="mt-2 font-normal" v-model="textBody" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }" />
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div class="column flex-wrap">
                                        <div class="text d-flex align-center">
                                            <img src="/assets/icons/doctor/location.png" alt="" class="ml-2">
                                            آدرس مطب
                                            <v-checkbox dense hide-details on-icon="mdi-check-circle" color="secondary" off-icon="mdi-circle-outline" class="mt-n1" />
                                        </div>
                                        <v-textarea rows="3" no-resize solo dense flat rounded class="font-normal w-100" />
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                    <div v-if="step == 3">
                        <div class="file-table">
                            <div class="windows-mode">
                                <div class="thead">
                                    <div class="tr">
                                        <div class="th">
                                            <div class="text">#</div>
                                        </div>
                                        <div class="th">
                                            <div class="text"> اسم فایل </div>
                                        </div>
                                        <div class="th">
                                            <div class="text">فرمت فایل</div>
                                        </div>
                                        <div class="th">
                                            <div class="text">اندازه</div>
                                        </div>
                                        <div class="th">
                                            <div class="text">تاریخ بارگذاری</div>
                                        </div>
                                        <div class="th">
                                            <div class="text">وضعیت </div>
                                        </div>
                                        <div class="th">
                                            <div class="text">عملیات </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tbody">
                                    <div class="tr" v-for="(td, i) in files" :key="i">
                                        <div class="td">
                                            <v-checkbox dense hide-details class="mt-n4" />
                                            <div class="text">{{ i + 1 }}</div>
                                        </div>
                                        <div class="td">
                                            <div class="text">{{ td.fileName }}</div>
                                        </div>
                                        <div class="td">
                                            <div class="text">{{ td.format }}</div>
                                        </div>
                                        <div class="td">
                                            <div class="text">{{ td.hajm }}</div>
                                        </div>
                                        <div class="td">
                                            <div class="text">{{ td.date }}</div>
                                        </div>
                                        <div class="td">
                                            <div class="text" :class="td.status ? 'confirmed' : 'rejected'">{{ td.status ? 'confirmed' : 'rejected'}}</div>
                                        </div>
                                        <div class="td">
                                            <div class="action">
                                                <v-btn class="confirmed-btn" depressed icon>
                                                    <v-icon>mdi-check-circle</v-icon>
                                                </v-btn>
                                                <v-btn class="rejected-btn" depressed icon @click="rejectDialog = true">
                                                    <v-icon>mdi-close-circle</v-icon>
                                                </v-btn>
                                                <v-btn class="display-btn" depressed icon>
                                                    <v-icon>mdi-eye</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tablet-mode">
                                <v-expansion-panels flat>
                                    <v-expansion-panel v-for="(tr, i) in files" :key="i" class="expansion-panel">
                                        <v-expansion-panel-header class="expand-header">
                                            <div class="th">
                                                <v-checkbox dense hide-details class="mt-n4" />
                                                <div class="text">اسم فایل</div>
                                            </div>
                                            <div class="th">
                                                <div class="text" :class="tr.status ? 'confirmed' : 'rejected'">{{ tr.status ? 'confirmed' : 'rejected'}}</div>
                                            </div>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="expand-content">
                                            <div class="content">
                                                <div class="right">
                                                    <div class="tr">
                                                        <div class="th">
                                                            <div class="text">فرمت فایل</div>
                                                        </div>
                                                        <div class="th">
                                                            <div class="text">اندازه</div>
                                                        </div>
                                                        <div class="th">
                                                            <div class="text">تاریخ بارگذاری</div>
                                                        </div>
                                                        <div class="th">
                                                            <div class="text">عملیات </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="left">
                                                    <div class="tr">
                                                        <div class="td">
                                                            <div class="text">{{ tr.format }}</div>
                                                        </div>
                                                        <div class="td">
                                                            <div class="text">{{ tr.hajm }}</div>
                                                        </div>
                                                        <div class="td">
                                                            <div class="text">{{ tr.date }}</div>
                                                        </div>
                                                        <div class="td">
                                                            <div class="action">
                                                                <v-btn class="confirmed-btn" depressed icon>
                                                                    <v-icon>mdi-check-circle</v-icon>
                                                                </v-btn>
                                                                <v-btn class="rejected-btn" depressed icon @click="rejectDialog = true">
                                                                    <v-icon>mdi-close-circle</v-icon>
                                                                </v-btn>
                                                                <v-btn class="display-btn" depressed icon>
                                                                    <v-icon>mdi-eye</v-icon>
                                                                </v-btn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                                <div class="page-slider">
                                    <v-btn fab small depressed class="slider-btn">
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                    <div class="text">صفحه {{ page }} از 56</div>
                                    <v-btn fab small depressed class="slider-btn">
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
            <div class="actions">
                <v-btn class="reject-btn" depressed @click="step -=1">عدم تایید</v-btn>
                <v-btn class="confirm-btn" @click="tab == 0 ? '' : step +=1" depressed>تایید</v-btn>
            </div>
        </div>
        <!-- dialog -->
        <v-dialog v-model="rejectDialog" persistent content-class="reject-dialog">
            <v-btn fab small class="btn" depressed @click="rejectDialog = false" color="primary">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="dialog-content">
                <v-textarea hide-details flat background-color="white" outlined class="textarea" label="type something..." no-resize  />
                <v-btn fab depressed large color="secondary">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </div>
        </v-dialog>
        <!-- dialog end -->
    </div>
    <!-- end doctor Profile -->
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },      
        data(){
            return{
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                today: new Date().toLocaleDateString('fa-IR'),
                time: new Date().toLocaleTimeString('fa-IR'),
                tab:[0, 1],
                step: 1,
                page:1,
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
                rejectDialog:null,
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
                gender:[
                    {text:'male', value: 0},
                    {text:'female', value: 1}
                ],
                townHall:[
                    {text:'Ard', value: 0},
                    {text:'Tbr', value: 1},
                    {text:'Bku', value: 2}
                ],
                elFile:[
                    {text:'Yes', value:0},
                    {text:'No', value:1}
                ],
                extensions: [
                    Paragraph,
                    [Heading, {
                        options: {
                        levels: [1, 2, 3]
                        }
                    }],
                    Bold,
                    Italic,
                    History,
                    Blockquote,
                    Link,
                    Underline,
                    Strike,
                    ListItem,
                    BulletList,
                    OrderedList,
                    Code,
                    HorizontalRule,
                    HardBreak,
                ],
                files:[
                    {fileName:'saeed.gadery', format:'saeed', hajm:'unlimited', date:'2022-05-14', status:true },
                    {fileName:'saeed.gadery', format:'saeed', hajm:'unlimited', date:'2022-05-14', status:false }
                ]
            }
        },
        mounted(){
            this.tab = 0
        },
    }
</script>

<style lang="scss" scoped>

</style>