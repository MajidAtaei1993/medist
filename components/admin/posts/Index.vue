<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <!-- <div class="head">
                <div class="text">neveshteha</div>
                <v-btn class="gradiant-btn add-new-post-btn" depressed>afzodan neveshte</v-btn>
            </div> -->
            <!-- header -->
            <div class="header">
                <div class="column">
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
                    <div class="sorting">
                        <div class="text">تاریخ</div>
                        <v-select :items="filterPostsDate" :menu-props="{ offsetY:true }" background-color="white" height="48" flat filled rounded class="input" placeholder="تاریخ" hide-details="">
                            <template v-slot:item="{ item }">
                                <v-checkbox hide-details="" color="secondary" dense :label="item.text" class="" />
                            </template>
                            <template v-slot:append-item>
                                <v-divider />
                                <v-btn text color="transparent" block @click="dialog = true">
                                    <small class=" primary--text text-decoration-underline">انتخاب از تقویم</small>
                                </v-btn>
                            </template>
                        </v-select>
                    </div>
                </div>
                <div class="column">
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
                                        <div class="text">عنوان پست</div>
                                        <v-text-field background-color="#e2e2e2" height="40" filled rounded class="input" hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content">
                                        <div class="text">نام نویسنده</div>
                                        <v-text-field background-color="#e2e2e2" rounded height="40" class="input" filled hide-details="" placeholder="چیزی تایپ کنید..." />
                                    </div>
                                    <div class="input-content time-keeper-content">
                                        <div class="text">بازه زمانی</div>
                                        <div class="time-keeper">
                                            <div class="day">
                                                <div class="up-down">
                                                    <v-icon @click="day =+1">mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="day > 9 ? day : '0' + day">
                                            </div>
                                            <span>/</span>
                                            <div class="month">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="month > 9 ? month : '0' + month">
                                            </div>
                                            <span>/</span>
                                            <div class="year">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" v-model="year">
                                            </div>
                                        </div>
                                        <div class="text">تا</div>
                                        <div class="time-keeper">
                                            <div class="day">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="day ? day : '00'">
                                            </div>
                                            <span>/</span>
                                            <div class="month">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" :value="month ? month : '00'">
                                            </div>
                                            <span>/</span>
                                            <div class="year">
                                                <div class="up-down">
                                                    <v-icon>mdi-chevron-up</v-icon>
                                                    <v-icon>mdi-chevron-down</v-icon>
                                                </div>
                                                <input type="text" class="day" v-model="year">
                                            </div>
                                        </div>
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
                        <v-text-field v-model="search" flat class="input" height="48" background-color="white" placeholder="جستجوی پست" filled rounded hide-details="" />
                        <v-btn class="btn" depressed>
                            <v-icon size="30">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
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
                                        <v-btn icon color="primary" @click="editPostDialog = true">
                                            <v-icon>mdi-circle-edit-outline</v-icon>
                                        </v-btn>
                                        <v-btn icon color="secondary">
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                        <v-btn icon color="error">
                                            <v-icon>mdi-trash-can</v-icon>
                                        </v-btn>
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
                    <div class="cancel-section">
                        <v-btn depressed class="add-btn">افزودن پست</v-btn>
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
                                <v-tooltip bottom color="primary">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="primary" @click="editPostDialog = true" v-on="on" v-bind="attrs">
                                            <v-icon>mdi-circle-edit-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    مشاهده و ویرایش پست
                                </v-tooltip>
                                <v-tooltip bottom color="primary">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="secondary" v-on="on" v-bind="attrs">
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </template>
                                    تایید پست
                                </v-tooltip>
                                <v-tooltip bottom color="primary">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="error" v-on="on" v-bind="attrs">
                                            <v-icon>mdi-trash-can</v-icon>
                                        </v-btn>
                                    </template>
                                    حذف پست
                                </v-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="cancel-section">
                        <v-btn depressed class="add-btn" v-on="on" v-bind="attrs" @click="editPostDialog = true">افزودن پست</v-btn>
                    </div>
                </div>
                <!-- end windows size -->
            </div>
            <!-- data tabele end -->
        </div>
        <!-- calendar dialog -->
        <v-dialog v-model="dialog" persistent content-class="dialog-content">
            <v-btn depressed small fab color="primary" @click="dialog = false" class="close-btn">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-date-picker no-title full-width lang="fa" width="623" locale="fa" color="primary" v-model="date" @click:date="pickDate(), dialog = false" />
        </v-dialog>
        <!-- end calendar dialog -->
        <v-dialog v-model="editPostDialog" persistent content-class="dialog-content">
            <v-btn depressed small fab color="primary" @click="editPostDialog = false" class="close-btn">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="content">
                <v-col cols="12" md="6">
                    <v-text-field hide-details class="input" height="56" solo placeholder="عنوان پست" flat />
                </v-col>
                <v-col cols="12" md="6">
                    <v-select :items="categories" :menu-props="menuProps" hide-details class="input" height="56" solo placeholder="انتخاب دسته بندی" flat />
                </v-col>
                <v-col cols="12">
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
                    </div>
                </v-col>
                <v-col cols="12">
                    <tiptap-vuetify class="tiptap" v-model="textBody" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: false, color: 'white', rounded: 'xl', width: '100%' }" />
                </v-col>
                <v-col cols="12">
                    <v-btn dark class="confirm-btn">تایید</v-btn>
                </v-col>
            </div>
        </v-dialog>
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
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
                day: null,
                month:null,
                year:null,
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
                    { text: 'منتشر شده', value: 0 },
                    { text: 'پیش نویس', value: 1 },
                    { text: 'همه', value: 2 }
                ],
                filterPostsDate:[
                    { text: 'امروز', value: 0 },
                    { text: 'دیروز', value: 1 },
                    { text: 'همه', value: 2 }
                ],
                categories:[
                    { text:'1', value: 0 },
                    { text:'2', value: 1 },
                ],
                menuProps:{
                    offsetY: true,
                },
                header: [
                    { iconTablet:'/assets/icons/admin/table/barcode-c.png' ,icon:'/assets/icons/admin/table/barcode-w.png', text: 'شناسه پست', value: 'visitId', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png' ,icon:'/assets/icons/admin/table/doctor-w.png', text: 'نام منتشر کننده', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/doctor-b.png' ,icon:'/assets/icons/admin/table/doctor-w.png', text: 'نوع کاربر', value: 'doctorName', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/cellPhone-c.png' ,icon:'/assets/icons/admin/table/cellPhone-w.png', text: 'شماره تماس کاربر', value: 'patientPhone', align:'right' },
                    { iconTablet:'/assets/icons/admin/table/timer-c.png', iconTablet1:'/assets/icons/admin/table/calendar-c.png' ,icon:'/assets/icons/admin/table/calendar-w.png', text: 'زمان وتاریخ انتشار' },
                    { icon:'/assets/icons/admin/table/visitType-w.png', text: 'نوع پست', value: 'type', align:'center' },
                ],
                body:[
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'پزشک', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'ویدئو' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'بیمار', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'عکس و متن' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'پزشک', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'ویدئو' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'بیمار', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'عکس و متن' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'پزشک', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'ویدئو' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'بیمار', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'عکس و متن' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'پزشک', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'ویدئو' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'بیمار', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'عکس و متن' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'پزشک', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'ویدئو' },
                    { visitId:'0123456789', doctorName:'سعید قادری', patientName:'بیمار', patientPhone:'09198412978',  timeDate:'1400/12/06 - 1400/12/06', type:'عکس و متن' },
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