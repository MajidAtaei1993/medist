<template>
    <section class="medist-search">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="items" />
        </div>
        <div class="banner">
            <div class="right">
                <img :src="docMobile" class="img" alt="">
            </div>
            <div class="left">
                <div class="head">جستجوی پیشرفته</div>
                <div class="text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </div>
            </div>
        </div>
        <div class="search-filter">
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
                                <v-icon>mdi-tshirt-crew-outline</v-icon>
                               تخصص
                            </ul>
                            <v-spacer />
                            <ul class="pl-0">
                                <v-select rounded style="width:145px" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" solo flat dense :items="expert">
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
                        <v-col cols="12">
                            <v-btn block height="48" color="primary" depressed rounded>
                                <v-spacer />
                                جستجو
                                <v-spacer />
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
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
            <div class="content">
                <div class="column">
                    <v-select class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" filled rounded background-color="white" placeholder="تخصص" prepend-inner-icon="mdi-tshirt-crew-outline" :items="expert">
                        <template v-slot:item="{ item }">
                            <v-list dense>
                                <template v-slot:prepend-item>
                                    <v-text-field prepend-inner-icon="mdi-magnify" hide-details="" filled rounded placeholder="نام تخصص را بنویسید..." />
                                </template>
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
                    <v-select class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" filled rounded background-color="white" placeholder="نسخه الکترونیک" prepend-inner-icon="mdi-printer" :items="elFile">
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
                    <v-select class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" filled rounded background-color="white" placeholder="جنسیت" prepend-inner-icon="mdi-gender-male-female" :items="gender">
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
                    <v-select class="input" hide-details="" :menu-props="{ offsetY:true, zIndex:10 }" filled rounded background-color="white" placeholder="شهر" prepend-inner-icon="mdi-town-hall" :items="townHall">
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
                        <v-text-field class="input" flat filled rounded hide-details="" placeholder="چیزی تایپ کنید..." />
                        <v-btn class="btn">
                            <v-icon dense size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="search-resault">
                نتیجه جستجوی شما: <span class="primary--text">{{ count }}پزشک</span>
            </div>
        </div>
        <div class="doctors">
            <div class="slider-items">
                <div class="slider-item" v-for="(item, i) in experts" :key="i" @click="$router.push({ name:'experts-slug-id', params:{ id:i }})">
                    <div class="medist-ribbon">
                        <span></span>
                    </div>
                    <div class="top">
                        <img :src="item.img" alt="" class="img">
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
        <div class="pagination">
            <v-pagination v-model="page" :total-visible="6" class="elevation-0" :length="23" />
        </div>
        <div class="expansion-panels">
            <v-expansion-panels flat class="expansion">
                <v-expansion-panel v-for="(item,i) in expandPanelItem" :key="i" class="panel">
                <v-expansion-panel-header expand-icon="mdi-chevron-down-circle-outline" class="expansion-head">
                    {{ item.header }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="expansion-text">
                    {{ item.title }}
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-btn class="btn" depressed>
                <v-icon class="ml-2" color="white">mdi-plus</v-icon>
                نمایش تمام مقاله ها
            </v-btn>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                page:'',
                count:'12',
                expansionPanel:0,
                brain:'/assets/icons/public/icons-hover/1.png',
                docMobile:'/assets/public/doc-mobile.png',
                page:1,
                items:[
                    { text:'خانه', disabled:false, to:'index' },
                    { text:'جستجو', disabled:true, to:'/public/search' },
                ],
                doctor:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز واعصاب',
                    Id:'12345678',
                    rate:4,
                    date:'1400/12/14',
                },
                expert:[
                    { text:'ریه', value:'0' },
                    { text:'قلب', value:'1' },
                    { text:'مغز', value:'2' },
                    { text:'ریه', value:'3' },
                    { text:'قلب', value:'4' },
                ],
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
                ],
                expandPanelItem:[
                    { header:'برای گرفتن نوبت باید چکار کنیم', title:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.' },
                    { header:'آیا هزینه برقرای تماس تلفنی هم برای من محسوب می شود؟ آیا باید هزینه تماس را روی قبض خود بپردازم ؟', title:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.' },
                    { header:'آیا هزینه برقرای تماس تلفنی هم برای من محسوب می شود؟ آیا باید هزینه تماس را روی قبض خود بپردازم ؟', title:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.' },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
h3{
    color: #000;
}
</style>