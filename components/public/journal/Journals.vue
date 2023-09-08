<template>
    <section class="medist-journals">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="items" />
        </div>
        <div class="content">
            <!-- left side -->
            <div class="left">
                <div class="categories">
                    <div class="subheader">دسته بندی</div>
                    <v-list-item-group v-model="selected" color="primary" class="category">
                        <v-list-item dense v-for="(item, i) in listGroup" :key="i" class="item" :class="selected == i ? 'active-category' : 'item'">
                            <v-list-item-content>
                                <v-list-item-title class="text">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </div>
                <!-- newets -->
                <div class="lists">
                    <div class="head">
                        <img src="/assets/icons/public/descending_sorting.png" alt="" class="img">
                        <div class="text">تازه ها</div>
                    </div>
                    <div class="items">
                        <div class="item" v-for="(item, i) in 4" :key="i">
                            <img :src="news" alt="">
                            <div class="text">
                                <div class="header">استفاده از محصولات با کیفیت و اصلی</div>
                                <div class="subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، گرافیک است.</div>
                            </div>
                            <div class="action">ادامه</div>
                        </div>
                    </div>
                </div>
                <!-- end newest -->
                <!-- most viewed -->
                <div class="lists">
                    <div class="head">
                        <img src="/assets/icons/public/preview_file.png" alt="" class="img">
                        <div class="text">پر بازدیدها</div>
                    </div>
                    <div class="items">
                        <div class="item" v-for="(item, i) in 4" :key="i">
                            <img :src="news" alt="">
                            <div class="text">
                                <div class="header">استفاده از محصولات با کیفیت و اصلی</div>
                                <div class="subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، گرافیک است.</div>
                            </div>
                            <div class="action">ادامه</div>
                        </div>
                    </div>
                </div>
                <!-- end most viewed -->
            </div>
            <!-- right side -->
            <div class="right">
                <div class="top-banner">
                    <img class="banner" :src="banner" alt="">
                    <div class="text">نقش ژنتیک در ابتلا به بیماری آلزایمر</div>
                </div>
                <div class="cards">
                    <div class="card" v-for="(item, i) in 3" :key="i" @click="$router.push({ name:'journals-id', params:{id:i}})">
                        <img :src="lastNews" alt="">
                        <div class="head">استفاده از محصولات با کیفیت و اصلی</div>
                        <div class="subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم اس.</div>
                        <v-btn depressed class="btn">ادامه</v-btn>
                    </div>
                </div>
                <div class="second-banner">
                    <div class="right">
                        <img :src="postImg1" alt="" class="img">
                    </div>
                    <div class="left">
                        <div class="head">استفاده از محصولات با کیفیت و اصلی</div>
                        <div class="desc">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فرا
                        </div>
                        <v-btn depressed class="btn">ادامه</v-btn>
                    </div>
                </div>
                <div class="cards">
                    <div class="card" v-for="(item, i) in 3" :key="i" @click="$router.push({ name:'journals-id', params:{id:i}})">
                        <img :src="lastNews" alt="">
                        <div class="head">استفاده از محصولات با کیفیت و اصلی</div>
                        <div class="subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم اس.</div>
                        <v-btn depressed class="btn">ادامه</v-btn>
                    </div>
                </div>
                <div class="pagination">
                    <v-pagination v-model="page" :total-visible="6" class="elevation-0" :length="23" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                heart:'/assets/images/Heart.png',
                news:'/assets/images/journals/news.png',
                banner:'/assets/images/journals/journalsBanner.png',
                banner1:'/assets/images/journals/journalsBanner1.png',
                lastNews:'/assets/images/journals/latestPost.png',
                postImg:'/assets/images/journals/postImg.png',
                postImg1:'/assets/images/journals/postImg1.png',
                selected:-1,
                page:1,
                items:[
                    { text:'خانه', disabled:false, to:'index' },
                    { text:'مقالات', disabled:false, to:'/public/journals' },
                ],
                listGroup:[
                    { title:'همه دسته ها', link:'' },
                    { title:'زنان و زایمان', link:'' },
                    { title:'گوش حلق و بینی', link:'' },
                    { title:'مغز و اعصاب', link:'' },
                    { title:'قلب', link:'' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>