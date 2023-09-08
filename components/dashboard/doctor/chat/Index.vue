<template>
    <section>
        <div class="medist-dashbaord-middle medist-chat-main" :class="width < 1024 ? 'medist-dashbaord-middle medist-chat-main' : 'medist-dashbaord-middle'">
            <!-- <span class="medist-middle-panel-chevron-icon-chat-doctor">
                <v-img :src="chevron" />
            </span> -->
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
                        <v-list-item v-for="(user, i) in chats" :key="i" @click="(768 < width < 1024) ? (getContact(user), expand = false) : (width < 768) ? (getContact(user), expand = true) : getContact(user)" tag="div" class="user">
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
                        <img src="/assets/icons/patient/sms.png" alt="">
                        <v-menu offset-y content-class="comment-menu" nudge-width="100%">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-on="on" v-bind="attrs" fab class="transparent" depressed small>
                                    <img src="/assets/icons/admin/dotts.png" alt="">
                                </v-btn>
                            </template>
                            <v-list color="white" class="list" dense>
                                <img src="/assets/icons/add-new-case.png" alt="">
                                <div class="text" @click="value = 5">ایجاد پرونده جدید</div>
                            </v-list>
                            <v-list color="white" class="list" dense>
                                <img src="/assets/icons/access-to-cases.png" alt="">
                                <div class="text" @click="value = 6">دسترسی به پرونده های بیمار</div>
                            </v-list>
                            <v-list color="white" class="list" dense>
                                <img src="/assets/icons/end-chat.png" alt="">
                                <div class="text" style="color:#ff2929" @click="chat.status = 2">خاتمه چت</div>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <!-- end chat toolbar -->

                <!-- chat main -->
                <div class="chat-main">
                    <div class="minimize-record" v-if="action == 'minimizeVoiceCall'" @click="action = 'voiceCall'">
                        <div class="voice-record-minimize">
                            <div class="text">تماس صوتی</div>
                            <div class="timer">
                                05:59
                                <v-icon size="25" color="#f94f4f">mdi-record</v-icon>
                            </div>
                        </div>
                    </div>
                    <div class="minimize-record" v-if="action == 'minimizeVideoCall'" @click="action = 'videoCall'">
                        <div class="video-call-minimize">
                            <div class="text">تماس تصویری</div>
                            <div class="timer">
                                05:59
                                <v-icon size="25" color="#f94f4f">mdi-record</v-icon>
                            </div>
                        </div>
                    </div>
                    <!-- chating section -->
                    <v-list dense color="transparent" class="chat-main-list" v-if="selectedContact >= 0">
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
                                <v-btn fab color="white" depressed small class="download-btn">
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
                                <v-btn fab depressed color="primary" small class="btn">
                                    <img src="/assets/icons/downloading_updates.png" alt="">
                                </v-btn>
                                <div class="file-text">
                                    <div class="name">نام فایل</div>
                                    <div class="size">9میگابات ZIP</div>
                                </div>
                                <v-icon color="primary" large>mdi-file</v-icon>
                                <li class="medist-chat-send-time-check-right">
                                    <v-icon color="primary" x-small>mdi-check</v-icon>
                                    <small class="info--text">17:00</small>
                                </li>
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
                                <img src="/assets/images/doctor.png" alt="" class="img" @click="imageDialog = true">
                                <span class="medist-chat-send-time-check-left">
                                    <v-icon color="white" x-small>mdi-check</v-icon>
                                    <small>17:00</small>
                                </span>
                            </v-col>
                        </v-list-item>
                        <v-list-item dense class="justify-end">
                            <v-col cols="auto" class="medist-chat-receive-box">
                                <img src="/assets/images/doctor.png" alt="" class="img" @click="imageDialog = true">
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
                        <img class="send" src="/assets/icons/patient/send.png" alt="">
                        <div class="input">
                            <v-textarea solo-inverted rows="1" hide-details="" no-resize background-color="white" class="input" flat placeholder="تایپ کنید ..." />
                            <img src="/assets/icons/patient/microphone.png" alt="" @click="value = 2">
                            <img src="/assets/icons/patient/link.png" alt="" @click="value = 4">
                            <img src="/assets/icons/patient/emoji.png" alt="">
                        </div>
                    </div>

                    <!-- record voice -->
                    <div class="record-voice" v-if="chat.status == 1 && value == 2">
                        <img class="send" src="/assets/icons/patient/send.png" alt="">
                        <div class="content">
                            <img class="stop" src="/assets/icons/patient/stop-record.png" alt="" @click="value = 3">
                            <div class="text" @click="value = 1">لغو کردن</div>
                            <div class="pause">
                                <div class="text">01:56</div>
                                <img  class="pause" src="/assets/icons/patient/pause-record.png" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="send-record" v-if="chat.status == 1 && value == 3">
                        <img class="send" src="/assets/icons/patient/send.png" alt="">
                        <div class="content">
                            <div class="record-content">
                                <v-slider class="slider" hide-details="" min="-100" max="0" thumb-color="white" track-fill-color="white" track-color="white" />
                                <v-btn icon class="play-btn">
                                    <v-icon size="30">mdi-play</v-icon>
                                </v-btn>
                            </div>
                            <v-btn icon class="trash-btn" @click="value = 1">
                                <v-icon size="30">mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    
                    <!-- end record voice -->

                    <!-- Upload File -->
                    <div class="uplaod-file" v-if="value == 4">
                        <v-btn class="close-action" fab depressed @click="value = 1">
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn>
                        <div class="content">
                            <v-row class="scroll ma-0" justify="center">
                                <v-col cols="12" sm="4" xs="6">
                                    <v-card flat class="camera-card" @click="action = 'videoCall', uploadFile = false">
                                        <v-icon color="primary" size="40">mdi-camera</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col v-for="(item, i) in 5" :key="i" cols="12" sm="4" xs="6">
                                    <v-card flat color="card">
                                        <v-img class="img" :src="`https://picsum.photos/500/300?image=${ i * 5 + 10 }`">
                                            <v-radio-group v-model="radioGroup" class="radio">
                                                <v-radio :value="i" on-icon="mdi-check-circle-outline" off-icon="mdi-checkbox-blank-circle-outline" />
                                            </v-radio-group>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>    
                        <div class="actions">
                            <v-file-input hide-input prepend-icon="" append-icon="" id="file_input" v-model="file" @change="uploadFile($event)" />
                            <img src="/assets/icons/patient/send.png" alt="">
                            <v-spacer />
                            <v-btn class="btn" depressed @click="pickFile">
                                انتخاب از فایل ها
                                <v-icon class="mr-2">mdi-folder-open</v-icon>
                            </v-btn>
                            <v-btn class="btn" depressed>
                                انتخاب از گالری
                                <v-icon class="mr-2">mdi-folder-multiple-image</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <!-- End Upload File -->

                    <!-- add new case -->
                    <div class="add-new-case" v-if="chat.status == 1 && value == 5">
                        <div class="content">
                            <img src="/assets/icons/close-circle.png" alt="" class="close-btn" @click="value = 1, texting = ''">
                            <v-card flat class="text-area">{{ texting }}</v-card>
                            <div class="texting-action">
                                <v-textarea solo flat hide-details="" class="input" no-resize rows="1" v-model="texting" />
                                <img src="/assets/icons/floppy-disk.png" alt="" @click="addnewCase(), value = 6">
                            </div>
                        </div>
                    </div>
                    <!-- end add new case -->
                    <!-- show all case -->
                    <div class="show-all-case" v-if="chat.status == 1 && value == 6">
                        <div class="content">
                            <img src="/assets/icons/close-circle.png" alt="" class="close-btn" @click="value = 1">
                            <div class="font-lg red--text text-center" v-if="!cases.length">بیمار پرونده ثبت شده ای ندارد</div>
                            <v-row class="ma-0 w-100 row">
                                <v-col cols="12" sm="4" xs="6" v-for="(item, i) in cases" :key="i">
                                    <div class="head">پرونده {{ i+1 }}</div>
                                    <div class="card">
                                        <div class="text">{{ item.text }}</div>
                                        <v-btn depressed class="btn">مشاهده کامل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="sliders">
                                <v-btn fab small depressed class="slider-btn">
                                    <v-icon large>mdi-chevron-right</v-icon>
                                </v-btn>
                                <div class="text">شمارنده صفحه</div>
                                <v-btn fab small depressed class="slider-btn">
                                    <v-icon large>mdi-chevron-left</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <!-- end show all case -->

                    <div class="chating" v-if="action == 'chating' && chat.status == 2">
                        <div class="disactive-chat">
                            <div class="text">غیر فعال بودن ارسال پیام</div>
                        </div>
                        <v-btn depressed class="btn">
                            <img src="/assets/icons/link.png" alt="">
                            <span>ارسال آزمایش</span>
                        </v-btn>
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


        <!-- rateing dialog -->
        <v-dialog v-model="rateDialog" persistent width="715">
            <v-btn depressed x-small fab width="46" height="46" color="primary" @click="rateDialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="rateDialog">
                <div class="user-avatar">
                    <img :src="chat.avatar" alt="" class="avatar">
                    <div class="text">
                        <div class="name">{{ chat.fullName }}</div>
                        <div class="expert">{{ chat.fullName }} نوغ تخصص</div>
                    </div>
                </div>
                <div class="rate">
                    <div class="text">امتیاز شما به این پزشک از 5 :{{ rating }}</div>
                    <v-rating dense v-model="rating" open-delay="" class="medist-rating-direction-ltr" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                </div>
                <div class="comment">
                    <div class="head">نظر خود را در باره این پزشک برای ما بنویسید</div>
                    <v-textarea class="textarea" no-resize flat solo placeholder="چیزی تایپ کنید..." />
                </div>
                <div class="action">
                    <v-btn depressed class="submit" @click="rateDialog = false">ثبت امتیاز</v-btn>
                </div>
            </div>
        </v-dialog>
        <!-- end rating dialog -->
        <!-- chat dialog -->
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
        <!-- end chat dialog -->
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
                expand:null,
                chevron:'/assets/images/chevron.png',
                chat:{},
                cases:[],
                uploadFile:false,
                file:null,
                recordVoice:false,
                sendRecord:false,
                width:null,
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
                ]
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