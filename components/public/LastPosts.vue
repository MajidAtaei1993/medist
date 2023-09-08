<template>
    <section class="medist-lastpost-section">
        <div class="head" v-if="$route.name == 'experts' ">
            <img :src="lastPosts" alt="" class="img">
            <div class="text">مقالات مرتبط با چشم پزشکی</div>
        </div>
        <div class="head" v-if="$route.name == 'experts-slug' ">
            <img :src="lastPosts" alt="" class="img">
            <div class="text">مقالات مرتبط با تخصص {{ expert }}</div>
        </div>
        <div class="head" v-else>
            <img :src="lastPosts" alt="" class="img">
            <div class="text">جدیدتریت مقالات</div>
        </div>
        <div class="slick-carousel">
            <slick-carousel class="carousel" v-bind="settings" ref="carousel">
                <div v-for="(post, i) in 2" :key="i">
                    <v-card class="medist-public-card-shadow medist-rounded ma-3">
                        <v-card-title>
                            <v-img class="medist-rounded" height="100%" :src="postImage" />
                        </v-card-title>
                        <v-card-text>
                            <h3>جدیدترین داده ها در باره کرونا</h3>
                            <small>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</small>
                        </v-card-text>
                        <v-card-actions class="pb-6">
                            <ul class="primary--text">
                                <v-icon color="primary">mdi-pencil</v-icon>
                                سعید قادری
                            </ul>
                            <ul class="primary--text">
                                <v-icon color="primary">mdi-clock</v-icon>
                                14 اسفند
                            </ul>
                        </v-card-actions>
                    </v-card>
                </div>
            </slick-carousel>
            <div class="sliders">
                <v-btn class="slider-btn" @click="$refs.carousel.next()" fab depressed small dark>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn class="slider-btn" @click="$refs.carousel.prev()" fab depressed small dark>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="action">
            <v-btn class="btn"  depressed>
                <v-icon large>mdi-plus</v-icon>
                نمایش تمام مقاله ها
            </v-btn>
        </div>
    </section>
</template>

<script>
    export default {
        props:['expert'],
        data(){
            return{
                lastPosts:'/assets/images/lastPosts.png',
                postImage:'/assets/images/postImage.png',
                model:null,
                settings:{
                    "dots": false,
                    "arrows" : false,
                    "slidesToShow": 2,
                    "centerMode": true,
                    "slidesToScroll": 1,
                    "responsive":[
                        {
                            "breakpoint": 1024,
                            "settings": {
                                "slidesToShow": 1,
                                "slidesToScroll": 1,
                                "centerMode": true,
                            }
                        },
                    ]
                },
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>