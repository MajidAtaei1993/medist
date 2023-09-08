<template>
    <section class="medist-consulting-section">
        <div class="head">
            <img :src="stairIcon" alt="" class="img">
            <div class="text">برای گرفتن مشاوره باید چه مراحلی را طی کرد</div>
        </div>
        <v-container fluid>
            <v-row class="ma-0">
                <v-col cols="12" class="consulting-setepps">
                    <div class="d-flex align-center justify-space-around position-relative">

                        <div class="medist-step d-flex align-center justify-center px-0">
                            <li class="medist-step-circle">1</li>
                        </div>

                        <div class="medist-step d-flex align-center justify-center px-0">
                            <li class="medist-step-circle">2</li>
                        </div>

                        <div class="medist-step d-flex align-center justify-center px-0">
                            <li class="medist-step-circle">3</li>
                        </div>

                        <div class="medist-step d-flex align-center justify-center px-0">
                            <li class="medist-step-circle1">4</li>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-card class="text-center font-normal medist-dropShadow pa-6 mt-n5 medist-rounded medist-zindex0" v-for="(item, i) in steps" :key="i" width="195" min-height="200">
                            <v-card-title class="d-flex align-center justify-center">
                                <img :src="item.img" height="77" />
                            </v-card-title>
                            <li class="black--text">{{ item.step }}</li>
                            <li class="info--text">{{ item.subject }}</li>
                        </v-card>
                    </div>
                </v-col>
                <v-col cols="12" class="consulting-setepps-tablet">
                    <div class="d-flex flex-column align-center justify-center mb-14 medist-step-liner" v-for="(item, i) in steps" :key="i">
                        <li class="medist-step-circle1">{{ i + 1 }}</li>
                        <v-card class="text-center font-normal medist-dropShadow pa-6 mt-n5 medist-rounded medist-zindex0" width="195" min-height="200">
                            <v-card-title class="d-flex align-center justify-center">
                                <img :src="item.img" height="77" />
                            </v-card-title>
                            <li class="black--text">{{ item.step }}</li>
                            <li class="info--text">{{ item.subject }}</li>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                stairIcon:'/assets/images/stairs.png',
                img:'/assets/images/signing_a_document.png',
                steps:[
                    { step:'مرحله اول', subject:'ثبت نام و ورود به سایت', img:'/assets/images/signing_a_document.png' },
                    { step:'مرحله دوم', subject:'انتخاب پزشک مورد نظر', img:'/assets/images/medical_doctor_4.png' },
                    { step:'مرحله سوم', subject:'تعیین نوع مشاوره و انتخاب تاریخ و ساعت', img:'/assets/images/calendar_plus.png' },
                    { step:'مرحله چهارم', subject:'مشاوره با پزشک در زمان تعیین شده', img:'/assets/images/technical_support.png' }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>