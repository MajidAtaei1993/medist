<template>
    <section class="medist-knowledge">
        <div class="head">
            <img :src="aed" alt="">
            <div class="text">تخصص های موجود</div>
        </div>
        <!-- large screen -->
        <div class="slick-carousel">
            <slick-carousel class="carousel" v-bind="settings" ref="carousel">
                <v-card tag="div" class="slider-items" v-for="(item, i) in items" :key="i" :to="{ name: 'experts-slug', params:{ slug: item.subtitle }}">
                    <img class="img" :src="item.img" alt="">
                    <div class="text">{{ item.title }}</div>
                    <div class="subtext">{{ item.subtitle }}</div>
                </v-card>
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
        <!-- end large screen -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                aed:'/assets/images/aed_1.png',
                slide:null,
                model:null,
                settings:{
                    "dots": false,
                    "arrows" : false,
                    "centerPadding": "20px",
                    "slidesToShow": 6,
                    "slidesToScroll": 1,
                    "responsive":[
                        {
                            "breakpoint": 1024,
                            "settings": {
                                "slidesToShow": 4,
                                "slidesToScroll": 1,
                            }
                        },
                        {
                            "breakpoint": 768,
                            "settings": {
                                "slidesToShow": 4,
                                "slidesToScroll": 1,
                            }
                        },
                        {
                            "breakpoint": 600,
                            "settings": {
                                "slidesToShow": 3,
                                "slidesToScroll": 1,
                                "centerMode": true,
                                "centerPadding": "20px",
                            }
                        },
                    ]
                },
                items:[
                    { title:'متخصص', subtitle:'مغز و اعصاب', img:'/assets/icons/public/icons-hover/1.png' },
                    { title:'متخصص', subtitle:'کلیه و مثانه', img:'/assets/icons/public/icons-hover/2.png' },
                    { title:'متخصص', subtitle:'ارتوپدی', img:'/assets/icons/public/icons-hover/3.png' },
                    { title:'متخصص', subtitle:'گوارش و کبد', img:'/assets/icons/public/icons-hover/4.png' },
                    { title:'متخصص', subtitle:'دارو', img:'/assets/icons/public/icons-hover/5.png' },
                    { title:'متخصص', subtitle:'روده', img:'/assets/icons/public/icons-hover/6.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/7.png' },
                    { title:'متخصص', subtitle:'اورتوپدی', img:'/assets/icons/public/icons-hover/8.png' },
                    { title:'متخصص', subtitle:'روانپزشکی', img:'/assets/icons/public/icons-hover/9.png' },
                    { title:'متخصص', subtitle:'رادیولوژی', img:'/assets/icons/public/icons-hover/10.png' },
                    { title:'متخصص', subtitle:'کلیه و مثانه', img:'/assets/icons/public/icons-hover/11.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/12.png' },
                    { title:'متخصص', subtitle:'خون و انکولوژی', img:'/assets/icons/public/icons-hover/13.png' },
                    { title:'متخصص', subtitle:'چشم', img:'/assets/icons/public/icons-hover/14.png' },
                    { title:'متخصص', subtitle:'روانشناسی', img:'/assets/icons/public/icons-hover/15.png' },
                    { title:'متخصص', subtitle:'ویروس شناسی', img:'/assets/icons/public/icons-hover/16.png' },
                    { title:'متخصص', subtitle:'جراحی عمومی', img:'/assets/icons/public/icons-hover/17.png' },
                    { title:'متخصص', subtitle:'زنان و زایمان', img:'/assets/icons/public/icons-hover/18.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/19.png' },
                    { title:'متخصص', subtitle:'قلب و عروق', img:'/assets/icons/public/icons-hover/20.png' },
                    { title:'متخصص', subtitle:'اطفال', img:'/assets/icons/public/icons-hover/21.png' },
                    { title:'متخصص', subtitle:'گوارش و کبد', img:'/assets/icons/public/icons-hover/22.png' },
                    { title:'متخصص', subtitle:'پوست و مو', img:'/assets/icons/public/icons-hover/23.png' },
                    { title:'متخصص', subtitle:'دندان', img:'/assets/icons/public/icons-hover/24.png' },
                    { title:'متخصص', subtitle:'عفونی', img:'/assets/icons/public/icons-hover/25.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/26.png' },
                    { title:'متخصص', subtitle:'عمومی', img:'/assets/icons/public/icons-hover/27.png' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>