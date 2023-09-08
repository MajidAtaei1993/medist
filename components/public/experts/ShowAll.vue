<template>
    <section class="medist-expert-show-all">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="items" />
        </div>
        <div class="banner-head">
            <img :src="brain" alt="" class="img">
            <div class="text">{{ this.$route.params.slug }}</div>
        </div>
        <div class="banner">
            <div class="desc">
                <img src="/assets/icons/public/desc.png" alt="">
                توضیحات تخصص
            </div>
            <div class="text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </div>
            <div class="slider">
                <v-btn fab depressed class="btn" @click="page -=1" :disabled="page<2">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <div class="text">
                    صفحه{{ page }} از 4
                </div>
                <v-btn fab depressed class="btn" @click="page +=1" :disabled="page>3">
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
        <div class="filter-section">
            <!-- mobile model -->
            <div class="mobile-content">
                <v-menu offset-y :close-on-content-click="false"  min-width="95%">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-on="on" v-bind="attrs" color="white" small fab class="medist-dropShadow ml-3" elevation="1">
                            <v-icon color="primary">mdi-tune</v-icon>
                        </v-btn>
                    </template>
                    <v-row class="ma-0" style="background:#efefef">
                        <v-col cols="12" class="d-flex">
                            <ul class="col-auto">
                                <v-icon>mdi-printer</v-icon>
                                نسخه الکترونیک
                            </ul>
                            <v-spacer />
                            <ul class="pl-0">
                                <v-select rounded style="width:145px" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" solo flat dense :items="elFile">
                                    <template v-slot:item="{ item }">
                                        <v-list dense>
                                            <v-list-item dense>
                                                <v-list-item-icon class="mt-0">
                                                    <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </v-list>
                                    </template>
                                </v-select>
                            </ul>
                        </v-col>
                        <v-col cols="12" class="d-flex">
                            <ul class="col-auto">
                                <v-icon>mdi-gender-male-female</v-icon>
                                جنسیت
                            </ul>
                            <v-spacer />
                            <ul class="pl-0">
                                <v-select hide-details="" style="width:145px" rounded :menu-props="{ offsetY:true, zIndex:10 }" solo flat dense :items="gender">
                                    <template v-slot:item="{ item }">
                                        <v-list dense>
                                            <v-list-item dense class="pr-1">
                                                <v-list-item-icon class="mt-0">
                                                    <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </v-list>
                                    </template>
                                </v-select>
                            </ul>
                        </v-col>
                        <v-col cols="12" class="d-flex">
                            <ul class="col-auto">
                                <v-icon>mdi-town-hall</v-icon>
                                شهر
                            </ul>
                            <v-spacer />
                            <ul class="pl-0">
                                <v-select rounded hide-details="" style="width:145px" :menu-props="{ offsetY:true, zIndex:10 }" solo flat dense :items="townHall">
                                    <template v-slot:item="{ item }">
                                        <v-list dense>
                                            <v-list-item dense>
                                                <v-list-item-icon class="mt-0">
                                                    <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </v-list>
                                    </template>
                                </v-select>
                            </ul>
                        </v-col>
                    </v-row>
                </v-menu>
                <span class="d-flex align-center medist-dropShadow w-100">
                    <v-text-field solo dense hide-details="" flat class="rounded-r-xl rounded-l-0 w-100 medist-dropShadow" />
                    <v-btn v-on="on" v-bind="attrs" color="primary" elevation="0" class="rounded-l-xl rounded-r-0 medist-dropShadow" depressed>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </span>
            </div>
            <!-- end mobile model -->
            <div class="head">
                <img :src="docHead" alt="" class="img">
                <div class="text">پزشکان در دسترس این تخصص</div>
            </div>
            <div class="content">
                <div class="column">
                    <v-select filled rounded background-color="white" class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" placeholder="نسخه الکترونیک" prepend-inner-icon="mdi-printer" :items="elFile">
                        <template v-slot:item="{ item }">
                            <v-list dense>
                                <v-list-item dense>
                                    <v-list-item-icon class="mt-0">
                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                        </template>
                    </v-select>
                </div>
                <div class="column">
                    <v-select filled rounded background-color="white" class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" placeholder="جنیست" prepend-inner-icon="mdi-gender-male-female" :items="gender">
                        <template v-slot:item="{ item }">
                            <v-list dense>
                                <v-list-item dense class="pr-1">
                                    <v-list-item-icon class="mt-0">
                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                        </template>
                    </v-select>
                </div>
                <div class="column">
                    <v-select filled rounded background-color="white" class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" placeholder="شهر" prepend-inner-icon="mdi-town-hall" :items="townHall">
                        <template v-slot:item="{ item }">
                            <v-list dense>
                                <v-list-item dense>
                                    <v-list-item-icon class="mt-0">
                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                        </template>
                    </v-select>
                    <div class="search-content">
                        <v-text-field height="70" class="input" background-color="#eeeeee" placeholder="چیزی تایپ کنید..." filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="doctors">
            <div class="slider-items">
                <v-col cols="12" lg="3" md="4" sm="6" v-for="(item, i) in experts" :key="i" @click="$router.push({ name:'experts-slug-id', params:{ id:i }})">
                    <div class="slider-item">
                        <div class="medist-ribbon">
                            <span></span>
                        </div>
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
                </v-col>
            </div>
        </div>
        <div class="pagination">
            <v-pagination v-model="page" :total-visible="6" class="elevation-0" :length="23" />
        </div>
        <div class="journals">
            <LastPosts :expert="this.$route.params.slug" />
        </div>
    </section>
</template>

<script>
import LastPosts from '../LastPosts.vue'
    export default {
        components: { LastPosts },
        data(){
            return{
                brain:'/assets/icons/public/icons-hover/1.png',
                docHead:'/assets/images/doctorHead.png',
                page:1,
                items:[
                    { text:'خانه', to:'/' },
                    { text:'تخصص ها', disabled:false, to:'/public/experts' },
                    { text:'مغز و اعصاب', disabled:true, to:`/public/experts/${ this.$route.params.slug }` }
                ],
                doctor:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز واعصاب',
                    Id:'12345678',
                    rate:4,
                    date:'1400/12/14',
                },
                elFile:[
                    { text:'داشته باشد', value:'0' },
                    { text:'نداشته باشد', value:'1' },
                    { text:'همه', value:'2' }
                ],
                gender:[
                    { text:'زن', value:'0' },
                    { text:'مرد', value:'1' },
                    { text:'همه', value:'2' }
                ],
                townHall:[
                    { text:'اردبیل', value:'0' },
                    { text:'باکو', value:'1' },
                    { text:'ترکیه', value:'2' },
                    { text:'قبرس', value:'3' },
                    { text:'آلمان', value:'4' },
                    { text:'هلند', value:'5' },
                ],
                rating:3,
                experts:[
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
h3{
    color: #000;
}
</style>