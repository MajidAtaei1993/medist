<template>
    <section>
        <div cols="12" class="medist-admin-middle-panel">
            <div class="table">
                <!-- header  -->
                <div class="header">
                    <div class="column">
                        <div class="sorting">
                            <div class="text">نمایش</div>
                            <v-select :items="headerMenu" :menu-props="{ offsetY:true }" background-color="white" flat class="input" filled rounded placeholder="نوع" hide-details="">
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
                                    <v-btn fab x-small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
                                        <v-icon size="30" color="primary">mdi-tune</v-icon>
                                    </v-btn>
                                </template>
                                <v-list class="menu">
                                    <div class="list">
                                        <div class="input-content">
                                            <div class="text">نام پرداخت کننده</div>
                                            <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">شناسه تراکنش</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">نام دریافت کننده</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content time-keeper-content">
                                            <div class="text">بازه زمانی</div>
                                            <div class="time-keeper">
                                                <div class="day">
                                                    <div class="up-down">
                                                        <v-icon @click="day =+1">mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" :value="day > 9 ? day : '0' + day">
                                                </div>
                                                <span>/</span>
                                                <div class="month">
                                                    <div class="up-down">
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" :value="month > 9 ? month : '0' + month">
                                                </div>
                                                <span>/</span>
                                                <div class="year">
                                                    <div class="up-down">
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" v-model="year">
                                                </div>
                                            </div>
                                            <div class="text">تا</div>
                                            <div class="time-keeper">
                                                <div class="day">
                                                    <div class="up-down">
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" :value="day ? day : '00'">
                                                </div>
                                                <span>/</span>
                                                <div class="month">
                                                    <div class="up-down">
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" :value="month ? month : '00'">
                                                </div>
                                                <span>/</span>
                                                <div class="year">
                                                    <div class="up-down">
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </div>
                                                    <input type="text" class="day" v-model="year">
                                                </div>
                                            </div>
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
                <div class="data-table">
                    <!-- windows size -->
                    <div class="windows-mode">
                        <div class="thead">
                            <div class="th" v-for="(th, i) in header" :key="i">
                                <img :src="th.icon" alt="" class="img">
                                <div class="text">{{ th.text }}</div>
                            </div>
                        </div>
                        <v-expansion-panels flat v-model="expand" class="expanded-tbody">
                            <v-expansion-panel v-for="(tr, i) in body" :key="i" class="tr">
                                <v-expansion-panel-header>
                                    <div class="td justify-start">
                                        <div class="text">{{ tr.earmark }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ tr.settlement }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ tr.reciept }}</div>
                                    </div>
                                    <div class="td justify-end">
                                        <div class="text">{{ tr.timeDate }}</div>
                                    </div>
                                    <div class="td justify-end">
                                        <div class="text" :class="tr.status ? 'secondary--text' : 'error--text'">{{ tr.status ? 'پرداخت شده' : 'پرداخت نشده' }}</div>
                                    </div>
                                    <div class="td justify-end">
                                        <div class="text secondary--text">{{ tr.pay }}</div>
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="expand-content">
                                    <div class="tr">
                                        <div class="td">سهم شرکت</div>
                                        <div class="td">1.000.000</div>
                                    </div>
                                    <div class="tr">
                                        <div class="td">سهم قادری سعید</div>
                                        <div class="td">2.000.000</div>
                                    </div>
                                    <div class="tr">
                                        <div class="td">سهم سعید قادری</div>
                                        <div class="td">3.000.000</div>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <div class="action">
                            <v-btn depressed class="btn">خروجی گرفتن</v-btn>
                        </div>
                    </div>
                    <!-- end windows size -->
                    <!-- tablet size -->
                    <div class="tablet-mode">
                        <v-expansion-panels style="expansion-panels" flat v-model="expand">
                            <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                <v-expansion-panel-header class="content">
                                    <div class="th" v-for="(th, j) in header.slice(1, 3)" :key="j" style="width:30%">
                                        <img :src="th.iconTablet" alt="" class="img">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                    <div class="th justify-center">
                                        <div class="text text-decoration-underline primary--text">{{ tr.settlement }} - {{ tr.reciept }}</div>
                                    </div>
                                    <div class="th" style="width:max-content">
                                        <div class="text secondary--text">{{ tr.pay }}</div>
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="expand-tbody">
                                    <div class="tbody">
                                        <div class="left">
                                            <div class="row">
                                                <div class="column">
                                                    <div class="text">{{ tr.earmark }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.timeDate }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text text-left" :class="tr.status ? 'secondary--text' : 'error--text'">{{ tr.status ? 'پرداخت شده' : 'پرداخت نشده' }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="row">
                                                <div class="column" v-for="(item, j) in header.slice(0, 1)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text">{{ item.text }}</div>
                                                </div>
                                                <div class="column" v-for="(item, j) in header.slice(3, 5)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text">{{ item.text }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="extend-content">
                                            <div class="tr">
                                                <div class="td">سهم شرکت</div>
                                                <div class="td">1.000.000</div>
                                            </div>
                                            <div class="tr">
                                                <div class="td">سهم قادری سعید</div>
                                                <div class="td">2.000.000</div>
                                            </div>
                                            <div class="tr">
                                                <div class="td">سهم سعید قادری</div>
                                                <div class="td">3.000.000</div>
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
                        <div class="action">
                            <v-btn depressed class="btn">خروجی گرفتن</v-btn>
                        </div>
                    </div>
                    <!-- end tablet size -->
                </div>
            </div>
        </div>
        <div cols="12" class="medist-admin-bottom-panel">
            <div class="transactions">
                <v-row align="center" v-for="(item, i) in turns" :key="i">
                    <v-col cols="12" class="head">
                        <img :src="item.icon" alt="" class="img">
                        <div class="text">خلاصه تراکنش ها</div>
                    </v-col>
                    <v-col v-for="(item1, j) in item.children" :key="j" cols="12" md="3" sm="6">
                        <div class="card">
                            <img :src="item1.icon" alt="" class="img">
                            <div class="count">{{ item1.count }}</div>
                            <div class="subject">{{ item1.subject}}</div>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="transaction-charts">
                <div class="head">
                    <img src="/assets/icons/admin/line_chart.png" alt="" class="img">
                    <div class="text">نمودار تعداد کل تراکنش ها</div>
                </div>
                <!-- counter -->
                <div class="counters">
                    <div class="time-keeper">
                        <div class="day">
                            <div class="up-down">
                                <v-icon @click="day =+1">mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" :value="day > 9 ? day : '0' + day">
                        </div>
                        <span>/</span>
                        <div class="month">
                            <div class="up-down">
                                <v-icon>mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" :value="month > 9 ? month : '0' + month">
                        </div>
                        <span>/</span>
                        <div class="year">
                            <div class="up-down">
                                <v-icon>mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" v-model="year">
                        </div>
                    </div>
                    <div class="text">تا</div>
                    <div class="time-keeper">
                        <div class="day">
                            <div class="up-down">
                                <v-icon>mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" :value="day ? day : '00'">
                        </div>
                        <span>/</span>
                        <div class="month">
                            <div class="up-down">
                                <v-icon>mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" :value="month ? month : '00'">
                        </div>
                        <span>/</span>
                        <div class="year">
                            <div class="up-down">
                                <v-icon>mdi-chevron-up</v-icon>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                            <input type="text" class="day" v-model="year">
                        </div>
                    </div>
                </div>
                <!-- end counter -->
                <!-- line chart -->
                <div class="chart">
                    <line-chart />
                </div>
                <!-- end line chart -->
            </div>
            <!-- pie chart -->
            <div class="pie-chart">
                <div class="head">
                    <img src="/assets/icons/admin/pie_chart.png" alt="" class="img">
                    <div class="text">تعداد نوبت های باز و اخذشده امروز</div>
                </div>
                <div class="select-mode">
                    <div class="text">شیوه نمایش</div>
                    <v-select :menu-props="{ offsetY:true }" :items="displayType" hide-details flat solo class="input" placeholder="کل ماه">
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
                <div class="chart-content">
                    <div class="right">
                        <div>
                            <v-icon>mdi-circle</v-icon>
                            <div class="text">نوبت های باز</div>
                        </div>
                        <div>
                            <v-icon>mdi-circle</v-icon>
                            <div class="text">نوبت های اخذ شده</div>
                        </div>
                    </div>
                    <div class="left">
                        <doughnut-chart />
                        <span class="counter">
                            <span class="count">485</span>
                            <span class="text">تعداد کل نوبت ها</span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- end pie chart -->
            <!-- column chart -->
            <div class="pie-chart">
                <div class="head">
                    <img src="/assets/icons/admin/candlestick_chart.png" alt="" class="img">
                    <div class="text">تعداد نوبت های اخذ شده تخصص ها به تفکیک</div>
                </div>
                <div class="select-mode">
                    <div class="text">شیوه نمایش</div>
                    <v-select :items="displayType" :menu-props="{ offsetY:true }" hide-details flat solo class="input" placeholder="کل ماه">
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
                <bar-chart class="w-100" />
                <div class="slider">
                    <v-btn depressed fab small class="btn">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    <div class="text">فروردین 1400</div>
                    <v-btn depressed fab small class="btn">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
    export default {
        components: { LineChart, DoughnutChart, BarChart },
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                day: null,
                month:null,
                year:null  ,
                dialog: null,
                expand:null,
                page:1,
                search:'',
                candel:'/assets/icons/candlestick_chart.png',
                chart:'/assets/icons/chart.png',
                expanded:[],
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
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
                displayType:[
                    { text:'امروز', value: 0 },
                    { text:'کل ماه', value: 1 },
                ],
                header:[
                    { iconTablet:'/assets/icons/admin/table/barcode-c.png', icon:'/assets/icons/admin/table/barcode-w.png', text:'شناسه تراکنش', value:'earmark' },
                    { iconTablet:'/assets/icons/admin/table/cash-in-b.png', icon:'/assets/icons/admin/table/cash-in-w.png', text:'واریز کننده', value:'settlement' },
                    { icon:'/assets/icons/admin/table/cash-out-w.png', text:'دریافت کننده', value:'reciept' },
                    { iconTablet:'/assets/icons/admin/table/calendar-c.png', icon:'/assets/icons/admin/table/calendar-w.png', text:'تاریخ و ساعت واریز', value:'timeDate' },
                    { iconTablet:'/assets/icons/admin/table/pay-status-c.png', icon:'/assets/icons/admin/table/reciept-w.png', text:'وضعیت پرداخت', value:'status' },
                    { icon:'/assets/icons/admin/table/pay-status-w.png', text:'مبلغ واریز', value:'pay' },
                ],
                body:[
                    { earmark:'1', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'2', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:false, pay:'ريال1.200.000' },
                    { earmark:'3', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'4', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'5', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:false, pay:'ريال1.200.000' },
                    { earmark:'6', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'7', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'8', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:false, pay:'ريال1.200.000' },
                    { earmark:'9', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'10', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                    { earmark:'11', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:false, pay:'ريال1.200.000' },
                    { earmark:'12', settlement:'مجید عطائی', reciept:'سعید قادری', timeDate:'11:32 - 1400/12/08', status:true, pay:'ريال1.200.000' },
                ],
                turns:[
                    {
                        icon:'/assets/icons/icons8_debit_card_1.png',
                        title:'خلاصه تراکنش ها',
                        children:[
                            { icon:'/assets/icons/icons8_medical_doctor_3.png', count:'478,896,200 ریال', subject:'واریز شده برای پزشک' },
                            { icon:'/assets/icons/icons8_school_director_4.png', count:'478,896,200 ریال', subject:'واریز شده برای کارمندان' },
                            { icon:'/assets/icons/icons8_transaction.png', count:'478,896,200 ریال', subject:'واریزی در انتظار تسویه' },
                            { icon:'/assets/icons/icons8_card_exchange.png', count:'478,896,200 ریال', subject:'هزینه عودت' },
                            { icon:'/assets/icons/icons8_geography.png', count:'478,896,200 ریال', subject:'جمع سهم سایت' },
                            { icon:'/assets/icons/icons8_doctors_bag.png', count:'478,896,200 ریال', subject:'جمع خدمات دورا پزشکی' },
                            { icon:'/assets/icons/icons8_internet_1.png', count:'478,896,200 ریال', subject:'کل واریزی به سایت' },
                        ]
                    },
                ]
            }
        },
        mounted(){
            // this.getDay()
            // this.getMonth()
            this.getYear()
        },
        methods:{
            pickDate () {
                alert(`${this.date}`)
            },
            // let option = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}
            // getDay(){
            //     let option = { day: 'numeric'}
            //     let day = new Date().toLocaleDateString('fa-IR', option)
            //     this.day = day
            //     return this.day;
            // },
            // getMonth(){
            //     let option = { month: 'numeric'}
            //     let month = new Date().toLocaleDateString('fa-IR', option)
            //     this.month = month
            //     return this.month;
            // },
            getYear(){
                let option = { year: 'numeric'}
                let year = new Date().toLocaleDateString('fa-IR', option)
                this.year = year
                return this.year;
            },
        }
    }
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
.transactions-bill-data-table > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), 
.transactions-bill-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: 4px solid red !important;
}
</style>