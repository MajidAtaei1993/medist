<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <div class="employe-form">
                <v-row class="ma-0" justify="space-between">
                    <v-col cols="12" sm="6" class="column">
                        <img src="/assets/icons/admin/contact-b.png" alt="" class="img">
                        <div class="text">نام و نام خانوادگی</div>
                        <input type="text" class="input" placeholder="نام و نام خانوادگی">
                    </v-col>
                    <v-col cols="12" sm="6" class="column">
                        <img src="/assets/icons/admin/cellPhone-b.png" alt="" class="img">
                        <div class="text">شماره همراه</div>
                        <input type="text" class="input" placeholder="شماره همراه">
                    </v-col>
                    <v-col cols="12" sm="6" class="column">
                        <img src="/assets/icons/admin/new_job-b.png" alt="" class="img">
                        <div class="text">
                            وظیفه
                            <nuxt-link class="password-text" :to="{name: 'admin-employee-duty'}">مدیریت وظایف</nuxt-link>
                        </div>
                        <v-select :items="duty" :menu-props="{offsetY:true}" rounded class="select-input" solo flat background-color="white" placeholder="وظیفه" hide-details="">
                            <template v-slot:item="{ item }">
                                <v-list dense>
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-checkbox dense hide-details="" :input-value="item.value" :label="item.text" class="mt-n1" />
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </template>
                        </v-select>
                        <!-- <input type="text" class="input" placeholder="وظیفه"> -->
                    </v-col>
                    <v-col cols="12" sm="6" class="column">
                        <img src="/assets/icons/admin/cardId-b.png" alt="" class="img">
                        <div class="text">شماره شبا</div>
                        <input type="text" class="input" placeholder="IR">
                    </v-col>
                    <v-col cols="12" class="column">
                        <v-btn depressed class="submit">ایجاد کارمند</v-btn>
                    </v-col>
                </v-row>
            </div>
            <!-- header  -->
            <div class="header">
                <div class="column">
                    <div class="sorting">
                        <div class="head" style="width:max-content">لیست کارمندان</div>
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
                                        <div class="text">نام کارمند</div>
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
                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی نوبت" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <!-- end header -->
            <!-- select some spacial doctor -->
            <div class="data-table">
                <div class="windows-mode">
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody" style="max-height: 150px;">
                        <div class="tr" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                <div class="text">{{ tr.employeeName }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.major }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.phoneNum }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cancel-section">
                        <v-btn depressed class="btn">لغو نویت</v-btn>
                    </div>
                </div>
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                <div class="th" v-for="(th, j) in header.slice(0, 1)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end" style="width:50%">
                                    <div class="text text-decoration-underline primary--text">{{ tr.employeeName }}</div>
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
                                                <div class="text">{{ tr.major }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.docId }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(1, 2)" :key="j">
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
                    <div class="cancel-section">
                        <v-btn depressed class="btn">لغو نویت</v-btn>
                    </div>
                </div>
                <!-- end tablet size -->
            </div>
            <!-- end select some spacial doctor -->
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                expand:null,
                page:1,
                search:'',
                header:[
                    { text:'نام کارمند', value:'employeeName',iconTablet:'/assets/icons/admin/table/employe-b.png', icon:'/assets/icons/admin/table/employe-w.png', align:'right' },
                    { text:'شماره تماس', value:'phoneNum', iconTablet:'/assets/icons/admin/table/cellPhone-c.png', icon:'/assets/icons/admin/table/cellPhone-w.png', align:'center' },
                    { text:'تخصص', value:'major', icon:'/assets/icons/admin/table/new_job.png', align:'right' },
                ],
                body:[
                    { employeeName:'انشالا عطائی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'ّعلی عطائی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'حجت عطائی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'مقصود عطائی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'سعید قادری', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'محسن طالبی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                    { employeeName:'محید عطائی', major:'برنامه نویس فول استک', phoneNum:'987654321' },
                ],
                duty:[
                    {text:'duty', value:0 },
                    {text:'duty1', value:1 },
                    {text:'duty2', value:2 },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>