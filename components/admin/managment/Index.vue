<template>
    <section>
        <div class="medist-admin-middle-panel">
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
                                            <div class="text">نام پزشک</div>
                                            <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">نام بیمار</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">شناسه نوبت</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">شماره تماس بیمار</div>
                                            <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                        </div>
                                        <div class="input-content">
                                            <div class="text">شماره تماس مقصد</div>
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
                    <!-- tablet size -->
                    <div class="tablet-mode">
                        <v-expansion-panels class="expansion-panels" flat v-model="expand">
                            <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                <v-expansion-panel-header class="content">
                                    <img src="/assets/icons/admin/table/chat-tablet.png" alt="" class="chat-img">
                                    <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                    <div class="th" v-for="(th, j) in header.slice(1, 2)" :key="j">
                                        <img :src="th.iconTablet" alt="" class="img">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text text-decoration-underline primary--text">{{ tr.doctorName }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text pl-4 secondary--text">{{ tr.type }}</div>
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="expand-tbody">
                                    <div class="tbody">
                                        <div class="left">
                                            <div class="row">
                                                <div class="column">
                                                    <div class="text">{{ tr.visitId }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.patientName }}</div>
                                                </div>
                                                <div class="column">
                                                    <v-btn icon color="primary">
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <div class="text">{{ tr.patientPhone }}</div>
                                                </div>
                                                <div class="column">
                                                    <v-btn icon color="primary">
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <div class="text">{{ tr.patientTell }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text text-left">{{ tr.timeDate }} <br> {{ tr.timeDate1 }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.pay }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="row">
                                                <div class="column" v-for="(item, j) in header.slice(0, 1)" :key="j">
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
                                        <div class="action w-100">
                                            <v-btn class="btn">ویرایش نوبت</v-btn>
                                        </div>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <!-- <div class="thead" v-for="(tr, i) in body" :key="i">
                            <img src="/assets/icons/admin/table/chat-tablet.png" alt="" class="img">
                            <div class="content">
                                <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                <div class="th" v-for="(th, j) in header.slice(1, 2)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text">{{ tr.doctorName }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text pl-4">{{ tr.type }}</div>
                                </div>
                                <v-btn icon class="expand">
                                    <v-icon>{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="left"></div>
                            <div class="right"></div>
                        </div> -->
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
                            <div class="th">
                                <div class="text"></div>
                            </div>
                        </div>
                        <div class="tbody rounded-0" style="max-height: 380px">
                            <div class="tr" v-for="(tr, i) in body" :key="i">
                                <div class="td">
                                    <img src="/assets/icons/admin/table/chat-g.png" alt="">
                                    <v-checkbox hide-details="" dense :value="i" class="mb-3" />
                                    <div class="text">
                                        {{ tr.visitId }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.doctorName }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.patientName }}</div>
                                </div>
                                <div class="td">
                                    <v-btn icon>
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                    <div class="text">{{ tr.patientPhone }}</div>
                                </div>
                                <div class="td">
                                    <v-btn icon>
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                    <div class="text">{{ tr.patientTell }}</div>
                                </div>
                                <div class="td text-left" style="width:120%">
                                    <div class="text">{{ tr.timeDate }} <br> {{ tr.timeDate1 }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.type }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.pay }}</div>
                                </div>
                                <div class="td">
                                        <v-btn icon color="primary">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    <div class="text primary--text">ویرایش</div>
                                </div>
                            </div>
                        </div>
                        <div class="cancel-section">
                            <v-btn depressed class="btn">لغو نویت</v-btn>
                        </div>
                    </div>
                    <!-- end windows size -->
                </div>
            </div>
        </div>
        <!-- bottom panel -->
        <div class="medist-admin-bottom-panel">
            <div class="descriprion">
                <div class="turns-descriprion">
                    <div class="turns" v-for="(item, i) in turns" :key="i">
                        <div class="head">
                            <img :src="item.icon" alt="" class="img">
                            <div class="text">{{ item.title }}</div>
                        </div>
                        <div class="turn" v-for="(item1, j) in item.children" :key="j">
                            <img :src="item1.icon" alt="" class="img">
                            <div class="count">{{ item1.count }}</div>
                            <div class="subject">{{ item1.subject }}</div>
                        </div>
                    </div>
                </div>
                <div class="most-expert-reserved">
                    <div class="head">
                        <img src="/assets/icons/admin/calendar-4-b.png" alt="" class="img">
                        <div class="text">4 تخصص با بیشترین رزور در ماه</div>
                    </div>
                    <div class="reserved" v-for="(item, i) in mostExprinse" :key="i">
                        <div class="count">{{ item.count }}</div>
                        <div class="subject">{{ item.subject }}</div>
                    </div>
                </div>
            </div>
            <div class="chart">
                <div class="head">
                    <img src="/assets/icons/admin/chart_bar-b.png" alt="" class="img">
                    <div class="text">نمودار نوبت ها به صورت ماهانه</div>
                </div>
                <bar-chart />   
            </div>
        </div>
        <!-- end bottom panel -->

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
import BarChart from './BarChart'
    export default {
        components:{ BarChart },
        data(){
            return{
                search:'',
                day: null,
                month:null,
                year:null,
                dialog: null,
                expand:false,
                checkbox:-1,
                page:1,
                radio:null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                headerMenu:[
                    { text:'چت', value: 0 },
                    { text:'مطب', value: 1 },
                    { text:'تلفنی', value: 2 },
                    { text:'چت صوتی', value: 3 },
                    { text:'چت تصویری', value: 4 },
                    { text:'همه', value: 5 },
                ],
                headerMenu1:[
                    { text:'امروز', value: 0 },
                    { text:'فردا', value: 1 },
                    { text:'همه', value: 2 },
                ],
                header: [
                    { iconTablet:'/assets/icons/admin/table/barcode-c.png' ,icon:'/assets/icons/admin/table/barcode-w.png', text: 'شناسه نویت', value: 'visitId', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png' ,icon:'/assets/icons/admin/table/doctor-w.png', text: 'نام پزشک', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/patient-c.png' ,icon:'/assets/icons/admin/table/patient-w.png', text: 'نام بیمار', value: 'patientName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/cellPhone-c.png' ,icon:'/assets/icons/admin/table/cellPhone-w.png', text: 'شماره تماس بیمار', value: 'patientPhone', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/terminalNumber-c.png' ,icon:'/assets/icons/admin/table/terminalNumber-w.png', text: 'شماره تماس مقصد', value: 'patientTell', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/timer-c.png', iconTablet1:'/assets/icons/admin/table/calendar-c.png' ,icon:'/assets/icons/admin/table/calendar-w.png', text: 'زمان و تاریخ', text1:'شروع و پایان ویزیت', value: 'timeDate' },
                    { icon:'/assets/icons/admin/table/visitType-w.png', text: 'نوع ویزیت', value: 'type', align:'center' },
                    { iconTablet:'/assets/icons/admin/table/price-c.png' ,icon:'/assets/icons/admin/table/price-w.png', text: 'هزینه ویزیت', value: 'pay', align:'center' },
                ],
                body:[
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'مطب', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'مطب', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'مطب', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'مطب', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'مطب', pay:'1.200.000 ريال' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'مجید عطائی', patientPhone:'09198412978', patientTell:'09198412978', timeDate:'1400/12/06 - 1400/12/06', timeDate1:'11:13 - 11:13', type:'چت تصویری', pay:'1.200.000 ريال' },
                ],
                mostExprinse:[
                    { count:'245', subject:'روانشناسی' },
                    { count:'213', subject:'پوست' },
                    { count:'245', subject:'روانشناسی' },
                    { count:'213', subject:'پوست' },
                ],
                turns:[
                    {
                        icon:'/assets/icons/admin/timetable.png',
                        title:'خلاصه نوبت ها به صورت ماهانه',
                        children:[
                            { icon:'/assets/icons/admin/list_of_thumbnails.png', count:'1450', subject:'تعداد کل نوبت های ماه' },
                            { icon:'/assets/icons/admin/todo_list_2.png', count:'49', subject:'تعداد کل رزروهای ماه' },
                        ]
                    },
                    {
                        icon:'/assets/icons/admin/timer-b.png',
                        title:'خلاصه نوبت ها به صورت روزانه',
                        children:[
                            { icon:'/assets/icons/admin/list_of_thumbnails.png', count:'1450', subject:'تعداد کل نوبت های ماه' },
                            { icon:'/assets/icons/admin/todo_list_2.png', count:'49', subject:'تعداد کل رزروهای ماه' },
                        ]
                    }
                ]
                ,
                filterMenu:[],
                filterMenu1:[],
            }
        },
        mounted(){
            this.getDay()
            this.getMonth()
            this.getYear()
        },
        watch:{
            expand(v, o){
                console.log(v)
                // console.log(o)
            },
            checkbox(v, o){
                console.log(v)
                // console.log(o)
            }
        },
        methods:{
            pickDate () {
                alert(`${this.date}`)
            },
            // let option = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}
            getDay(){
                let option = { day: 'numeric'}
                let day = new Date().toLocaleDateString('fa-IR', option)
                this.day = day
                return this.day;
            },
            getMonth(){
                let option = { month: 'numeric'}
                let month = new Date().toLocaleDateString('fa-IR', option)
                this.month = month
                return this.month;
            },
            getYear(){
                let option = { year: 'numeric'}
                let year = new Date().toLocaleDateString('fa-IR', option)
                this.year = year
                return this.year;
            },
        }
    }
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
/* .v-expansion-panel::before {
  box-shadow: none;
} */
</style>

