<template>
    <section class="medist-admin-middle-panel">
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
                                        <div class="text">شماره تماس پزشک</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">شماره نظام پزشکی</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">نام کارمند</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">شماره تماس کارمند</div>
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
            <div class="data-table">
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <v-checkbox hide-details="" class="checkbox" :value="i" dense color="secondary" />
                                <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.employeeName }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text pl-4 secondary--text">{{ tr.career }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.lastTransaction }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text secondary--text">{{ tr.totlaPrice }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(2, 4)" :key="j">
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
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody" style="max-height: 380px">
                        <div class="tr" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <v-checkbox hide-details="" dense :value="i" class="mb-3 mr-1" />
                                <div class="text w-100 text-center">{{ tr.employeeName }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.career }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.lastTransaction }}</div>
                            </div>
                            <div class="td">
                                <div class="text secondary--text">{{ tr.totlaPrice }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end windows size -->
                <!-- transactions details -->
                <div class="transaction-details">
                    <div class="details">
                        <div class="detail" v-for="(item, i) in transactionsDetail.slice(0, 3)" :key="i">
                            <img :src="item.img" alt="" class="img">
                            <div class="text">
                                <div class="head">{{ item.title }}</div>
                                <div class="count">{{ item.count }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="action">
                        <div class="detail" v-for="(item, i) in transactionsDetail.slice(3, 4)" :key="i">
                            <div class="text">
                                <div class="head">{{ item.title }}</div>
                                <div class="count">{{ item.count }}</div>
                            </div>
                        </div>
                        <v-btn depressed class="btn" @click="dialog = true">پرداخت</v-btn>
                    </div>
                </div>
                <!-- end transactions details -->
            </div>
        </div>

        <!-- confirm dialog -->
        <v-dialog v-model="dialog" persistent width="1050">
            <v-btn depressed x-small fab color="white" @click="dialog = false" class="mb-n12 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="dialog-table">
                <!-- windows mode -->
                <div class="thead">
                    <div class="th" v-for="(th, i) in header" :key="i">
                        <img :src="th.icon" alt="" class="img">
                        <div class="text">{{ th.text }}</div>
                    </div>
                </div>
                <div class="tbody">
                    <div class="tr" v-for="(tr, i) in body" :key="i">
                        <div class="td">{{ tr.employeeName }}</div>
                        <div class="td">{{ tr.career }}</div>
                        <div class="td">{{ tr.lastTransaction }}</div>
                        <div class="td">{{ tr.totlaPrice }}</div>
                    </div>
                </div>
                <!-- end windows mode -->
                <!-- tablet mode -->
                <div class="thead-tablet">
                    <div class="tablet-thead" v-for="(tr, i) in body" :key="i">
                        <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                        <div class="content">
                            <div class="th" v-for="(th, i) in header.slice(0, 1)" :key="i">
                                <img :src="th.iconTablet" alt="" class="img">
                                <div class="text">{{ th.text }}</div>
                            </div>
                            <div class="th">
                                <div class="text primary--text text-decoration-underline">{{ tr.employeeName }}({{ tr.career }})</div>
                            </div>
                            <div class="th">
                                <div class="text secondary--text">{{ tr.totlaPrice }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end tablet mode -->
                <div class="action">
                    <div class="btns">
                        <v-btn class="delete" depressed>حذف</v-btn>
                        <v-btn class="confirm" depressed>تایید</v-btn>
                    </div>
                    <div class="text" v-for="(item, i) in transactionsDetail.slice(3,4)" :key="i">
                        <div class="head">{{ item.title }}</div>
                        <div class="count">{{ item.count }}</div>
                    </div>
                </div>
            </div>
        </v-dialog>
        <!-- end confirm dialog -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                deptIcon:'/assets/icons/transactions/emp-doc/website_analytics.png',
                doctorIcon:'/assets/icons/transactions/emp-doc/medical_doctor.png',
                employeeIcon:'/assets/icons/transactions/emp-doc/school_director_3.png',
                search:'',
                day: null,
                month:null,
                year:null,
                dialog: true,
                chatDialog: null,
                show:null,
                text:'',
                fileUplaod:null,
                chatActive:true,
                dialog:null,
                expand:null,
                page:1,
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                time: new Date().toLocaleTimeString('fa-IR'),
                date: new Date().toLocaleDateString('fa-IR'),
                chevron:'/assets/images/chevron.png',
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                headerMenu:[
                    { text:'کارمندان', value: 0 },
                    { text:'پزشکان', value: 1 },
                    { text:'همه', value: 2 },
                ],
                header: [
                    { iconTablet:'/assets/icons/admin/table/username-b.png', icon:'/assets/icons/admin/table/username-w.png', text: 'نام کارمند', value: 'employeeName', align:'center' },
                    { icon:'/assets/icons/admin/table/new_job.png', text: 'سمت', value: 'career', align:'center' },
                    { iconTablet:'/assets/icons/admin/table/calendar-c.png', icon:'/assets/icons/admin/table/calendar-w.png', text: 'تاریخ آخرین تراکنش', value: 'lastTransaction', align:'left' },
                    { iconTablet:'/assets/icons/admin/table/cash-out-c.png', icon:'/assets/icons/admin/table/cash-out-w.png', text: 'مبلغ تجمیعی', value: 'totlaPrice', align:'left' }
                ],
                body:[
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                    { employeeName:'مجید عطائی', career:'برنامه نویس فرانت', lastTransaction:'1400/12/10', totlaPrice:'20.000.000ريال' },
                ],
                transactionsDetail:[
                    { img:'/assets/icons/admin/transaction-2.png', title:'بدهی وب سایت', count:'234.654.543' },
                    { img:'/assets/icons/admin/transaction-3.png', title:'پرداختی های امروز پزشکان', count:'34.654.543' },
                    { img:'/assets/icons/admin/transaction-1.png', title:'پرداختی های امروز کارمندان', count:'3.654.543' },
                    { title:'مجموع پرداختی', count:'12.000.000' }
                ],
                chats:[
                    { 
                        avatar:'https://cdn.vuetifyjs.com/images/john.png',
                        text:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'https://cdn.vuetifyjs.com/images/john.png',
                        text:'سلام',
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'https://cdn.vuetifyjs.com/images/john.png',
                        text:'چطوری حالت چطوره چیکارا میکنی گجاهایی ؟',
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR'),
                    },

                ],
            }
        },
        mounted(){
            // this.getDay()
            // this.getMonth()
            this.getYear()
        },
        methods:{
            pickFile(e){
                document.getElementById('file-input').click()
            },
            onChange(e){
                console.log(this.fileUplaod)
            },
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
            showConversetion(i){
                this.chatDialog = true
            },
        }
    }
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
</style>

