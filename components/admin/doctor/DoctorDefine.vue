<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <div class="employe-form px-8">
                <v-row class="ma-0" justify="space-between" v-if="step == 0">
                    <div class="define-head">
                        <img :src="img" alt="" class="ml-3">
                        <div class="text">اطلاعات شخصی</div>
                    </div>
                    <v-col cols="12" class="avatar">
                        <v-btn depressed class="btn">آپلود عکس پروفایل</v-btn>
                        <img :src="avatar" alt="" class="avatar">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/admin/contact-b.png" alt="" class="img">
                        <div class="text">نام</div>
                        <input type="text" class="input" placeholder="نام">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/admin/contact-b.png" alt="" class="img">
                        <div class="text">نام خانوادگی</div>
                        <input type="text" class="input" placeholder="نام خانوادگی">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/email.png" alt="" class="img">
                        <div class="text">ایمیل</div>
                        <input type="text" class="input" placeholder="ایمیل">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/cell_phone-b.png" alt="" class="img">
                        <div class="text">شماره همراه</div>
                        <input type="text" class="input" placeholder="شماره همراه">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/town-hall.png" alt="" class="img">
                        <div class="text">شهر</div>
                        <input type="text" class="input" placeholder="شهر">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/lock-b.png" alt="" class="img">
                        <div class="text">رمز</div>
                        <input type="text" class="input" placeholder="رمز">
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/gender.png" alt="" class="img">
                        <div class="text">جنسیت</div>
                        <v-select class="select_input" solo flat rounded hide-details="" :menu-props="{bottom: true, offsetY:true}" placeholder="جنیست" :items="gender" />
                    </v-col>
                    <v-col cols="12" lg="6" class="column mb-8">
                        <img src="/assets/icons/doctor/shaba.png" alt="" class="img">
                        <div class="text">شماره شبا</div>
                        <input type="text" class="input" placeholder="شماره شبا">
                    </v-col>
                </v-row>
                <v-row class="ma-0" justify="space-between" v-if="step == 1 || step == 2">
                    <div class="define-head">
                        <img :src="img1" alt="" class="ml-3">
                        <div class="text">اطلاعات تخصصی</div>
                    </div>
                    <div class="define-steeps">
                        <div :class="step == 1 ? 'step-active' : 'step'">{{ step == 1 ? 'صفحه 1' : '1' }}</div>
                        <div :class="step == 2 ? 'step-active' : 'step'">{{ step == 2 ? 'صفحه 2' : '2' }}</div>
                    </div>
                    <div class="employe-form" v-if="step == 1">
                        <v-row class="ma-0">
                            <v-col cols="12" lg="6" class="column mb-8">
                                <img src="/assets/icons/doctor/barcode.png" alt="" class="img">
                                <div class="text">شماره نظام پزشکی</div>
                                <input type="text" class="input" placeholder="شماره نظام پزشکی">
                            </v-col>
                            <v-col cols="12" lg="6" class="column mb-8">
                                <img src="/assets/icons/doctor/receipt.png" alt="" class="img">
                                <div class="text">تخصص</div>
                                <input type="text" class="input" placeholder="تخصص">
                            </v-col>
                            <v-col cols="12" lg="6" class="column mb-8">
                                <img src="/assets/icons/doctor/lab-coat.png" alt="" class="img">
                                <div class="text">نسخه الکترونیک</div>
                                <v-select class="input" solo dense flat rounded hide-details="" :menu-props="{bottom: true, offsetY:true}" placeholder="نسخه الکترونیک" :items="gender" />
                            </v-col>
                            <v-col cols="12" lg="6" class="column mb-8">
                                <img src="/assets/icons/doctor/lab-coat.png" alt="" class="img">
                                <div class="text">فوق تخصص</div>
                                <v-select class="input" solo dense flat rounded hide-details="" :menu-props="{bottom: true, offsetY:true}" placeholder="فوق تخصص" :items="gender" />
                            </v-col>
                            <v-col cols="12" lg="6" class="column mb-8">
                                <img src="/assets/icons/doctor/graduation.png" alt="" class="img">
                                <div class="text">مدرک تخصیلی</div>
                                <input type="text" class="input" hidden>
                                <v-btn width="181" height="48" depressed class="medist-rounded d-flex mr-auto" color="secondary">
                                    <v-icon>mdi-upload</v-icon>
                                    <v-spacer />
                                    آپلود
                                    <v-spacer />
                                </v-btn>
                            </v-col>
                            <v-col cols="12" lg="6" class="column mb-8 mt-8">
                                <v-textarea name="" id="" no-resize rows="3" class="textarea w-100 medist-rounded" solo flat placeholder="تخصص را توضیح دهید ..." />
                            </v-col>
                        </v-row>
                    </div>
                    <div class="employe-form px-2" v-if="step == 2">
                        <v-row class="ma-0">
                            <v-col cols="12" class="column flex-wrap" style="height:max-content">
                                <img src="/assets/icons/doctor/study.png" alt="" class="img">
                                <div class="text">بیو و رزومه</div>
                                <tiptap-vuetify class="mt-2 font-normal w-100" v-model="textBody" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }">
                                </tiptap-vuetify>
                            </v-col>
                            <v-col cols="12" class="column flex-wrap" style="height:max-content">
                                <img src="/assets/icons/doctor/location.png" alt="" class="img">
                                <div class="text">آدرس مطب</div>
                                <v-textarea name="" id="" no-resize rows="3" class="textarea w-100 medist-rounded mt-2" solo flat placeholder="آدرس مطب ..." />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
            </div>
            <div class="actions">
                <v-btn class="btn-outline" depressed v-if="step > 0" @click="step -=1">بازگشت</v-btn>
                <v-btn class="btn" depressed v-if="step < 3" @click="step +=1">بعدی</v-btn>
            </div>
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
                <v-btn depressed class="confirm-btn" :disabled="!uploads.length">تایید</v-btn>
            </div>
        </v-dialog>
        <!-- End upload dialog -->
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },
        data(){
            return{
                img:'/assets/icons/Ellipse_95.png',
                img1:'/assets/icons/Ellipse_96.png',
                chevron:'/assets/images/chevron.png',
                avatar:'https://cdn.vuetifyjs.com/images/john.png',
                step: 0,
                uploadDialog:null,
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
                gender:[
                    { text: 'زن', value:'0' },
                    { text: 'مرد', value:'1' },
                ],
                elCase:[
                    { text:'دارد', value:'0' },
                    { text:'ندارد', value:'1' },
                ],
                elCase1:[
                    { text:'فوق تخص گوارش و کبد', value:'0' },
                    { text:'فوق تخصص خون و آنکولوژی', value:'1' },
                    { text: 'فوق تخصص کلیه', value: '2' },
                    { text: 'فوق تخصص روماتولوژی', value: '3' },
                    { text: 'فوق تخصص غدد', value: '4' },
                    { text: 'فوق تخصص قلب و عروق', value: '5' },
                    { text: 'فوق تخصص ریه', value: '6' },
                    { text:'فوق تخص گوارش و کبد', value:'7' },
                    { text:'فوق تخصص خون و آنکولوژی', value:'8' },
                    { text: 'فوق تخصص کلیه', value: '8' },
                    { text: 'فوق تخصص روماتولوژی', value: '9' },
                    { text: 'فوق تخصص غدد', value: '10' },
                    { text: 'فوق تخصص قلب و عروق', value: '11' },
                    { text: 'فوق تخصص ریه', value: '12' },
                ],
                extensions: [
                    Paragraph,
                    [Heading, {
                        options: {
                        levels: [1, 2, 3]
                        }
                    }],
                    Bold,
                    Italic,
                    History,
                    Blockquote,
                    Link,
                    Underline,
                    Strike,
                    ListItem,
                    BulletList,
                    OrderedList,
                    Code,
                    HorizontalRule,
                    HardBreak,
                ],
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