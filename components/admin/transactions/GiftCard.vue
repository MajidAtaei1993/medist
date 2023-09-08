<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <v-stepper v-model="steppers" alt-labels class="steppers">
                <v-stepper-header class="stepper-head">
                    <v-stepper-step :complete="steppers > 1" step="1" class="stepper" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-show="steppers == '1'">انتخاب خدمات</small>
                    </v-stepper-step>
                        <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                    <v-stepper-step :complete="steppers > 2" step="2" complete-icon="" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-if="steppers == '2'">انتخاب جامعه هدف</small>
                    </v-stepper-step>
                        <v-divider :color="steppers >= 3 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                    <v-stepper-step :complete="steppers > 3" step="3" complete-icon="mdi-check" :class="steppers == 3 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-if="steppers == '3'">صدور کد تخفیف</small>
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1" class="stepper-content">
                        <div class="head">نوع خدمات را برای صدور کد تخفیف وارد کنید</div>
                        <v-radio-group row v-model="radioService" class="radio-group">
                            <v-row class="ma-0" justify="space-between" align="center">
                                <v-col cols="12" lg="auto" v-for="(service, i) in services" :key="i" class="d-flex align-center" style="width:max-content">
                                    <v-radio :value="i" class="mr-n3" />
                                    <v-icon :color="service.value == radioService ? 'primary' : ''" class="ml-4 mr-2">{{ service.icon }}</v-icon>
                                    <label :class="service.value == radioService ? 'label primary--text' : 'label' ">{{ service.label }}</label>
                                </v-col>
                            </v-row>
                        </v-radio-group>
                    </v-stepper-content>

                    <v-stepper-content step="2" class="stepper-content">
                        <div class="content">
                            <div class="head">جامعه هدف کد تخفیف را انتخاب کنید</div>
                            <v-radio-group row v-model="radioAim" class="radio-group">
                                <v-row class="ma-0" justify="space-between" align="center">
                                    <v-col cols="12" lg="auto" v-for="(type, i) in aimSociety" :key="i" class="d-flex align-center">
                                        <v-radio :value="i" class="mr-n1" />
                                        <v-icon :color="type.value == radioAim ? 'primary' : ''" class="ml-4 mr-2">{{ type.icon }}</v-icon>
                                        <label :class="type.value == radioAim ? 'label primary--text' : 'label' ">{{ type.label }}</label>
                                    </v-col>
                                </v-row>
                            </v-radio-group>
                        </div>
                        <div v-if="radioAim == 0 || radioAim == 3">
                            <!-- header  -->
                            <div class="header">
                                <div class="column">
                                    <div class="sorting">
                                        <div class="head" style="width:max-content" v-if="radioAim == 0">پزشک مورد نظر خود را انتخاب کنید</div>
                                        <div class="head" style="width:max-content" v-if="radioAim == 3">بیمار مورد نظر را انتخاب کنید</div>
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
                                                    <div class="input-content" v-if="radioAim == 0">
                                                        <div class="text">نام پزشک</div>
                                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="input-content" v-if="radioAim == 3">
                                                        <div class="text">نام بیمار</div>
                                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="input-content" v-if="radioAim == 0 || radioAim == 3">
                                                        <div class="text">شماره تماس </div>
                                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                                    </div>
                                                    <div class="input-content" v-if="radioAim == 0">
                                                        <div class="text">تخصص</div>
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
                            <div class="data-table" v-if="radioAim == 0">
                                <div class="windows-mode">
                                    <div class="thead">
                                        <div class="th" v-for="(th, i) in header" :key="i">
                                            <img :src="th.icon" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                    </div>
                                    <div class="tbody rounded-b-xl" style="max-height: 200px;">
                                        <div class="tr" v-for="(tr, i) in body" :key="i">
                                            <div class="td">
                                                <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                                {{ tr.docName }}
                                            </div>
                                            <div class="td">{{ tr.major }}</div>
                                            <div class="td">{{ tr.docId }}</div>
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
                            <!-- select some spacial patient -->
                            <div class="data-table-without-expand pa-0" v-if="radioAim == 3">
                                <!-- windows mode -->
                                <div class="windows-mode">
                                    <div class="thead">
                                        <div class="th" v-for="(th, i) in header.slice(0,1)" :key="i">
                                            <img :src="th.icon" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                        <div class="th" v-for="(th, i) in header.slice(2,3)" :key="i">
                                            <img :src="th.icon" alt="" class="img">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                    </div>
                                    <div class="tbody">
                                        <div class="tr" v-for="(tr, i) in body" :key="i">
                                            <div class="td">{{ tr.docName }}</div>
                                            <div class="td">{{ tr.docId }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end windows mode -->
                                <!-- tablet mode -->
                                <div class="tablet-mode">
                                    <div class="body">
                                        <div class="content" v-for="(tr, i) in body" :key="i">
                                            <v-checkbox dense hide-details="" :value="i" />
                                            <div class="tr">
                                                <div class="item" v-for="(item, i) in header.slice(0, 1)" :key="i">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text">{{ item.text }}</div>
                                                </div>
                                                <div class="item primary--text text-decoration-underline">{{ tr.docName }}</div>
                                                <div class="item secondary--text">{{ tr.docId }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sliders">
                                        <v-btn class="btn" fab small depressed>
                                            <v-icon large color="white">mdi-chevron-right</v-icon>
                                        </v-btn>
                                        <div class="text">صفحه {{ page }} از 56</div>
                                        <v-btn class="btn" fab small depressed>
                                            <v-icon large color="white">mdi-chevron-left</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                                <!-- end tablet mode -->
                            </div>
                            <!-- end select some spacial patient -->

                        </div>
                        <div class="" v-if="radioAim == 2">
                            <!-- header  -->
                            <div class="header">
                                <div class="column">
                                    <div class="sorting">
                                        <div class="text">تخصص پزشک را انتخاب کنید</div>
                                        <v-select :items="experts" :menu-props="{ offsetY:true }" background-color="white" flat class="input medist-rounded" filled rounded placeholder="نوع" hide-details="">
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
                            </div>
                            <!-- end header -->
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="3" class="stepper-content">
                        <div class="content">
                            <v-row class="ma-0">
                                <v-col cols="12" md="6">
                                    <div class="index">
                                        <div class="text-icon">
                                            <img src="/assets/icons/admin/contact-b.png" alt="" class="img">
                                            <div class="text">کد تخفیف را وارد کنید</div>
                                        </div>
                                        <input type="text" class="input">
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <div class="index">
                                        <div class="text-icon">
                                            <img src="/assets/icons/admin/dividends-b.png" alt="" class="img">
                                            <div class="text">درصد کاهش مبلغ را وارد کنید</div>
                                        </div>
                                        <input type="unmber" class="input">
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <div class="index">
                                        <div class="text-icon">
                                            <img src="/assets/icons/admin/money_transfer.png" alt="" class="img">
                                            <div class="text">منبع کسر هزینه را مشخص کنید</div>
                                        </div>
                                        <v-select height="48" :menu-props="{ offsetY:true }" :items="items" hide-details="" dense class="font-normal" solo flat rounded style="width:250px">
                                            <template v-slot:item="{ item }">
                                                <ul>
                                                    <li>
                                                        <v-checkbox dense hide-details="" :value="item.value" :label="item.text" />
                                                    </li>
                                                </ul>
                                            </template>
                                        </v-select>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="4" class="stepper-content">
                        <v-row justify="center" align="center" class="ma-0 fill-height">
                            کد تخفیف با موفقیت ایحاد شد
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
                <div class="actions">
                    <v-btn depressed class="btn-outline" @click="steppers -=1" v-if="steppers > 1">بازگشت</v-btn>
                    <v-btn depressed class="btn" @click="steppers +=1">بعدی</v-btn>
                </div>
            </v-stepper>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                steppers:1,
                radioService:null,
                radioAim:null,
                percentage:0,
                expand:null,
                page:1,
                services:[
                    { value:0, icon:'mdi-medical-bag', label:'خدمات دورا پزشکی' },
                    { value:1, icon:'mdi-stethoscope', label:'ویزیت پزشک' },
                    { value:2, icon:'mdi-account-group', label:'تخفیف کلی' },
                    { value:3, icon:'mdi-monitor', label:'تخفیف کلی وب سایت' },
                ],
                aimSociety:[
                    { value:0, icon:'mdi-doctor', label:'یک پزشک خاص' },
                    { value:1, icon:'mdi-account-group', label:'تمام پزشکان' },
                    { value:2, icon:'mdi-account-tie', label:'تخصص' },
                    { value:3, icon:'mdi-face-mask', label:'یک بیمار خاص' },
                    { value:4, icon:'mdi-monitor', label:'تخفیف کلی وب سایت' },

                ],
                experts:[
                    { text:'فوق تخصص گوارش و کبد', value:'0' },
                    { text:'فوق تخصص خون و آنکولوژی', value:'1' },
                    { text:'فوق تخصص کلیه', value:'2' },
                    { text:'فوق تخصص روماتولوژی', value:'3' },
                    { text:'فوق تخصص غدد', value:'4' },
                    { text:'فوق تخصص قلب و عروق', value:'5' },
                    { text:'فوق تخصص ریه', value:'5' }
                ],
                items:[
                    { value:0 ,text:'حساب وب سایت' },
                    { value:1 ,text:'حساب پزشک' }
                ],
                header:[
                    { text:'نام پزشک', value:'docName', iconTablet:'/assets/icons/admin/table/doctor-b.png', icon:'/assets/icons/admin/table/doctor-w.png', align:'right' },
                    { text:'تخصص', value:'major', iconTablet:'/assets/icons/admin/table/dna-c.png', icon:'/assets/icons/admin/table/dna-w.png', align:'right' },
                    { text:'شماره تماس پزشک', value:'docId', iconTablet:'/assets/icons/admin/table/informatics-c.png', icon:'/assets/icons/admin/table/informatics-w.png', align:'left' }
                ],
                body:[
                    { docName:'انشالا عطائی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'ّعلی عطائی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'حجت عطائی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'مقصود عطائی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'سعید قادری', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'محسن طالبی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                    { docName:'محید عطائی', major:'فوق تخصص مغز و کودک', docId:'987654321' },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--x-small {
    padding: 0 !important;
    min-width: 2px !important;
}
.v-slide-group__next {
    display: none !important;
}

.v-slide-group__prev {
    display: none !important;
}
</style>