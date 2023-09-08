<template>
    <section class="medist-dashbaord-middle">
        <!-- <span class="medist-middle-panel-chevron-icon-set-turn-time">
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
            <div class="tabs">
                <v-btn @click="tab = 1" :class="tab == 1 ? 'active-tab' : 'tab'" class="ml-3" depressed>
                    <img :src="tab == 1 ? '/assets/icons/doctor/stacked_organizational_chart_highlighted_first_node-w.png' : '/assets/icons/doctor/stacked_organizational_chart_highlighted_first_node-c.png'" alt="">
                    نوبت دهی پزشک
                </v-btn>
                <v-btn @click="tab = 2" :class="tab == 2 ? 'active-tab' : 'tab'" depressed>
                    <img :src="tab == 2 ? '/assets/icons/doctor/search_in_list-w.png' : '/assets/icons/doctor/search_in_list-c.png'" alt="">
                    لیست نوبت ها
                </v-btn>
            </div>
            <div class="tabs-items">
                <div class="tab-item" v-if="tab == 1">
                    <!-- Online Mode -->
                    <v-switch :label="changeComponenet ? 'نوبت دهی مطب (آنلاین)' : 'نوبت دهی مطب'" class="stepper-switch" inset dense color="primary" v-model="changeComponenet" v-if="steppers == 1" />
                    <v-stepper v-model="steppers" alt-labels v-if="changeComponenet"  class="steppers">

                        <v-stepper-header class="stepper-head">
                            <v-stepper-step :complete="steppers > 1" step="1" class="stepper" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-show="steppers == '1'">تعیین تاریخ</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 2" step="2" complete-icon="" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '2'">تعیین ساعت</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 3 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 3" step="3" complete-icon="" :class="steppers == 3 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '3'">تعیین نوع ویزیت</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 4 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 4" step="4" complete-icon="" :class="steppers == 4 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '4'">تعیین بازه زمانی</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 5 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 5" step="5" complete-icon="mdi-check" :class="steppers == 5 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '5'">تنظیم حالت نوبت</small>
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>

                            <v-stepper-content step="1" class="stepper-content">
                                <div class="content">
                                    <div class="head">تاریخ نوبت را انتخاب کنید</div>
                                    <div class="date-picker">
                                        <v-date-picker no-title full-width flat v-model="datePicker" locale="fa" lang="fa" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right" color="primary" />
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="2" class="stepper-content">
                                <div class="content">
                                    <div class="head">ساعت شروع و پایان نوبت را انتخاب کنید</div>
                                    <div class="clocks">
                                        <div class="column">
                                            <div class="left">
                                                <v-time-picker class="time-picker" no-title v-model="endTime" :format="ampm1 ? '24hr' : 'ampm'" full-width ampm-in-title color="primary" @click:hour="getEndTimeHour" @click:minute="getEndTimeMinuts" />
                                            </div>
                                            <div class="right">
                                                <div class="head">بازه پایان نوبت</div>
                                                <div class="inputs">
                                                    <input type="text" class="input" :value="endTimeHour || '00'">
                                                    <span>:</span>
                                                    <input type="text" class="input" :value="endTimeMinuts || '00'">
                                                </div>
                                                <div class="actions">
                                                    <v-btn depressed @click="ampm1 = true" :class="ampm1 ? 'btn' : 'btn-outline'">بعد از ظهر</v-btn>
                                                    <v-btn depressed @click="ampm1 = false" :class="ampm1 ? 'btn-outline' : 'btn'">قبل از ظهر</v-btn>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="left">
                                                <v-time-picker class="time-picker" no-title v-model="beginTime" :format="ampm ? '24hr' : 'ampm'" full-width ampm-in-title color="primary" @click:hour="getBeginTimeHour" @click:minute="getBeginTimeMinuts" />
                                            </div>
                                            <div class="right">
                                                <div class="head">بازه شروع نوبت</div>
                                                <div class="inputs">
                                                    <input type="text" class="input" :value="beginTimeHour || '00'">
                                                    <span>:</span>
                                                    <input type="text" class="input" :value="beginTimeMinuts || '00'">
                                                </div>
                                                <div class="actions">
                                                    <v-btn depressed @click="ampm = true" :class="ampm ? 'btn' : 'btn-outline'">بعد از ظهر</v-btn>
                                                    <v-btn depressed @click="ampm = false" :class="ampm ? 'btn-outline' : 'btn'">قبل از ظهر</v-btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="timer-between-turns">
                                        <div class="head">بازه زمانی بین نوبت ها</div>
                                        <div class="content">
                                            <div class="number-input">
                                                <v-btn icon x-small @click="minut++" :disabled="minut>58">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                </v-btn>
                                                <v-btn icon x-small @click="minut--" :disabled="minut<1">
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </v-btn>
                                            </div>
                                            <div class="inputs">
                                                <input type="text" class="input" :value="minut < 10 ? '0' + minut : minut">
                                                <span>:</span>
                                                <input type="text" class="input" :value="hour < 10 ? '0' + hour : hour">
                                            </div>
                                            <div class="number-input">
                                                <v-btn icon x-small @click="++hour" :disabled="hour>11">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                </v-btn>
                                                <v-btn icon x-small @click="--hour" :disabled="hour<1">
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="3" class="stepper-content">
                                <div class="content">
                                    <div class="head">نوع ویزیت را انتخاب کنید</div>
                                    <div class="radios">
                                        <v-radio-group row v-model="activeRadio" class="radio-group w-100">
                                            <v-row class="ma-0 w-100" justify="space-between" align="center">
                                                <v-col cols="12" lg="auto" v-for="(type, i) in visitType" :key="i" class="d-flex align-center">
                                                    <v-radio class="mr-n1" :value="type.value" />
                                                    <v-icon :color="type.value == activeRadio ? 'primary' : ''" class="ml-4 mr-2">{{ type.icon }}</v-icon>
                                                    <label :class="type.value == activeRadio ? 'label primary--text' : 'label' " :for="type.title">{{ type.title }}</label>
                                                </v-col>
                                            </v-row>
                                            <div class="radio" v-for="(type, i) in visitType" :key="i">
                                            </div>
                                        </v-radio-group>
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="4" class="stepper-content">
                                <div class="content">
                                    <div class="head">بازه های زمانی نوبت های خود را بررسی کنید</div>
                                    <div class="table">
                                    <!-- table -->
                                    <div class="data-table">
                                        <!-- tablet size -->
                                        <div class="tablet-mode">
                                            <v-expansion-panels style="expansion-panels" flat v-model="expand">
                                                <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                                    <v-expansion-panel-header class="content">
                                                        <div class="th" v-for="(th, j) in headers.slice(0,1)" :key="j">
                                                            <img :src="th.iconTablet" alt="" class="img ml-2">
                                                            <div class="text">{{ th.text }}</div>
                                                        </div>
                                                        <div class="th justify-center">
                                                            <div class="text text-decoration-underline primary--text">{{ tr.type }}</div>
                                                        </div>
                                                        <div class="th">
                                                            <div class="text secondary--text">{{ tr.pay }}</div>
                                                        </div>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="expand-tbody">
                                                        <div class="tbody">
                                                            <div class="left">
                                                                <div class="row">
                                                                    <div class="column">
                                                                        <div class="text">{{ tr.timespan }}</div>
                                                                    </div>
                                                                    <div class="column">
                                                                        <div class="text">{{ tr.date }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="right">
                                                                <div class="row">
                                                                    <div class="column" v-for="(item, j) in headers.slice(1, 3)" :key="j">
                                                                        <img :src="item.iconTablet" alt="" class="img">
                                                                        <div class="text">{{ item.text }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="cancel-badge">
                                                                لغو
                                                                <v-icon>mdi-close-circle-outline</v-icon>
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
                                                <div class="th justify-start" v-for="(th, i) in headers.slice(0, 4)" :key="i">
                                                    <img :src="th.icon" alt="" class="img">
                                                    <div class="text">{{ th.text }}</div>
                                                </div>
                                                <div class="th">
                                                    <div class="text"></div>
                                                </div>
                                            </div>
                                            <div class="tbody" style="max-height: 330px">
                                                <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                                                    <div class="td justify-start">
                                                        <div class="text primary--text">{{ tr.type }}</div>
                                                    </div>
                                                    <div class="td justify-start">
                                                        <div class="text primary--text">{{ tr.timespan }}</div>
                                                    </div>
                                                    <div class="td justify-start">
                                                        <div class="text primary--text">{{ tr.date }}</div>
                                                    </div>
                                                    <div class="td justify-start">
                                                        <div class="text secondary--text">{{ tr.pay }}</div>
                                                    </div>
                                                    <div class="td">
                                                        <div class="cancel-badge">
                                                            لغو
                                                            <v-icon>mdi-close-circle-outline</v-icon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end windows size -->
                                    </div>
                                    <!-- end table -->
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="5" class="stepper-content">
                                <div class="content">
                                    <div class="head">نوع نوبت خود را انتخاب کنید</div>
                                    <div class="radios">
                                        <v-radio-group column v-model="activeRadio" class="radio-group-1">
                                            <div class="radio" v-for="(type, i) in turnState" :key="i">
                                                <v-radio class="ml-2" :value="type.value" />
                                                <v-icon :color="type.value == activeRadio ? 'primary' : ''" class="ml-2">{{ type.icon }}</v-icon>
                                                <div class="text" :class="type.value == activeRadio ? 'primary--text' : '' ">
                                                    <div :class="type.value == activeRadio ? 'primary--text' : '' " class="head">{{ type.title }}</div>
                                                    <div class="subtext">{{ type.subtitle }}</div>
                                                </div>
                                            </div>
                                        </v-radio-group>
                                    </div>
                                </div>
                            </v-stepper-content>
                            
                            <v-stepper-content step="6" class="pa-0">
                                <v-row justify="center" align="center" class="ma-0 fill-height">
                                    نوبت دهی با موفقیت انجام شدم
                                </v-row>
                            </v-stepper-content>
                        </v-stepper-items>

                        <!-- actions -->
                        <div class="action">
                            <v-btn @click="back" v-if="steppers > 1" color="primary" outlined depressed rounded class="btn-outline">بازگشت</v-btn>
                            <v-btn @click="getDate" depressed v-if="steppers == 1" class="btn">انتخاب تاریخ</v-btn>
                            <v-btn @click="getTime" v-if="steppers == 2" depressed class="btn">انتخاب ساعت</v-btn>
                            <v-btn @click="getVisitType" v-if="steppers == 3" depressed class="btn">انتخاب نوع ویزیت</v-btn>
                            <v-btn @click="steppers +=1" v-if="steppers == 4" depressed class="btn">انتخاب بازه زمانی</v-btn>
                            <v-btn @click="steppers +=1" v-if="steppers == 5" depressed class="btn" >انتخاب حالت نوبت</v-btn>
                        </div>
                        <!-- end actions -->
                    </v-stepper>
                    <!-- End Online Mode -->

                    <!--  Offline Mode -->
                    <v-stepper v-model="steppers" alt-labels v-else  class="steppers">

                        <v-stepper-header class="stepper-head">
                            <v-stepper-step :complete="steppers > 1" step="1" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-show="steppers == '1'">تعیین تاریخ</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 2" step="2" complete-icon="" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '2'">تعیین ساعت</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 3 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 3" step="3" complete-icon="" :class="steppers == 3 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '3'">تعیین بازه زمانی</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 4 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 4" step="4" complete-icon="mdi-check" :class="steppers == 4 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '4'">تنظیم حالت نوبت</small>
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>

                            <v-stepper-content step="1" class="stepper-content">
                                <div class="content">
                                    <div class="head">تاریخ نوبت را انتخاب کنید</div>
                                    <div class="date-picker">
                                        <v-date-picker no-title full-width flat v-model="datePicker" locale="fa" lang="fa" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right" color="primary" />
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="2" class="stepper-content">
                                <div class="content">
                                    <div class="head">ساعت شروع و پایان نوبت را انتخاب کنید</div>
                                    <div class="clocks">
                                        <div class="column">
                                            <div class="left">
                                                <v-time-picker class="time-picker" no-title v-model="endTime" :format="ampm1 ? '24hr' : 'ampm'" full-width ampm-in-title color="primary" @click:hour="getEndTimeHour" @click:minute="getEndTimeMinuts" />
                                            </div>
                                            <div class="right">
                                                <div class="head">بازه پایان نوبت</div>
                                                <div class="inputs">
                                                    <input type="text" class="input" :value="endTimeHour || '00'">
                                                    <span>:</span>
                                                    <input type="text" class="input" :value="endTimeMinuts || '00'">
                                                </div>
                                                <div class="actions">
                                                    <v-btn depressed @click="ampm1 = true" :class="ampm1 ? 'btn' : 'btn-outline'">بعد از ظهر</v-btn>
                                                    <v-btn depressed @click="ampm1 = false" :class="ampm1 ? 'btn-outline' : 'btn'">قبل از ظهر</v-btn>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="left">
                                                <v-time-picker class="time-picker" no-title v-model="beginTime" :format="ampm ? '24hr' : 'ampm'" full-width ampm-in-title color="primary" @click:hour="getBeginTimeHour" @click:minute="getBeginTimeMinuts" />
                                            </div>
                                            <div class="right">
                                                <div class="head">بازه شروع نوبت</div>
                                                <div class="inputs">
                                                    <input type="text" class="input" :value="beginTimeHour || '00'">
                                                    <span>:</span>
                                                    <input type="text" class="input" :value="beginTimeMinuts || '00'">
                                                </div>
                                                <div class="actions">
                                                    <v-btn depressed @click="ampm = true" :class="ampm ? 'btn' : 'btn-outline'">بعد از ظهر</v-btn>
                                                    <v-btn depressed @click="ampm = false" :class="ampm ? 'btn-outline' : 'btn'">قبل از ظهر</v-btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="timer-between-turns">
                                        <div class="head">بازه زمانی بین نوبت ها</div>
                                        <div class="content">
                                            <div class="number-input">
                                                <v-btn icon x-small @click="minut++" :disabled="minut>58">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                </v-btn>
                                                <v-btn icon x-small @click="minut--" :disabled="minut<1">
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </v-btn>
                                            </div>
                                            <div class="inputs">
                                                <input type="text" class="input" :value="minut < 10 ? '0' + minut : minut">
                                                <span>:</span>
                                                <input type="text" class="input" :value="hour < 10 ? '0' + hour : hour">
                                            </div>
                                            <div class="number-input">
                                                <v-btn icon x-small @click="++hour" :disabled="hour>11">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                </v-btn>
                                                <v-btn icon x-small @click="--hour" :disabled="hour<1">
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="3" class="stepper-content">
                                <div class="content">
                                    <div class="head">بازه های زمانی نوبت های خود را بررسی کنید</div>
                                    <div class="table">
                                        <!-- table -->
                                        <div class="data-table">
                                            <!-- tablet size -->
                                            <div class="tablet-mode">
                                                <v-expansion-panels style="expansion-panels" flat v-model="expand">
                                                    <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                                        <v-expansion-panel-header class="content">
                                                            <div class="th" v-for="(th, j) in headers.slice(0,1)" :key="j">
                                                                <img :src="th.iconTablet" alt="" class="img ml-2">
                                                                <div class="text">{{ th.text }}</div>
                                                            </div>
                                                            <div class="th justify-center">
                                                                <div class="text text-decoration-underline primary--text">{{ tr.type }}</div>
                                                            </div>
                                                            <div class="th">
                                                                <div class="text secondary--text">{{ tr.pay }}</div>
                                                            </div>
                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content class="expand-tbody">
                                                            <div class="tbody">
                                                                <div class="left">
                                                                    <div class="row">
                                                                        <div class="column">
                                                                            <div class="text">{{ tr.timespan }}</div>
                                                                        </div>
                                                                        <div class="column">
                                                                            <div class="text">{{ tr.date }}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="right">
                                                                    <div class="row">
                                                                        <div class="column" v-for="(item, j) in headers.slice(1, 3)" :key="j">
                                                                            <img :src="item.iconTablet" alt="" class="img">
                                                                            <div class="text">{{ item.text }}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="cancel-badge">
                                                                    لغو
                                                                    <v-icon>mdi-close-circle-outline</v-icon>
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
                                                    <div class="th justify-start" v-for="(th, i) in headers.slice(0, 4)" :key="i">
                                                        <img :src="th.icon" alt="" class="img">
                                                        <div class="text">{{ th.text }}</div>
                                                    </div>
                                                    <div class="th">
                                                        <div class="text"></div>
                                                    </div>
                                                </div>
                                                <div class="tbody" style="max-height: 330px">
                                                    <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                                                        <div class="td justify-start">
                                                            <div class="text primary--text">{{ tr.type }}</div>
                                                        </div>
                                                        <div class="td justify-start">
                                                            <div class="text primary--text">{{ tr.timespan }}</div>
                                                        </div>
                                                        <div class="td justify-start">
                                                            <div class="text primary--text">{{ tr.date }}</div>
                                                        </div>
                                                        <div class="td justify-start">
                                                            <div class="text secondary--text">{{ tr.pay }}</div>
                                                        </div>
                                                        <div class="td">
                                                            <div class="cancel-badge">
                                                                لغو
                                                                <v-icon>mdi-close-circle-outline</v-icon>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- end windows size -->
                                        </div>
                                        <!-- end table -->
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="4" class="stepper-content">
                                <div class="content">
                                    <div class="head">نوع نوبت خود را انتخاب کنید</div>
                                    <div class="radios">
                                        <v-radio-group column v-model="activeRadio" class="radio-group-1">
                                            <div class="radio" v-for="(type, i) in turnState" :key="i">
                                                <v-radio class="ml-2" :value="type.value" />
                                                <v-icon :color="type.value == activeRadio ? 'primary' : ''" class="ml-2">{{ type.icon }}</v-icon>
                                                <div class="text" :class="type.value == activeRadio ? 'primary--text' : '' ">
                                                    <div :class="type.value == activeRadio ? 'primary--text' : '' " class="head">{{ type.title }}</div>
                                                    <div class="subtext">{{ type.subtitle }}</div>
                                                </div>
                                            </div>
                                        </v-radio-group>
                                    </div>
                                </div>
                            </v-stepper-content>
                            
                            <v-stepper-content step="6" class="pa-0">
                                <v-row justify="center" align="center" class="ma-0 fill-height">
                                    نوبت دهی با موفقیت انجام شدم
                                </v-row>
                            </v-stepper-content>
                        </v-stepper-items>

                        <!-- actions -->
                        <div class="action">
                            <v-btn @click="back" v-if="steppers > 1" color="primary" outlined depressed rounded class="btn-outline">بازگشت</v-btn>
                            <v-btn @click="getDate" depressed v-if="steppers == 1" class="btn">انتخاب تاریخ</v-btn>
                            <v-btn @click="getTime" v-if="steppers == 2" depressed class="btn">انتخاب ساعت</v-btn>
                            <v-btn @click="steppers +=1" v-if="steppers == 3" depressed class="btn">انتخاب بازه زمانی</v-btn>
                            <v-btn @click="steppers +=1" v-if="steppers == 4" depressed class="btn" >انتخاب حالت نوبت</v-btn>
                        </div>
                        <!-- end actions -->
                    </v-stepper>
                    <!-- End Offline Mode -->
                </div>
                <div class="tab-item" v-if="tab == 2">
                    <!-- header  -->
                    <div class="header">
                        <div class="sorting">
                            <div class="text">نوع</div>
                            <v-select :items="headerMenu" :menu-props="{ offsetY:true }" background-color="white" height="48" flat filled rounded placeholder="نوع" hide-details="">
                                <template v-slot:item="{ item }">
                                    <v-list-item dense class="pr-6">
                                        <v-row align="center">
                                            <v-checkbox color="secondary" dense class="rounded-xl" :label="item.label" />
                                        </v-row>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </div>
                        <div class="sorting">
                            <div class="text">تاریخ</div>
                            <v-select :items="headerMenu1" :menu-props="{ offsetY:true }" background-color="white" height="48" flat filled rounded class="input" placeholder="تاریخ" hide-details="">
                                <template v-slot:item="{ item }">
                                    <v-checkbox hide-details="" color="secondary" dense :label="item.label" class="" />
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
                    <!-- end header -->
                    <!-- table -->
                    <div class="data-table rounded-bl-xl">
                        <div class="data-table-tabs">
                            <v-btn @click="action = 0" :class="action == 0 ? 'active-tab' : 'tab'" class="ml-3" depressed>
                               <v-icon :color="action == 0 ? 'white' : 'primary'">mdi-cogs</v-icon>
                                تنظیم های روزانه
                            </v-btn>
                            <v-btn @click="action = 1" :class="action == 1 ? 'active-tab' : 'tab'" depressed>
                               <v-icon :color="action == 1 ? 'white' : 'primary'">mdi-cog-sync</v-icon>
                                تنظیم های خودکار
                            </v-btn>
                        </div>
                        <!-- tablet size -->
                        <div class="tablet-mode">
                            <v-expansion-panels style="expansion-panels" flat v-model="expand">
                                <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                                    <v-expansion-panel-header class="content">
                                        <div class="th" v-for="(th, j) in headers.slice(0,1)" :key="j">
                                            <img :src="th.iconTablet" alt="" class="img ml-2">
                                            <div class="text">{{ th.text }}</div>
                                        </div>
                                        <div class="th justify-end">
                                            <div class="text text-decoration-underline primary--text">{{ tr.type }}</div>
                                        </div>
                                        <div class="th justify-end">
                                            <div :class="tr.status ? 'secondary--text' : 'error--text'">{{ tr.status ? 'باز' : 'رزرو' }}</div>
                                        </div>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="expand-tbody">
                                        <div class="tbody">
                                            <div class="left">
                                                <div class="row">
                                                    <div class="column">
                                                        <div class="text">{{ tr.timespan }}</div>
                                                    </div>
                                                    <div class="column">
                                                        <div class="text">{{ tr.date }}</div>
                                                    </div>
                                                    <div class="column">
                                                        <div class="text secondary--text">{{ tr.pay }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <div class="row">
                                                    <div class="column" v-for="(item, j) in headers.slice(1, 4)" :key="j">
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
                            <div class="cancel-section">
                                <v-btn class="btn" depressed>لغو نوبت</v-btn>
                            </div>
                        </div>
                        <!-- end tablet size -->

                        <!-- windows size -->
                        <div class="windows-mode">
                            <div class="thead justify-space-between px-4">
                                <div class="th" v-for="(th, i) in headers" :key="i">
                                    <img :src="th.icon" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                            </div>
                            <div class="tbody mxh-450">
                                <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                                    <div class="td">
                                        <v-checkbox dense hide-details class="mb-2" :input-value="i" />
                                        <div class="text mx-auto">{{ tr.type }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ tr.timespan }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ tr.date }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text secondary--text">{{ tr.pay }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text" :class="tr.status ? 'secondary--text' : 'error--text'">{{ tr.status ? 'باز' : 'رزرو' }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="cancel-section">
                                <v-btn class="btn" depressed>لغو نوبت</v-btn>
                            </div>
                        </div>
                        <!-- end windows size -->
                    </div>
                    <!-- end table -->
                </div>
            </div>
        </div>

        <div class="left">
            <LeftPanel />
        </div>
        <!-- calendar dialog -->
        <v-dialog v-model="dialog" width="623" persistent>
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false"/>
        </v-dialog>
        <!-- end calendar dialog -->
    </section>
</template>

<script>
import LeftPanel from '@/components/dashboard/doctor/request-send/LeftPanel.vue'
    export default {
        components:{ LeftPanel },
        mounted(){
            this.tab = 1
            this.steppers = 1
        },
        data(){
            return{
                tab:[1,2],
                action:[0,1],
                steppers: 1,
                datePicker:null,
                beginTime: null,
                endTime: null,
                minut:0,
                hour:0,
                beginTimeHour:null,
                beginTimeMinuts:null,
                endTimeHour:null,
                endTimeMinuts:null,
                ampm:null,
                ampm1:null,
                page:1,
                show:null,
                dialog:null,
                activeRadio:null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                checked:null,
                changeComponenet: true,
                expand:null,
                chevron:'/assets/images/chevron.png',
                headerMenu:[
                    { label:'چت', value: 0 },
                    { label:'مطب', value: 1 },
                    { label:'تلفنی', value: 2 },
                    { label:'چت صوتی', value: 3 },
                    { label:'چت تصویری', value: 4 },
                    { label:'همه', value: 5 },
                ],
                headerMenu1:[
                    { label:'امروز', value: 0 },
                    { label:'فردا', value: 1 },
                    { label:'همه', value: 2 },
                ],
                steps:[
                    { label: 'تعیین تاریخ', step:'1' },
                    { label: 'تعیین ساعت', step:'2' },
                    { label: 'تعیین نوع ویزیت', step:'3' },
                    { label: 'تعیین بازه زمانی', step:'4' },
                    { label: 'تنظیم حالت نوبت', step:'5' },
                ],
                visitType:[
                    { icon:'mdi-wechat', title:'چت', value:1 },
                    { icon:'mdi-microphone', title:'تلفنی یا صوتی', value:2 },
                    { icon:'mdi-message-video', title:'تصویری', value:3 },
                ],
                turnState:[
                    { icon:'mdi-alarm', title:'حالت تنظیم روزانه', subtitle:'تنظیمات اعمال شده بدون تکرار و فقط مختصص همین تاریخ خواهد بود', value:1 },
                    { icon:'mdi-timer', title:'تنظیم حالت اتوماتیک', subtitle:'نوبت ثبت شده در این هفته برای تمام هفته های بعد به طور متوالی خواهد بود', value:2 },
                ],
                headers: [
                    { iconTablet:'/assets/icons/doctor/checklist-b.png', icon:'/assets/icons/doctor/checklist-w.png', text: 'نوع ویزیت', align: 'center', value: 'type' },
                    { iconTablet:'/assets/icons/doctor/timer-c.png', icon:'/assets/icons/doctor/timer-w.png', text: 'بازه زمانی', value: 'date', align:'center' },
                    { iconTablet:'/assets/icons/doctor/calendar-c.png', icon:'/assets/icons/doctor/calendar-w.png', text: 'تاریخ', value: 'origin', align:'center' },
                    { iconTablet:'/assets/icons/doctor/price-tag-c.png', icon:'/assets/icons/doctor/price_tag-w.png', text: 'هزینه', align: 'start', value: 'status', align:'center' },
                    { icon:'/assets/icons/doctor/reservation.png', text: 'وضعیت', align: 'start', value: 'status', align:'center' },
                ],
                body:[
                    { type:'چت', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'چت صوتی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true  },
                    { type:'چت تصویری', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:false },
                    { type:'چت صوتی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:false  },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:false },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:false },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:false },
                    { type:'چت صوتی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true  },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'چت صوتی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true  },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true },
                    { type:'تماس تلفنی', timespan:'17:30 - 17:00', date:'1400/11/14', pay:'800.000 ریال', status:true }
                ],
                notifs:'4',
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
            openNotifs(){},
            pickDate () {
                alert(`${this.date}`)
            },
            getDate(){
                if (this.datePicker) {
                    console.log(this.datePicker)
                    this.steppers +=1
                }
                else{
                    window.alert('تاریخی را انتخاب نکرده اید')
                }
            },
            getTime(){
                if (this.beginTime && this.endTime) {
                    console.log(this.beginTime)
                    console.log(this.endTime)
                    this.steppers +=1
                }
                else{
                    window.alert('ساعتی را انتخاب نکرده اید')
                }
            },
            getVisitType(){
                if (this.activeRadio) {
                    this.steppers +=1
                }
                else{
                    window.alert('نوع ویزیت را انتخاب نکرده اید')
                }
            },
            getRangeTurn(){
                this.steppers +=1
            },
            back(){
                this.steppers -=1
            },
            onChange(e){
                console.log(this.selected)
            },
            getBeginTimeHour(v){
                this.beginTimeHour = v
            },
            getBeginTimeMinuts(v){
                this.beginTimeMinuts = v
            },
            getEndTimeHour(v){
                this.endTimeHour = v
            },
            getEndTimeMinuts(v){
                this.endTimeMinuts = v
            },
        }
    }
</script>

<style lang="scss" scoped>
.v-tab.v-tab {
    color: transparent !important;
}
.v-slide-group__next {
    display: none !important;
}

.v-slide-group__prev {
    display: none !important;
}

</style>