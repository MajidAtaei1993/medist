<template>
    <section class="medist-admin-middle-panel" style="height:100%">
        <div class="table">
            <div class="tabs">
                <v-btn depressed :class="tab == 0 ? 'active-tab' : 'tab'" @click="tab = 0">
                    <img :src="tab == 0 ? '/assets/icons/admin/c-journal-w.png' : '/assets/icons/admin/c-journal-c.png'" alt="">
                    ثبت مقالات
                </v-btn>
                <v-btn depressed :class="tab == 1 ? 'active-tab' : 'tab'" @click=" tab = 1">
                    <img :src="tab == 1 ? '/assets/icons/admin/e-jurnal-w.png' : '/assets/icons/admin/e-journal-c.png'" alt="">
                    ویرایش مقالات
                </v-btn>
            </div>
            <div class="tabs-items">
                <div class="tab-item" v-if="tab == 0">
                    <v-row class="header" align="center">
                        <v-col cols="12" md="6" class="col">
                            <div class="icon-text">
                                <img src="/assets/icons/admin/typewriter_with_tablet.png" alt="" class="img">
                                <div class="text">عنوان مقاله</div>
                            </div>
                            <v-text-field class="input" solo flat rounded hide-details placeholder="چیزی تایپ کنید..." />
                        </v-col>
                        <v-col cols="12" md="6" class="col">
                            <div class="icon-text">
                                <img src="/assets/icons/admin/hand_with_pen.png" alt="" class="img">
                                <div class="text">نام نویسنده</div>
                            </div>
                            <v-text-field class="input" solo flat rounded hide-details placeholder="چیزی تایپ کنید..." />
                        </v-col>
                    </v-row>
                    <v-row class="categories-labels ma-0">
                        <v-col cols="12" md="6" class="col">
                            <div class="head">دسته های مقاله را انتخاب کنید</div>
                            <div class="card">
                                <div class="tabs">
                                    <div :class="categoriesTab == 0 ? 'active-tab' : 'tab'" @click="categoriesTab = 0">همه دسته ها</div>
                                    <div :class="categoriesTab == 1 ? 'active-tab' : 'tab'" @click="categoriesTab = 1">پر استفاده ترین ها</div>
                                </div>
                                <div class="content" v-if="categoriesTab == 0">
                                    <div class="lists">
                                        <div class="list" v-for="(cat, i) in categories" :key="i">
                                            <v-checkbox dense hide-details="" :label="cat.title" :value="cat.type" class="checkbox" />
                                            <div @click="cat.type ? '': ''" :class="cat.type ? 'text' : 'change-text'">{{ cat.type ? 'اصلی' : 'تغییر به اصلی' }}</div>
                                        </div>
                                    </div>
                                    <v-btn class="btn" depressed @click="addCategoryDialog = true"> افزودن دسته بندی</v-btn>
                                </div>
                                <div v-if="categoriesTab == 1"></div>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" class="col">
                            <div class="head">برچسب های مقاله را وارد کنید</div>
                            <div class="card">
                                <div class="add-label-input">
                                    <v-text-field v-model="label" solo hide-details class="input" flat background-color="accent" hint="برچسب ها را با کاما جدا کنید" />
                                    <v-btn @click="addLabel" depressed class="btn">افزودن</v-btn>
                                </div>
                                <div>
                                    <v-chip class="ma-2" close close-icon="mdi-close-circle" color="primary" outlined v-for="(label, i) in labels" :key="i" @click:close="removeLabel(label)">{{ label.name }}</v-chip>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" class="col">
                            <div class="head">متن مقاله را بنویسید</div>
                            <div class="textarea">
                                <tiptap-vuetify class="mt-2" v-model="textBody" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%' }" />
                            </div>
                        </v-col>
                        <v-col cols="12" class="col">
                            <v-btn depressed class="submit-journal" @click="addJournal">ثبت مقاله</v-btn>
                        </v-col>
                        <v-snackbar v-model="snackbar" color="secondary">{{ text }}</v-snackbar>
                    </v-row>
                </div>
                <div class="tab-item" v-if="tab == 1">
                    <div class="journals">
                        <div class="journal" v-for="(journal, i) in journals" :key="i">
                            <div class="text">
                                <div class="head">{{ journal.title }}</div>
                                <div class="sutitle" v-html="journal.body.substring(0, 400)" />
                                <div class="actions">
                                    <div>
                                        <v-icon color="primary">mdi-pencil</v-icon>
                                        <span>{{ journal.writer }}</span>
                                    </div>
                                    <div>
                                        <v-icon color="primary">mdi-clock</v-icon>
                                        <span>{{ journal.date }}</span>
                                    </div>
                                    <v-btn class="edit-btn" depressed>ویرایش</v-btn>
                                </div>
                            </div>
                            <img src="/assets/icons/admin/journal.png" alt="" class="img">
                        </div>
                        <div class="pagination">
                            <v-pagination v-model="page" :total-visible="6" class="elevation-0" :length="23" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- upload dialog -->
        <v-dialog width="900" persistent v-model="UploadDialog" class="px-2">
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
        <!-- End upload dialog -->
        <!-- add new category -->
        <v-dialog v-model="addCategoryDialog" width="654">
            <v-card class="medist-rounded pa-3">
                <v-card-title class="d-flex">
                    <v-icon>mdi-format-list-checkbox</v-icon>
                    <span class="font-normal ml-6 mr-2">نام دسته بندی را وارد کنید</span>
                    <v-text-field v-model="category" rounded solo dense hide-details="" flat background-color="accent" placeholder="چیزی تایپ کنید..." />
                </v-card-title>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="addCategory" rounded color="primary" class="px-8 py-6">افزودن</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end add new category -->
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },
        mounted(){
            this.tab = 0
            this.categoriesTab = 0
        },
        data(){
            return{
                tab:[0, 1],
                categoriesTab:[0, 1],
                addCategoryDialog:null,
                UploadDialog:null,
                label:'',
                textBody:'',
                labels:[],
                journals:[
                    {
                        title:'اطلاعات جدید در باره لورم ایپسوم',
                        body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
                        label: this.label,
                        category: this.category,
                        writer: 'سعید قادری',
                        date:new Date().toLocaleDateString('fa-IR'),
                        img:`https://picsum.photos/1920/1080`,
                    }
                ],
                category:'',
                snackbar: false,
                text: `مقاله جدید اضافه شد`,
                page:1,
                chevron:'/assets/images/chevron.png',
                journalIcon:'/assets/icons/typewriter_with_tablet.png',
                writerIcon:'/assets/icons/hand_with_pen.png',
                categories:[
                    { title:'سئو', type: true },
                    { title:'محتوا', type: false },
                    { title:'پزشکی', type: false },
                    { title:'خدمات پزشکی', type: true },
                    { title:'تخصص ها', type: true },
                    { title:'کرونا', type: false },
                    { title:'تخصص ها', type: true },
                    { title:'کرونا', type: false },
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
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
            }
        },
        methods:{
            addLabel(){
                if (this.label) {
                    this.labels.push({
                        name: this.label
                    })
                }
            },
            removeLabel(i){
                this.labels.splice(this.labels.indexOf(i),1)
                this.labels = [...this.labels]
            },
            addCategory(){
                if (this.category) {
                    this.categories.push({
                        title: this.category,
                        type: this.addCategoryDialog
                    })
                    this.addCategoryDialog = false
                }
            },
            addJournal(){
                if (this.textBody) {
                    this.journals.push({
                        title:'اطلاعات جدید در باره لورم ایپسوم',
                        body: this.textBody,
                        label: this.label,
                        category: this.category,
                        writer: 'سعید قادری',
                        img:`https://picsum.photos/1920/1080`
                    })
                    this.snackbar = true
                }
            },
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
                this.UploadDialog = false
                this.uploadFaild = false
            },
            // scroll(e, delta){
            //     scrollArea = document.getElementById('scrollArea')
            //     scrollArea.s
            // }
        },
    }
</script>
<style lang="scss" scoped>
</style>