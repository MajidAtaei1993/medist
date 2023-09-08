<template>
    <section class="medist-special-expert medist-journal">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="items">
                <template v-slot:divider>
                    <img src="/assets/icons/breadcrumbs.png" alt="">
                </template>
            </v-breadcrumbs>
        </div>
        <div class="body">
            <!-- right panel -->
            <div class="right">
                <div class="banner">
                    <div class="medist-ribbon">
                        <span></span>
                    </div>
                    <div class="content">
                        <div class="right">
                            <img :src="doctorArm" alt="" class="banner-img">
                        </div>
                        <div class="left">
                            <div class="head">
                                <div class="text">{{ doctor.name }}</div>
                                <div class="subtext">{{ doctor.expert }}</div>
                            </div>
                            <div class="row">
                                <div class="column">
                                    <div class="right">
                                        <img src="/assets/icons/public/number-format.png" alt="" class="img">
                                        نظام پزشکی
                                    </div>
                                    <div class="left">{{ doctor.Id }}</div>
                                </div>
                                <div class="column">
                                    <div class="right">
                                        <img src="/assets/icons/public/star.png" alt="" class="img">
                                        امتیاز
                                    </div>
                                    <div class="left">
                                        <v-rating dense v-model="doctor.rate" class="medist-rating-direction-ltr" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                                        {{ doctor.rate }}
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="right">
                                        <img src="/assets/icons/public/list-thumbnail.png" alt="" class="img">
                                        اولین نوبت در دسترس
                                    </div>
                                    <div class="left">{{ doctor.date }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="head">
                        <img src="/assets/icons/doctor/study.png" alt="" class="img">
                        <div class="text">پست های من</div>
                        <v-btn fab small color="primary" depressed @click="showPostDetail = false" v-if="showPostDetail" class="mr-auto">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </div>
                    <div class="row" v-if="!showPostDetail">
                        <v-col cols="4" class="pa-1" v-for="(item, i) in posts" :key="i">
                            <div class="card">
                                <div class="overlay">
                                    <div class="like-commnet">
                                        <div class="like">
                                            <v-icon small color="white">mdi-heart</v-icon>
                                            122
                                        </div>
                                        <div class="comment">
                                            <v-icon small color="white">mdi-comment-text-multiple-outline</v-icon>
                                            50
                                        </div>
                                    </div>
                                    <div class="post">
                                        <div class="post-title">عنوان پست</div>
                                        <div class="post-desc">
                                            <span>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                            </span>
                                            <v-btn class="btn-gradiant" color="primary" fab x-small depressed @click="showPostDetail = true">
                                                <v-icon>mdi-arrow-left-thin</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                                <img :src="item.img+`?item=${item * 5 + 10}`" alt="" class="img" v-if="item.img">
                                <video src="/assets/video/video.mp4" autoplay class="video" muted v-if="item.video" />
                            </div>
                        </v-col>
                    </div>
                    <div v-else class="row-full-width">
                        <!-- <img :src="doctorArm" alt="" class="img"> -->
                        <div class="video"
                            :playsinline="true"
                            ref="videoPlayer"
                            @ready="playerReadied"
                            v-video-player:myVideoPlayer="playerOptions">
                        </div>
                        <!-- <video controls autoplay class="video">
                            <source src="/assets/video/video.mp4" type="video/mp4">
                            <source src="/assets/video/video.mp4" type="video/ogg">
                        </video> -->
                        <div class="show-details" v-if="showPostDetail">
                            <div class="content">
                                <div class="head">
                                    <div class="text">عنوان پست</div>
                                </div>
                                <div class="desc">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                </div>
                                <div class="actions">
                                    <v-btn icon color="acccent1" @click="like =! like">
                                        <v-icon :color="like ? '#a83f39' : ''">{{ like ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
                                    </v-btn>
                                    <div class="like-counter">122 like</div>
                                    <div class="comment-date">2 days ago</div>
                                    <div class="head">نظرات کاربران</div>
                                </div>
                                <div class="reviews">
                                    <div class="review" v-for="(item, i) in 6" :key="i">
                                        <div class="user-avatar">
                                            <img src="/assets/images/avatar.png" alt="" class="avatar">
                                        </div>
                                        <div class="text">
                                            <div class="name">سعید قادری</div>
                                            <div class="desc">مجید خیلی پسر خوبیه مگه نه سعید ؟</div>
                                            <!-- <div class="date">1401/03/04</div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="add-comment">
                                <v-text-field append-icon="mdi-emoticon-neutral" solo flat class="input" hide-details="" background-color="white" prepend-icon="mdi-send-circle" placeholder="white something ..." @click:prepend="sendMessage()" @click:append="openEmojiDailog" @keydown:enter="sendMessage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end right panel -->
            <!-- left panel -->
            <div class="left">
                <div class="consulting-mode">
                    <div class="head">انتخاب روش مشاوره</div>
                    <v-radio-group row v-model="activeRadio" class="radio-group">
                        <ul v-for="(type, i) in visitType" :key="i" class="radio">
                            <v-radio color="primary" class="ml-1" :value="type.value" dense />
                            <label :class="type.value == activeRadio ? 'primary--text' : '' " class="label" :for="type.title">{{ type.title }}</label>
                        </ul>
                    </v-radio-group>
                    <div class="row">
                        <div class="column">
                            <div class="right">
                                <v-icon class="ml-2">mdi-timer</v-icon>
                                زمان پاسخگویی:
                            </div>
                            <div class="left">40دقیقه</div>
                        </div>
                        <div class="column">
                            <div class="right">
                                <v-icon class="ml-2">mdi-timetable</v-icon>
                                زمان انتظار:
                            </div>
                            <div class="left">20 دقیقه</div>
                        </div>
                        <div class="column">
                            <div class="right">
                                <v-icon class="ml-2">mdi-label-outline</v-icon>
                                مبلغ:
                            </div>
                            <div class="left">100.000 ریال</div>
                        </div>
                    </div>
                    <v-btn class="btn" depressed @click="turnDialog = true">رزرو اولین نوبت در دسترس</v-btn>
                </div>
                <v-btn depressed class="reserve-btn" @click="matabDialog = true">رزرو نوبت مطب</v-btn>
                <div class="resome-slider">
                    <div class="head">
                        <img src="/assets/icons/public/resome-reading.png" alt="">
                        <div class="text">رزومه پزشک</div>
                    </div>
                    <div class="desc">
                        <tiptap-vuetify class="mt-2 font-normal w-100" v-model="textBody" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }">
                        </tiptap-vuetify>
                    </div>
                    <div class="arrows">
                        <v-btn class="btn" depressed fab @click="page -=1" :disabled="page<2">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        <div class="text">
                            صفحه{{ page }} از 4
                        </div>
                        <v-btn class="btn" depressed fab @click="page +=1" :disabled="page>3">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </div>
                    <div class="delimeter">
                        <span :class="page == 1 ? 'medist-resome-slider-active' : 'medist-resome-slider'" />
                        <span :class="page == 2 ? 'medist-resome-slider-active' : 'medist-resome-slider'" />
                        <span :class="page == 3 ? 'medist-resome-slider-active' : 'medist-resome-slider'" />
                        <span :class="page == 4 ? 'medist-resome-slider-active' : 'medist-resome-slider'" />
                    </div>
                </div>
                <div class="location">
                    <div class="head">
                        <img src="/assets/icons/public/location.png" alt="" class="img">
                        <div class="text">آدرس</div>
                    </div>
                    <div class="desc">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                    </div>
                    <div class="action">
                    </div>
                </div>
                <v-btn class="elctronic-btn" depressed>
                    <img src="/assets/icons/public/question-w.png" alt="">
                    نسخه الکترونیک چیست
                </v-btn>
            </div>
            <!-- end left panel -->
        </div>
        <DoctorsSlider />
        <last-posts class="last-post" />
        <div class="prospects">
            <div class="head">دیدگاه خود را بنویسید</div>
            <div class="prospect-main">
                <div class="row1">
                    <div>
                        <li class="text">نام و نام خانوادگی</li>
                        <v-text-field hide-details="" background-color="white" class="input" filled rounded />
                    </div>
                    <div>
                        <div class="text">شماره تماس</div>
                        <v-text-field hide-details="" background-color="white" class="input" filled rounded />
                    </div>
                </div>
                <div class="row2">
                    <div class="text">متن خود را وارد کنید</div>
                    <v-textarea filled rounded background-color="white" name="" id="" no-resize class="textarea" />
                </div>
                <v-btn depressed class="btn">ثبت نظر</v-btn>
            </div>
            <div class="prospect-total">
                <img src="/assets/icons/public/chat.png" alt="">
                <div class="text">نظرات</div>
            </div>
            <div class="text">{{ totalProspect }} دیدگاه ثبت شده است</div>
            <div class="prospect">
                <div class="prospect-user">
                    <img :src="avatar" alt="" class="avatar">
                    <div class="text">
                        <div class="name">سعید قادری</div>
                        <div class="date">12شهریور، ساعت 12:20</div>
                    </div>
                </div>
                <div class="desc">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
                </div>
                <div class="actions">
                    <div class="likes">
                        <img src="/assets/icons/public/like-gray.png" alt="">
                        <img src="/assets/icons/public/dislike-gray.png" alt="">
                    </div>
                    <v-btn class="btn" depressed>پاسخ دادن</v-btn>
                </div>
            </div>
            <div class="prospect-admin">
                <div class="prospect-user">
                    <img :src="avatar" alt="" class="avatar">
                    <div class="text">
                        <div class="name">مدیست</div>
                        <div class="date">12شهریور، ساعت 12:20</div>
                    </div>
                </div>
                <div class="desc">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
                </div>
                <div class="actions">
                    <div class="likes">
                        <img src="/assets/icons/public/like-gray.png" alt="">
                        <img src="/assets/icons/public/dislike-gray.png" alt="">
                    </div>
                    <v-btn class="btn" depressed>پاسخ دادن</v-btn>
                </div>
            </div>
        </div>
        <!-- turn dialog -->
        <v-dialog v-model="turnDialog" persistent content-class="medist-special-dialog">
            <v-btn depressed small fab color="primary" @click="turnDialog = false" class="close-btn">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="content" v-if="reserveFirst == 0">
                <div class="card-title">
                    <img :src="doctorArm1" alt="" class="img">
                </div>
                <div class="card-text">
                    <v-row>
                        <v-col cols="12" class="d-flex align-center justify-space-between">
                            <div class="text">
                                <img src="/assets/icons/doctor/medical_doctor.png" alt="">
                                <span>نام پزشک</span>
                            </div>
                            <div class="name">سعید قادری</div>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center justify-space-between">
                            <div class="text">
                                <img src="/assets/icons/doctor/dna-b.png" alt="">
                                <span>تخصص</span>
                            </div>
                            <div class="name">مغز و اعصاب</div>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center justify-space-between">
                            <div class="text">
                                <img src="/assets/icons/doctor/calendar.png" alt="">
                                <span>تاریخ نویت</span>
                            </div>
                            <div class="name">1400/12/14</div>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center justify-space-between">
                            <div class="text">
                                <img src="/assets/icons/doctor/time-b.png" alt="">
                                <span>زمان نوبت</span>
                            </div>
                            <div class="name">04:53</div>
                        </v-col>
                    </v-row>
                </div>
                <div class="card-action">
                    <v-btn depressed  class="btn-outline">مشاده تمام نوبت ها</v-btn>
                    <v-btn depressed class="btn" @click="reserveFirst = 1">تایید</v-btn>
                </div>
            </div>
            <div class="content-one" v-if="reserveFirst == 1">
                <div class="text">
                    نوبت با موفقیت برای بیمار نرگس یوسفی برای تاریخ 1400/10/19 ساعت 8:00 رزرو شد
                    نوبت با موفقیت برای بیمار نرگس یوسفی برای تاریخ 1400/10/19 ساعت 8:00 رزرو شد
                </div>
                <img :src="dialogImg" class="img">
                <v-btn class="gradiant-btn" depressed color="secondary">تایید</v-btn>
            </div>
            <div class="content" v-if="reserveFirst == 2">
                <v-card-text class="font-normal">
                    <ul class="pl-0">
                        <ul>نوبت برای چه کسی است ؟</ul>
                        <ul>
                            <v-radio-group row v-model="radioVisit">
                                <v-row class="ma-0" justify="space-between" align="center">
                                    <v-col v-for="(visit, i) in visits" :key="i" class="d-flex pr-0 pt-0 align-center">
                                        <v-radio :value="i" />
                                        <span :class="visit.value == radioVisit ? 'primary--text' : '' " class="font-normal">{{ visit.label }}</span>
                                    </v-col>
                                </v-row>
                            </v-radio-group>
                        </ul>
                    </ul>
                    <ul class="d-flex align-center pl-0">
                        <ul >
                            <li>نام و نام خانوادگی</li>
                            <li>
                                <v-text-field background-color="#e2e2e2" solo dense rounded flat />
                            </li>
                        </ul>
                        <v-spacer />
                        <ul>
                            <li>شماره تماس</li>
                            <li>
                                <v-text-field background-color="#e2e2e2" solo dense rounded flat />
                            </li>
                        </ul>
                    </ul>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="#e2e2e2" rounded depressed class="px-12 black--text font-normal">ثبت و ادامه</v-btn>
                </v-card-actions>
            </div>
        </v-dialog>

        <!-- reserve matab -->
        <v-dialog v-model="matabDialog" persistent content-class="medist-expert-dialog-one">
            <v-btn depressed small fab color="primary" @click="matabDialog = false" class="close-btn">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="content" v-if="matabReserve == 0">
                <div class="card-title">
                    <div class="text">تاریخ و ساعت مشاوره را انتخاب کنید</div>
                </div>
                <div class="card-text d-flex align-top flex-wrap">
                    <v-col cols="12" sm="8">
                        <div class="card">
                            <v-date-picker full-width no-title lang="fa" class="h-100" locale="fa" color="primary" v-model="date" />
                        </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <div class="card">
                            <div class="data-table">
                                <div class="thead">
                                    <div class="tr">
                                        <div class="th">
                                            <div class="text">ساعت</div>
                                        </div>
                                        <div class="th justify-center">
                                            <div class="text">00:00</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tbody">
                                    <div class="tr" v-for="(item, i) in body" :key="i">
                                        <div class="td">
                                            <div class="text">{{ item.time }}</div>
                                        </div>
                                        <div class="td justify-center">
                                            <div class="text">{{ item.clock }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <v-btn color="secondary" class="mt-4" rounded depressed block height="47" @click="matabReserve = 1">ثبت و پرداخت</v-btn>
                    </v-col>
                </div>
            </div>
            <div class="content" v-if="matabReserve == 1">
                <div class="card-title">
                    <div class="text">نوبت برای چه کسی است ؟</div>
                </div>
                <div class="card-text">
                    <v-radio-group row v-model="radioVisit">
                        <v-row class="ma-0" justify="space-between" align="center">
                            <v-col cols="12" md="6" v-for="(visit, i) in visits" :key="i" class="d-flex pr-0 pt-0 align-center">
                                <v-radio :value="i" />
                                <span :class="visit.value == radioVisit ? 'primary--text' : '' " class="font-xl">{{ visit.label }}</span>
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </div>
                <div class="card-text d-flex align-center flex-wrap">
                    <v-col cols="12" sm="6">
                        <div class="label" v-if="radioVisit == 1">نام و نام خانوادگی</div>
                        <v-text-field v-if="radioVisit == 1" class="input" hide-details flat filled rounded background-color="#E2E2E2" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="label" v-if="radioVisit == 1">شماره تماس</div>
                        <v-text-field v-if="radioVisit == 1" class="input" hide-details flat filled rounded background-color="#E2E2E2" />
                    </v-col>
                </div>
                <div class="card-action">
                    <v-btn color="secondary" rounded depressed class="hidden-sm-and-down btn mr-auto d-none d-md-flex mt-16" width="250" height="47">ثبت و ادامه</v-btn>
                    <v-btn color="secondary" rounded depressed class="hidden-md-and-up btn mt-16" block height="47">ثبت و ادامه</v-btn>
                </div>
            </div>
        </v-dialog>
        <!-- end reserve matab -->
    </section>
</template>

<script>
import DoctorsSlider from '../DoctorsSlider.vue'
import LastPosts from '../LastPosts.vue'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { DoctorsSlider, LastPosts, TiptapVuetify },
        data(){
            return{
                activeRadio:null,
                page:1,
                turnDialog:null,
                matabDialog:null,
                reserveFirst:null,
                matabReserve:null,
                radioVisit:null,
                showPostDetail:false,
                like:null,
                textBody:'                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                totalProspect:'10',
                    // videojs options
                playerOptions: {
                    // height: '100%',
                    autoplay: true,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [
                        { type: "video/mp4", src: "/assets/video/video.mp4" },
                    ],
                    // poster: "/assets/images/crossed-arms.png",
                },
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
                date:(new Date(Date.now()-(new Date()).getTimezoneOffset()*60000)).toISOString().substr(0,10),
                doctorArm:'/assets/images/crossed-arms.png',
                doctorArm1:'/assets/images/crossed-arms1.png',
                dialogImg:'/assets/images/dialog-reserve.png',
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                posts:[
                    { img: 'https://picsum.photos/500/310' },
                    { video: true },
                    { img: 'https://picsum.photos/500/320' },
                    { video: true },
                    { img: 'https://picsum.photos/500/330' },
                    { video: true },
                    { img: 'https://picsum.photos/500/340' },
                    { video: true },
                    { img: 'https://picsum.photos/500/350' },
                ],
                visits:[
                    { value:0,  label:'خودم' },
                    { value:1, label:'شخص دیگری' },
                ],
                doctor:{
                    name:'سعید قادری',
                    expert:'متخصص مغز واعصاب',
                    Id:'12345678',
                    rate:4,
                    date:'1400/12/14',
                },
                items:[
                    { text:'خانه', to:'index' },
                    { text:'تخصص ها', to:'/public/experts' },
                    { text:'لیست دکتر های متخصص', to:'/public/experts/:slug' },
                    { text:'دکتر سعید قادری', disabled:true, to:'/public/experts/:slug/:id' }
                ],
                visitType:[
                    { icon:'mdi-wechat', title:'چت', value:1 },
                    { icon:'mdi-phome-clasic', title:'تلفنی', value:2 },
                    { icon:'mdi-microphone', title:'صوتی', value:3 },
                    { icon:'mdi-message-video', title:'تصویری', value:4 },
                ],
                header:[
                    { text:'ساعت', value:'time', sortable: false },
                    { text:'00:00', value:'clock', align:'left' },
                ],
                body:[
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                    { time:'ساعت', clock:'10:00' },
                ],
            }
        },
        methods:{
            openEmojiDailog(){},
            sendMessage(){},
            playerReadied(){}
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        mounted(){
            this.reserveFirst = 0
            this.matabReserve = 0
        }
    }
</script>

<style lang="scss" scoped>
.medist-pick-turn-data-table tbody tr:hover{
    background-color: #805add !important;
}
</style>