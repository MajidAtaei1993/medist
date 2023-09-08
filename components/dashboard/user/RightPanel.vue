<template>
    <div>
        <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='dashboard-user-transactions' || $route.name =='dashboard-user-all-turn' || $route.name =='dashboard-user' ? 'medist-right-menu-active-color' : ''" width="100%">
            <!-- List group -->
            <v-list-group v-for="(item, i) in rightMenu" :key="i" color="primary" :value="$route.name =='dashboard-user-chat' ? false : true" append-icon="mdi-chevron-left" active-class="medist-menu-active-calss" eager>
                <template v-slot:activator>
                    <img width="22" height="22"  :src="$route.name =='dashboard-user-transactions' || $route.name =='dashboard-user-all-turn' || $route.name =='dashboard-user' ?  item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="font-md hidden-md-and-down">{{ item.header }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-hover v-for="(item1, j) in item.children" :key="j">
                    <v-list-item dense>
                        <img width="22" height="22"  :src="$route.name == item1.link ? item1.iconActive : item1.icon" @click="$router.push({ name:item1.link})" style="cursor:pointer">
                        <v-list-item-icon />
                        <v-list-item-content class="hidden-md-and-down">
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-hover>
                <img :src="chevron" class="chevron" alt="" :class="$route.name =='dashboard-user-transactions' ? 'chevron-user-transactions' : $route.name =='dashboard-user-all-turn' ? 'chevron-user-all-turns' : $route.name =='dashboard-user' ? 'chevron-user-dashboard' : 'd-none'">
            </v-list-group>
            <!-- End List group -->
        </v-list>
        <!-- List single -->
        <v-hover v-for="(item, i) in lists" :key="i">
            <v-list-item dense>
                <!-- <v-icon :color="menuColor[$route.name]" >{{ item.icon }}</v-icon> -->
                <img width="22" height="22" :src="$route.name == item.link ? item.iconActive : item.icon" @click="$router.push({ name: item.link })" style="cursor:pointer">
                <v-list-item-icon />
                <v-list-item-content class="hidden-md-and-down">
                    <v-list-item-title class="py-1">
                        <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'info--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                        <v-chip x-small color="primary" v-if="item.chip">
                            <small class="white--text">{{ item.chip }}</small>
                        </v-chip>
                    </v-list-item-title>
                </v-list-item-content>
                <img :src="chevron" class="chevron" alt="" :class="$route.name == 'dashboard-user-chat' ? 'chevron-user-chat' : 'd-none'">
            </v-list-item>
        </v-hover>
        <v-list-item dense color="cyan">
            <img width="22" height="22"  src="/assets/icons/patient/power.png" alt="">
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
                        header:'داشتبورد بیمار',
                        icon:'/assets/icons/patient/dashboard.png',
                        iconActive:'/assets/icons/patient/dashboard-a.png',
                        children:[
                            { icon:'/assets/icons/patient/transaction.png', iconActive:'/assets/icons/patient/transaction-a.png',  title:'تراکنش های بیمار', link:'dashboard-user-transactions'},
                            { icon:'/assets/icons/patient/turns.png', iconActive:'/assets/icons/patient/turns-a.png', title:'نمایش نوبت ها', link:'dashboard-user-all-turn'},
                            { icon:'/assets/icons/patient/profile.png', iconActive:'/assets/icons/patient/profile-a.png',  title:'پروفایل بیماران', link:'dashboard-user'},
                        ]
                    }
                ],
                lists:[
                    { icon:'/assets/icons/patient/chat.png', iconActive:'/assets/icons/patient/chat-a.png',  title:'صفحه چت', link:'dashboard-user-chat', chip:'21'},
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