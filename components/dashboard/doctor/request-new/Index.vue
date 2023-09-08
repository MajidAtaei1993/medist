<template>
    <section class="medist-dashbaord-middle">
        <!-- <span class="request-send-chevron">
            <v-img :src="chevron" />
        </span> -->
        <div class="table">
            <div class="notifs">
                <v-btn small color="primary" class="btn ml-2" fab>
                    <v-icon color="white">mdi-chat</v-icon>
                    <div class="notification">{{ notifs }}</div>
                </v-btn>
                <v-menu offset-y content-class="white">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small elevation="2" color="primary" class="btn" fab v-on="on" v-bind="attrs" >
                            <v-icon color="white">mdi-bell</v-icon>
                            <div class="notification">{{ notifs }}</div>
                        </v-btn>
                    </template>
                    <v-list class="medist-notifs-scroll">
                        <v-list-item dense v-for="(item, i) in notifications" :key="i" class="pr-0 py-1" @click="openNotifs">
                            <v-list-item-icon class="primary rounded-pill mt-0" style="width: 40px !important; height: 40px !important">
                                <v-icon color="white" class="mx-auto">mdi-bell-ring-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="mr-4" style="width: 230px !important">
                                <v-list-item-title class="font-normal mb-1">{{ item.title }}</v-list-item-title>
                                <v-list-item-title class="font-normal mb-1">{{ item.title1 }}</v-list-item-title>
                                <v-list-item-subtitle class="font-small info--text">{{ item.date }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="head-text">
                <div class="text">موضوع</div>
                <div class="upload">
                    <v-text-field hide-details="" solo flat class="input"  placeholder="چیزی تایپ کنید ..." />
                    <v-btn depressed class="medist-upload-attach-btn" @click="uploadDialog = true">
                        <img src="/assets/icons/doctor/upload_to_the_cloud.png"  class="img" alt="">
                        پیوست فایل
                    </v-btn>
                </div>
            </div>
            <div class="textarea">
                <div class="head-text">پیام</div>
                <v-textarea flat solo background-color="white" no-resize class="textarea" placeholder="متن پیام ..." />
            </div>
            <v-btn depressed class="send-btn">ارسال</v-btn>
        </div>
        <div class="left">
            <LeftPanel />
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
import LeftPanel from '@/components/dashboard/doctor/request-send/LeftPanel.vue'
    export default {
        components:{ LeftPanel },
        data(){
            return{
                dialog: false,
                uploadDialog:null,
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
                chevron:'/assets/images/chevron.png',
                notifs:'4',
                notifications:[
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                    { title:'تیک از مدیریت', title1:'شما تیک جدیدی از مدیریت دارید', date:'30 بهمن 21:15' },
                    { title:'پیام چت', title1:'شما پیام جدیدی در قسمت چت ها از دکتر سعید قادری دارید', date:'30 بهمن 21:15' },
                    { title:'تایید مدارک', title1:'مدارک ارسالی شما توسط مدیریت تایید شد', date:'30 بهمن 21:15' },
                    { title:'نوبت رزور', title1:'بیمار گرامی نوبت شما با دکتر سعید قادری فردا ساعت 17:50 است. این پیام صرفا جهت یاد آوری میباشد', date:'30 بهمن 21:15' },
                ],
            }
        },
        methods:{
            openNotifs(){},
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