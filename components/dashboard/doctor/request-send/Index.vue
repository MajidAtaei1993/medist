<template>
    <section class="medist-dashbaord-middle">
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
            <!-- table -->
            <div class="data-table">
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels style="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <div class="th" v-for="(th, j) in header.slice(2, 3)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img ml-2">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.username }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text" :class="tr.value == 1 ? 'secondary--text' : tr.value == 2 ? 'info--text' : 'error--text'">{{ tr.value == 1 ? 'پاسخ داده شده' : tr.value == 2 ? 'پاسخ داده نشده' : 'خاتمه یافته' }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.ticketNum }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.ticketTitle }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.update }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(0, 2)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(3, 4)" :key="j">
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
                    <div class="thead justify-space-between px-4">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                        <div class="th">
                            <div class="text"></div>
                        </div>
                    </div>
                    <div class="tbody" style="max-height: calc(100% - 10px)">
                        <div class="tr px-4" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <div class="text">{{ tr.ticketNum }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.ticketTitle }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.username }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.update }}</div>
                            </div>
                            <div class="td">
                                <div class="text secondary--text" :class="tr.value == 1 ? 'secondary--text' : tr.value == 2 ? 'info--text' : 'error--text'">{{ tr.value == 1 ? 'پاسخ داده شده' : tr.value == 2 ? 'پاسخ داده نشده' : 'خاتمه یافته' }}</div>
                                <v-btn class="show-ticket" depressed @click="dialog = true">جزئیات</v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="cancel-section">
                        <v-btn depressed class="send-new-ticket-btn" :to="{ name: 'dashboard-doctor-request-new'}">
                            <img src="/assets/icons/doctor/send-small.png" alt="" class="img">
                            ارسال تیکت
                        </v-btn>
                    </div>
                </div>
                <!-- end windows size -->
            </div>
            <!-- end table -->
        </div>
        <div class="left">
            <LeftPanel />
        </div>
        <!-- dialog -->
        <v-dialog width="900" persistent v-model="dialog" class="px-2">
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
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
                <v-card-actions class="align-center px-2 medist-chat-request-bottom-content">
                    <v-btn fab small color="primary" depressed class="ml-4 pa-6" @click="sendMessage">
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                    <span class="medist-width-100 white rounded-xl d-flex align-center medist-open-ticket-input px-2">
                        <v-text-field hide-details class="rounded-r-xl font-small" flat solo placeholder="تایپ کنید ..." v-model="text" @keypress.enter="sendMessage" @keyup.ctrl.enter="text += '\n'" />
                        <v-file-input hide-input @change="fileUpload($event)" id="file-upload" prepend-icon="" />
                        <v-btn icon @click="pickFile">
                            <v-icon>mdi-link</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-emoticon-happy-outline</v-icon>
                        </v-btn>
                    </span>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End dialog -->
    </section>
</template>

<script>
import LeftPanel from '@/components/dashboard/doctor/request-send/LeftPanel.vue'
    export default {
        components:{ LeftPanel },
        data(){
            return{
                dialog:false,
                text:'',
                messages: [],
                expand:null,
                page:1,
                chevron:'/assets/images/chevron.png',
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                notifs:'4',
                header: [
                    { iconTablet:'/assets/icons/doctor/sort-reverse-c.png', icon:'/assets/icons/doctor/sort-reverse-w.png', text: 'شماره تیکت', align: 'center', value: 'type' },
                    { iconTablet:'/assets/icons/doctor/ticket-title-c.png', icon:'/assets/icons/doctor/ticket-title-w.png', text: 'عنوان تیکت', value: 'date', align:'center' },
                    { iconTablet:'/assets/icons/doctor/username-b.png', icon:'/assets/icons/doctor/username-w.png', text: 'نام و نام خانوادگی', value: 'origin', align:'center' },
                    { iconTablet:'/assets/icons/doctor/update-c.png', icon:'/assets/icons/doctor/update-w.png', text: 'آخرین بروز رسانی', align: 'start', value: 'status', align:'center' },
                ],
                body:[
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:1 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:2 },
                    { ticketNum:'123456789', ticketTitle:'تست', username:'جعفر جعفرپور', update:'17:48 - 1400/09/13', value:3 }
                ],
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
            pickFile(){
                document.getElementById('file-upload').click()
            },
            fileUpload(e){
                console.log(e)
                this.text = e.name
            },
            sendMessage(){
                let option = { weekday: 'long'}
                let date = new Date().toLocaleDateString('fa-IR')
                let time = new Date().toLocaleTimeString('fa-IR')
                if (this.text) {
                    this.messages.push({
                        text: this.text,
                        date: date,
                        time: time,
                        avatar: this.avatar
                    })
                }
                console.log(this.messages)
                this.text = null
            },
            openNotifs(){},
        }
    }
</script>

<style lang="scss" scoped>

</style>