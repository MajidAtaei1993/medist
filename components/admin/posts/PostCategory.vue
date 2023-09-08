<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <!-- header -->
            <div class="header">
                <v-col cols="12" md="4" sm="5" class="column">
                    <div class="sorting">
                        <div class="text">نمایش</div>
                        <v-select :items="filterPostsType" :menu-props="{ offsetY:true }" background-color="white" flat class="input" filled rounded placeholder="نمایش" hide-details="">
                            <template v-slot:item="{ item }">
                                <v-list-item dense class="pr-6">
                                    <v-row align="center">
                                        <v-checkbox color="secondary" dense class="rounded-xl" :label="item.text" />
                                    </v-row>
                                </v-list-item>
                            </template>
                        </v-select>
                    </div>
                </v-col>
                <v-col cols="12" md="4" sm="5" class="column">
                    <div class="sorting">
                        <v-menu offset-y content-class="elevation-1 white menu-content" :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab x-small depressed color="white" class="menu-action-btn" v-on="on" v-bind="attrs">
                                    <v-icon size="30" color="primary">mdi-tune</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="menu">
                                <div class="list">
                                    <div class="input-content">
                                        <div class="text">عنوان دسته بندی</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">نام ایجاد کننده</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="action">
                                        <v-btn depressed class="btn mt-3">
                                            <v-spacer />
                                            جستجو
                                            <v-spacer />
                                            <v-icon size="30">mdi-magnify</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </v-list>
                        </v-menu>
                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی دسته بندی" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </div>
            <!-- header end -->
            <!-- data tabele  -->
            <div class="data-table">
                <!-- tablet size -->
                <div class="tablet-mode">
                    <v-expansion-panels class="expansion-panels" flat v-model="expand">
                        <v-expansion-panel class="thead" v-for="(tr, i) in body.slice(0, 8)" :key="i">
                            <v-expansion-panel-header class="content">
                                <img src="/assets/icons/admin/table/chat-tablet.png" alt="" class="chat-img">
                                <v-checkbox hide-details="" class="checkbox" :value="i" dense off-icon="mdi-circle-outline" on-icon="mdi-check-circle" color="secondary" />
                                <div class="th" v-for="(th, j) in header.slice(1, 2)" :key="j">
                                    <img :src="th.iconTablet" alt="" class="img">
                                    <div class="text">{{ th.text }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text text-decoration-underline primary--text">{{ tr.doctorName }}</div>
                                </div>
                                <div class="th justify-end">
                                    <div class="text pl-4 secondary--text">{{ tr.type }}</div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="expand-tbody">
                                <div class="tbody">
                                    <div class="left">
                                        <div class="row">
                                            <div class="column">
                                                <div class="text">{{ tr.visitId }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.patientName }}</div>
                                            </div>
                                            <div class="column">
                                                <v-btn icon color="primary">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                <div class="text">{{ tr.patientPhone }}</div>
                                            </div>
                                            <div class="column">
                                                <v-btn icon color="primary">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                <div class="text">{{ tr.patientTell }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text text-left">{{ tr.timeDate }} <br> {{ tr.timeDate1 }}</div>
                                            </div>
                                            <div class="column">
                                                <div class="text">{{ tr.pay }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="row">
                                            <div class="column" v-for="(item, j) in header.slice(0, 1)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(2, 6)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                            <div class="column" v-for="(item, j) in header.slice(7, 9)" :key="j">
                                                <img :src="item.iconTablet" alt="" class="img">
                                                <div class="text">{{ item.text }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action w-100">
                                        <v-btn class="btn">ویرایش دسته بندی</v-btn>
                                    </div>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="page-slider">
                        <v-btn fab small depressed class="slider-btn">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        <div class="text">صفحه {{ page }} از 56</div>
                        <v-btn fab small depressed class="slider-btn">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- end tablet size -->

                <!-- windows size -->
                <div class="windows-mode">
                    <div class="thead">
                        <div class="th" v-for="(th, i) in header" :key="i">
                            <img :src="th.icon" alt="" class="img">
                            <div class="text">{{ th.text }}</div>
                        </div>
                        <div class="th">
                            <div class="text"></div>
                        </div>
                    </div>
                    <div class="tbody rounded-0" style="max-height: 380px">
                        <div class="tr" v-for="(tr, i) in body" :key="i">
                            <div class="td">
                                <v-checkbox hide-details="" dense :value="i" class="mb-3" />
                                <div class="text">
                                    {{ tr.visitId }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.doctorName }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.patientName }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.patientPhone }}</div>
                            </div>
                            <div class="td text-left">
                                <div class="text">{{ tr.timeDate }} <br> {{ tr.timeDate1 }}</div>
                            </div>
                            <div class="td">
                                <div class="text">{{ tr.type }}</div>
                            </div>
                            <div class="td">
                                <v-btn rounded color="primary" @click="dialog = true">
                                    <v-icon small>mdi-pencil</v-icon>
                                    ویرایش دسته بندی
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="cancel-section">
                        <v-btn depressed class="btn" v-on="on" v-bind="attrs">حذف دسته بندی</v-btn>
                        <v-btn depressed class="add-btn" @click="dialog = true" v-on="on" v-bind="attrs">دسته بندی جدید</v-btn>
                    </div>
                </div>
                <!-- end windows size -->
            </div>
            <!-- data tabele end -->
        </div>
        <!-- /dialog -->
        <v-dialog v-model="dialog" persistent content-class="dialog-content">
            <v-btn depressed small fab color="primary" @click="dialog = false" class="close-btn">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="content">
                <v-col cols="6">
                    <v-text-field hide-details class="input" placeholder="نام دسته بندی" solo flat />
                </v-col>
                <v-col cols="6">
                    <v-text-field hide-details class="input" placeholder="نامک" solo flat />
                </v-col>
                <v-col cols="12">
                    <v-textarea no-resize rows="4" hide-details class="input" placeholder="توضیحات" solo flat />
                </v-col>
                <v-col cols="12">
                    <v-btn depressed dark class="confirm-btn">ایجاد دسته بندی</v-btn>
                </v-col>
            </div>
        </v-dialog>
        <!-- end calendar dialog -->
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },
        data(){
            return{
                dialog:null,
                editPostDialog:null,
                textBody:'',
                uploadDialog:null,
                file:null,
                progress: null,
                uploads:[],
                uploadFaild:[],
                show:true,
                hugeSize:null,
                dragging: false,
                filterPostsType:[
                    { text: 'عنوان', value: 0 },
                    { text: 'نامک', value: 1 },
                    { text: 'همه', value: 2 }
                ],
                header: [
                    { iconTablet:'/assets/icons/admin/table/barcode-c.png' ,icon:'/assets/icons/admin/table/barcode-w.png', text: 'عنوان دسته بندی', value: 'visitId', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png' ,icon:'/assets/icons/admin/table/doctor-w.png', text: 'توضیحات', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png' ,icon:'/assets/icons/admin/table/doctor-w.png', text: 'کاربر ایجاد کنننده', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/cellPhone-c.png' ,icon:'/assets/icons/admin/table/cellPhone-w.png', text: 'شماره تماس کاربر', value: 'patientPhone', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/timer-c.png', iconTablet1:'/assets/icons/admin/table/calendar-c.png' ,icon:'/assets/icons/admin/table/calendar-w.png', text: 'زمان وتاریخ ایجاد' },
                    { icon:'/assets/icons/admin/table/visitType-w.png', text: 'تعداد پست های مرتبط', value: 'type', align:'center' },
                ],
                body:[
                    { visitId:'عنوان دسته بندی', doctorName:'توضیحات مربوط به دسته بندی', patientName:'کاربر ایجاد کننده دسته بندی', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'2' },
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
            pickDate () {
                alert(`${this.date}`)
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
                this.uploadDialog = false
                this.uploadFaild = false
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>