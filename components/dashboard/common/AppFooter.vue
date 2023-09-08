<template>
    <v-footer class="medist-footer" color="white" padless inset>
        <v-container>
            <v-row justify="space-around" align="start" class="pt-4">
                <!-- Logo Detail -->
                <v-col cols="12" md="4" sm="12" class="text-center">
                    <v-img :src="logo" width="120" height="50" class="mx-auto" />
                    <div class="medist-footer-desc pt-4">
                        مجموعه مدیست در سال 1400 و با هدف خدمت رسانی یه مراجعینی که امکان ویزیت حضوری توسط پزشک، به دلایل متعدد را ندارند، تاسیس شده است.
                    </div>
                </v-col>
                <!-- End Logo Detail -->
                <v-col cols="12" md="4" sm="3" v-for="(item, i) in items" :key="i" class="hidden-sm-and-down">
                    <ul>
                        <v-subheader class="medist-footer-ul pr-0">{{ item.header }}</v-subheader>
                        <ul>
                            <li v-for="(item1, j) in item.children" :key="j" class="py-2">
                                <nuxt-link class="medist-footer-li" :to="{ name: item1.link }">
                                    {{ item1.text }}
                                    <span class="px-2">{{ item1.text1 }}</span>
                                    <v-icon :small="item1.small" class="pb-0">{{ item1.icon }}</v-icon>
                                        <li class="mt-n3">
                                            <v-btn icon v-for="(item2, k) in item1.children" :key="k" :href="item2.link" class="ml-5">
                                                <v-icon :small="item2.small" class="medist-icon">{{ item2.icon }}</v-icon>
                                            </v-btn>
                                        </li>
                                </nuxt-link>
                            </li>
                        </ul>
                    </ul>
                </v-col>
                <v-col cols="12" class="hidden-md-and-up pb-0">
                    <v-row class="ma-0" justify="center">
                        <v-col cols="6" v-for="(item, i) in items" :key="i" class="pb-0">
                            <v-subheader class="medist-footer-ul pr-0">{{ item.header }}</v-subheader>
                            <li v-for="(item1, j) in item.children" :key="j" class="py-2">
                                <nuxt-link class="medist-footer-li" :to="{ name: item1.link }">
                                    {{ item1.text }}
                                    <v-icon :small="item1.small" class="pb-0">{{ item1.icon }}</v-icon>
                                </nuxt-link>
                            </li>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="hidden-md-and-up pt-0">
                    <v-card class="d-flex align-center justify-space-around" width="auto">
                        <v-btn icon large plain>
                            <v-icon color="#bcbcbc">mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn icon large plain>
                            <v-icon color="#bcbcbc">mdi-instagram</v-icon>
                        </v-btn>
                        <v-btn icon large plain>
                            <v-icon color="#bcbcbc">mdi-wechat</v-icon>
                        </v-btn>
                        <v-btn icon large plain>
                            <v-icon color="#bcbcbc">mdi-facebook</v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center" class="font-small py-2 medist-footer-permision">
                <span class="primary--text font-sm">تمام حقوق مادی و معنوی این سایت متعلق به مدیست می باشد(توسعه و پشتیبانی توسط
                    <span>
                        <a class="azerColor--text text-decoration-underline" href="https:azarertebat.ir" > آذر ارتباط</a>)
                    </span>
                </span>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
    export default {
        data(){
            return{
                logo: '/assets/images/logo/logo.png',
                items:[
                    {
                        header:'لینک مقالات جدید',
                        children:[
                            { text:'داشتبورد', link:''},
                            { text:'ورود', link:''},
                            { text:'جستجوی پزشکان', link:''},
                            { text:'نوبت دهی', link:''},
                        ]
                    },
                    {
                        header:'لینک های مفید',
                        children:[
                            { text:'تخصص ها', link:''},
                            { text:'قوانین و مقررات', link:''},
                            { text:'درباره ما', link:''},
                            { text:'021-123456', text1:'0912-1234567', icon:'mdi-phone', small:'small'},
                            { 
                                children:[
                                    { class:'pl-9', icon:'mdi-twitter', link:'https://twitter.com' },
                                    { class:'pl-9', icon:'mdi-instagram', link:'https://instagram.com' },
                                    { class:'pl-9', icon:'mdi-facebook-messenger', link:'https://facebook.com' },
                                    { icon:'mdi-facebook', link:'https://telegram.com' }
                                ]
                             }
                        ]
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>