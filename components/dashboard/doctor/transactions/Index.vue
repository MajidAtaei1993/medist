<template>
    <section class="medist-dashbaord-middle">
        <div class="table">
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
        <!-- table -->
            <div class="data-table">
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels style="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img ml-2">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <img src="/assets/icons/patient/receipt.png" alt="" class="ml-2">
                                    <div class="text text-decoration-underline primary--text">{{ tr.type }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text secondary--text">{{ tr.pay }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.date }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.origin }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text" :class="tr.status == 1 ? 'secondary--text' : tr.status == 2 ? 'info--text' : 'error--text'">{{ tr.status == 1 ? 'نسویه شده' : tr.status == 2 ? 'در حال بررسی' : 'لفو شده' }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(1, 3)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(4, 5)" :key="j">
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
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        <div class="text">صفحه {{ page }} از 56</div>
                        <v-btn fab small depressed class="slider-btn">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- end tablet size -->

                <!-- windows size -->
                <div class="windows-mode">
                    <div class="thead justify-space-between px-4">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody" style="max-height: 100%">
                        <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <img width="22" height="22" :src="tr.status == 1 ? '/assets/icons/inbox.png' : tr.status == 2 ? '/assets/icons/icons8_transaction.png' : '/assets/icons/outbox.png' " alt="" class="ml-5">
                                <div class="text">
                                    {{ tr.type }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.date }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.origin }}</div>
                            </div>
                            <div class="td">
                                <div class="text secondary--text">{{ tr.pay }}</div>
                            </div>
                            <div class="td">
                                <div class="text" :class="tr.status == 1 ? 'secondary--text' : tr.status == 2 ? 'info--text' : 'error--text'">{{ tr.status == 1 ? 'نسویه شده' : tr.status == 2 ? 'در حال بررسی' : 'لفو شده' }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cancel-section" style="height: 40px">
                    </div>
                </div>
                <!-- end windows size -->
            </div>
        <!-- end table -->
        </div>
        <div class="left">
            <LeftPanel />
        </div>
    </section>
</template>

<script>
import LeftPanel from './LeftPanel.vue'
    export default {
        components:{ LeftPanel },
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                outbox:'/assets/icons/outbox.png',
                inbox:'/assets/icons/inbox.png',
                page:1,
                expand:null,
                notifs:'4',
                header: [
                    { iconTablet:'/assets/icons/patient/type-black.png', icon:'/assets/icons/patient/type.png', text: 'نوع تراکنش', align: 'center', value: 'type' },
                    { iconTablet:'/assets/icons/patient/calendar-c.png', icon:'/assets/icons/patient/calendar.png', text: 'تاریخ', value: 'date', align:'center' },
                    { iconTablet:'/assets/icons/patient/source-c.png', icon:'/assets/icons/patient/source.png', text: 'منبع', value: 'origin', align:'center' },
                    { icon:'/assets/icons/patient/label-price.png', text: 'مبلغ', value: 'pay', align:'center' },
                    { iconTablet:'/assets/icons/patient/status-c.png', icon:'/assets/icons/patient/status.png', text: 'وضعیت', align: 'start', value: 'status', align:'center' },
                ],
                body:[
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملت', pay:'ريال 1.200.000', status: 1 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک سامان', pay:'ريال 1.200.000', status:2 },
                    { type:'واریز وجه', date:'1400/11/21', origin:'بانک ملی', pay:'ريال 1.200.000', status:3 },
                ],
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
        },
        methods:{
            openNotifs(){},
        }
    }
</script>