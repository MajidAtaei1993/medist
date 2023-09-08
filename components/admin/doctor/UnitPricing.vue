<template>
    <section class="medist-admin-unit-pricing-panel">
        <div class="medist-admin-left-panel">
            <div class="top-content" v-if="!addNewPacket">
                <div class="user-info">
                    <img src="/assets/images/avatar.png" alt="" class="avatar">
                    <div class="text">
                        <div class="name">{{ doctor.name }}</div>
                        <div class="expert">{{ doctor.major }}</div>
                    </div>
                </div>
                <v-btn depressed class="unit-pricing-btn" @click="addNewPacket = true">
                    <v-icon>mdi-chart-areaspline</v-icon>
                    تعریف بسته افزایشی
                </v-btn>
            </div>
            <div class="radio-content">
                <div class="head">{{ !addNewPacket ? 'جامعه هدف کد تخفیف را انتخاب کنید' : 'نوع ویزیت را انتخاب کنید'}}</div>
                <v-radio-group row v-model="radioVisit" class="radio-group">
                    <v-row class="ma-0" align="center">
                        <v-col cols="12" lg="4" v-for="(type, i) in !addNewPacket ? visits : visits.slice(0, 4)" :key="i" class="d-flex align-center">
                            <v-radio :value="i" class="mr-n1" />
                            <v-icon :color="type.value == radioVisit ? 'primary' : ''" class="ml-4 mr-2">{{ type.icon }}</v-icon>
                            <label :class="type.value == radioVisit ? 'label primary--text' : 'label' ">{{ type.label }}</label>
                        </v-col>
                    </v-row>
                </v-radio-group>
            </div>
            <div class="bottom-content">
                <v-row class="ma-0">
                    <v-col cols="12" class="column">
                        <img src="/assets/icons/doctor/time.png" alt="" class="img">
                        <div class="text">تعیین مدت زمان مجاز ویزیت</div>
                        <div class="timer">
                            <div class="up-down">
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-up</v-icon>
                                </v-btn>
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </div>
                            <input type="text" class="miniuts">
                            <span>:</span>
                            <input type="text" class="hour">
                            <div class="up-down">
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-up</v-icon>
                                </v-btn>
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" class="column">
                        <img src="/assets/icons/doctor/cash_in_hand.png" alt="" class="img">
                        <div class="text">قیمت ویزیت به ازای تایم مشخص شده</div>
                        <div class="timer">
                            <input type="text" class="price" placeholder="1.000.000 ريال">
                            <div class="up-down">
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-up</v-icon>
                                </v-btn>
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" class="column" v-if="addNewPacket">
                        <img src="/assets/icons/admin/dividends-b.png" alt="" class="img">
                        <div class="text">تعیین سهم پزشک</div>
                        <div class="timer">
                            <input type="text" class="price" placeholder="90%">
                            <div class="up-down">
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-up</v-icon>
                                </v-btn>
                                <v-btn small icon>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-btn depressed class="save-change-btn" @click="addNewPacket = false">{{ addNewPacket ? 'افزودن بسته افزایشی' : 'ثبت تغییرات'}}</v-btn>
        </div>
        <div class="medist-admin-right-panel">
            <div class="table">
                <div class="header" v-if="!addNewPacket">
                    <v-col cols="12" lg="6" class="column">
                        <div class="sorting w-100">
                            <div class="text">تخصص</div>
                            <v-select :menu-props="{ bottom: true, offsetY: true }" :items="elCase" solo flat class="select-input" placeholder="نوع" hide-details="">
                                <template v-slot:item="{ item }">
                                    <v-list width="300" dense>
                                        <v-list-item dense class="pr-6">
                                            <v-row align="center">
                                                <v-checkbox color="secondary" dense class="rounded-xl" :label="item.text" />
                                            </v-row>
                                        </v-list-item>
                                    </v-list>
                                </template>
                            </v-select>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="6" class="column">
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
                            <v-text-field v-model="search" flat class="input rounded-r-xl rounded-l-0" height="48" background-color="white" placeholder="جستجوی نوبت" solo hide-details="" />
                            <v-btn class="btn rounded-r-0 rounded-l-xl" depressed width="38" height="48" color="primary">
                                <v-icon size="30">mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </div>
                <div class="top-content" v-if="addNewPacket">
                    <div class="user-info">
                        <img src="/assets/images/avatar.png" alt="" class="avatar">
                        <div class="text">
                            <div class="name">{{ doctor.name }}</div>
                            <div class="expert">{{ doctor.major }}</div>
                        </div>
                    </div>
                </div>
                <div class="head"  v-if="addNewPacket">بسته های افزایشی موجود</div>
                <div class="data-table">
                    <!-- tablet size -->
                    <div class="tablet-mode">
                        <v-expansion-panels class="expansion-panels" flat v-model="expand">
                            <v-expansion-panel class="thead" v-for="(tr, i) in addNewPacket ? body1.slice(0, 8) : body.slice(0, 8)" :key="i">
                                <v-expansion-panel-header class="content">
                                    <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                    <div class="th" v-for="(th, j) in addNewPacket ? header1.slice(0, 1) : header.slice(0, 1)" :key="j">
                                        <img :src="th.iconTablet" alt="" class="img">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text secondary--text">{{ tr.major }}</div>
                                    </div>
                                    <div class="th" v-if="addNewPacket">
                                        <div class="text text-decoration-underline primary--text">{{ tr.type }}</div>
                                    </div>
                                    <div class="th" v-if="addNewPacket">
                                        <div class="text primary--text">{{ tr.time }}</div>
                                    </div>
                                    <div class="th" v-if="addNewPacket">
                                        <div class="text secondary--text">{{ tr.cost }}</div>
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
                                                    <div class="text secondary--text">{{ tr.totalPrice }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="row" v-if="!addNewPacket">
                                                <div class="column" v-for="(item, j) in header.slice(2, 4)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text primary--text">{{ item.text }}</div>
                                                </div>
                                            </div>
                                            <div class="row" v-if="addNewPacket">
                                                <div class="column mt-3">
                                                    <v-btn color="primary" width="520" height="48" depressed rounded>ویرایش</v-btn>
                                                    <v-btn fab color="error" small depressed height="48" width="48" class="mr-4">
                                                        <v-icon>mdi-trash-can</v-icon>
                                                    </v-btn>
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
                        <div class="action">
                            <v-btn depressed class="btn">انتخاب پزشک</v-btn>
                        </div>
                    </div>
                    <!-- end tablet size -->

                    <!-- windows size -->
                    <div class="windows-mode">
                        <div class="thead">
                            <div class="th" v-for="(th, i) in addNewPacket ? header1 : header" :key="i">
                                <img :src="th.icon" alt="" class="img">
                                <div class="text">{{ th.text }}</div>
                            </div>
                        </div>
                        <div class="tbody rounded-b-xl" :style="addNewPacket ? 'max-height: 360px' : 'max-height: 450px'">
                            <div class="tr" v-for="(tr, i) in addNewPacket ? body1 : body" :key="i">
                                <div class="td">
                                    <v-checkbox dense hide-details="" class="mb-3" />
                                    <div class="text">{{ addNewPacket ? tr.type : tr.docName }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ addNewPacket ? tr.time : tr.major }}</div>
                                </div>
                                <div class="td">
                                    <div class="text secondary--text">{{ addNewPacket ? tr.cost : tr.phoneNum }}</div>
                                </div>
                                <div class="td" v-if="addNewPacket">
                                    <div class="text prinary--text">ویرایش</div>
                                    <v-btn icon small>
                                        <v-icon color="primary">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon small>
                                        <v-icon color="error">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </div>
                                <div class="td" v-if="!addNewPacket">
                                    <div class="text secondary--text">{{ tr.totalPrice }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end windows size -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                chevron:'/assets/images/chevron.png',
                addNewPacket: null,
                radioVisit:null,
                radioVisit1:null,
                expand:null,
                page:1,
                search:'',
                doctor:{
                    name:'سعید قادری',
                    major: 'فوق تخصص مغز و اعصاب'
                },
                visits:[
                    { value:0, icon:'mdi-wechat', label:'چت' },
                    { value:1, icon:'mdi-microphone-outline', label:'صوتی' },
                    { value:2, icon:'mdi-phone-in-talk-outline', label:'تلفنی' },
                    { value:3, icon:'mdi-message-video', label:'تصویری' },
                    { value:4, icon:'mdi-chair-rolling', label:'مطب' },
                ],
                visits1:[
                    { value:0, icon:'mdi-wechat', label:'چت' },
                    { value:1, icon:'mdi-message-video', label:'تصویری' },
                    { value:2, icon:'mdi-phone-in-talk-outline', label:'تلفنی' },
                    { value:3, icon:'mdi-microphone-outline', label:'صوتی' },
                ],
                headerMenu:[
                    { text:'کارمندان', value: 0 },
                    { text:'پزشکان', value: 1 },
                    { text:'همه', value: 2 },
                ],
                header:[
                    { text:'نام پزشک', value:'docName', icon:'/assets/icons/admin/table/doctor-w.png', iconTablet:'/assets/icons/admin/table/doctor-b.png', },
                    { text:'تخصص', value:'major', icon:'/assets/icons/admin/table/dna-w.png' },
                    { text:'شماره تماس پزشک', value:'phoneNum', icon:'/assets/icons/admin/table/informatics-w.png', iconTablet:'/assets/icons/admin/table/informatics-c.png', },
                    { text:'مبلغ تجمیعی', value:'totalPrice', icon:'/assets/icons/admin/table/cash-out-w.png', iconTablet:'/assets/icons/admin/table/cash-out-c.png', },
                ],
                body:[
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز', phoneNum:'09141234567', totalPrice:'2.000.000 ريال' },
                ],
                header1:[
                    { text:'نوع ویزیت', value:'type', icon:'/assets/icons/admin/table/visitType-w.png' },
                    { text:'مدت زمان ویزیت', value:'time', icon:'/assets/icons/admin/table/timer-w.png' },
                    { text:'قیمت', value:'cost', icon:'/assets/icons/admin/table/price-w.png' },
                    { text:'', value:'actions' },
                ],
                elCase:[
                    { text:'فوق تخص گوارش و کبد', value:'0' },
                    { text:'فوق تخصص خون و آنکولوژی', value:'1' },
                    { text: 'فوق تخصص کلیه', value: '2' },
                    { text: 'فوق تخصص روماتولوژی', value: '3' },
                    { text: 'فوق تخصص غدد', value: '4' },
                    { text: 'فوق تخصص قلب و عروق', value: '5' },
                    { text: 'فوق تخصص ریه', value: '6' },
                    { text:'فوق تخص گوارش و کبد', value:'7' },
                    { text:'فوق تخصص خون و آنکولوژی', value:'8' },
                    { text: 'فوق تخصص کلیه', value: '8' },
                    { text: 'فوق تخصص روماتولوژی', value: '9' },
                    { text: 'فوق تخصص غدد', value: '10' },
                    { text: 'فوق تخصص قلب و عروق', value: '11' },
                    { text: 'فوق تخصص ریه', value: '12' },
                ],
                body1:[
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                    { type:'چت', time:'30 دقیقه', cost:'1.200.000 ريال' },
                ],
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