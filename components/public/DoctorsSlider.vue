<template>
    <section class="medist-doctor-slider">
        <!-- ribbon -->
        <div class="head" v-if="$route.name == 'public-experts'">
            <img :src="docHead" alt="" class="img">
            <div class="text">سایز پزشکان  تخصص چشک پزشکی</div>
        </div>
        <div class="head" v-else>
            <img :src="docHead" alt="" class="img">
            <div class="text">برخی از پزشکان ما</div>
        </div>
        <div class="slick-carousel">
            <slick-carousel class="carousel" v-bind="settings" ref="carousel">
                <div class="slider-item" v-for="(item, i) in items" :key="i">
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
    </section>
</template>

<script>
    export default {
        data(){
            return{
                docHead:'/assets/images/doctorHead.png',
                rating:3,
                model:null,
                items:[
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' },
                    { docName:'سعید قادری', docExpert:'فوق تخصص کامل', price:'45.000ريال', date:'1400/12/14', img:'/assets/images/avatar.png' }
                ],
                settings:{
                    "dots": false,
                    "arrows" : false,
                    "slidesToShow": 4,
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