<template>
    <section>
        <!-- show all doctors -->
        <div class="medist-admin-unit-pricing-panel" v-if="value == 1">
            <div class="medist-admin-left-panel" v-if="checked && $route.name == 'admin-doctor-list-id'" :class="width < 1024 && checked && $route.name == 'admin-doctor-list-id' ? 'd-inline' : width > 1024 && checked ? '' : 'd-none'">
                <div class="top-content">
                    <div class="user-info">
                        <v-btn icon :class="width < 1024 ? 'd-inline mt-n6 ml-n6' : 'd-none'" @click="checked = false">
                            <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                        <img src="/assets/images/avatar.png" alt="" class="avatar">
                        <div class="text">
                            <div class="name">{{ doctor.name }}</div>
                            <div class="expert">{{ doctor.major }}</div>
                            <v-btn depressed class="btn" @click="value = 2">
                                <img src="/assets/icons/admin/medical_doctor.png" alt="">
                                رفتن به پروفایل پزشک
                            </v-btn>
                        </div>
                    </div>
                    <div class="delete-doctor-btn">
                        <div class="text">مسدود کردن حساب</div>
                        <v-btn depressed fab small class="btn">
                            <v-icon color="white">mdi-lock</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="card-content">
                    <v-col cols="12" lg="6">
                        <div class="card">
                            <img src="/assets/icons/admin/turn-opend.png" alt="">
                            <div class="text">
                                <div class="count">54</div>
                                <div class="subject">نوبت های باز امروز پزشک</div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <div class="card">
                            <img src="/assets/icons/admin/turn-reserved.png" alt="">
                            <div class="text">
                                <div class="count">54</div>
                                <div class="subject">تعداد نوبت های رزور پزشک</div>
                            </div>
                        </div>
                    </v-col>
                </div>
                <div class="bottom-content">
                    <v-row class="ma-0">
                        <v-col cols="12" class="column">
                            <img src="/assets/icons/admin/time_is_money.png" alt="" class="img">
                            <div class="text">افزایش و کاهش دستی تراکنش</div>
                            <div class="timer">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field type="text" class="price" placeholder="12,000,000 ریال" v-bind="attrs" v-on="on" prepend-inner-icon="mdi-chevron-down" />
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="(item, index) in priceItems"
                                            :key="index"
                                        >
                                            <v-checkbox dense hide-details="" :input-value="item.value" />
                                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
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
                            <img src="/assets/icons/admin/dividends.png" alt="" class="img">
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
                        <v-col cols="12" class="column">
                            <img src="/assets/icons/admin/adventures.png" alt="" class="img">
                            <div class="text">حالت پزشک</div>
                            <v-spacer />
                            <div class="d-flex align-center">
                                <small class="ml-3 font-lg font-weight-bold" :class="status ? 'primary--text' : ''">{{ status ? 'فعال' : 'غیر فعال' }}</small>
                                <v-switch v-model="status" color="primary" inset />
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <v-btn depressed class="save-change-btn">ثبت تغییرات</v-btn>
                <v-btn depressed class="show-all-turns" @click="value = 3">رفتن به نوبت های رزرو پزشک</v-btn>
            </div>
            <div class="medist-admin-right-panel" :class="width > 1024 && checked && $route.name == 'admin-doctor-list-id' ? '' : width < 1024 && checked ? 'd-none' : 'w-100'">
                <div class="table">
                    <div class="header">
                        <div class="column">
                            <div class="sorting">
                                <div class="text">تخصص</div>
                                <v-select :menu-props="{ bottom: true, offsetY: true }" :items="items" solo flat class="select-input" placeholder="نوع" hide-details="">
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
                                <v-text-field v-model="search" flat class="input rounded-r-xl rounded-l-0" height="48" background-color="white" placeholder="جستجوی پزشک" solo hide-details="" />
                                <v-btn class="btn rounded-r-0 rounded-l-xl" depressed width="38" height="48" color="primary">
                                    <v-icon size="30">mdi-magnify</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="data-table">
                        <!-- tablet size -->
                        <div class="tablet-mode">
                            <v-expansion-panels class="expansion-panels" flat v-model="expand">
                                <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                    <v-expansion-panel-header class="content">
                                        <v-checkbox dense hide-details="" class="mb-3" :input-value="i" v-model="checked" @cli="checkedInput(i)" :false-value="false" :true-value="true" />
                                        <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                            <img :src="th.iconTablet" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                        <div class="th justify-end">
                                            <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                        </div>
                                        <div class="th justify-end">
                                            <div class="text secondary--text">{{ tr.major }}</div>
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
                                                <div class="row">
                                                    <div class="column" v-for="(item, j) in header.slice(2, 4)" :key="j">
                                                        <img :src="item.iconTablet" alt="" class="img">
                                                        <div class="text primary--text">{{ item.text }}</div>
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
                                <div class="th" v-for="(th, i) in header" :key="i">
                                    <img :src="th.icon" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                            </div>
                            <div class="tbody rounded-b-xl" style="max-height: 450px">
                                <div class="tr" v-for="(tr, i) in body" :key="i">
                                    <div class="td">
                                        <v-checkbox dense hide-details="" class="mb-3" :input-value="i" :true-value="true" v-model="checked" :false-value="false" @click="checked ? $router.push({name:'admin-doctor-list-id', params:{id:i}}) : $router.push({name:'admin-doctor-list'})" />
                                        <div class="text">{{ tr.docName }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ tr.major }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text secondary--text">{{ tr.phoneNum }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text prinary--text">ویرایش</div>
                                        <v-btn icon small @click="editPhoneNumDialog = true">
                                            <v-icon color="primary">mdi-pencil-outline</v-icon>
                                        </v-btn>
                                        <v-btn icon small>
                                            <v-icon color="error">mdi-delete-outline</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="td">
                                        <div class="text secondary--text">{{ tr.totalPrice }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end windows size -->
                    </div>
                </div>
            </div>
        </div>
        <!-- end show all doctors -->
        <!-- profile -->
        <Profile v-if="value == 2" />
        <!-- profile end -->
        <!-- all turn -->
        <AllTurns v-if="value == 3" />
        <!-- all turn end -->
        <!-- edit phone number dialog -->
        <v-dialog v-model="editPhoneNumDialog" persistent width="350">
            <v-card color="white" class="medist-rounded pa-2">
                <v-card-text class="d-flex align-center pa-0">
                    <v-icon large color="secondary" class="medist-cursor-pointer" @click="editPhoneNumDialog = false">mdi-check-circle</v-icon>
                    <v-text-field solo dense hide-details="" rounded flat background-color="#e2e2e2" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- end phone number dialog -->
        
        <!-- edit phone number dialog -->
        <v-dialog v-model="editPhoneNumDialog1" persistent width="350">
            <v-card color="white" class="medist-rounded pa-2">
                <v-card-text class="d-flex align-center pa-0">
                    <v-icon large color="secondary" class="medist-cursor-pointer" @click="editPhoneNumDialog1 = false">mdi-check-circle</v-icon>
                    <v-text-field solo dense hide-details="" rounded flat background-color="#e2e2e2" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- end phone number dialog -->

        <!-- calendar dialog -->
        <v-dialog v-model="dialog" width="623" persistent>
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false"/>
        </v-dialog>
        <!-- end calendar dialog -->
        <v-dialog v-model="dialogOne" content-class="dialog" persistent>
            <v-btn class="close-btn" fab small color="primary" depressed @click="dialogOne = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="dialog-content">
                <h1 class="header"> انتقال از حساب سعید قادری</h1>
                <p class="subheader">لطفا جهت انتقال اعتبار پزشک مقصد مورد نظر  خود را جستجو نموده انتخاب نمایید .</p>
                <v-text-field flat filled rounded background-color="white" class="input" placeholder="جستجو..." append-icon="mdi-magnify" />
                <div class="data-table">
                    <!-- tablet size -->
                    <div class="tablet-mode">
                        <v-expansion-panels class="expansion-panels" flat v-model="expand">
                            <v-expansion-panel class="thead" v-for="(tr, i) in body" :key="i">
                                <v-expansion-panel-header class="content">
                                    <v-checkbox dense hide-details="" class="mb-3" :input-value="i" v-model="checked" @cli="checkedInput(i)" :false-value="false" :true-value="true" />
                                    <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                        <img :src="th.iconTablet" alt="" class="img">
                                        <div class="text">{{ th.text }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text text-decoration-underline primary--text">{{ tr.docName }}</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text secondary--text">{{ tr.major }}</div>
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
                                            <div class="row">
                                                <div class="column" v-for="(item, j) in header.slice(2, 4)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text primary--text">{{ item.text }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <!-- <div class="page-slider">
                            <v-btn fab small depressed class="slider-btn">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                            <div class="text">صفحه {{ page }} از 56</div>
                            <v-btn fab small depressed class="slider-btn">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                        </div> -->
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
                        <div class="tbody rounded-b-xl" style="max-height: 250px">
                            <div class="tr" v-for="(tr, i) in body" :key="i">
                                <div class="td">
                                    <v-checkbox dense hide-details="" class="mb-3" :input-value="i" :true-value="true" v-model="checked" :false-value="false" @click="checked ? $router.push({name:'admin-doctor-list-id', params:{id:i}}) : $router.push({name:'admin-doctor-list'})" />
                                    <div class="text">{{ tr.docName }}</div>
                                </div>
                                <div class="td">
                                    <div class="text">{{ tr.major }}</div>
                                </div>
                                <div class="td">
                                    <div class="text secondary--text">{{ tr.phoneNum }}</div>
                                </div>
                                <div class="td">
                                    <div class="text prinary--text">ویرایش</div>
                                    <v-btn icon small @click="editPhoneNumDialog = true">
                                        <v-icon color="primary">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon small>
                                        <v-icon color="error">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </div>
                                <div class="td">
                                    <div class="text secondary--text">{{ tr.totalPrice }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end windows size -->
                </div>
                <div class="detail-content">
                    <v-col cols="12" sm="7">
                        <v-text-field hide-details class="input" flat rounded filled background-color="white" placeholder="انتقال مبلغ ۲۰۰۰۰ تومان" />
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-btn block rounded depressed class="btn-gradiant" height="56">
                            انتقال
                            <v-icon color="white">mdi-arrow-left-thin</v-icon>
                        </v-btn>
                    </v-col>
                </div>
            </div>
        </v-dialog>
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import Profile from './Profile.vue'
import AllTurns from './AllTurns.vue'
    export default {
        components: { TiptapVuetify, Profile, AllTurns },      
        mounted(){
            this.handleResize()
            this.$nextTick(()=>{
                window.addEventListener('resize', this.handleResize)
            })
            if (this.$route.name == 'admin-doctor-list-id') {
                this.checked = true
            }
            else{
                this.checked = false
            }
            this.value = 1
        },
        data(){
            return{
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                chevron:'/assets/images/chevron.png',
                doctor:{
                    name:'سعید قادری',
                    major: 'فوق تخصص مغز و اعصاب'
                },
                status:null,
                value:[1,2,3,4],
                search:'',
                hour:null,
                hour1:null,
                miniuts:null,
                miniuts1:null,
                dialog: null,
                dialogOne:true,
                visit:null,
                editPhoneNumDialog:null,
                editPhoneNumDialog1:null,
                width:null,
                checked:null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                items:[
                    { text:'فوق تخصص گوارش و کبد' },
                    { text:'فوق تخصص خون و آنکولوژی' },
                    { text:'فوق تخصص کلیه' },
                    { text:'فوق تخصص روماتولوژی' },
                    { text:'فوق تخصص غدد' },
                    { text:'فوق تخصص قلب و عروق' },
                    { text:'فوق تخصص ریه' },
                    { text:'فوق اخصص بیماری های عفونی' },
                    { text:'فوق تخصص گوارش و کبد' },
                    { text:'فوق تخصص خون و آنکولوژی' },
                    { text:'فوق تخصص کلیه' },
                    { text:'فوق تخصص روماتولوژی' },
                    { text:'فوق تخصص غدد' },
                    { text:'فوق تخصص قلب و عروق' },
                    { text:'فوق تخصص ریه' },
                    { text:'فوق اخصص بیماری های عفونی' },
                    { text:'فوق تخصص گوارش و کبد' },
                    { text:'فوق تخصص خون و آنکولوژی' },
                    { text:'فوق تخصص کلیه' },
                    { text:'فوق تخصص روماتولوژی' },
                    { text:'فوق تخصص غدد' },
                    { text:'فوق تخصص قلب و عروق' },
                    { text:'فوق تخصص ریه' },
                    { text:'فوق اخصص بیماری های عفونی' },
                ],
                priceItems:[
                    { text:'100.000 rial', value:0 },
                    { text:'100.000 rial', value:1 },
                ],
                header:[
                    { text:'نام پزشک', value:'docName', icon:'/assets/icons/admin/table/doctor-w.png', iconTablet:'/assets/icons/admin/table/doctor-b.png', },
                    { text:'تخصص', value:'major', icon:'/assets/icons/admin/table/dna-w.png' },
                    { text:'شماره تماس پزشک', value:'phoneNum', icon:'/assets/icons/admin/table/informatics-w.png', iconTablet:'/assets/icons/admin/table/informatics-c.png', },
                    { text:'' },
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
                header2:[
                    { text:'زمان نوبت', value:'dateTime',iconTablet:'/assets/icons/admin/table/timer-b (2).png', icon:'/assets/icons/admin/table/timer-w.png', align:'right' },
                    { text:'وضعیت نویت', value:'status', icon:'/assets/icons/admin/table/visitType-w.png', align:'center' },
                ],
                body2:[
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
                tasks:[
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', title:'بیمار', subtitle:'نوبت اینترنتی'},
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
                visits:[
                    { value:0, icon:'mdi-wechat', label:'چت' },
                    { value:1, icon:'mdi-microphone-outline', label:'صوتی' },
                    { value:2, icon:'mdi-phone-in-talk-outline', label:'تلفنی' },
                    { value:3, icon:'mdi-message-video', label:'تصویری' },
                ],
                expand:null,
                page:1,
            }
        },
        watch:{
            width(N, O){
                if (N < 768) {
                    console.log(this.expand)
                }
                if (N > 1024) {
                    this.expand = true
                }
            },
            checked(N, O){
            }
        },
        methods:{
            pickDate () {
                alert(`${this.date}`)
            },
            handleResize(){
                this.width = window.innerWidth
            },
            checkedInput(i){
            }
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.handleResize)
        }
    }
</script>

<style lang="scss" scoped>
.v-tab.v-tab {
    color: transparent !important;
}
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
</style>