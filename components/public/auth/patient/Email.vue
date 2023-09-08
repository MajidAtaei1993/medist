<template>
    <section class="medist-auth-patient">
        <div class="body">
            <v-stepper v-model="steppers" alt-labels class="steppers">
                <v-stepper-header class="stepper-header">
                    <v-stepper-step :complete="steppers > 1" step="1" class="stepper" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-show="steppers == '1'">وارد کردن ایمیل</small>
                    </v-stepper-step>
                        <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                    <v-stepper-step :complete="steppers > 2" step="2" :complete-icon="steppers > 2 ? 'mdi-check' : ''" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                        <small class="font-small primary--text" v-if="steppers == '2'">تکمیل ثبت نام</small>
                    </v-stepper-step>
                        
                </v-stepper-header>
                    <v-stepper-items class="stepper-content">
                        <v-stepper-content step="1" class="stepper">
                            <div class="input-body">
                                <div>
                                    <div class="label">ایمیل</div>
                                    <v-text-field type="email" hide-details="" class="text-input" outlined flat placeholder="نام کاربری یا ایمیل خود را وارد کنید" />
                                </div>
                                <div>
                                    <div class="label">پسورد</div>
                                    <v-text-field type="password" class="text-input" hide-details="" outlined flat placeholder="پسورد خود را وارد کنید" />
                                </div>
                                <div>
                                    <div class="label">تکرار پسورد</div>
                                    <v-text-field type="password" class="text-input" hide-details="" outlined flat placeholder="پسورد خود را وارد کنید" />
                                </div>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="2" class="stepper">
                            <div class="input-body">
                                <div>
                                    <div class="label">نام *</div>
                                    <v-text-field class="text-input" outlined flat placeholder="نام کاربری یا ایمیل خود را وارد کنید" />
                                </div>
                                <div>
                                    <div class="label">نام خانوادگی *</div>
                                    <v-text-field class="text-input" outlined flat placeholder="پسورد خود را وارد کنید" />
                                </div>
                                <div>
                                    <div class="label">شماره تلفن</div>
                                    <v-text-field dir="ltr" :suffix="countryId" class="text-field" outlined flat placeholder="9121234567" />
                                </div>
                            </div>
                        </v-stepper-content>

                        
                        <v-stepper-content step="3" class="pa-0">
                            <v-row justify="center" align="center" class="ma-0 fill-height">
                                ثبت نام با موفقیت انجام شد
                            </v-row>
                        </v-stepper-content>
                    </v-stepper-items>
            </v-stepper>
            <div class="action-bottoms" v-if="steppers == 1">
                <v-btn depressed class="btn" outlined  @click="$router.push({name:'public-auth'})">بازگشت</v-btn>
                <v-btn depressed class="btn" @click="steppers +=1">بعدی</v-btn>
            </div>
            <div class="action-bottoms" v-else>
                <v-btn depressed class="btn" outlined  @click="steppers -=1">بازگشت</v-btn>
                <v-btn depressed class="btn" @click="steppers +=1" v-if="steppers<3">بعدی</v-btn>
            </div>
        </div>
        <div class="left hidden-sm-and-down">
            <img src="/assets/images/auth/3.png" alt="">
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                value:[1,2,3],
                steppers: 1,
                countryId:'+98',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>