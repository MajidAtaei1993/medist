<template>
    <section>
        <div class="medist-dashbaord-middle dashboard-user-all-turn">
            <!-- <span class="medist-middle-panel-chevron-icon-user-all-turn">
                <v-img :src="chevron" />
            </span> -->
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
                <!-- header  -->
                <div class="header">
                    <div class="column">
                        <div class="sorting">
                            <div class="text">نمایش</div>
                            <v-select :items="headerMenu" :menu-props="{ offsetY:true }" background-color="white" height="48" flat class="input" filled rounded placeholder="نوع" hide-details="">
                                <template v-slot:item="{ item }">
                                    <v-list-item dense class="pr-6">
                                        <v-row align="center">
                                            <v-checkbox color="secondary" dense class="rounded-xl" :label="item.text" />
                                        </v-row>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </div>
                        <div class="sorting">
                            <div class="text">نوع</div>
                            <v-select :items="headerMenu1" :menu-props="{ offsetY:true }" background-color="white" height="48" flat filled rounded class="input" placeholder="تاریخ" hide-details="">
                                <template v-slot:item="{ item }">
                                    <v-checkbox hide-details="" color="secondary" dense :label="item.text" class="" />
                                </template>
                                <template v-slot:append-item>
                                    <v-divider />
                                    <v-btn text color="transparent" block @click="dialog = true">
                                        <small class=" primary--text text-decoration-underline">انتخاب از تقویم</small>
                                    </v-btn>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="sorting">
                            <v-menu offset-y content-class="elevation-1 white menu-content" :close-on-content-click="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
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
                                            <div class="text">تخصص</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="action">
                                            <v-btn depressed class="btn">
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

                <!-- table -->
                <div class="data-table">
                    <!-- tablet size -->
                    <div class="tablet-mode">
                        <v-expansion-panels class="expansion-panels" flat v-model="expand">
                            <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                <v-expansion-panel-header class="content">
                                    <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                        <img :src="th.iconTablet" alt="" class="img ml-2">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text secondary--text">{{ tr.expert }}</div>
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
                                                    <div class="text">{{ tr.clock }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.type }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text secondary--text">{{ tr.pay }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.terminal }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="row">
                                                <div class="column" v-for="(item, j) in header.slice(2)" :key="j">
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
                                    <img src="/assets/icons/admin/table/chat-g.png" alt="" class="ml-5">
                                    <div class="text">
                                        {{ tr.docName }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.expert }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.clock }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.date }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.type }}</div>
                                </div>
                                <div class="td">
                                    <div class="text secondary--text">{{ tr.pay }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.terminal }}</div>
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
        </div>

        <!-- calendar dialog -->
        <v-dialog v-model="dialog" width="623" persistent>
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false" />
        </v-dialog>
        <!-- end calendar dialog -->
    </section>
</template>

<script>
import LeftPanel from '../LeftPanel.vue'
    export default {
        components :{ LeftPanel },
        data(){
            return{
                search:'',
                expand:null,
                page:1,
                dialog:null,
                chevron:'/assets/images/chevron.png',
                show:null,
                notifs:'4',
                // today: new Date().toDateString(),
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                done: [false, false, false],
                headerMenu:[
                    { text:'رزرو شده', value: 0 },
                    { text:'باز', value: 1 },
                    { text:'همه', value: 2 },
                ],
                headerMenu1:[
                    { text:'امروز', value: 0 },
                    { text:'فردا', value: 1 },
                    { text:'همه', value: 2 },
                ],
                done:[ false, false, false ],
                header: [
                    { iconTablet:'/assets/icons/patient/doctor-black.png', icon:'/assets/icons/patient/doctor.png', text: 'نام پزشک', align: 'right', value: 'docName' },
                    { iconTablet:'', icon:'/assets/icons/patient/dna.png', text: 'تخصص', align: 'right', value: 'expert' },
                    { iconTablet:'/assets/icons/patient/timer-c.png', icon:'/assets/icons/patient/timer.png', text: 'زمان نوبت', value: 'clock', align:'right' },
                    { iconTablet:'/assets/icons/patient/calendar-c.png', icon:'/assets/icons/patient/calendar.png', text: 'تاریخ شروع و پایان ویزیت', value: 'date', align:'centrer' },
                    { iconTablet:'/assets/icons/patient/visit-type-c.png', icon:'/assets/icons/patient/visit-type.png', text: 'نوع ویزیت', value: 'type', align:'center' },
                    { iconTablet:'/assets/icons/patient/label-c.png', icon:'/assets/icons/patient/label.png', text: 'هزینه ویزیت', value: 'pay', align:'center' },
                    { iconTablet:'/assets/icons/patient/terminal-c.png', icon:'/assets/icons/patient/terminal.png', text: 'شماره مقصد', value: 'purposeNumber', align:'center' },
                ],
                body:[
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
                    { docName:'سعید قادری', expert:'فوق تخصص', clock:'17:30 - 17:00', date:'1400/09/13 - 1400/09-12', type:'چت تصویری', pay:'900.000 ریال', terminal:'12345678' },
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
            pickDate () {
                alert(`${this.date}`)
            },
            openChat(){},
            showExpand(i){
                console.log(i)
                this.show = true
            },
            openNotifs(){},
        }
    }
</script>

<style lang="scss" scoped>

</style>

