<template>
    <section class="medist-experts">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="breadcrumbs" />
        </div>
        <!-- banner -->
        <div class="banner">
            <div class="right">
                <div class="head">پیدا کردن تخصص تنها با چند کلیک</div>
                <div class="text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </div>
            </div>
            <div class="left">
                <img :src="banner" alt="">
            </div>
        </div>
        <!-- end banner -->

        <!-- search -->
        <div class="search-box">
            <v-text-field  solo flat background-color="white" hide-details="" placeholder="چیزی تایپ کنید..." class="input" />
            <v-btn class="btn">
                <v-icon size="28">mdi-magnify</v-icon>
            </v-btn>
        </div>
        <!-- end search -->

        <div class="head">
            <img :src="heart" alt="" class="img">
            <div class="text">تخصص های موجود</div>
        </div>
        <!-- all experts -->
        <div class="lists">
            <v-hover v-slot="{ hover }" class="list" v-for="(item, i) in knowLedges" :key="i">
                <div @click="$router.push({name:'experts-slug', params:{ slug:item.title }})">
                    <img :src="hover ? item.imgHover : item.img" :alt="item.subtitle">
                    <div class="type">{{ item.title }}</div>
                    <div class="major">{{ item.subtitle }}</div>
                </div>
            </v-hover>
        </div>
        <div class="pagination">
            <v-pagination v-model="page" :total-visible="6" class="elevation-0" :length="23" />
        </div>
        <!-- end all experts -->
        <div class="doctors">
            <div class="content">
                <div class="body">
                    <div class="slider-items">
                        <div class="slider-item" v-for="(item, i) in items" :key="i">
                            <div class="top">
                                <img :src="item.img" alt="">
                                <div class="name">{{ item.docName }}</div>
                                <div class="expert">{{ item.docExpert }}</div>
                                <div class="rating">
                                    <v-rating dense v-model="rating" dir="ltr" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="col">
                                    <div class="right">
                                        <v-icon>mdi-timer-outline</v-icon>
                                        <div class="text">هزینه ویزیت</div>
                                    </div>
                                    <div class="left">{{ item.price }}</div>
                                </div>
                                <div class="col">
                                    <div class="right">
                                        <v-icon>mdi-calendar-clock-outline</v-icon>
                                        <div class="text">اولین نوبت در دسترس</div>
                                    </div>
                                    <div class="left">{{ item.date }}</div>
                                </div>
                            </div>
                            <div class="action">
                                <v-btn class="action-btn" depressed>مشاوره</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <v-btn class="btn">
                    <v-icon>mdi-plus</v-icon>
                    نمایش تمام پزشکان این تخصص
                </v-btn>
            </div>
        </div>
        <!-- small size screen -->
        <div class="slider">
            <div class="head">
                <img :src="docHead" alt="" class="img">
                <div class="text">پزشکان این تخصص</div>
            </div>
            <v-slide-group v-model="model" class="pa-4 transparent align-center justify-center" center-active :show-arrows="false">
                <v-slide-item v-for="(item, i) in items" :key="i" class=" my-6">
                    <v-hover v-slot="{ hover }">
                        <v-card class="medist-rounded ma-5 medist-dropShadow medist-card-transition" :hover="hover" height="auto" width="100%">
                            <!-- ribbon -->
                            <div class="medist-ribbon">
                                <span></span>
                            </div>
                            <!-- end ribbon -->
                            <v-card-title>
                                <img width="104px" height="100%" class="rounded-pill d-flex mx-auto" :src="item.img">
                            </v-card-title>
                            <v-card-text>
                                <ul class="text-center px-0">
                                    <h3 class="balck--text">{{ item.docName }}</h3>
                                    <h5 class="info--text">{{ item.docExpert }}</h5>
                                </ul>
                                <ul>
                                    <v-rating dense v-model="rating" class="medist-rating-direction-ltr" background-color="orange lighten-3" color="#FFD500" item-aria-label="custom icon label text {0} of {1}" />
                                </ul>
                            </v-card-text>
                            <v-card-text>
                                <ul class="d-flex align-center">
                                    <li>
                                        <v-icon class="ml-2">mdi-timer-outline</v-icon>
                                        <small class="info--text font-small">هزینه ویزیت</small>
                                    </li>
                                    <v-spacer />
                                    <li class="secondary--text font-small">{{ item.price }}</li>
                                </ul>
                                <ul class="d-flex align-center">
                                    <li>
                                        <v-icon class="ml-2">mdi-calendar-clock-outline</v-icon>
                                        <small class="info--text font-small">اولین نوبت در دسترس</small>
                                    </li>
                                    <v-spacer />
                                    <li class="black--text font-small">{{ item.date }}</li>
                                </ul>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn rounded depressed block :color="hover ? 'secondary' : '#e5e5e5' ">مشاوره</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-slide-item>
            </v-slide-group>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                banner:'/assets/public/doc.png',
                heart:'/assets/images/aed_1.png',
                docHead:'/assets/images/doctorHead.png',
                page: 1,
                breadcrumbs:[
                    { text:'خانه', disabled:false, to:'index' },
                    { text:'تخصص ها', disabled:true, to:'/public/experts' }
                ],
                doctor:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز واعصاب',
                    Id:'12345678',
                    rate:4,
                    date:'1400/12/14',
                },
                rating:3,
                model:null,
                items:[
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' }
                ],
                knowLedges:[
                    { title:'متخصص', subtitle:'مغز و اعصاب', img:'/assets/icons/public/icons-hover/1.png', imgHover:'/assets/icons/public/icons/1.png' },
                    { title:'متخصص', subtitle:'کلیه و مثانه', img:'/assets/icons/public/icons-hover/2.png', imgHover:'/assets/icons/public/icons/2.png' },
                    { title:'متخصص', subtitle:'ارتوپدی', img:'/assets/icons/public/icons-hover/3.png', imgHover:'/assets/icons/public/icons/3.png' },
                    { title:'متخصص', subtitle:'گوارش و کبد', img:'/assets/icons/public/icons-hover/4.png', imgHover:'/assets/icons/public/icons/4.png' },
                    { title:'متخصص', subtitle:'دارو', img:'/assets/icons/public/icons-hover/5.png', imgHover:'/assets/icons/public/icons/5.png' },
                    { title:'متخصص', subtitle:'روده', img:'/assets/icons/public/icons-hover/6.png', imgHover:'/assets/icons/public/icons/6.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/7.png', imgHover:'/assets/icons/public/icons/7.png' },
                    { title:'متخصص', subtitle:'اورتوپدی', img:'/assets/icons/public/icons-hover/8.png', imgHover:'/assets/icons/public/icons/8.png' },
                    { title:'متخصص', subtitle:'روانپزشکی', img:'/assets/icons/public/icons-hover/9.png', imgHover:'/assets/icons/public/icons/9.png' },
                    { title:'متخصص', subtitle:'رادیولوژی', img:'/assets/icons/public/icons-hover/10.png', imgHover:'/assets/icons/public/icons/10.png' },
                    { title:'متخصص', subtitle:'کلیه و مثانه', img:'/assets/icons/public/icons-hover/11.png', imgHover:'/assets/icons/public/icons/11.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/12.png', imgHover:'/assets/icons/public/icons/12.png' },
                    { title:'متخصص', subtitle:'خون و انکولوژی', img:'/assets/icons/public/icons-hover/13.png', imgHover:'/assets/icons/public/icons/13.png' },
                    { title:'متخصص', subtitle:'چشم', img:'/assets/icons/public/icons-hover/14.png', imgHover:'/assets/icons/public/icons/14.png' },
                    { title:'متخصص', subtitle:'روانشناسی', img:'/assets/icons/public/icons-hover/15.png', imgHover:'/assets/icons/public/icons/15.png' },
                    { title:'متخصص', subtitle:'ویروس شناسی', img:'/assets/icons/public/icons-hover/16.png', imgHover:'/assets/icons/public/icons/16.png' },
                    { title:'متخصص', subtitle:'جراحی عمومی', img:'/assets/icons/public/icons-hover/17.png', imgHover:'/assets/icons/public/icons/17.png' },
                    { title:'متخصص', subtitle:'زنان و زایمان', img:'/assets/icons/public/icons-hover/18.png', imgHover:'/assets/icons/public/icons/18.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/19.png', imgHover:'/assets/icons/public/icons/19.png' },
                    { title:'متخصص', subtitle:'قلب و عروق', img:'/assets/icons/public/icons-hover/20.png', imgHover:'/assets/icons/public/icons/20.png' },
                    { title:'متخصص', subtitle:'اطفال', img:'/assets/icons/public/icons-hover/21.png', imgHover:'/assets/icons/public/icons/21.png' },
                    { title:'متخصص', subtitle:'گوارش و کبد', img:'/assets/icons/public/icons-hover/22.png', imgHover:'/assets/icons/public/icons/22.png' },
                    { title:'متخصص', subtitle:'پوست و مو', img:'/assets/icons/public/icons-hover/23.png', imgHover:'/assets/icons/public/icons/23.png' },
                    { title:'متخصص', subtitle:'دندان', img:'/assets/icons/public/icons-hover/24.png', imgHover:'/assets/icons/public/icons/24.png' },
                    { title:'متخصص', subtitle:'عفونی', img:'/assets/icons/public/icons-hover/25.png', imgHover:'/assets/icons/public/icons/25.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/26.png', imgHover:'/assets/icons/public/icons/26.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/27.png', imgHover:'/assets/icons/public/icons/27.png' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>