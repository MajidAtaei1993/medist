<template>
    <section class="medist-admin-expert-define">
        <div class="left">
            <div class="head font-weight-bold font-md w-100 text-right">
                <v-icon>mdi-hours-24</v-icon>
                تعداد پزشکان ثبت شده در هر تخصص
            </div>
            <div class="expert-list">
                <div class="lists">
                    <div class="list" v-for="(doctor, i) in doctors" :key="i">
                        <img :src="doctor.avatar" alt="" class="avatar">
                        <div class="expert">{{ doctor.major }}</div>
                        <div class="queue">{{ doctor.queue }}</div>
                    </div>
                </div>
            </div>
            <div class="expert-cards">
                <div class="card" v-for="(item, i) in expertCards" :key="i">
                    <img :src="item.img" alt="" class="img">
                    <div class="count">{{ item.count }}</div>
                    <div class="subject">{{ item.subject }}</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="tabs">
                <v-btn @click="tab = 0" :class="tab == 0 ? 'active-tab' : 'tab'" class="ml-3" depressed>
                    <img :src="tab == 0 ? '/assets/icons/admin/database-w.png' : '/assets/icons/admin/database-c.png'" alt="">
                    ایجاد تخصص
                </v-btn>
                <v-btn @click="tab = 1" :class="tab == 1 ? 'active-tab' : 'tab'" depressed>
                    <img :src="tab == 1 ? '/assets/icons/admin/c-expert-w.png' : '/assets/icons/admin/c-expert-c.png'" alt="">
                    ویرایش تخصص
                </v-btn>
            </div>
            <v-tabs-items v-model="tab" class="transparent">
                <v-tab-item class="tab-item">
                    <div class="add-category">
                        <div class="icon-text">
                            <img src="/assets/icons/doctor/lab-coat.png" alt="">
                            <div class="text">دسته بندی</div>
                        </div>
                        <input type="text" class="input" placeholder="نام تخصص را وارد کنید">
                        <v-btn class="btn" depressed>
                            <img src="/assets/icons/admin/upload-w.png" alt="">
                            آپلود آیکن تخصص
                        </v-btn>
                    </div>
                    <div class="text">محتوای تخصص</div>
                    <div class="tiptap">
                        <tiptap-vuetify :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }">
                        </tiptap-vuetify>
                    </div>
                </v-tab-item>
                <v-tab-item class="tab-item">
                    <div class="text">نام تخصص را انتخاب کنید</div>
                    <div class="data-table">
                        <div class="table">
                            <div class="tr" v-for="(item, i) in items.slice(0, 9)" :key="i">
                                <div class="td" style="width:130%">
                                    <v-checkbox dense hide-details="" class="mb-3" :value="i" />
                                    <div class="text">{{ item.title }}</div>
                                </div>
                                <div class="td justify-end" @click="editNameDialog = true">
                                    <div class="text">ویرایش نام </div>
                                    <img src="/assets/icons/admin/edit-pen-c.png" alt="">
                                </div>
                                <div class="td justify-end" @click="editSkillDialog = true">
                                    <div class="text">ویرایش محتوای تخصصی </div>
                                    <img src="/assets/icons/admin/hand_with_pen-c.png" alt="">
                                </div>
                                <div class="td justify-end">
                                    <div class="text">ویرایش آیکن </div>
                                    <img src="/assets/icons/admin/camera_icon_with_face.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="slider-section">
                            <v-btn class="slider-btn" fab small depressed>
                                <v-icon large color="white">mdi-chevron-right</v-icon>
                            </v-btn>
                            <div class="text">صفحه {{ page }} از 56</div>
                            <v-btn class="slider-btn" fab small depressed>
                                <v-icon large color="white">mdi-chevron-left</v-icon>
                            </v-btn>
                        </div>
                        <div class="cancel-action">
                            <v-btn class="btn" depressed>حذف دسته بندی</v-btn>
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
            <v-btn depressed class="submit-action">{{ tab == 0 ? 'ایجاد تخصص' : 'ثبت ویرایش'}}</v-btn>
        </div>

        <!-- edit name dialog -->
        <v-dialog v-model="editNameDialog" persistent width="350">
            <v-card color="white" class="medist-rounded pa-2">
                <v-card-text class="d-flex align-center pa-0">
                    <v-icon large color="secondary" class="medist-cursor-pointer" @click="editNameDialog = false">mdi-check-circle</v-icon>
                    <v-text-field solo dense hide-details="" rounded flat background-color="#e2e2e2" placeholder="ادیت نام تخصصی" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- end edit name dialog -->

        <!-- edit skill dialog -->
        <v-dialog v-model="editSkillDialog" persistent width="1200">
            <v-card color="white" rounded="xl">
                <v-card-text class="pa-0">
                    <tiptap-vuetify class="mt-2 font-normal" :extensions="extensions" :toolbar-attributes="{ color: '#d2d2d2', rounded: 't-xl' }" :card-props="{ flat: true, color: 'white', rounded: 'xl', width: '100%', height: '100%' }">
                        <template :toolbar="{ buttons, commands, isActive }">
                            <pre>test</pre>
                        </template>
                    </tiptap-vuetify>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="secondary" large rounded class="px-10 font-normal" @click="editSkillDialog = false">ثبت محتوا</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end edit skill dialog -->
    </section>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },
        mounted(){
            this.tab = 0
        },
        data(){
            return{
                page:1,
                major:{
                    expert:'13',
                    upperExpert:'345'
                },
                chevron:'/assets/images/chevron.png',
                tab:[0, 1],
                editNameDialog: null,
                editSkillDialog: null,
                expertCards:[
                    { img:'/assets/icons/admin/insulin_pen.png', count:'13', subject:'تعداد کل تخصص ها' },
                    { img:'/assets/icons/admin/microscope.png', count:'345', subject:'تعداد کل تخصص ها' }
                ],
                body:[
                    {
                        name:'فوق تخصص گوارش و کبد', 
                    },
                ],
                items:[
                    { title:'فوق تخصص گوارش و کبد' },
                    { title:'فوق تخصص خون و آنکولوژی' },
                    { title:'فوق تخصص کلیه' },
                    { title:'فوق تخصص روماتولوژی' },
                    { title:'فوق تخصص غدد' },
                    { title:'فوق تخصص قلب و عروق' },
                    { title:'فوق تخصص ریه' },
                    { title:'فوق اخصص بیماری های عفونی' },
                    { title:'فوق تخصص گوارش و کبد' },
                    { title:'فوق تخصص خون و آنکولوژی' },
                    { title:'فوق تخصص کلیه' },
                    { title:'فوق تخصص روماتولوژی' },
                    { title:'فوق تخصص غدد' },
                    { title:'فوق تخصص قلب و عروق' },
                    { title:'فوق تخصص ریه' },
                    { title:'فوق اخصص بیماری های عفونی' },
                    { title:'فوق تخصص گوارش و کبد' },
                    { title:'فوق تخصص خون و آنکولوژی' },
                    { title:'فوق تخصص کلیه' },
                    { title:'فوق تخصص روماتولوژی' },
                    { title:'فوق تخصص غدد' },
                    { title:'فوق تخصص قلب و عروق' },
                    { title:'فوق تخصص ریه' },
                    { title:'فوق اخصص بیماری های عفونی' },
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
                doctors:[
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'ریه', queue:'34نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'مغزو اعصاب', queue:'12نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'کلیه', queue:'5نفر' },
                    { avatar:'https://cdn.vuetifyjs.com/images/john.png', major:'قلب', queue:'23نفر' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.v-tab.v-tab {
    color: transparent !important;
}
.v-slide-group__next {
    display: none !important;
}

.v-slide-group__prev {
    display: none !important;
}
</style>