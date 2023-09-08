<template>
    <div class="medist-admin-middle-panel">
        <div class="table">
            <!-- header  -->
            <div class="header">
                <v-col cols="auto" class="d-flex align-center">
                    <v-btn depressed class="back-to-all-btn" :to="{ name:'admin-doctor-list' }">
                        <img src="/assets/icons/admin/medical_doctor.png" alt="">
                        بازگشت به صفحه تمام پزشکان
                    </v-btn>
                </v-col>
                <v-col cols="auto" lg="3" md="4" sm="6" class="column">
                    <div class="sorting">
                        <div class="text">تاریخ</div>
                        <v-select :items="headerMenu" :menu-props="{ offsetY:true }" background-color="white" flat class="input" filled rounded placeholder="تاریخ" hide-details="">
                            <template v-slot:item="{ item }">
                                <v-list-item dense class="pr-6">
                                    <v-row align="center">
                                        <v-checkbox color="secondary" dense class="rounded-xl" :label="item.text" />
                                    </v-row>
                                </v-list-item>
                            </template>
                            <template v-slot:append-item>
                                <v-divider />
                                <v-btn text color="transparent" block @click="dialog = true">
                                    <small class=" primary--text text-decoration-underline">انتخاب از تقویم</small>
                                </v-btn>
                            </template>
                        </v-select>
                    </div>
                </v-col>
                <v-col cols="12" lg="3" class="column py-0">
                    <div class="sorting">
                        <div class="text">نوع</div>
                        <v-select :items="headerMenu1" :menu-props="{ offsetY:true }" background-color="white" height="48" flat filled rounded class="input" placeholder="نوع" hide-details="">
                            <template v-slot:item="{ item }">
                                <v-checkbox hide-details="" color="secondary" dense :label="item.text" class="" />
                            </template>
                        </v-select>
                    </div>
                </v-col>
                <v-col cols="12" xl="4" lg="3" class="column">
                    <div class="sorting">
                        <v-menu offset-y content-class="white menu-content" :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab x-small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
                                    <v-icon size="30" color="primary">mdi-tune</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="menu" width="100%">
                                <div class="list">
                                    <v-col cols="12" lg="3" class="input-content">
                                        <div class="text">نام پزشک</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </v-col>
                                    <v-col cols="12" lg="3" class="input-content">
                                        <div class="text">نام بیمار</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </v-col>
                                    <v-col cols="12" lg="3" class="input-content">
                                        <div class="text">شناسه نوبت</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </v-col>
                                    <v-col cols="12" lg="3" class="input-content">
                                        <div class="text">شماره تماس بیمار</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </v-col>
                                    <v-col cols="12" lg="3" class="input-content">
                                        <div class="text">شماره تماس مقصد</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </v-col>
                                    <v-col cols="12" lg="auto" class="input-content time-keeper-content">
                                        <div class="text">بازه زمانی</div>
                                        <div class="time-keeper">
                                            <div class="day">
                                                <div class="up-down">
                                                    <v-icon @click="day =+1">mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="day > 9 ? day : '0' + day">
                                            </div>
                                            <span>:</span>
                                            <div class="month">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="month > 9 ? month : '0' + month">
                                            </div>
                                        </div>
                                        <div class="text mr-3">تا</div>
                                        <div class="time-keeper">
                                            <div class="day">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="day ? day : '00'">
                                            </div>
                                            <span>:</span>
                                            <div class="month">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="month ? month : '00'">
                                            </div>
                                        </div>
                                    </v-col>
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
                        <v-text-field v-model="search" flat class="search-input" height="48" background-color="white" placeholder="جستجوی نوبت" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </v-col>
                <div class="column">
                </div>
            </div>
            <!-- end header -->
            <div class="data-table">
                <div class="windows-mode">
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header1" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody" style="max-height: 380px;">
                        <div class="tr" v-for="(tr, i) in body1" :key="i">
                            <div class="td">
                                <img src="/assets/icons/admin/table/chat-g.png" alt="" class="img">
                                <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                <div class="text">{{ tr.idPay }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.patientName }}</div>
                            </div>
                            <div class="td">
                                <v-btn icon>
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                                <div class="text">{{ tr.patientPhone }}</div>
                            </div>
                            <div class="td">
                                <v-btn icon>
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                                <div class="text">{{ tr.patientPhone1 }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.turnTime }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.turnDate }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.turnType }}</div>
                            </div>
                            <div class="td">
                                <div class="text secondary--text">{{ tr.costVisit }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="action rounded-b-xl">
                        <v-btn depressed class="btn" @click="$router.push({name:'admin-doctor-list-edit-id', params:{id:$route.params.id}})">ویرایش نویت</v-btn>
                    </div>
                </div>
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body1.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                <div class="th" v-for="(th, j) in header1.slice(1,2)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end" style="width:50%">
                                    <div class="text text-decoration-underline primary--text">{{ tr.patientName }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text secondary--text">{{ tr.turnType }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.idPay }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.patientPhone }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.patientPhone1 }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.turnTime }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.turnDate }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text secondary--text">{{ tr.costVisit }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header1.slice(0, 1)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header1.slice(2, 6)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header1.slice(7, 8)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action">
                                        <v-btn class="btn">ویرایش نوبت</v-btn>
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
                    <div class="action">
                        <v-btn depressed class="btn">ویرایش نویت</v-btn>
                    </div>
                </div>
                <!-- end tablet size -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                day:null,
                month:null,
                page:1,
                expand:null,
                search:'',
                headerMenu:[
                    { text:'امروز', value:0 },
                    { text:'دیروز', value:1 },
                    { text:'همه', value:2 },
                ],
                headerMenu1:[
                    { text:'چت', value:0 },
                    { text:'مطب', value:1 },
                    { text:'تلفنی', value:2 },
                    { text:'چت صوتی', value:3 },
                    { text:'چت تصویری', value:4 },
                    { text:'همه', value:5 },
                ],
                header1:[
                    { text:'شناسه واریز', value:'idPay', icon:'/assets/icons/admin/table/barcode-w.png', iconTablet:'/assets/icons/admin/table/barcode-c.png' },
                    { text:'نام بیمار', value:'patientName', icon:'/assets/icons/admin/table/username-w.png', iconTablet:'/assets/icons/admin/table/patient-b.png' },
                    { text:'شماره تماس بیمار', value:'patientPhone', icon:'/assets/icons/admin/table/cellPhone-w.png', iconTablet:'/assets/icons/admin/table/cellPhone-c.png' },
                    { text:'شماره تماس مقصد', value:'patientPhone1', icon:'/assets/icons/admin/table/terminalNumber-w.png', iconTablet:'/assets/icons/admin/table/terminalNumber-c.png' },
                    { text:'زمان نوبت', value:'turnTime', icon:'/assets/icons/admin/table/timer-w.png', iconTablet:'/assets/icons/admin/table/timer-c.png' },
                    { text:'تاریخ شروع و پایان ویزیت', value:'turnDate', icon:'/assets/icons/admin/table/calendar-w.png', iconTablet:'/assets/icons/admin/table/calendar-c.png' },
                    { text:'نوع ویزیت', value:'turnType', icon:'/assets/icons/admin/table/visitType-w.png' },
                    { text:'هزینه ویزیت', value:'costVisit', icon:'/assets/icons/admin/table/price-w.png', iconTablet:'/assets/icons/admin/table/price-c.png' },
                ],
                body1:[
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                    { idPay:'12345678', patientName:'بیمار', patientPhone:'091912345678', patientPhone1:'091912345678', turnTime:'17:30 - 17:00', turnDate:'1400/12/12 - 1400/12/12', turnType:'چت', costVisit:'1.200.000ريال' },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>