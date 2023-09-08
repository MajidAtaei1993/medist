<template>
    <section class="user-info">
        <!-- <span class="doctor-doctor-info-panel">
            <v-img :src="chevron" />
        </span> -->
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
        <div class="body">
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
            <v-tabs-items class="tabs-items transparent" v-model="tab">
                <v-tab-item class="tab-item">
                    <!-- user avatar -->
                    <div class="user-avatar">
                        <img :src="avatar" alt="" class="avatar">
                        <v-btn class="btn" depressed>ویرایش عکس پروفایل</v-btn>
                    </div>
                    <!-- end user avatar -->
                    <!-- user info -->
                    <div class="user-form">
                        <v-row class="ma-0">
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/account.png" alt="">
                                    <div class="text">نام</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/account.png" alt="">
                                    <div class="text">نام خانوادگی</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-check-circle</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/lock.png" alt="">
                                    <div class="text">رمز</div>
                                    <div class="password-text">تغییر رمز</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-check-circle</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/email.png" alt="">
                                    <div class="text">ایمیل</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/gender.png" alt="">
                                    <div class="text">جنسیت</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/town-hall.png" alt="">
                                    <div class="text">شهر</div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-check-circle</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="7">
                                <div class="column">
                                    <img src="/assets/icons/doctor/shaba.png" alt="">
                                    <div class="text">
                                        شماره شبا
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <!-- <v-col cols="12" lg="7">
                                <div class="column">
                                    <img src="/assets/icons/doctor/shaba.png" alt="">
                                    <v-select solo hide-details="" flat class="input" :items="test">
                                        <template>
                                            <v-list v-for="item in test" :key="item.value">
                                                <v-subheader>
                                                    {{ item.text }}
                                                    <v-divider />
                                                </v-subheader>
                                                <v-list-item v-for="item1 in item.child" :key="item1.value">
                                                    {{ item1.text }}
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col> -->
                        </v-row>
                    </div>
                    <!-- end user info -->
                </v-tab-item>
                <v-tab-item class="tab-item">
                    <div class="define-steeps mt-2">
                        <div :class="step == 1 ? 'step-active' : 'step'" @click="step = 1">{{ step == 1 ? 'صفحه 1' : '1' }}</div>
                        <div :class="step == 2 ? 'step-active' : 'step'" @click="step = 2">{{ step == 2 ? 'صفحه 2' : '2' }}</div>
                    </div>
                    <div class="user-form" v-if="step == 1">
                        <v-row class="ma-0">
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/barcode.png" alt="">
                                    <div class="text">
                                        شماره نظام پزشکی
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-text-field hide-details="" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                    </v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/lab-coat.png" alt="">
                                    <div class="text">
                                        تخصص 
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-select hide-details="" :items="experts" :menu-props="{offsetY:true}" solo flat background-color="white" class="input un-confirmed">>
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-list dense>
                                                <v-list-item>
                                                    <v-list-item-icon>
                                                        <v-checkbox dense hide-details="" class="mt-n1" :input-value="item.value" :label="item.text" />
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/graduation.png" alt="">
                                    <div class="text">
                                        عنوان تخصص های شما
                                        <!-- <div class="status">
                                            وضعیت:
                                            <span :class="user.degree ? 'success--text' : 'error--text' ">{{ user.degree ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div> -->
                                    </div>
                                    <v-text-field background-color="white" height="38" hide-details="" placeholder="" readonly solo class="input" rounded flat></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <div class="column">
                                    <img src="/assets/icons/doctor/receipt.png" alt="">
                                    <div class="text">
                                        نسخه الکترونیک
                                        <div class="status">
                                            وضعیت
                                            <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                        </div>
                                    </div>
                                    <v-select :items="elFile" hide-details="" :menu-props="{offsetY: true}" solo flat background-color="white" class="input un-confirmed">
                                        <template v-slot:prepend-inner>
                                            <v-icon>mdi-circle-outline</v-icon>
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-list dense>
                                                <v-list-item>
                                                    <v-list-item-icon>
                                                        <v-checkbox dense hide-details :input-value="item.value" :label="item.text" class="mt-n2" />
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="column flex-wrap w-100">
                                    <div class="head">
                                        <img src="/assets/icons/doctor/study.png" alt="">
                                        <div class="text">
                                            بیو و رزومه
                                            <div class="status">
                                                وضعیت
                                                <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                            </div>
                                        </div>
                                        <div class="limit">(محدودیت 500 کاراکتر)</div>
                                    </div>
                                    <tiptap-vuetify class="mt-2 font-normal w-100" v-model="textBody" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }" />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="column flex-wrap">
                                    <div class="head">
                                        <img src="/assets/icons/doctor/location.png" alt="">
                                        <div class="text">
                                            آدرس مطب
                                            <div class="status">
                                                وضعیت
                                                <span>{{ user.status ? 'تایید شده' : 'نیازمند تایید' }}</span>
                                            </div>
                                        </div>
                                        <!-- <div class="edit">ویرایش</div> -->
                                    </div>
                                    <v-textarea class="textarea" rows="2" hide-details="" no-resize filled rounded background-color="white" />
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-if="step == 2" class="w-100 py-4">
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
            <v-btn class="submit-btn" depressed>ثبت ویرایش</v-btn>
        </div>
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },      
        mounted(){
            this.tab = 0
            this.step = 1
        },
        data(){
            return{
                active:false,
                info:1,
                infoExpert:2,
                btn:null,
                tab:[0, 1],
                step: 1,
                chevron:'/assets/images/chevron.png',
                avatar:'/assets/images/avatar.png',
                gender:[
                    { text:'زن', value: 1 },
                    { text:'مرد', value: 2 }
                ],
                experts:[
                    {text:'expert', value:0 },
                ],
                elFile:[
                    {text:'Yes', value:0},
                    {text:'No', value:1}
                ],
                files:[
                    {fileName:'saeed.gadery', format:'saeed', hajm:'unlimited', date:'2022-05-14', status:true },
                    {fileName:'saeed.gadery', format:'saeed', hajm:'unlimited', date:'2022-05-14', status:false }
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
                test:[
                    {
                        text:'ardabil',
                        value:0,
                        child:[
                            {
                                text:'ardabil',
                                value:0
                            },
                            {
                                text:'kosar',
                                value:1
                            },
                            {
                                text:'xalxal',
                                value:2
                            },
                        ]
                    },
                    {
                        text:'tabriz',
                        value:1,
                        child:[
                            {
                                text:'tabriz',
                                value:0
                            },
                            {
                                text:'marage',
                                value:1
                            },
                            {
                                text:'xode tabriz',
                                value:2
                            },
                        ]
                    },
                ],
                user:{
                    status:false,
                    firstName:'مجید',
                    lastName:'عطائی',
                    email:'majid.ataie79@gmail.com',
                    password:'password',
                    gender:'مرد',
                    town:'اردبیل',
                    cardId:'IR1234567887654321',
                    docId:'12345678',
                    expert:'ریه',
                    upperExpert:'ریه و متخصص داخلی',
                    degree:false,
                    scan:'دارد',
                    bio:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.'

                },
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
            }
        }
    }
</script>