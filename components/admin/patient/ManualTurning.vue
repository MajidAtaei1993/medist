<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <v-stepper v-model="steppers" alt-labels class="steppers">
                <v-stepper-header class="stepper-head">
                    <v-stepper-step :complete="steppers > 1" step="1" class="stepper" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-show="steppers == '1'">انتخاب پزشک</small>
                    </v-stepper-step>
                        <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                    <v-stepper-step :complete="steppers > 2" step="2" complete-icon="" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-if="steppers == '2'">انتخاب تاریخ و زمان</small>
                    </v-stepper-step>
                        <v-divider :color="steppers >= 3 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                    <v-stepper-step :complete="steppers > 3" step="3" complete-icon="mdi-check" :class="steppers == 3 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-if="steppers == '3'">ثبت و ویرایش</small>
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1" class="stepper-content">
                        <div class="content">
                            <div class="head">نوع ویزیت را اصلاح کنید</div>
                            <v-radio-group row v-model="radioVisit" class="radio-group">
                                <v-row class="ma-0" justify="space-between" align="center">
                                    <v-col cols="12" lg="auto" v-for="(service, i) in visits" :key="i" class="d-flex align-center" style="width:max-content">
                                        <v-radio :value="i" class="mr-n1" />
                                        <v-icon :color="service.value == radioVisit ? 'primary' : ''" class="ml-4 mr-2">{{ service.icon }}</v-icon>
                                        <label :class="service.value == radioVisit ? 'label primary--text' : 'label' ">{{ service.label }}</label>
                                    </v-col>
                                </v-row>
                            </v-radio-group>
                            <div class="user-form">
                                <div class="input-content">
                                    <div class="head">
                                        شماره همراه بیمار را وارد کنید
                                        <ul class="check-number" v-if="selected">
                                            <li>
                                                <v-icon color="secondary">mdi-check-circle-outline</v-icon>
                                                <div class="text font-sm secondary--text">کاربر فوق در سایت ثبت نام کرده است</div>
                                            </li>
                                            <li>
                                                <v-icon color="error">mdi-close-circle-outline</v-icon>
                                                <div class="text font-sm error--text">کاربر فوق در سایت ثبت نام نکرده است</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <input type="text" class="input" placeholder="919874654321">
                                </div>
                                <div class="input-content">
                                    <div class="head">تخصص پزشک را انتخاب کنید</div>
                                    <v-select :menu-props="{ bottom: true, offsetY: true }" :items="items" hide-details="" placeholder="نام تخصص را انتخاب کنید" filled rounded background-color="white" class="select-input" v-model="selected">
                                        <template v-slot:item="{ item }">
                                            <v-row class="ma-0">
                                                <v-col class="">
                                                    <ul class="d-flex align-center">
                                                        <li class="font-normal">
                                                            <v-checkbox :label="item.text" :value="item.value" :key="item.value" dense hide-details="" />
                                                        </li>
                                                    </ul>
                                                </v-col>
                                            </v-row>
                                        </template>
                                    </v-select>
                                </div>
                            </div>
                        </div>
                        <div v-if="selected">
                            <!-- header  -->
                            <div class="header">
                                <div class="column">
                                    <div class="sorting">
                                        <div class="head" style="width:max-content">پزشک مورد نظر خود را انتخاب کنید</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="sorting">
                                        <v-menu offset-y content-class="elevation-1 white menu-content" :close-on-content-click="false">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn fab x-small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
                                                    <v-icon size="30" color="primary">mdi-tune</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list class="menu">
                                                <div class="list">
                                                    <div class="input-content">
                                                        <div class="text">نام پزشک</div>
                                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="input-content">
                                                        <div class="text">شماره تماس </div>
                                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="input-content">
                                                        <div class="text">شماره نظام پزشکی</div>
                                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="action">
                                                        <v-btn depressed class="btn mt-3">
                                                            <v-spacer />
                                                            جستجو
                                                            <v-spacer />
                                                            <v-icon size="30">mdi-magnify</v-icon>
                                                        </v-btn>
                                                    </div>
                                                </div>
                                            </v-list>
                                        </v-menu>
                                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی نوبت" filled rounded hide-details="" />
                                        <v-btn class="btn" depressed>
                                            <v-icon size="30">mdi-magnify</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                            <!-- end header -->
                            <!-- select some spacial doctor -->
                            <div class="data-table">
                                <div class="windows-mode">
                                    <div class="thead">
                                        <div class="th" v-for="(th, i) in header" :key="i">
                                            <img :src="th.icon" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                    </div>
                                    <div class="tbody rounded-b-xl" style="max-height: 150px;">
                                        <div class="tr" v-for="(tr, i) in body" :key="i">
                                            <div class="td">
                                                <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                                <div class="text">{{ tr.docName }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text">{{ tr.docId }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text">{{ tr.phoneNum }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text secondary--text">{{ tr.price }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- tablet size -->
                                <div class="tablet-mode">
                                    <v-expansion-panels style="max-height: 500px; overflow-y:auto" flat v-model="expand">
                                        <v-expansion-panel class="thead" v-for="(tr, i) in body" :key="i">
                                            <v-expansion-panel-header class="content">
                                                <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                                <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                                    <img :src="th.iconTablet" alt="" class="img">
                                                    <div class="text">{{ th.text }}</div>
                                                </div>
                                                <div class="th justify-end">
                                                    <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                                </div>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content class="expand-tbody">
                                                <div class="tbody">
                                                    <div class="left">
                                                        <div class="row">
                                                            <div class="column">
                                                                <div class="text">{{ tr.major }}</div>
                                                            </div>
                                                            <div class="column">
                                                                <div class="text">{{ tr.docId }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="right">
                                                        <div class="row">
                                                            <div class="column" v-for="(item, j) in header.slice(1)" :key="j">
                                                                <img :src="item.iconTablet" alt="" class="img">
                                                                <div class="text">{{ item.text }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                    <div class="page-slider">
                                        <v-btn fab small depressed class="slider-btn">
                                            <v-icon color="white" large>mdi-chevron-right</v-icon>
                                        </v-btn>
                                        <div class="text">صفحه {{ page }} از 56</div>
                                        <v-btn fab small depressed class="slider-btn">
                                            <v-icon color="white" large>mdi-chevron-left</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                                <!-- end tablet size -->
                            </div>
                            <!-- end select some spacial doctor -->
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="2" class="stepper-content">
                        <div class="content">
                            <div class="head">تاریخ زمان نوبت را انتخاب کنید</div>
                            <div class="date-time">
                                <div class="left">
                                    <div class="data-table-without-expand pa-0">
                                        <!-- windows mode -->
                                        <div class="windows-mode">
                                            <div class="thead">
                                                <div class="th" v-for="(th, i) in header1" :key="i">
                                                    <img :src="th.icon" alt="" class="img">
                                                    <div class="text">{{ th.text }}</div>
                                                </div>
                                            </div>
                                            <div class="tbody">
                                                <div class="tr" v-for="(tr, i) in body1" :key="i">
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
                                                <div class="content" v-for="(tr, i) in body1.slice(0, 8)" :key="i">
                                                    <v-checkbox dense hide-details="" :value="i" />
                                                    <div class="tr">
                                                        <div class="item" v-for="(item, i) in header1.slice(0, 1)" :key="i">
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
                    </v-stepper-content>

                    <v-stepper-content step="3" class="stepper-content">
                        <div class="content">
                            <div class="data-table">
                                <div class="windows-mode">
                                    <div class="thead">
                                        <div class="th" v-for="(th, i) in header2" :key="i">
                                            <img :src="th.icon" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                    </div>
                                    <div class="tbody rounded-bl-0 rounded-br-xl">
                                        <div class="tr" v-for="(tr, i) in bodys" :key="i">
                                            <div class="td">
                                                <div class="text">{{ tr.name }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text">{{ tr.time }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text">{{ tr.date }}</div>
                                            </div>
                                            <div class="td">
                                                <div class="text">{{ tr.type }}</div>
                                            </div>
                                            <div class="td">
                                                <div :class="tr.status ? 'text secondary--text' : 'text error--text'">{{tr.status ? 'پرداخت شده' : 'پرداخت نشده' }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- tablet size -->
                                <div class="tablet-mode">
                                    <v-expansion-panels style="max-height: 500px; overflow-y:auto" flat v-model="expand">
                                        <v-expansion-panel class="thead" v-for="(tr, i) in bodys" :key="i">
                                            <v-expansion-panel-header class="content">
                                                <div class="th" v-for="(th, j) in header2.slice(0, 1)" :key="j">
                                                    <img :src="th.iconTablet" alt="" class="img">
                                                    <div class="text">{{ th.text }}</div>
                                                </div>
                                                <div class="th justify-end">
                                                    <div class="text text-decoration-underline primary--text">{{ tr.name }}</div>
                                                </div>
                                                <div class="th justify-end">
                                                    <div class="text secondary--text">{{ tr.type }}</div>
                                                </div>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content class="expand-tbody">
                                                <div class="tbody">
                                                    <div class="left">
                                                        <div class="row">
                                                            <div class="column">
                                                                <div class="text">{{ tr.time }}</div>
                                                            </div>
                                                            <div class="column">
                                                                <div class="text">{{ tr.date }}</div>
                                                            </div>
                                                            <div class="column">
                                                                <div class="text">{{ tr.status }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="right">
                                                        <div class="row">
                                                            <div class="column" v-for="(item, j) in header2.slice(1, 3)" :key="j">
                                                                <img :src="item.iconTablet" alt="" class="img">
                                                                <div class="text">{{ item.text }}</div>
                                                            </div>
                                                            <div class="column" v-for="(item, j) in header2.slice(4, 5)" :key="j">
                                                                <img :src="item.iconTablet" alt="" class="img">
                                                                <div class="text">{{ item.text }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                                <!-- end tablet size -->
                                <div class="turn-actions">
                                    <v-btn class="edit" depressed>ویرایش</v-btn>
                                    <v-btn class="delete" depressed>حذف</v-btn>
                                </div>
                            </div>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="4" class="pa-0">
                        <v-row justify="center" align="center" class="ma-0 fill-height">
                            نوبت دهی با موفقیت ثبت شد
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
                <div class="actions">
                    <v-btn depressed class="btn-outline" @click="steppers -=1" v-if="steppers > 1">بازگشت</v-btn>
                    <v-btn depressed class="btn" @click="steppers +=1" v-if="steppers < 2">بعدی</v-btn>
                    <v-btn depressed class="btn" @click="steppers +=1, getTimeDate()" v-if="steppers == 2">بعدی</v-btn>
                    <v-btn depressed class="btn" v-if="steppers == 3">ثبت</v-btn>
                </div>
            </v-stepper>

        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                steppers:1,
                radioVisit:null,
                radioAim:null,
                percentage:0,
                selected:null,
                expand:null,
                page:1,
                bodys:[],
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                visits:[
                    { value:0, icon:'mdi-wechat', label:'چت' },
                    { value:1, icon:'mdi-microphone-outline', label:'صوتی' },
                    { value:2, icon:'mdi-phone-in-talk-outline', label:'تلفنی' },
                    { value:3, icon:'mdi-message-video', label:'تصویری' },
                    { value:4, icon:'mdi-chair-rolling', label:'مطب' },
                ],
                items:[
                    { value:1 ,text:'حساب پزشک' },
                    { value:2 ,text:'حساب پزشک' },
                    { value:3 ,text:'حساب پزشک' },
                    { value:4 ,text:'حساب پزشک' },
                    { value:5 ,text:'حساب پزشک' },
                    { value:6 ,text:'حساب پزشک' },
                    { value:7 ,text:'حساب پزشک' },
                    { value:8 ,text:'حساب پزشک' },
                    { value:9 ,text:'حساب پزشک' },
                    { value:10 ,text:'حساب پزشک' },
                    { value:11 ,text:'حساب پزشک' },
                ],
                header:[
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png', icon:'/assets/icons/admin/table/doctor-w.png', text:'نام پزشک' },
                    { iconTablet:'/assets/icons/admin/table/informatics-c.png', icon:'/assets/icons/admin/table/informatics-w.png', text:'شماره نظام پزشکی' },
                    { iconTablet:'/assets/icons/admin/table/informatics-c.png', icon:'/assets/icons/admin/table/informatics-w.png', text:'شماره تماس پزشک' },
                    { iconTablet:'/assets/icons/admin/table/price-c.png', icon:'/assets/icons/admin/table/price-w.png', text:'هزینه ویزیت' },
                ],
                body:[
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                    {docName:'سعید قادری', docId:'987654321', phoneNum:'91987654321', price:'900.000 ريال' },
                ],
                header1:[
                    { text:'زمان نوبت', value:'dateTime',iconTablet:'/assets/icons/admin/table/timer-b (2).png', icon:'/assets/icons/admin/table/timer-w.png', align:'right' },
                    { text:'وضعیت نویت', value:'status', icon:'/assets/icons/admin/table/visitType-w.png', align:'center' },
                ],
                body1:[
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
                header2:[
                    {iconTablet:'/assets/icons/admin/table/patient-b.png', icon:'/assets/icons/admin/table/username-w.png', text:'نام بیمار' },
                    {iconTablet:'/assets/icons/admin/table/timer-c.png', icon:'/assets/icons/admin/table/timer-c.png', text:'ساعت شروع و پایان ویزیت' },
                    {iconTablet:'/assets/icons/admin/table/calendar-c.png', icon:'/assets/icons/admin/table/calendar-w.png', text:'تاریخ شروع و پایان ویزیت' },
                    { icon:'/assets/icons/admin/table/tasklist-w.png', text:'نوع ویزیت' },
                    {iconTablet:'/assets/icons/admin/table/cart-c.png', icon:'/assets/icons/admin/table/cart-w.png', text:'وضعیت پرداخت' }
                ],
                body2:[
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت تصویری', status: true},
                    {name:'سعید قادری', time:'17:00 - 17:30', date:'2022/04/21', type:'چت', status: false}
                ]
            }
        },
        methods:{
            pickDate () {
                alert(`${this.date}`)
            },
            getTimeDate(){
                this.bodys.push({
                    name: 'مجید عطائی',
                    time: new Date().toLocaleTimeString('fa-IR')+ ' - ' +new Date().toLocaleTimeString('fa-IR'),
                    date: new Date().toLocaleDateString('fa-IR'),
                    type: 'چت تصویری',
                    status: true
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
</style>