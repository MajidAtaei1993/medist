<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <!-- header  -->
            <div class="header">
                <div class="column mr-auto">
                    <div class="sorting col-12">
                        <v-menu offset-y content-class="elevation-1 white menu-content" :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab x-small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
                                    <v-icon size="30" color="primary">mdi-tune</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="menu">
                                <div class="list">
                                    <div class="input-content">
                                        <div class="text">نام بیمار</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">شماره تماس</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">آدرس ایمیل</div>
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
                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی بیمار" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <!-- end header -->
            <div class="data-table">
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.patientName }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.phoneNum }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.email }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="queue" @click="showDialog = true">
                                                    <img src="/assets/icons/admin/table/eye-w.png" alt="">
                                                    نمایش
                                                </div>
                                                {{ tr.queue }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(1, 2)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(2, 6)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(7, 9)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action">
                                        <v-btn class="btn" color="#ff2727" depressed>
                                            بلاک کاربر از سایت
                                            <v-icon>mdi-account-cancel</v-icon>
                                        </v-btn>
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
                    <div class="cancel-section">
                        <v-btn depressed class="btn">لغو نویت</v-btn>
                    </div>
                </div>
                <!-- end tablet size -->

                <!-- windows size -->
                <div class="windows-mode">
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody rounded-b-xl" style="max-height: 450px">
                        <div class="tr" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <div class="text">{{ tr.patientName }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.phoneNum }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.email }}</div>
                            </div>
                            <div class="td">
                                <div class="queue" @click="showDialog = true">
                                    <img src="/assets/icons/admin/table/eye-c.png" alt="">
                                    نمایش
                                </div>
                                <div class="text">{{ tr.queue }}</div>
                            </div>
                            <div class="td">
                                <div class="text medist-cursor-pointer" style="color: #ff7272">
                                    بلاک کاربر از سایت
                                    <v-icon color="#ff7272">mdi-account-cancel</v-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end windows size -->
            </div>
        </div>

        <!-- dialog -->
        <v-dialog v-model="showDialog" persistent width="1400">
            <v-btn depressed x-small fab color="primary" @click="showDialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="dialog-table">
                <!-- windows mode -->
                <div class="thead">
                    <div class="th" v-for="(th, i) in header1" :key="i">
                        <img :src="th.icon" alt="" class="img">
                        <div class="text">{{ th.text }}</div>
                    </div>
                </div>
                <div class="tbody" style="max-height: 538px">
                    <div class="tr" v-for="(tr, i) in body1" :key="i">
                        <div class="td justify-start">
                            <img src="/assets/icons/admin/table/chat-g.png" alt="" class="ml-4">
                            <div class="text">{{ tr.docName }}</div>
                        </div>
                        <div class="td">
                            <div class="text">{{ tr.docName }}</div>
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
                            <div class="text secondary--text">{{ tr.cost }}</div>
                        </div>
                        <div class="td ">
                            <div class="text medist-cursor-pointer" style="color: #ff7272">
                                بلاک کاربر از لیست پزشک
                                <v-icon color="#ff7272">mdi-account-cancel</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end windows mode -->
                <!-- tablet mode -->
                <div class="thead-tablet">
                    <v-expansion-panels flat v-model="expand1">
                        <v-expansion-panel v-for="(tr, i) in body1.slice(0, 8)" :key="i" class="expand-row">
                            <v-expansion-panel-header class="expand-content">
                                <img src="/assets/icons/admin/table/chat-tablet.png" alt="" class="chat-img">
                                <div class="th" v-for="(th, j) in header1.slice(0, 1)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img ml-3">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text pl-4 secondary--text">{{ tr.major }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <v-row class="tbody ma-0">
                                    <v-col cols="6" class="left">
                                        <v-row class="ma-0">
                                            <v-col cols="12" class="column justify-end">
                                                <div class="text">{{ tr.time }}</div>
                                            </v-col>
                                            <v-col cols="12" class="column justify-end">
                                                <div class="text">{{ tr.date }}</div>
                                            </v-col>
                                            <v-col cols="12" class="column justify-end">
                                                <div class="text">{{ tr.type }}</div>
                                            </v-col>
                                            <v-col cols="12" class="column justify-end">
                                                <div class="text secondary--text">{{ tr.cost }}</div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6" class="right">
                                        <v-row class="ma-0">
                                            <v-col cols="12" class="column" v-for="(item, j) in header1.slice(2, 6)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img ml-3">
                                                <div class="text primary--text">{{ item.text }}</div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" class="action">
                                        <v-btn depressed class="btn" width="fi-content">
                                            بلاک کاربر از لیست پزشک
                                            <v-icon class="text-dcoration-none">mdi-account-cancel</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="page-slider">
                        <v-btn fab small depressed class="slider-btn">
                            <v-icon large color="white">mdi-chevron-right</v-icon>
                        </v-btn>
                        <div class="text">صفحه {{ page }} از 56</div>
                        <v-btn fab small depressed class="slider-btn">
                            <v-icon large color="white">mdi-chevron-left</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- end tablet mode -->
            </div>
        </v-dialog>
        <!-- end dialog -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                show:null,
                showDialog:null,
                expand:null,
                expand1:null,
                page:1,
                search:'',
                header:[
                    { value: 'patientName', text:'نام بیمار', icon:'/assets/icons/admin/table/username-w.png', iconTablet:'/assets/icons/admin/table/patient-b.png' },
                    { value: 'phoneNum', text:'شماره همراه', icon:'/assets/icons/admin/table/cellPhone-w.png', iconTablet:'/assets/icons/admin/table/cellPhone-c.png' },
                    { value: 'email', text:'ایمیل', icon:'/assets/icons/admin/table/email-w.png', iconTablet:'/assets/icons/admin/table/email-c.png' },
                    { value: 'queue', text:'تعداد نوبت های بیمار', icon:'/assets/icons/admin/table/visitType-w.png', iconTablet:'/assets/icons/admin/table/visitType-c.png' },
                    { value: 'action', text:'' },
                ],
                header1:[
                    { value: 'docName', text:'نام پزشک', icon:'/assets/icons/admin/table/doctor-w.png', iconTablet:'/assets/icons/admin/table/doctor-b.png' },
                    { value: 'major', text:'تخصص', icon:'/assets/icons/admin/table/dna-w.png' },
                    { value: 'time', text:'زمان نوبت', icon:'/assets/icons/admin/table/timer-w.png', iconTablet:'/assets/icons/admin/table/timer-c.png' },
                    { value: 'date', text:'تاریخ شروع و پایان نوبت', icon:'/assets/icons/admin/table/calendar-w.png', iconTablet:'/assets/icons/admin/table/calendar-c.png' },
                    { value: 'type', text:'نوع ویزیت', icon:'/assets/icons/admin/table/visitType-w.png', iconTablet:'/assets/icons/admin/table/visitType-c.png' },
                    { value: 'cost', text:'هزینه ویزیت', icon:'/assets/icons/admin/table/price-w.png', iconTablet:'/assets/icons/admin/table/price-c.png' },
                    { value: 'action', text:'' },
                ],
                body:[
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                    { patientName:'سعید قادری', phoneNum:'09141234567', email:'www.saeed.com', queue:'3' },
                    { patientName:'محسن طالبی', phoneNum:'09141234567', email:'www.saeed.com', queue:'2' },
                    { patientName:'مجید عطائی', phoneNum:'09141234567', email:'www.saeed.com', queue:'1' },
                ],
                body1:[
                    { docName:'سعید قادری', docName:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'محسن طالبی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                    { docName:'مجید عطائی', major:'فوق تخصص', time:'11:30 - 11:00', date:'1400/12/11 - 1400/12/11', type:'چت تصویری', cost:'900.000ريال' },
                ]
            }   
        }
        ,
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>

</style>