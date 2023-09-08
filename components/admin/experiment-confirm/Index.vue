<template>
    <section>
        <div class="medist-admin-middle-panel" v-if="!openChat">
            <div class="table">
                <!-- header  -->
                <div class="header">
                    <div class="column">
                        <div class="sorting">
                            <div class="text">وضعیت</div>
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
                            <div class="text">تاریخ</div>
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
                                    <img src="/assets/icons/admin/table/chat-tablet.png" alt="" class="chat-img ml-3 medist-cursor-pointer" @click="openChat = true">
                                    <div class="th" v-for="(th, j) in header.slice(1, 2)" :key="j">
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
                                                    <div class="text">{{ tr.docName }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.date }}</div>
                                                </div>
                                                <div class="column">
                                                    <div class="text">{{ tr.time }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="row">
                                                <div class="column" v-for="(item, j) in header.slice(0, 1)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text">{{ item.text }}</div>
                                                </div>
                                                <div class="column" v-for="(item, j) in header.slice(3, 4)" :key="j">
                                                    <img :src="item.iconTablet" alt="" class="img">
                                                    <div class="text">{{ item.text }}</div>
                                                </div>
                                                <div class="column" v-for="(item, j) in header.slice(2, 3)" :key="j">
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
                            <v-btn depressed class="btn">لغو نویت</v-btn>
                        </div>
                    </div>
                    <!-- end tablet size -->

                    <!-- windows size -->
                    <div class="windows-mode">
                        <div class="thead justify-space-between px-4">
                            <div class="th" style="width: unset" v-for="(th, i) in header" :key="i">
                                <img :src="th.icon" alt="" class="img">
                                <div class="text">{{ th.text }}</div>
                            </div>
                        </div>
                        <div class="tbody" style="max-height: 420px">
                            <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                                <div class="td" style="width:max-content">
                                    <img src="/assets/icons/admin/table/chat-g.png" alt="" class="ml-3 medist-cursor-pointer" @click="openChat = true">
                                    <div class="text">
                                        {{ tr.docName }}</div>
                                </div>
                                <div class="td" style="width:max-content">
                                    <div class="text">{{ tr.patientName }}</div>
                                </div>
                                <div class="td" style="width:max-content">
                                    <div class="text">{{ tr.time }}</div>
                                </div>
                                <div class="td" style="width:max-content">
                                    <div class="text">{{ tr.date }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cancel-section" style="height: 40px">
                        </div>
                    </div>
                    <!-- end windows size -->
                </div>
            </div>
        </div>
        <div class="medist-dashbaord-middle medist-chat-main" :class="width < 1024 ? 'medist-dashbaord-middle medist-chat-main' : 'medist-dashbaord-middle'" v-else>
            <!-- chat lists -->
            <div class="chat-lists" :style="width < 1024 && expand ? 'width:100%' : ''" :class="width < 768 && !expand ? 'd-none' : ''">
                <span class="medist-middle-panel-chevron-icon-chat-left" v-if="width < 1024" :class="width < 768 ? 'd-none' : ''">
                    <v-img src="/assets/images/chevron-left.png" @click="value == 1 ? expand =! expand : ''" />
                </span>

                <div class="header" :class="width < 1024 && !expand ? 'd-none' : ''">
                    <v-menu offset-y :close-on-content-click="false" content-class="list-menu">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn fab small depressed class="btn-tune" v-on="on" v-bind="attrs">
                                <v-icon color="#979898">mdi-tune</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense>
                                <v-list-item v-for="(item, i) in filterMenu" :key="i">
                                    <v-checkbox dense hide-details="" :label="item.label" />
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-text-field flat hide-details="" solo background-color="white" class="input" placeholder="جستجو..." append-icon="mdi-magnify" />
                </div>
                <div class="chat-users">
                    <v-list-item-group v-model="selectedContact">
                        <v-list-item v-for="(user, i) in chats" :key="i" 
                        @click="(768 < width < 1024) ? (getContact(user), expand = false) : (width < 768) ? (getContact(user), expand = true) : getContact(user)" 
                        tag="div" class="user">
                            <!-- <div class="user"> -->
                                <div class="avatar">
                                    <img :src="user.avatar" alt="">
                                    <div class="avatar-badge" v-if="user.active" />
                                </div>
                                <div class="text" :class="width < 1024 & !expand ? 'd-none' : 'text'">
                                    <div class="name">{{ user.fullName }}</div>
                                    <v-list-item-subtitle tag="div" class="subtext">{{ user.chatSub }}</v-list-item-subtitle>
                                </div>
                                <div class="status" :class="width < 1024 && !expand ? 'd-none' : 'status'">
                                    <div :class="user.status == 1 ? 'mode, active' : user.status == 2 ? 'mode, disactive' : 'd-none'">
                                        {{ user.status == 1 ? 'باز' : user.status == 2 ? 'خاتمه یافته' : '' }}
                                    </div>
                                    <div class="last-seen">{{ user.timeStamp }}</div>
                                </div>
                                <div :class="user.unRead ? 'badge' : 'badge-none'">{{ user.unRead }}</div>
                            <!-- </div> -->
                        </v-list-item>
                    </v-list-item-group>
                </div>
            </div>
            <!-- end chat lists -->

            <!-- chat content -->
            <div :style="width < 1024 && expand ? 'display: none' : ''" :class="selectedContact >= 0 ? 'chat-content' : 'empty-chat-content'" v-if="action == 'chating' || action =='minimizeVoiceCall' || action =='minimizeVideoCall'">

                <!-- chat toolbar -->
                <div class="chat-toolbar" v-if="selectedContact >= 0">
                    <div class="user-info">
                        <v-btn icon v-if="width < 768" @click="expand =! expand">
                            <v-icon>mdi-arrow-right-thin</v-icon>
                        </v-btn>
                        <img class="avatar" :src="chat.avatar" alt="">
                        <div class="text">
                            <div class="name">{{ chat.fullName }}</div>
                            <div class="status" :class="chat.active == 1 ? 'secondary--text' : chat.active == 2 ? 'red--text' : 'orange--text'">{{ chat.active == 1 ? 'آنلاین' : chat.active == 2 ? 'آفلاین' : 'مشغول' }}</div>
                        </div>
                    </div>
                    <div class="multimedia">
                        <img src="/assets/icons/patient/whatsapp.png" alt="" @click="action = 'voiceCall'">
                        <img src="/assets/icons/patient/video-message.png" alt="" @click="action = 'videoCall'">
                        <v-menu offset-y content-class="comment-menu" nudge-width="100%">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-on="on" v-bind="attrs" fab class="transparent" depressed small>
                                    <img src="/assets/icons/admin/dotts.png" alt="">
                                </v-btn>
                            </template>
                            <v-list color="white" class="list">
                                <img src="/assets/icons/admin/select-chat.png" alt="">
                                <div class="text" @click="selectChat =! selectChat">انتخاب پیام ها</div>
                            </v-list>
                            <v-list class="list">
                                <img src="/assets/icons/admin/end-chat.png" alt="">
                                <div class="text" @click="openChat = false">خاتمه چت</div>
                            </v-list>
                            <v-list class="list">
                                <img src="/assets/icons/admin/trash.png" alt="">
                                <div class="text" style="color:#ff2929">پاک کردن چت</div>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <!-- end chat toolbar -->

                <!-- chat main -->
                <div class="chat-main">
                    <!-- chating section -->
                        <v-list dense color="transparent" width="100%" class="chat-main-list" v-if="selectedContact >= 0">
                            <!-- text-chat -->
                            <v-list-item dense>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                                <v-col cols="auto" class="medist-chat-send-box">
                                    <li class="text">سلام حالت چطوره چخبر چکارا میکنی ؟</li>
                                    <li class="medist-chat-send-time-check-left">
                                        <v-icon color="white" x-small>mdi-check-all</v-icon>
                                        <small>17:00</small>
                                    </li>
                                </v-col>
                                <v-checkbox dense hide-details="" color="secondary" off-icon="mdi-circle" class="mt-n1" on-icon="mdi-check-circle" v-if="selectChat" />
                            </v-list-item>
                            <v-list-item dense class="justify-end">
                                <v-col cols="auto" class="medist-chat-receive-box">
                                    <li class="text">سلام فدات خودت چطوری ؟</li>
                                    <li class="medist-chat-send-time-check-right">
                                        <v-icon color="primary" x-small>mdi-check-all</v-icon>
                                        <small class="info--text">17:00</small>
                                    </li>
                                </v-col>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <!-- end text-chat -->

                            <!-- chat file -->
                            <v-list-item dense>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                                <v-col cols="auto" class="medist-chat-send-box">
                                    <v-icon color="white" large>mdi-file</v-icon>
                                    <div class="file-text">
                                        <div class="name">نام فایل</div>
                                        <div class="size">9میگابات ZIP</div>
                                    </div>
                                    <v-btn fab color="white" depressed small class="mr-3">
                                        <v-icon color="primary">mdi-arrow-down</v-icon>
                                    </v-btn>
                                    <span class="medist-chat-send-time-check-left">
                                        <v-icon color="white" x-small>mdi-check</v-icon>
                                        <small>17:00</small>
                                    </span>
                                </v-col>
                            </v-list-item>
                            <v-list-item dense class="justify-end">
                                <v-col cols="auto" class="medist-chat-receive-box">
                                    <v-btn fab color="primary" depressed small class="ml-3">
                                        <v-icon color="white">mdi-arrow-down</v-icon>
                                    </v-btn>
                                    <div class="file-text">
                                        <div class="name">نام فایل</div>
                                        <div class="size">9میگابات ZIP</div>
                                    </div>
                                    <v-icon color="primary" large>mdi-file</v-icon>
                                    <span class="medist-chat-send-time-check-right">
                                        <v-icon color="primary" x-small>mdi-check</v-icon>
                                        <small>17:00</small>
                                    </span>
                                </v-col>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <!-- end chat file -->

                            <!-- send voice -->
                            <v-list-item dense>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                                <v-col cols="auto" class="medist-chat-send-box">
                                    <li class="d-flex align-center">
                                        <ul class="pl-0">
                                            <v-btn fab x-small color="white" depressed class="ml-2">
                                                <v-icon color="primary">mdi-play</v-icon>
                                            </v-btn>
                                        </ul>
                                        <ul class="pl-0">
                                            <v-slider hide-details min="-100" max="0" style="width: 200px !important" class="medist-rating-direction-ltr" thumb-color="white" track-fill-color="white" track-color="white" />
                                        </ul>
                                    </li>
                                    <li class="medist-chat-send-time-check-left">
                                        <v-progress-circular :width="1" size="8" button color="white" indeterminate class="mx-2" />
                                        <small>17:00</small>
                                    </li>
                                </v-col>
                            </v-list-item>
                            <v-list-item dense class="justify-end">
                                <v-col cols="auto" class="medist-chat-receive-box">
                                    <li class="d-flex align-center">
                                        <ul class="pl-2">
                                            <v-slider hide-details min="-100" max="0" style="width: 200px !important" class="medist-rating-direction-ltr" thumb-color="primary" track-fill-color="primary" track-color="primary" />
                                        </ul>
                                        <ul class="pl-0">
                                            <v-btn fab x-small color="primary" depressed>
                                                <v-icon>mdi-play</v-icon>
                                            </v-btn>
                                        </ul>
                                    </li>
                                    <li class="medist-chat-send-time-check-right">
                                        <v-progress-circular :width="1" size="8" button color="primary" indeterminate class="mx-2" />
                                        <small class="info--text">17:00</small>
                                    </li>
                                </v-col>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <!-- end send voice -->

                            <!-- send voice -->
                            <v-list-item dense>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                                <v-col cols="auto" class="medist-chat-send-box">
                                    <li class="d-flex align-center">
                                        <ul class="pl-0">
                                            <v-btn fab x-small color="white" depressed class="ml-2">
                                                <v-icon color="primary">mdi-play</v-icon>
                                            </v-btn>
                                        </ul>
                                        <ul class="pl-0">
                                            <v-slider hide-details min="-100" max="0" style="width: 200px !important" class="medist-rating-direction-ltr" thumb-color="white" track-fill-color="white" track-color="white" />
                                        </ul>
                                    </li>
                                    <li class="medist-chat-send-time-check-left">
                                        <v-progress-circular :width="1" size="8" button color="white" indeterminate class="mx-2" />
                                        <small>17:00</small>
                                    </li>
                                </v-col>
                            </v-list-item>
                            <v-list-item dense class="justify-end">
                                <v-col cols="auto" class="medist-chat-receive-box">
                                    <li class="d-flex align-center">
                                        <ul class="pl-2">
                                            <v-slider hide-details min="-100" max="0" style="width: 200px !important" class="medist-rating-direction-ltr" thumb-color="primary" track-fill-color="primary" track-color="primary" />
                                        </ul>
                                        <ul class="pl-0">
                                            <v-btn fab x-small color="primary" depressed>
                                                <v-icon>mdi-play</v-icon>
                                            </v-btn>
                                        </ul>
                                    </li>
                                    <li class="medist-chat-send-time-check-right">
                                        <v-progress-circular :width="1" size="8" button color="primary" indeterminate class="mx-2" />
                                        <small class="info--text">17:00</small>
                                    </li>
                                </v-col>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <!-- end send voice -->
                            <!-- send image -->
                            <v-list-item dense>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                                <v-col cols="auto" class="medist-chat-send-box">
                                    <v-icon color="white" large>mdi-file</v-icon>
                                    <div class="file-text">
                                        <div class="name">عکس مدرک</div>
                                        <div class="size">670 کیلوبایت JPG</div>
                                    </div>
                                    <img src="/assets/images/doctor.png" alt="" class="img">
                                    <span class="medist-chat-send-time-check-left">
                                        <v-icon color="white" x-small>mdi-check</v-icon>
                                        <small>17:00</small>
                                    </span>
                                </v-col>
                            </v-list-item>
                            <v-list-item dense class="justify-end">
                                <v-col cols="auto" class="medist-chat-receive-box">
                                    <img src="/assets/images/doctor.png" alt="" class="img">
                                    <div class="file-text">
                                        <div class="name">عکس مدرک</div>
                                        <div class="size">670 کیلوبایت JPG</div>
                                    </div>
                                    <v-icon color="primary" large>mdi-file</v-icon>
                                    <span class="medist-chat-send-time-check-right">
                                        <v-icon color="white" x-small>mdi-check</v-icon>
                                        <small>17:00</small>
                                    </span>
                                </v-col>
                                <v-list-item-avatar size="47" class="align-self-start">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-list>
                    <!-- end chating section -->
                </div>
                <!-- end chat main -->

                <!-- chat action -->
                <div class="chat-action" v-if="selectedContact >= 0">
                    <div v-if="chat.status == 1 && value == 1" class="chating">
                        <v-btn depressed class="dowload">
                            <img src="/assets/icons/admin/download.png" alt="">
                            دریافت آزمایش
                        </v-btn>
                        <v-btn depressed class="reject">رد آزمایش</v-btn>
                        <v-btn depressed class="confirm">تایید آزمایش</v-btn>
                    </div>


                    <div class="chating" v-if="action == 'chating' && chat.status == 2">
                        <div class="disactive-chat">
                            <div class="text">غیر فعال بودن ارسال پیام</div>
                        </div>
                    </div>

                    <div class="chating" v-if="action == 'chating' && chat.status == 3">

                    </div>

                </div>
                <!-- end chat action -->
            </div>

            <!-- voice call -->
            <div class="voice-call" v-if="action == 'voiceCall'">
                <v-btn class="minimizeBtn" icon @click="action = 'minimizeVoiceCall', 'chating'">
                    <v-icon color="white">mdi-minus-circle</v-icon>
                </v-btn>
                <div class="user-info">
                    <!-- <img class="avatar" :src="chat ? chat.avatar : '/assets/images/avatar.png'" alt=""> -->
                    <img class="avatar" :src="'/assets/images/avatar.png'" alt="">
                    <!-- <div class="name">{{ chat ? chat.fullName : 'دکتر سعید قادری' }}</div> -->
                    <div class="name">دکتر سعید قادری</div>
                    <div class="timer">12:28</div>
                </div>
                <div class="actions">
                    <v-btn fab depressed class="volume">
                        <v-icon size="28">mdi-volume-high</v-icon>
                    </v-btn>
                    <v-btn fab depressed class="microphone">
                        <v-icon size="28">mdi-microphone-off</v-icon>
                    </v-btn>
                    <v-btn fab depressed class="phone-off" @click="action = 'chating'">
                        <v-icon size="28">mdi-phone-off</v-icon>
                    </v-btn>
                </div>
            </div>
            <!-- end voice call -->

            <!-- video call -->
            <div class="video-call" v-if="action == 'videoCall'">
                <v-btn icon class="minimizeBtn" @click="action = 'minimizeVideoCall', 'chating'">
                    <v-icon color="#474747">mdi-minus-circle</v-icon>
                </v-btn>
                <video class="video-call-full" src="video" autoplay />
                <div class="video-call-small">
                    <video src="video1" autoplay />
                </div>
                <div class="actions">
                    <v-btn fab depressed class="phone-off" @click="action = 'chating'">
                        <v-icon size="28">mdi-phone-off</v-icon>
                    </v-btn>
                    <v-btn fab depressed class="microphone">
                        <v-icon size="28">mdi-microphone-off</v-icon>
                    </v-btn>
                </div>
            </div>
            <!-- end video call -->
            <!-- end chat content -->
        </div>
        <!-- calendar dialog -->
        <v-dialog v-model="dialog" width="623" persistent>
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false"/>
        </v-dialog>
        <!-- end calendar dialog -->
        <v-dialog v-model="imageDialog" persistent width="915">
            <div class="image-dialog">
                <div class="toolbar">
                    <img src="/assets/icons/close_window.png" alt="" class="btn mr-6 ml-3" @click="imageDialog = false">
                    <img src="/assets/icons/downloads.png" alt="" class="btn">
                </div>
                <div class="image-preview">
                    <img src="https://picsum.photos/1920/1080" alt="" class="image">
                </div>
            </div>
        </v-dialog>
    </section>
</template>

<script>
    export default {
        mounted(){
            this.value = 1
            this.handleResize()
            this.$nextTick(()=>{
                window.addEventListener('resize', this.handleResize)
            })
            this.action = 'chating'
            this.expand = true
        },
        data(){
            return{
                radioGroup:null,
                avatar:'/assets/images/avatar.png',
                value:[1,2,3,4,5,6,7,8,9],
                action:['chating','showCase', 'allCase', 'uploadFile', 'minimizeVoiceCall', 'minimizeVideoCall', 'voiceChat', 'videoChat', 'record', 'stopRecord', 'minimized', 'voiceCall', 'videoCall', 'newCase', 'allCase'],
                selectedContact:-1,
                chuncks: [],
                dialog: null,
                rateDialog:null,
                imageDialog:null,
                rating:null,
                snackbar: false,
                texting:null,
                selectChat:false,
                expand:null,
                chevron:'/assets/images/chevron.png',
                chat:{},
                cases:[],
                uploadFile:false,
                file:null,
                recordVoice:false,
                sendRecord:false,
                width:null,
                openChat:false,
                chats:[
                    { fullName:'مجید عطائی', avatar:'/assets/images/avatar.png', status:1, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ', unRead:'21', active: 1 },
                    { fullName:'محسن طالبی', avatar:'/assets/images/avatar.png', status:2, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ', active: 3 },
                    { fullName:'سعید قادری', avatar:'/assets/images/avatar.png', status:1, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ', unRead:'10', active : 2 },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:2, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:2, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:2, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:2, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },
                    { fullName:'قربانعلی جعفری', avatar:'/assets/images/avatar.png', status:3, timeStamp:'16 دقیقه قبل', chatSub:'سلام حالتون چطوره... ' },

                ],
                filterMenu:[
                    { label:'امروز' },
                    { label:'چت هار باز' },
                    { label:'چت های بسته' },
                    { label:'کل چت ها' }
                ],
                headerMenu:[
                    { text:'امروز', value:0 },
                    { text:'دیروز', value:1 },
                ],
                headerMenu1:[
                    { text:'تایید شده', value:0 },
                    { text:'تایید نشده', value:1 },
                    { text:'همه', value:2 },
                ],
                header:[
                    { text:'نام پزشک', value:'docName', iconTablet:'/assets/icons/admin/table/doctor-c.png', icon:'/assets/icons/admin/table/doctor-w.png' },
                    { text:'نام بیمار', value:'patientName', iconTablet:'/assets/icons/admin/table/patient-b.png', icon:'/assets/icons/admin/table/username-w.png' },
                    { text:'زمان نوبت', value:'time', iconTablet:'/assets/icons/admin/table/timer-c.png', icon:'/assets/icons/admin/table/timer-w.png' },
                    { text:'تاریخ شروع و پایان نوبت', value:'date', iconTablet:'/assets/icons/admin/table/calendar-c.png', icon:'/assets/icons/admin/table/calendar-w.png' },
                ],
                body:[
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                    { docName:'سعید قادری', patientName:'بیمار', time:'21:33', date:'1400/12/12 - 1400-12-13' },
                ],
            }
        },
        watch:{
            width(N, O){
                if (N < 768) {
                    console.log(this.expand)
                    console.log(N)
                }
                if (N > 1024) {
                    this.expand = true
                }
            }
        },
        methods:{
            handleResize(){
                this.width = window.innerWidth
            },
            pickFile(){
                document.getElementById('file_input').click()
            },
            uploadFile(e){
                console.log(e)
                this.imagePreview = URL.createObjectURL(this.file_input)
            },
            startRecord(){
                this.isRecording = true
                this.chating = false
                navigator.mediaDevices.getUserMedia({ audio: true })
                .then(mediaStream =>{
                    const mediaRecorder = new MediaRecorder(mediaStream)
                    mediaRecorder.start()
                    mediaRecorder.addEventListener('dataAvailable', event =>{
                        this.chuncks.push(event)
                    })
                    console.log(this.chuncks)
                })
            },
            stopRecord(){
                this.stopRecord = true
                // navigator.mediaDevices.getUserMedia({ audio: true })
                // .then(mediaStream =>{
                //     const mediaRecorder = new MediaRecorder(mediaStream)
                //     mediaRecorder()
                // })
            },
            videoCall(){
                this.mediaStream = true
                this.chating = false
                // console.log(this.mediaStream)
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(mediaStream => {
                    this.$refs.video.srcObject = mediaStream;
                    this.$refs.video.play()
                    this.$refs.video1.srcObject = mediaStream;
                    this.$refs.video1.play()
                    this.mediaStream = mediaStream                
                }) 
            },
            stopVideoCall(){
                // console.log(this.mediaStream)
                let tracks = this.$refs.video.srcObject.getTracks()
                tracks.forEach(track =>{
                    track.stop()
                })
                let tracks1 = this.$refs.video1.srcObject.getTracks()
                tracks1.forEach(track =>{
                    track.stop()
                })
                this.disactiveAll()
                this.mediaStream = false
            },
            mute(){
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            },
            getContact(i){
                if (this.action == 'minimizeVoiceCall' || this.action == 'minimizeVideoCall' || this.action == 'voiceChat' || this.action == 'videoChat' || this.action == 'record' ||this.action == 'stopRecord' || this.action == 'voiceCall') {
                    return
                }
                else{
                    this.chat = i
                    console.log(this.chat)
                }
            },
            endChat(){
                
            },
            sendMessage(e){
                let option = { weekday: 'long'}
                let date = new Date().toLocaleDateString('fa-IR')
                let time = new Date().toLocaleTimeString('fa-IR')
                if (this.message) {
                    this.messages.push({
                        text: this.message,
                        date: date,
                        time: time,
                        avatar: this.chat.avatar,
                        img: this.file_input,
                        file: this.file_input,
                        // voice: voice
                    })
                    this.snackbar = true
                }
                if(e.ctrlKey){
                    console.log('new line')
                }
                this.message = null
            },
            newLine(){
                this.message + "\n"
            },
            captureImage() {
                const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
                const imageCapture = new window.ImageCapture(mediaStreamTrack)
                let reader = new FileReader();
                return imageCapture.takePhoto().then(blob => {
                    reader.readAsDataURL(blob)
                    reader.onload = () => {
                        this.imageData.image = reader.result;
                    }
                })  
            },
            uploadImage() {
                axios({ method: "POST", "url": API_IMAGE_ENDPOINT, "data": this.imageData})
                        .then(response => {
                            this.response = response.data;    
                        })
            },
            rotateImage() {
            this.imageData.image_orientation = this.imageData.image_orientation + 90; 
            },
            cancelImage() {
                this.imageData.image = null;
                this.showCameraModal = true;
                navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                        this.$refs.video.srcObject = mediaStream;
                        this.$refs.video.play()
                        this.mediaStream = mediaStream                   
                }) 
            },
            addnewCase(){
                if (this.texting) {
                    this.cases.push({
                        header:'',
                        text: this.texting
                    })
                }
            },
            accessPatientCase(){},
            endDispute(){},
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.handleResize)
        }
    }
</script>

<style lang="scss" scoped>

</style>