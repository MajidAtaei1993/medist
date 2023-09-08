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
                                        <div class="text">نام کاربر</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">شماره تیکت</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content time-keeper-content">
                                        <div class="text">تاریخ</div>
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
            <!-- data table -->
            <div class="data-table">
                <div class="windows-mode">
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                    </div>
                    <div class="tbody rounded-b-xl">
                        <div class="tr" v-for="(tr, i) in body" :key="i">
                            <div class="td justify-start pr-2">
                                <v-btn icon :color="tr.show ? 'primary' : 'secondary' " @click="tr.show =! tr.show">
                                    <v-icon>{{ tr.show ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                                </v-btn>
                                <div class="text" :class="tr.show ? 'text primary--text font-weight-bold' : 'text' ">{{ tr.ticketId }}</div>
                            </div>
                            <div class="td">
                                <div :class="tr.show ? 'text primary--text' : 'text' ">{{ tr.undenfied }}</div>
                            </div>
                            <div class="td">
                                <div :class="tr.show ? 'text primary--text' : 'text' ">{{ tr.doctorName }}</div>
                            </div>
                            <div class="td">
                                <div :class="tr.show ? 'text primary--text font-weight-bold' : 'text' ">{{ tr.renew }}</div>
                            </div>
                            <div class="td justify-space-between pl-1">
                                <div :class="tr.value == 1 ? 'text secondary--text' : tr.value == 2 ? 'text info--text' : 'text error--text'">{{ tr.value == 1 ? 'پاسخ داده شده' : tr.value == 2 ? 'پاسخ داده نشده' : 'خاتمه یافته' }}</div>
                                <v-btn rounded color="primary" small class="font-normal" @click="showConversetion(tr.ticketId)">مشاهده</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <div class="th" v-for="(th, j) in header.slice(1, 2)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.undenfied }}</div>
                                </div>
                                <div class="justify-end" :class="tr.value == 1 ? 'th secondary--text' : tr.value == 2 ? 'th info--text' : 'th error--text'">
                                    <v-btn icon :color="tr.show ? 'primary' : 'secondary' " @click="tr.show =! tr.show">
                                        <v-icon>{{ tr.show ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                                    </v-btn>
                                    {{ tr.value == 1 ? 'پاسخ داده شده' : tr.value == 2 ? 'پاسخ داده نشده' : 'خاتمه یافته' }}
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.doctorName }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.ticketId }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.renew }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(2, 3)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(0, 1)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(3, 4)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action">
                                        <v-btn class="btn" @click="showConversetion(tr.ticketId)">مشاهده</v-btn>
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
            </div>
            <!-- end data table -->
        </div>

        <!-- show conversation dialog -->
        <v-dialog width="900" persistent v-model="chatDialog" class="px-2">
            <v-btn depressed x-small fab color="primary" @click="chatDialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card rounded="xl" min-width="100%" class="medist-chat-request">
                <v-container>
                    <v-card-text class="medist-chat-request-content px-0">
                        <!-- <ul class="d-flex align-start mb-4" v-for="(message, i) in messages" :key="i">
                            <li>
                                <v-list-item-avatar style="47" class="ml-2">
                                    <v-img :src="message.avatar" />
                                </v-list-item-avatar>
                            </li>
                            <li>
                                <div class="font-small medist-chat-box-primary">
                                    <v-list-item-title class="font-small">مجید عطائی</v-list-item-title>
                                    {{ message.text }}
                                    <v-list-item-subtitle class="medist-chat-date-time-font text-left pb-1 pl-3 pt-5">
                                        <span>{{ message.date }}</span>
                                        <span>{{ message.time }}</span>
                                    </v-list-item-subtitle>
                                </div>
                            </li>
                        </ul> -->
                        <ul class="d-flex align-start mb-4">
                            <li>
                                <v-list-item-avatar style="47" class="ml-2">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </li>
                            <li>
                                <!-- <v-list-item-title tag="div" class="font-normall">مجید عطائی</v-list-item-title> -->
                                <v-col class="font-md medist-chat-box-primary">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                                    <v-list-item-subtitle class="medist-chat-date-time-font text-left pb-1 pl-3 pt-5">1400/11/14  14:19</v-list-item-subtitle>
                                </v-col>
                            </li>
                        </ul>
                        <ul class="d-flex align-start justify-end">
                            <li>
                                <!-- <v-list-item-title tag="div" class="font-normall text-left">مجید عطائی</v-list-item-title> -->
                                <v-col class="font-md medist-chat-box-info">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                                    <v-list-item-subtitle class="font-small info--text pb-1 pr-3 pt-5">1400/11/14  14:19</v-list-item-subtitle>
                                </v-col>
                            </li>
                            <li>
                                <v-list-item-avatar style="47" class="mr-2">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </li>
                        </ul>
                        <ul class="d-flex align-start my-4">
                            <li>
                                <v-list-item-avatar style="47" class="ml-2">
                                    <v-img :src="avatar" />
                                </v-list-item-avatar>
                            </li>
                            <li>
                                <!-- <v-list-item-title tag="div" class="font-normall">مجید عطائی</v-list-item-title> -->
                                <v-col class="font-md medist-chat-box-primary">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                                    <v-list-item-subtitle class="medist-chat-date-time-font text-left pb-1 pl-3 pt-5">1400/11/14  14:19</v-list-item-subtitle>
                                </v-col>
                            </li>
                        </ul>
                    </v-card-text>
                </v-container>
                <v-card-actions v-if="chatActive" class="pt-0 action">
                    <div class="content">
                        <img src="/assets/icons/patient/send.png" alt="" class="send">
                        <div class="index">
                            <v-text-field v-model="text" solo flat hide-details placeholder="چیزی تایپ کنید..." />
                            <v-file-input hide-input append-icon="" prepend-icon="" id="file_input" @change="onChange($event)" />
                            <img src="/assets/icons/patient/link.png" alt="" @click="pickFile">
                            <img src="/assets/icons/patient/emoji.png" alt="" class="mr-4">
                        </div>
                        <v-btn class="disactive-btn" @click="chatActive = false" depressed>خاتمه دادن به تیکت</v-btn>
                    </div>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-col class="medist-ticket-ended">
                        تیکت خاتمه یافته است
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end show conversation dialog -->
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
    export default {
        data(){
            return{
                search:'',
                day: null,
                month:null,
                year:null,
                dialog: null,
                chatDialog: null,
                show:null,
                text:'',
                expand:null,
                page:1,
                fileUplaod:null,
                chatActive:true,
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                time: new Date().toLocaleTimeString('fa-IR'),
                date: new Date().toLocaleDateString('fa-IR'),
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                headerMenu:[
                    { text:'پاسخ داده شده', value: 0 },
                    { text:'پاسخ داده نشده', value: 1 },
                    { text:'خاتمه یافته', value: 2 },
                    { text:'همه', value: 3 },
                ],
                headerMenu1:[
                    { text:'امروز', value: 0 },
                    { text:'دیروز', value: 1 },
                    { text:'همه', value: 2 },
                ],
                header: [
                    { iconTablet:'/assets/icons/admin/table/sort_numeric_up_reversed-c.png', icon:'/assets/icons/admin/table/sort_numeric_up_reversed-w.png', text: 'شماره تیکت', value: 'ticketId', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/ticket-title-b.png', icon:'/assets/icons/admin/table/ticket-title-w.png', text: 'عنوان تیکت', value: 'undenfied', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/username-c.png', icon:'/assets/icons/admin/table/username-w.png', text: 'نام پزشک', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/available_updates-c.png', icon:'/assets/icons/admin/table/available_updates-w.png', text: 'آخرین بروزرسانی', value: 'renew', align:'center' },
                    { text: '', value: 'action', align:'left', sortabel: false },
                ],
                body:[
                    { ticketId:'1', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true  , value:1 },
                    { ticketId:'2', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false  , value:1 },
                    { ticketId:'3', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true  , value:2 },
                    { ticketId:'4', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false  , value:2 },
                    { ticketId:'5', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true  , value:3 },
                    { ticketId:'6', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false  , value:1 },
                    { ticketId:'7', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true  , value:1 },
                    { ticketId:'8', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false  , value:3 },
                    { ticketId:'9', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true  , value:2 },
                    { ticketId:'10', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true , value:2 },
                    { ticketId:'11', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false , value:3 },
                    { ticketId:'12', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true , value:1 },
                    { ticketId:'13', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: false , value:1 },
                    { ticketId:'14', undenfied:'لورم ایپسوم', doctorName:'سعید قادری', renew:'06:18 - 2022/02/28', show: true , value:3 },
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
                tableBody:[
                    {
                        subject:'عنوان تیکت',
                        status: true,
                        child:[
                            {
                                title:'نام و نام خانودگی',
                                text:'آخرین بروز رسانی',
                                icon:'mdi-account-outline'
                            },
                            {
                                title:'شماره تیکت',
                                text:'7894562145',
                                icon:'mdi-sort-numeric-descending'
                            },
                            {
                                title:'آخرین بروز رسانی',
                                text:'1400/09/13 - 17:48',
                                icon:'mdi-sync'
                            },
                        ]
                    }
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

