<template>
    <section class="medist-middle-panel-request-send">
        <v-card flat color="transparent" rounded="xl">
            <v-row align="center" class="fill-height ma-0">
                <v-col cols="12">
                    <div class="font-normal mr-4 info--text">موضوع</div>
                    <ul class="d-flex align-baseline">
                        <li class="col-6">
                            <v-text-field flat class="rounded-pill font-small" solo placeholder="چیزی تایپ کنید ..." dense />
                        </li>
                        <li class="col-6">
                            <v-btn depressed rounded class="medist-upload-attach-btn px-5" @click="dialog = true">
                                <v-icon class="ml-2">mdi-cloud-upload</v-icon>
                                <span class="font-normal">پیوست فایل</span>
                            </v-btn>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="12" class="py-0">
                    <div class="font-normal mr-4 info--text">پیام</div>
                    <v-textarea rounded flat solo no-resize height="390" class="font-small pt-4" placeholder="متن پیام ..." />
                </v-col>
                <v-col class="text-left py-0 pl-0">
                    <v-btn rounded large color="secondary" depressed class="px-12">ارسال</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <!-- dialog -->
        <v-dialog width="900" persistent v-model="dialog" class="px-2">
            <v-btn depressed x-small fab color="primary" @click="dialogClose" class="mb-n8 mr-n0 medist-dialog-btn-zindex">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card rounded="xl">
                <v-container>
                    <v-card-text>
                        <div class="medist-upload-place text-center py-6" @drop.prevent="dropFiles" @dragover.prevent @dragleave.prevent>
                            <v-icon size="75" color="primary">mdi-cloud-upload</v-icon>
                            <h2 class="primary--text font-weight-thin py-2">فایل خود را بکشید و اینجا رها کنید</h2>
                            <p class="medist-upload-detail-color">فایل های مجاز: PDF - XSLS - JPG <span class="mr-16">حجم مجاز: 5 مگابایت</span></p>
                            <v-btn rounded color="secondary" large class="px-12" @click="pickFile">انتخاب فایل</v-btn> 
                            <v-file-input hide-input prepend-icon="" id="input-file" ref="file" v-model="file" @change="uploadFile" accept=".pdf,.xsls,.jpg" multiple />
                        </div>
                    </v-card-text>
                    <!-- Error Alert -->
                    <v-card-text>
                        <v-alert type="error" v-if="hugeSize" dense>
                            حجم فایل نباید بیشتر از 5 مگابایت باشد !
                        </v-alert>
                    </v-card-text>
                    <!-- End Error Alert -->
                    <div class="medist-upload-list-scroll">
                        <v-card-text v-for="(item, i) in uploads" :key="i">
                            <v-row justify="space-between" align="center">
                                <v-col class="text-right pt-0 align-center">
                                    <v-icon color="primary" large>mdi-file</v-icon>
                                    <span>{{ item.name }}</span>
                                </v-col>
                                <v-col class="px-4 pt-0">
                                    <v-row justify="space-between" align="center">
                                        <v-col cols="3" class="font-small">
                                            <li class="secondary--text">{{ Math.ceil(progress) }}%</li>
                                            <li class="px-0" v-if="progress < 100">درحال آپلود</li>
                                            <li class="px-0 secondary--text" v-else>آپلود کامل شد</li>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-progress-linear background-color="#D4D4D4" buffer-value="100" v-model="progress" :value="progress" color="secondary" height="15" class="rounded-pill mx-0 px-0" :active="show" />
                                        </v-col>
                                        <v-col cols="1" class="pr-0">
                                            <v-btn fab depressed x-small color="secondary" v-if="progress == '100'">
                                                <v-icon color="white">mdi-check</v-icon>
                                            </v-btn>
                                            <v-btn fab depressed x-small @click="removeFile(uploads.indexOf(file))" color="red lighten-3" v-else>
                                                <v-icon color="white">mdi-close</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-2" />
                        </v-card-text>
                        <v-card-text v-for="(item, i) in uploadFaild" :key="i">
                            <v-row justify="space-between" align="center">
                                <v-col class="text-right align-center d-flex pt-0">
                                    <v-icon color="primary" large>mdi-file</v-icon>
                                    <span>{{ item.name }}</span>
                                    <span class="font-small error--text mr-3">File Size: {{ String(parseFloat(item.size)) }}</span>
                                    <v-spacer />
                                    <v-btn color="red lighten-3" rounded depressed>
                                        <span class="error--text">آپلود ناقص</span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-2" />
                        </v-card-text>
                    </div>
                </v-container>
            </v-card>
        </v-dialog>
        <!-- End dialog -->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                dialog: false,
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
                chevron:'/assets/images/chevron.png',
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
                this.dialog = false
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