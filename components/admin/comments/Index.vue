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
                                        <div class="text">کلمه ای را وارد کنید</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
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
                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی نظر" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <!-- end header -->
            <!-- comments -->
            <div class="comments">
                <div class="comment" v-for="(comment, i) in comments" :key="i">
                    <v-checkbox :value="i" class="checkbox" off-icon="mdi-checkbox-blank-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                    <div class="user-avatar">
                        <img :src="comment.avatar" alt="" class="avatar">
                        <div class="name">{{ comment.userName }}</div>
                    </div>
                    <div class="rating">
                        <v-rating dense v-model="comment.rate" class="medist-rating-direction-ltr" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                        <div class="full-name">{{ comment.docName }}</div>
                    </div>
                    <div class="desc">{{ comment.disc.substring(0,200) }}</div>
                    <div class="action">
                        <v-btn class="btn" @click="showCommentDialog = true, getComment(comment)">مشاهده کامل</v-btn>
                    </div>
                </div>
            </div>
            <div class="page-slider">
                <v-btn fab small depressed class="slider-btn">
                    <v-icon large color="white">mdi-chevron-right</v-icon>
                </v-btn>
                <div class="text">صفحه {{ page }} از 56</div>
                <v-btn fab small depressed class="slider-btn">
                    <v-icon large color="white">mdi-chevron-left</v-icon>
                </v-btn>
            </div>
            <div class="actions justify-end">
                <v-btn depressed class="edit-btn">اجازه ویرایش</v-btn>
                <v-btn depressed class="reject-btn">رد نظر</v-btn>
                <v-btn depressed class="confirm-btn">تایید نظر</v-btn>
            </div>
            <!-- end comments -->
        </div>


        <!-- calendar dialog -->
        <v-dialog v-model="dialog" width="623" persistent>
            <v-btn depressed x-small fab color="primary" @click="dialog = false" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false"/>
        </v-dialog>
        <!-- end calendar dialog -->

        <!-- show full comment dialog -->
        <v-dialog v-model="showCommentDialog" width="1007" persistent>
            <v-btn depressed x-small fab color="primary" @click="showCommentDialog = false" class="mb-n12 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="comment-dialog">
                <div class="user-avatar">
                    <img :src="comment.avatar" alt="" class="avatar">
                </div>
                <div class="rating">
                    <div class="user-details">
                        <div class="name">{{ comment.userName }}</div>
                        <div class="date-time">
                            <div>
                                {{ comment.time }}
                                <img src="/assets/icons/admin/timer-outline.png" alt="">
                            </div>
                            <div>
                                {{ comment.date }}
                                <img src="/assets/icons/admin/calendar-outline.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="rate">
                        <v-rating dense v-model="comment.rate" class="medist-rating-direction-ltr d-flex" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                        <div class="name">{{ comment.docName }}</div>
                    </div>
                </div>
                <div class="desc">{{ comment.disc }}</div>
                <div class="actions">
                    <v-btn depressed class="edit-btn">اجازه ویرایش</v-btn>
                    <v-btn depressed class="reject-btn">رد نظر</v-btn>
                    <v-btn depressed class="confirm-btn">تایید نظر</v-btn>
                </div>
            </div>
        </v-dialog>
        <!-- end show full comment dialog -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                search:'',
                dialog: null,
                showCommentDialog:null,
                radioBtn:null,
                chevron:'/assets/images/chevron.png',
                comment:{
                    },
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                headerMenu:[
                    { text:'تایید شده', value: 0 },
                    { text:'رد شده', value: 1 },
                    { text:'همه', value: 2 },
                ],
                headerMenu1:[
                    { text:'امروز', value: 0 },
                    { text:'فردا', value: 1 },
                    { text:'همه', value: 2 },
                ],
                comments:[
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                    { 
                        avatar:'/assets/images/avatar.png',
                        userName:'سعید قادری',
                        disc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        docName:'دکتر سعید قادری',
                        rate:3,
                        time: new Date().toLocaleTimeString('fa-IR'),
                        date: new Date().toLocaleDateString('fa-IR')
                    },
                ],
            }
        },
        methods:{
            pickDate () {
                alert(`${this.date}`)
            },
            getComment(i){
                this.comment = i
            }
        }
    }
</script>

<style scoped>
</style>

