<template>
    <section class="medist-auth-doctor">
            <div :class="steppers <2 ? 'body' : 'body-full '">
                <v-stepper v-model="steppers" alt-labels class="steppers transparent">
                    <v-stepper-header class="stepper-header-doctor">
                            <v-stepper-step :complete="steppers > 1" step="1" class="stepper" complete-icon="" :class="steppers == 1 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-show="steppers == '1'">وارد کردن ایمیل</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 2 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 2" step="2" complete-icon="" :class="steppers == 2 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '2'">اطلاعات شخصی</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 3 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 3" step="3" complete-icon="" :class="steppers == 3 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '3'">اطلاعات تخصصی</small>
                            </v-stepper-step>
                                <v-divider :color="steppers >= 4 ? '#835ADE' : '' " class="medist-stepper-linear rounded-pill" />
                            <v-stepper-step :complete="steppers > 4 " step="4" :complete-icon="steppers > 4 ? 'mdi-check' : ''" :class="steppers == 4 ? 'medist-active-stepper' : '' ">
                                <small class="font-small primary--text" v-if="steppers == '4'">آپلود مدارک</small>
                            </v-stepper-step>
                            
                    </v-stepper-header>
                        <v-stepper-items class="stepper-content">
                            <v-stepper-content step="1" class="stepper">
                                    <div class="input-body">
                                        <div>
                                            <div class="label">ایمیل</div>
                                            <v-text-field class="text-input" hide-details="" outlined flat placeholder="ایمیل خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">پسورد</div>
                                            <v-text-field type="password" class="text-input" hide-details="" outlined flat placeholder="پسورد خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">تکرار گسورد</div>
                                            <v-text-field type="password" class="text-input" hide-details="" outlined flat placeholder="پسورد خود را وارد کنید" />
                                        </div>
                                    </div>
                            </v-stepper-content>

                            <v-stepper-content step="2" class="stepper">
                                <div class="input-body-1">
                                    <div class="right">
                                        <div>
                                            <div class="label">نام *</div>
                                            <v-text-field class="text-input" hide-details="" outlined flat placeholder="نام خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">نام خانوادگی *</div>
                                            <v-text-field class="text-input" hide-details="" outlined flat placeholder="نام خانوادگی خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">ایمیل *</div>
                                            <v-text-field type="email" class="text-input" hide-details="" outlined flat placeholder="ایمیل خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">شماره همراه *</div>
                                            <v-text-field class="text-field" hide-details="" :suffix="country" outlined flat placeholder="9191234567" />
                                        </div>
                                    </div>

                                    <div class="left1">
                                        <div>
                                            <div class="label">شهر *</div>
                                            <v-select :menu-props="{ offsetY: true }" :items="townHall" class="text-input" outlined flat placeholder="شهر خودر ار انتخاب کنید" hide-details="">
                                                <template v-slot:prepend-item>
                                                    <v-text-field flat rounded hide-details="" solo class="mt-2 mx-2 font-normal" background-color="#eeeeee" append-icon="mdi-magnify" placeholder="نام شهر خود را بنویسید..." />
                                                </template>
                                                <template v-slot:item="{ item }">
                                                    <ul class="font-normal">
                                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                    </ul>
                                                </template>
                                            </v-select>
                                        </div>
                                        <div>
                                            <div class="label">جنسیت *</div>
                                            <v-select :menu-props="{ offsetY: true }" :items="gender" class="text-input" outlined flat placeholder="جنسیت خود را انتخاب کنید" hide-details="">
                                                <template v-slot:item="{ item }">
                                                    <ul class="font-normal">
                                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                    </ul>
                                                </template> 
                                            </v-select>
                                        </div>
                                        <div>
                                            <div class="label">شماره شبا</div>
                                            <v-text-field class="text-input" hide-details="" outlined flat placeholder="شماره شبا خود را وارد کنید" />
                                        </div>
                                    </div>
                                </div>
                            </v-stepper-content>

                            <v-stepper-content step="3" class="stepper">
                                <div class="input-body-1">
                                    <div class="right">
                                        <div>
                                            <div class="label">شماره نظام پزشکی *</div>
                                            <v-text-field class="text-input" hide-details="" outlined flat placeholder="شماره نظام پزشکی خود را وارد کنید" />
                                        </div>
                                        <div>
                                            <div class="label">فوق تخصص *</div>
                                            <v-select :menu-props="{ offsetY: true }" class="text-input" hide-details="" outlined flat placeholder="فوق تخصص خود را انتخاب کنید">
                                                <template v-slot:prepend-item>
                                                    <v-text-field flat rounded hide-details="" solo class="mt-2 mx-2 font-normal" background-color="#eeeeee" append-icon="mdi-magnify" placeholder="نام فوق تخصصی خود را بنویسید..." />
                                                </template>
                                                <template v-slot:item="{ item }">
                                                    <ul class="font-normal">
                                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                    </ul>
                                                </template>
                                            </v-select>
                                        </div>
                                        <div>
                                            <div class="label">آدرس مطب</div>
                                            <v-textarea no-resize height="100%" rounded outlined flat placeholder="آدرس مطب خود را وارد کنید" />
                                        </div>
                                    </div>

                                    <div class="left1">
                                        <div>
                                            <div class="label">تخصص *</div>
                                            <v-select :menu-props="{ offsetY: true }" class="text-input" hide-details="" outlined flat placeholder="تخصص خود را انتخاب کنید">
                                                <template v-slot:prepend-item>
                                                    <v-text-field flat rounded hide-details="" solo class="mt-2 mx-2 font-normal" background-color="#eeeeee" append-icon="mdi-magnify" placeholder="نام تخصص خود را بنویسید..." />
                                                </template>
                                                <template v-slot:item="{ item }">
                                                    <ul class="font-normal">
                                                        <v-checkbox dense hide-details="" :label="item.text" :value="item.value" />
                                                    </ul>
                                                </template>
                                            </v-select>
                                        </div>
                                        <div>
                                            <div class="label">بیو و رزومه *</div>
                                            <v-textarea rows="8" no-resize height="100%" rounded outlined flat placeholder="بیو و رزومه خود را وارد کنید" />
                                        </div>
                                    </div>
                                </div>
                            </v-stepper-content>
                            
                            <v-stepper-content step="4" class="stepper">
                                <div class="upload-section">
                                    <div class="avatar">
                                        <div class="text">عکس پروفایل</div>
                                        <div class="avatar">
                                            <v-avatar size="115">
                                                <v-img :src="avatar" />
                                            </v-avatar>
                                        </div>
                                        <v-btn class="upload-btn" depressed>
                                            <v-icon size="28" class="ml-2">mdi-cloud-upload</v-icon>
                                            <span>آپلود عکس پروفایل</span>
                                        </v-btn>
                                    </div>
                                    <div class="stufs">
                                        <div class="text">مدرک تحصیلی *</div>
                                        <v-btn  class="upload-btn" depressed @click="uploadDialog = true">
                                            <v-icon size="28" class="ml-2">mdi-cloud-upload</v-icon>
                                            <span>آپلود</span>
                                        </v-btn>
                                    </div>
                                    <div class="upload-status">
                                        <v-icon size="35" color="primary">mdi-file</v-icon>
                                        <div class="text">نام فایل</div>
                                        <v-spacer />
                                        <div class="status text-left">آپلود کامل شده</div>
                                    </div>
                                </div>
                            </v-stepper-content>


                            <v-stepper-content step="5" class="stepper">
                                <div class="font-xl text-center">ثبت نام با موفقیت انجام شد</div>
                            </v-stepper-content>
                        </v-stepper-items>
                </v-stepper>
                <div class="action-bottoms" v-if="steppers == 1">
                    <v-btn depressed class="btn" outlined  @click="$router.push({name:'public-auth'})">بازگشت</v-btn>
                    <v-btn depressed class="btn" @click="steppers +=1">بعدی</v-btn>
                </div>
                <div class="action-bottoms-final" v-if="steppers == 4">
                    <v-btn depressed class="btn" outlined  @click="$router.push({name:'public-auth'})">ثبت نام</v-btn>
                    <v-btn depressed class="btn" @click="steppers -=1">بازگشت</v-btn>
                </div>
                <div class="action-bottoms" v-else>
                    <v-btn depressed class="btn" outlined v-if="steppers >1"  @click="steppers -=1">بازگشت</v-btn>
                    <v-btn depressed class="btn" outlined v-else @click="$router.push({name:'public-auth'})">بازگشت</v-btn>
                    <v-btn depressed class="btn" @click="steppers +=1" v-if="steppers<6">بعدی</v-btn>
                </div>
            </div>
            <div v-if="steppers < 2" class="left hidden-sm-and-down">
                <img src="/assets/images/auth/1.png" alt="" />
            </div>

        <!--  upload dialog -->
        <v-dialog width="700" persistent v-model="uploadDialog">
            <v-btn depressed x-small fab color="primary" @click="dialogClose" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="upload-body">
                <div class="card" @drop.prevent="dropFiles" @dragover.prevent @dragleave.prevent>
                    <v-icon size="75" color="primary">mdi-cloud-upload</v-icon>
                    <div class="head">فایل خود را آپلود کنید</div>
                    <div  class="detail">فایل های مجاز: PDF - XSLS - JPG 
                        <span>حجم مجاز: 5 مگابایت</span>
                    </div>
                    <v-btn depressed class="btn" @click="pickFile">انتخاب فایل</v-btn>
                    <v-file-input hide-input prepend-icon="" append-icon="" @change="uploadFile" id="input-file" ref="file" v-model="file" accept=".pdf, .xsls, .jpg" multiple />
                </div>
                <!-- Error Alert -->
                <div>
                    <v-alert type="error" v-if="hugeSize" dense>
                        حجم فایل نباید بیشتر از 5 مگابایت باشد !
                    </v-alert>
                </div>
                <!-- End Error Alert -->
                <div class="scroll">
                    <div class="uploading" v-for="(item, i) in uploads" :key="i">
                        <div class="right">
                            <v-icon color="primary" size="30">mdi-file</v-icon>
                            <div class="file-name">{{ item.name }}</div>
                        </div>
                        <div class="left">
                            <div class="details">
                                <div class="percent">{{ Math.ceil(progress) }}%</div>
                                <div class="text" v-if="progress < 100">درحال آپلود</div>
                                <div class="text secondary--text" v-else>آپلود کامل شد</div>
                            </div>
                            <v-progress-linear background-color="#D4D4D4" buffer-value="100" v-model="progress" :value="progress" color="secondary" class="progress-liner" :active="show" />
                            <div class="btn">
                                <v-btn fab depressed x-small color="secondary" v-if="progress == '100'">
                                    <v-icon color="white">mdi-check</v-icon>
                                </v-btn>
                                <v-btn fab depressed x-small @click="removeFile(uploads.indexOf(file))" color="red lighten-3" v-else>
                                    <v-icon color="white">mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item, i) in uploadFaild" :key="i" class="uploading">
                        <div class="right1">
                            <v-icon color="primary" size="30">mdi-file</v-icon>
                            <div class="file-name">{{ item.name }}</div>
                            <span>File Size: {{ String(parseFloat(item.size)) }}</span>
                        </div>
                        <v-spacer />
                        <div class="left1">
                            <v-btn class="btn" depressed>
                                <span>آپلود ناقص</span>
                            </v-btn>
                        </div>
                    </div>
                </div>
                <v-btn depressed class="confirm-btn">تایید</v-btn>
            </div>
        </v-dialog>
        <!-- End upload dialog -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                value:[1,2,3],
                steppers: 1,
                countryId:'+98',
                number:'1',
                uploadDialog:null,
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                dialog: false,
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
                country:'+98',
                townHall:[
                    { text:'اردبیل', value :0 },
                    { text:'باکو', value :1 },
                    { text:'ترکیه', value :2 },
                    { text:'آلمان', value :3 },
                    { text:'هلند', value :4 },
                ],
                gender:[
                    { text:'زن', value :0 },
                    { text:'مرد', value :1 }
                ]
            }
        },
        methods:{
            pickFile(){
                document.getElementById("input-file").click()
            },
            uploadFile(e){
                // this.uploads = [...this.$refs.file.files]
                for (let i = 0; i < e.length; i++) {
                    const el = e[i];
                    if (el.size/1000000 <= 5) {
                        this.uploads.push({
                            name: el.name,
                            size: el.size
                        })
                        // onUploadProgress: uploadEvent=>{
                        // console.log('upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total *100)+ '%')
                        // }
                        setInterval(() => {
                            if (this.progress < 100) {
                                this.progress += 1
                            }
                        }, 100);
                    }
                    else{
                        this.hugeSize = true
                        this.uploadFaild.push({
                            name: el.name,
                            size: el.size
                        })
                        setInterval(() => {
                            this.hugeSize = false
                        }, 3000);
                    }
                }
                // console.log(e)
            },

            dropFiles(e) {
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    const el = e.dataTransfer.files[i];
                    if (el.size/1000000 <= 5) {
                        this.uploads.push({
                            name: el.name,
                            size: el.size
                        })
                        // onUploadProgress: uploadEvent=>{
                        // console.log('upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total *100)+ '%')
                        // }
                        setInterval(() => {
                            if (this.progress < 100) {
                                this.progress += 1
                            }
                        }, 100);
                    }
                    else{
                        this.hugeSize = true
                        this.uploadFaild.push({
                            name: el.name,
                            size: el.size
                        })
                        setInterval(() => {
                            this.hugeSize = false
                        }, 3000);
                    }
                }
            },
            removeFile(i){
                this.uploads.splice(i, 1);
            },
            dialogClose(){
                this.uploads = []
                this.uploadDialog = false
                this.uploadFaild = false
            },
            // scroll(e, delta){
            //     scrollArea = document.getElementById('scrollArea')
            //     scrollArea.s
            // }
        }
    }
</script>

<style lang="scss" scoped>

</style>