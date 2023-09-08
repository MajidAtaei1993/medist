<template>
    <section class="medist-login-section">
        <div class="medist-login-body">
            <img src="/assets/images/auth/2.png" class="img1 hidden-md-and-up" alt="">
            <img src="/assets/images/auth/s3.png" class="img2 hidden-md-and-up" alt="">
            <v-col class="medist-login-right-panel position-relative">
                <div v-if="value == 1" class="card">
                    <v-card-title class="card-title">
                        <small class="head">اکانت نداری؟ همین الان ثبت نام کن</small>
                        <v-spacer />
                        <v-btn color="primary" rounded depressed class="title-btn" @click="$router.push({ name:'public-auth'})">ثبت نام</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <li>
                            نام کاربری
                            <v-text-field class="font-normal pt-2" solo dense rounded outlined flat placeholder="نام کاربری یا ایمیل خود را وارد کنید" />
                        </li>
                        <li>
                            پسورد
                            <v-text-field class="font-normal pt-2" type="password" solo dense rounded outlined flat placeholder="نام کاربری یا ایمیل خود را وارد کنید" />
                        </li>
                        <li class="d-flex align-center">
                            <v-btn text color="transparent">
                                <small class="primary--text text-decoration-underline font-small" @click="value = 4">پسوردم را فراموش کرده ام</small>
                            </v-btn>
                            <v-spacer />
                            <v-btn text color="transparent" @click="value = 2">
                                <small class="primary--text text-decoration-underline font-small">ورود با شماره تلفن</small>
                            </v-btn>
                        </li>
                        <li>
                            <v-checkbox label="مرا به خاطر بسپار" />
                        </li>
                    </v-card-text>
                    <v-btn class="bottom-btn" depressed >ورود</v-btn>
                </div>
                <!-- login with mobile -->
                <div class="card" v-if="value == 2">
                    <v-card-title class="card-title">
                        <small class="head">اکانت نداری؟ همین الان ثبت نام کن</small>
                        <v-spacer />
                        <v-btn color="primary" depressed class="title-btn" rounded>ثبت نام</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <li>
                            شماره تلفن
                            <v-text-field :prefix="countryId" class="medist-rating-direction-ltr font-normal pt-2 medist-auth-input-text-left" solo dense rounded outlined flat placeholder="9121234567" />
                        </li>
                        <li class="d-flex align-center">
                            <v-checkbox label="مرا به خاطر بسپار" />
                            <v-spacer />
                            <v-btn text color="transparent" @click="value = 1">
                                <small class="primary--text text-decoration-underline font-small">ورود با نام کاربری و ایمیل</small>
                            </v-btn>
                        </li>
                    </v-card-text>
                    <v-btn color="primary" class="with-mobile-btn" depressed rounded @click="value = 3">بعدی</v-btn>
                </div>
                <!-- end login with mobile -->
                <!-- recieve code -->
                <div class="card" v-if="value == 3">
                    <div class="text">کد 6 رقمی ارسال شده به شماره موبایل خود را وارد  کنید</div>
                    <div class="code-box">
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                    </div>
                    <div class="send-code-mobile-actions">
                        <v-btn rounded depressed class="back" color="primary" outlined @click="value = 2">بازگشت</v-btn>
                        <v-spacer />
                        <v-btn rounded depressed class="getin" color="primary">ورود</v-btn>
                    </div>
                </div>
                <!-- end recieve code -->



                <!-- forget password -->
                <div class="card" v-if="value == 4">
                    <div class="input">
                        <span class="text">شماره تلفن</span>
                        <v-text-field :prefix="countryId" class="text-input" solo dense rounded outlined flat placeholder="9121234567" />
                    </div>
                    <v-btn color="primary" class="forget-btn" depressed rounded @click="value = 5">بعدی</v-btn>
                </div>
                <!-- end forget password -->
                <!-- recieve code -->
                <div class="card" v-if="value == 5">
                    <div class="text">کد 6 رقمی ارسال شده به شماره موبایل خود را وارد  کنید</div>
                    <div class="code-box">
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                        <span class="box">{{ number }}</span>
                    </div>
                    <div class="send-code-mobile-actions">
                        <v-btn rounded depressed class="back" color="primary" outlined @click="value = 4">بازگشت</v-btn>
                        <v-spacer />
                        <v-btn rounded depressed class="getin" color="primary" @click="value = 6">بعدی</v-btn>
                    </div>
                </div>
                <!-- end recieve code -->
                <!-- chnage password -->
                <div class="card-body pr-2" v-if="value == 6">
                    <div>
                        <div class="label">پسورد</div>
                        <v-text-field v-model="password" type="password" class="input" hide-details="" rounded outlined flat placeholder="پسورد خود را وارد کنید" />
                    </div>
                    <div>
                        <div class="label">تکرار پسورد</div>
                        <v-text-field v-model="passwordConfirm" class="input" type="password" hide-details="" rounded outlined flat placeholder="پسورد خود را وارد کنید"  />
                    </div>
                    <li class="password-action" :class="password == passwordConfirm ? 'secondary--text': 'error--text'">{{ password == passwordConfirm ? '' :'پسوردی که وارد کردید با فیلد بالا مطابقت ندارد'  }}</li>
                    <v-btn color="primary" class="btn" depressed rounded>ورود</v-btn>
                </div>
                <!-- end chnage password -->

            </v-col>
            <v-col cols="12" md="6" class="medist-login-left-panel hidden-sm-and-down">
                <div class="medist-login-left-panel-imgs">
                    <div class="img2">
                        <img src="/assets/images/auth/3.png" alt="">
                    </div>
                    <div class="img1">
                        <img src="/assets/images/auth/1.png" alt="">
                    </div>
                </div>
            </v-col>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                value:[ 1,2,3,4,5,6,7,8,9,10 ],
                countryId:'+98',
                number:'1',
                passwordConfirm:'',
                password:'',
            }
        },
        mounted(){
            this.value = 1
        }
    }
</script>

<style lang="scss" scoped>

</style>