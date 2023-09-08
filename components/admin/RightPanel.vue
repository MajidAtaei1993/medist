<template>
    <div class="right-menu-scroll">
        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ? 'medist-right-menu-active-color' : ''">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu" :key="i" :value="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ? true : false"  append-icon="mdi-chevron-left">
                <template v-slot:activator>
                    <img :src="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                    <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                        <img :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title>
                                <nuxt-link class="font-md hidden-md-and-down" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <img :src="chevron" class="chevron" alt="" :class="$route.name =='admin-managment-all-turns' ? 'chevron-admin-all-turn' : $route.name =='admin-managment-transactions-bill' ? 'chevron-admin-transaction-bill' : $route.name =='admin-managment-journals' ? 'chevron-admin-journals' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>


        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-list-edit-id' || $route.name =='admin-doctor-list-id'|| $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' || $route.name =='admin-doctor-unit-pricing' ? 'medist-right-menu-active-color' : ''">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu1" :key="i" :value="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-list-id' || $route.name == 'admin-doctor-list-edit-id' || $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' ||$route.name =='admin-doctor-unit-pricing' ? true : false" append-icon="mdi-chevron-left">
                <template v-slot:activator>
                    <img  :src="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-list-id' || $route.name =='admin-doctor-list-edit-id' || $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' ||$route.name =='admin-doctor-unit-pricing' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                    <img  :src="$route.name == item1.link || item1.link1 || item1.link2 ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md hidden-md-and-down" :class="$route.name == item1.link || $route.name == item1.link1 || $route.name == item1.link2 ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-list-id' || $route.name =='admin-doctor-list-edit-id' ? 'chevron-admin-doctor-list' : $route.name =='admin-doctor-doctor-define' ? 'chevron-admin-doctor-define' : $route.name =='admin-doctor-expret-define' ? 'chevron-admin-expert-define' : $route.name == 'admin-doctor-unit-pricing' ? 'chevron-admin-unit-pricing' :  'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>


        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ? 'medist-right-menu-active-color' : ''">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu2" :key="i" :value="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ? true : false" append-icon="mdi-chevron-left">
                <template v-slot:activator>
                    <img  :src="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                    <img  :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md hidden-md-and-down" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='admin-patient-list' ? 'chevron-admin-patient-list' : $route.name =='admin-patient-manual-trun' ? 'chevron-admin-patient-manual-turn' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>


        <!-- List single -->
        <v-list-item dense v-for="(item, i) in lists" :key="i">
            <img :src="$route.name == item.link ? item.iconActive : $route.name == item.link1 ? item.iconActive : item.icon" @click="$router.push({ name: item.link })" style="cursor:pointer">
            <v-list-item-icon />
            <v-list-item-content>
                <v-list-item-title class="py-1">
                    <nuxt-link exact class="font-md hidden-md-and-down" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'black--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                    <v-chip x-small color="primary" class="mr-3 white--text px-2 py-3 font-md rounded-pill" v-if="item.chip">
                        <small class="white--text">{{ item.chip }}</small>
                    </v-chip>
                </v-list-item-title>
            </v-list-item-content>
            <img :src="chevron" class="chevron" v-if="item.value == 0" :class="$route.name == 'admin-employee' || $route.name == 'admin-employee-duty' ? 'chevron-admin-employee' : 'd-none'" alt="">
            <img :src="chevron" class="chevron chevron-doctor-chat" v-if="item.value == 1" :class="$route.name == 'admin-experiment-confirm' ? 'chevron-admin-experiment-confirm' : 'd-none'" alt="">
        </v-list-item>
        <!-- End List single -->

        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ? 'medist-right-menu-active-color' : ''">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu3" :key="i" :value="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ? true : false" append-icon="mdi-chevron-left">
                <template v-slot:activator>
                    <img  :src="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                    <img  :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md hidden-md-and-down" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='admin-transaction-employee-doctor' ? 'chevron-admin-transactions-employe-doctor' : $route.name =='admin-transaction-gift-card' ? 'chevron-admin-transaction-gift-card' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>


        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-posts' || $route.name =='admin-posts-post-new' || $route.name =='admin-posts-post-category' || $route.name =='admin-posts-post-tag' ? 'medist-right-menu-active-color' : ''">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu4" :key="i" :value="$route.name =='admin-posts' || $route.name =='admin-posts-post-new' || $route.name =='admin-posts-post-category' || $route.name =='admin-posts-post-tag' ? true : false" append-icon="mdi-chevron-left">
                <template v-slot:activator>
                    <img  :src="$route.name =='admin-posts' || $route.name =='admin-posts-post-new' || $route.name =='admin-posts-post-category' || $route.name =='admin-posts-post-tag' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                    <img  :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md hidden-md-and-down" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='admin-transaction-employee-doctor' ? 'chevron-admin-transactions-employe-doctor' : $route.name =='admin-transaction-gift-card' ? 'chevron-admin-transaction-gift-card' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>

        <!-- List single -->
        <v-list-item dense v-for="(item, i) in lists1" :key="i">
            <img :src="$route.name == item.link ? item.iconActive : $route.name == item.link1 ? item.iconActive : item.icon" @click="$router.push({ name: item.link })" style="cursor:pointer">
            <v-list-item-icon />
            <v-list-item-content>
                <v-list-item-title class="py-1">
                    <nuxt-link exact class="font-md hidden-md-and-down" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'black--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                    <v-chip x-small color="primary" class="mr-3 px-2 py-3 font-md rounded-pill" v-if="item.chip">
                        <small class="white--text">{{ item.chip }}</small>
                    </v-chip>
                </v-list-item-title>
            </v-list-item-content>
            <img :src="chevron" class="chevron" v-if="item.value == 0" :class="$route.name == 'admin-chat' ? 'chevron-admin-chat' : 'd-none'" alt="">
            <img :src="chevron" class="chevron" v-if="item.value == 1" :class="$route.name == 'admin-ticket' ? 'chevron-admin-ticket' : 'd-none'" alt="">
            <img :src="chevron" class="chevron" v-if="item.value == 2" :class="$route.name == 'admin-comments' ? 'chevron-admin-comments' : 'd-none'" alt="">
        </v-list-item>
        <!-- End List single -->

    </div>
</template>

<script>
    export default {
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                rightMenu:[
                    { 
                        header:'داشتبورد مدیریت',
                        icon:'/assets/icons/admin/panel/admin.png',
                        iconActive:'/assets/icons/admin/panel/admin-c.png',
                        children:[
                            { iconActive:'/assets/icons/admin/panel/allTurn-c.png', icon:'/assets/icons/admin/panel/allTurn.png', title:'نمایش تمام نوبت ها', link:'admin-managment-all-turns'},
                            { iconActive:'/assets/icons/admin/panel/bill-c.png', icon:'/assets/icons/admin/panel/bill.png', title:'نمایش صورت حساب ها و تراکنش ها', link:'admin-managment-transactions-bill'},
                            { iconActive:'/assets/icons/admin/panel/journal-c.png', icon:'/assets/icons/admin/panel/journal.png', title:'متن گذاری برای مقالات', link:'admin-managment-journals'},
                        ],
                    },
                ],
                rightMenu1:[
                    {
                        header:'پنل پزشک',
                        icon:'/assets/icons/admin/panel/doctor.png',
                        iconActive:'/assets/icons/admin/panel/doctor-c.png',
                        children:[
                            { iconActive:'/assets/icons/admin/panel/allDoctor-c.png', icon:'/assets/icons/admin/panel/allDoctor.png', title:'نمایش تمام پزشکان', link:'admin-doctor-list', link1:'admin-doctor-list-id', link2:'admin-doctor-list-edit-id' },
                            { iconActive:'/assets/icons/admin/panel/newDoctor-c.png', icon:'/assets/icons/admin/panel/newDoctor.png', title:'تعریف پزشک', link:'admin-doctor-doctor-define' },
                            { iconActive:'/assets/icons/admin/panel/expert-c.png', icon:'/assets/icons/admin/panel/expert.png', title:'تعریف تخصص', link:'admin-doctor-expret-define' },
                            { iconActive:'/assets/icons/admin/panel/pricing-c.png', icon:'/assets/icons/admin/panel/pricing.png', title:'قیمت گذاری ویزیت', link:'admin-doctor-unit-pricing' },
                        ],
                    },
                ],
                rightMenu2:[
                    {
                        header:'پنل بیماران',
                        icon:'/assets/icons/admin/panel/patient.png',
                        iconActive:'/assets/icons/admin/panel/patient-c.png',
                        children:[
                            { iconActive:'/assets/icons/admin/panel/allPatient-c.png', icon:'/assets/icons/admin/panel/allPatient.png', title:'لیست بیماران', link:'admin-patient-list' },
                            { iconActive:'/assets/icons/admin/panel/setTurning-c.png', icon:'/assets/icons/admin/panel/setTurning.png', title:'نوبت دهی دستی', link:'admin-patient-manual-trun' },
                        ],
                    },
                ],
                rightMenu3:[
                    {
                        header:'صفحه پرداخت',
                        icon:'/assets/icons/admin/panel/transaction.png',
                        iconActive:'/assets/icons/admin/panel/transaction-c.png',
                        children:[
                            { iconActive:'/assets/icons/admin/panel/payPaid-c.png', icon:'/assets/icons/admin/panel/payPaid.png', title:'پرداخت کارمندان و پزشکان', link:'admin-transaction-employee-doctor' },
                            { iconActive:'/assets/icons/admin/panel/giftCode-c.png', icon:'/assets/icons/admin/panel/giftCode.png', title:'صدور کد تخفیف', link:'admin-transaction-gift-card' },
                        ]
                    },
                ],
                rightMenu4:[
                    {
                        header:'مدیریت پست ها',
                        icon:'/assets/icons/admin/panel/transaction.png',
                        iconActive:'/assets/icons/admin/panel/transaction-c.png',
                        children:[
                            { iconActive:'/assets/icons/admin/panel/payPaid-c.png', icon:'/assets/icons/admin/panel/payPaid.png', title:'همه پست ها', link:'admin-posts' },
                            { iconActive:'/assets/icons/admin/panel/giftCode-c.png', icon:'/assets/icons/admin/panel/giftCode.png', title:'دسته بندی پست ها', link:'admin-posts-post-category' },
                        ]
                    },
                ],
                lists:[
                    { value:0, iconActive:'/assets/icons/admin/panel/employe-c.png', icon:'/assets/icons/admin/panel/employe.png', title:'تعریف کارمند', link:'admin-employee', link1:'admin-employee-duty' },
                    { value:1, iconActive:'/assets/icons/admin/panel/confirm-c.png', icon:'/assets/icons/admin/panel/confirm.png', title:'تایید آزمایش ارسالی', link:'admin-experiment-confirm', chip:'21' },
                ],
                lists1:[
                    { value:0 ,iconActive:'/assets/icons/admin/panel/chat-c.png', icon:'/assets/icons/admin/panel/chat.png', title:'صفحه چت', link:'admin-chat', chip:'21' },
                    { value:1 ,iconActive:'/assets/icons/admin/panel/ticket-c.png', icon:'/assets/icons/admin/panel/ticket.png', title:'تیکت', link:'admin-ticket' },
                    { value:2 ,iconActive:'/assets/icons/admin/panel/comment-c.png', icon:'/assets/icons/admin/panel/comment.png', title:'تایید نظرات', link:'admin-comments' },
                ],
            }
        },
        watch:{
            $route(){
                this.expandMenu = 0
            }
        },
        computed:{
        }
    }
</script>

<style lang="scss" scoped>

</style>