<template>
    <section class="auth-section">
        <div class="auth-choice">
            <div class="card">
                <v-card-text class="card-items" @click="patient =! patient">
                    <v-checkbox class="checkbox" v-model="patient" off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                    <img class="img" :src="img2">
                    <h1 class="primary--text">بیمار هستم</h1>  
                </v-card-text>
                <v-card-text class="hidden-sm-and-down radios">
                    <v-radio-group v-model="register" row class="radio-group">
                        <div v-for="(type, i) in radio" :key="i">
                            <v-radio :value="type.value" />
                            <label :class="type.value == register ? 'primary--text' : '' " :for="type.title">{{ type.title }}</label>
                        </div>
                    </v-radio-group>
                </v-card-text>
            </div>
            <div class="card">
                <v-card-text class="card-items" @click="doctor =! doctor">
                    <v-checkbox class="checkbox" v-model="doctor" off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                    <img class="img" :src="img1">
                    <h1 class="primary--text">پزشک هستم</h1>  
                </v-card-text>
                <v-card-text class="hidden-sm-and-down radios">
                    <v-radio-group v-model="register1" row class="radio-group">
                        <div v-for="(type, i) in radio" :key="i">
                            <v-radio :value="type.value" />
                            <label :class="type.value == register ? 'primary--text' : '' " :for="type.title">{{ type.title }}</label>
                        </div>
                    </v-radio-group>
                </v-card-text>
            </div>
        </div>
        <div class="auth-register-choice hidden-md-and-up">
            <v-radio-group v-model="register" row class="radio-group">
                <div v-for="(type, i) in radio" :key="i">
                    <v-radio :value="type.value" />
                    <label :class="type.value == register ? 'primary--text' : '' " :for="type.title">{{ type.title }}</label>
                </div>
            </v-radio-group>
        </div>
        <div class="auth-bottom">
            <li>
                <small class="primary--text px-3">اکانت داری؟ همین الان وارد شو</small>
                <v-btn rounded depressed class="btn" color="primary" @click="$router.push({name:'public-auth-login'})">ورود</v-btn>
            </li>
            <li>
                <v-btn rounded depressed class="btn" color="primary" @click="checkCommand">بعدی</v-btn>
            </li>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                img1:'/assets/images/auth/1.png',
                img2:'/assets/images/auth/3.png',
                img3:'/assets/images/auth/s1.png',
                img4:'/assets/images/auth/s2.png',
                register:null,
                register1:null,
                doctor:null,
                patient:null,
                radio:[
                    { title:'ثبت نام با شماره موبایل', value:1 },
                    { title:'ثبت نام با ایمیل', value:2 },
                ],
            }
        },
        methods:{
            checkCommand(){
                if (this.register == 1 && this.doctor || this.register1 == 1 && this.doctor) {
                    this.$router.push({name:'public-auth-register-doctor-mobile'})
                }
                if (this.register == 2  && this.doctor || this.register1 == 2 && this.doctor) {
                    this.$router.push({name:'public-auth-register-doctor-email'})
                }
                if (this.register == 1  && this.patient) {
                    this.$router.push({name:'public-auth-register-patient-mobile'})
                }
                if (this.register == 2  && this.patient) {
                    this.$router.push({name:'public-auth-register-patient-email'})
                }
                else {
                    return
                }
            }
        }    
    }
</script>

<style lang="scss" scoped>

</style>