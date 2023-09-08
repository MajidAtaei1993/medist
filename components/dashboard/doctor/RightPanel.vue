<template>
    <div>
        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='dashboard-doctor-set-turn-and-time' || $route.name =='dashboard-doctor-transactions' || $route.name =='dashboard-doctor-all-turn' || $route.name =='dashboard-doctor' ? 'medist-right-menu-active-color' : ''" width="100%">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu" :key="i" color="primary" :value="$route.name =='dashboard-doctor-chat' || $route.name =='dashboard-doctor-request-send' || $route.name =='dashboard-doctor-request-new' ? false : true" append-icon="mdi-chevron-left" active-class="medist-menu-active-calss" eager>
                <template v-slot:activator>
                    <img width="22.5" height="100%"  :src="$route.name =='dashboard-doctor-set-turn-and-time' || $route.name =='dashboard-doctor-transactions' || $route.name =='dashboard-doctor-all-turn' || $route.name =='dashboard-doctor' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-hover v-for="(item1, j) in item.children" :key="j">
                    <v-list-item dense>
                        <img width="22.5" height="100%"  :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                        <v-list-item-icon />
                        <v-list-item-content class="hidden-md-and-down">
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-hover>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='dashboard-doctor-set-turn-and-time' ? 'chevron-doctor-set-turns' : $route.name =='dashboard-doctor-transactions' ? 'chevron-doctor-transactions' : $route.name =='dashboard-doctor-all-turn' ? 'chevron-doctor-all-turns' : $route.name =='dashboard-doctor' ? 'chevron-doctor-dashboard' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>
        <!-- List single -->
        <v-hover v-for="(item, i) in lists" :key="i">
            <v-list-item dense>
                <img width="22.5" height="100%" :src="$route.name == item.link ? item.iconActive : $route.name == item.link1 ? item.iconActive : item.icon" @click="$router.push({ name: item.link })" style="cursor:pointer">
                <v-list-item-icon />
                <v-list-item-content class="hidden-md-and-down">
                    <v-list-item-title class="py-1">
                        <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'info--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                        <v-chip x-small color="primary" v-if="item.chip">
                            <small class="white--text">{{ item.chip }}</small>
                        </v-chip>
                    </v-list-item-title>
                </v-list-item-content>
                <img :src="chevron" class="chevron" v-if="item.value == 0" :class="$route.name == 'dashboard-doctor-request-send' ? 'chevron-doctor-ticket' : $route.name == 'dashboard-doctor-request-new' ? 'chevron-doctor-ticket': 'd-none'" alt="">
                <img :src="chevron" class="chevron chevron-doctor-chat" v-if="item.value == 1" :class="$route.name == 'dashboard-doctor-chat' ? 'chevron-doctor-chat' : 'd-none'" alt="">
            </v-list-item>
        </v-hover>
        <v-list-item dense>
            <img width="22.5" height="100%"  src="/assets/icons/doctor/power-off.png" alt="">
            <v-list-item-icon />
            <v-list-item-content class="hidden-md-and-down">
                <v-list-item-title>
                    <nuxt-link class="font-md error--text" :to="{ name: '' }">خروج</nuxt-link>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                rightMenu:[
                    { 
                        header:'داشتبورد پزشک',
                        icon:'/assets/icons/doctor/doctor.png',
                        iconActive:'/assets/icons/doctor/doctor-c.png',
                        children:[
                            { icon:'/assets/icons/doctor/turns.png', iconActive:'/assets/icons/doctor/turns-c.png', title:'تعیین وقت ها و نوبت ها', link:'dashboard-doctor-set-turn-and-time'},
                            { icon:'/assets/icons/doctor/transactions.png', iconActive:'/assets/icons/doctor/transactions-c.png', title:'تراکنش های پزشک', link:'dashboard-doctor-transactions'},
                            { icon:'/assets/icons/doctor/turn.png', iconActive:'/assets/icons/doctor/turns-c.png', title:'نمایش تمام نوبت های پزشک', link:'dashboard-doctor-all-turn'},
                            { icon:'/assets/icons/doctor/profile.png', iconActive:'/assets/icons/doctor/profile-c.png', title:'پروفایل پزشک', link:'dashboard-doctor'},
                        ]
                    }
                ],
                lists:[
                    { value:0, icon:'/assets/icons/doctor/ticket.png', iconActive:'/assets/icons/doctor/ticket-c.png', title:'ارسال تیکت به مدیریت', link:'dashboard-doctor-request-send', link1:'dashboard-doctor-request-new', chip:'21'},
                    { value:1, icon:'/assets/icons/doctor/chat.png', iconActive:'/assets/icons/doctor/chat-c.png', title:'صفحه چت', link:'dashboard-doctor-chat'},
                ]
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