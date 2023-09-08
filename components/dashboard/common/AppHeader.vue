<template>
    <section>
        <v-app-bar absolute app flat color="white" hide-on-scroll class="medist-header-tablet" height="65">
            <v-app-bar-nav-icon @click="drawer =! drawer" class="primary--text" />
            <v-spacer />
            <v-btn small elevation="2" color="primary" fab class="hidden-md-and-up" v-if="!login">
                <v-icon color="white">mdi-chat</v-icon>
                <span class="medist-panel-badge text-center">4</span>
            </v-btn>
            <v-menu right content-class="mt-14 elevation-1 py-4 pl-4 white" min-width="100%" max-height="100%" v-if="!login">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small elevation="2" color="primary" fab class="mr-2 hidden-md-and-up" v-on="on" v-bind="attrs" >
                        <v-icon color="white">mdi-bell</v-icon>
                        <span class="medist-panel-badge text-center">4</span>
                    </v-btn>
                </template>
                <v-list class="medist-notifs-scroll" width="100%">
                    <v-list-item dense v-for="(item, i) in notifications" :key="i" class="py-1 align-start" @click="openNotifs">
                        <v-btn fab small color="primary" depressed>
                            <v-icon color="white" class="mx-auto">mdi-bell-ring-outline</v-icon>
                        </v-btn>
                        <v-list-item-content class="mr-4">
                            <v-list-item-title class="font-normal mb-1">{{ item.title }}</v-list-item-title>
                            <v-list-item-title class="font-normal mb-1">{{ item.title1 }}</v-list-item-title>
                            <v-list-item-subtitle class="font-small info--text">{{ item.date }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn color="secondary" dark rounded depressed :to="{ name:'' }" @click="$router.push({name:'public-auth'})" v-if="login">ثبت نام / ورود</v-btn> 
        </v-app-bar>
        <header class="medist-header" >
            <img :src="logo" class="logo" alt="" @click="$router.push({ name:'index'})">
            <div class="nav-links">
                <div v-for="(item, i) in publicRoutes.includes($route.name) ? publicNav : userRoutes.includes($route.name) ? patientNav : doctorRoutes.includes($route.name) ? doctorNav : adminRoutes.includes($route.name) ? adminNav : ''" :key="i">
                    <v-hover v-slot="{ hover }">
                        <!-- <v-img height="auto" v-if="$route.name == item.link" :src="item.icon" /> -->
                        <nuxt-link :class="hover || $route.name == item.link ? 'medist-header-link' : 'black--text'" class="nav-link" :to="{ name: item.link }">
                            <v-icon v-if="$route.name == item.link" small class="ml-1" color="#6d0091">{{ item.icon }}</v-icon>
                            {{ item.title }}
                        </nuxt-link>
                    </v-hover>
                </div>
            </div>
            <div class="user-account">
                <div v-if="login">
                    <!-- <div class="message">
                    </div> -->
                    <v-menu offset-y content-class="white">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn large depressed class="message" fab v-on="on" v-bind="attrs" >
                                <img src="/assets/icons/patient/chat-w.png" alt="">
                                <span class="badge">{{ incomeMessage }}</span>
                            </v-btn>
                        </template>
                        <v-list class="medist-notifs-scroll">
                            <v-list-item dense v-for="(item, i) in notifications" :key="i" class="pr-0 py-1" @click="openNotifs">
                                <v-list-item-icon class="primary rounded-pill ma-0" style="width: 40px !important; height: 40px !important">
                                    <v-icon color="white" class="mx-auto">mdi-bell-ring-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="mr-4" style="width: 210px !important">
                                    <v-list-item-title class="font-normal mb-1">{{ item.title }}</v-list-item-title>
                                    <v-list-item-title class="font-normal mb-1">{{ item.title1 }}</v-list-item-title>
                                    <v-list-item-subtitle class="font-small info--text">{{ item.date }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu offset-y right open-on-click rounded="xl" v-model="model" content-class="mt-4">
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge inline left :icon="model ? 'mdi-chevron-up': 'mdi-chevron-down'" color="primary">
                                <v-btn large depressed fab v-on="on" v-bind="attrs" width="54" height="54" color="#f6b923">
                                    <img :src="avatar" alt="" width="44" height="44" class="rounded-circle">
                                </v-btn>
                            </v-badge>
                        </template>
                        <v-list dense width="180">
                            <div class="font-small text-center primary--text">کاربر گرامی خوش آمدید</div>
                            <v-divider />
                            <v-hover v-slot="{ hover }" v-for="(item, i) in menu" :key="i">
                                <v-list-item dense class="font-small">
                                    <v-icon class="ml-2" :color="hover ? item.color :'black' ">{{ item.icon }}</v-icon>
                                    <!-- <v-list-item-icon /> -->
                                    <v-list-item-content>
                                        <nuxt-link :to="{ name: item.link }" :class="hover ? item.color+`--text` : 'black--text' ">{{ item.title }}</nuxt-link>
                                    </v-list-item-content>
                                </v-list-item >
                            </v-hover>
                            <v-list-item dense class="font-small">
                                <v-icon class="ml-2" color="error">mdi-power-standby</v-icon>
                                <!-- <v-list-item-icon /> -->
                                <v-list-item-content>
                                    <nuxt-link :to="{ name: 'home' }" class="error--text">خروج</nuxt-link>
                                </v-list-item-content>
                            </v-list-item >
                        </v-list>
                    </v-menu>
                </div>
                <div v-else>
                    <v-btn class="register-btn " depressed :to="{ name:'auth' }" >ثبت نام / ورود</v-btn>
                </div>
            </div>
            <!-- Header -->
        </header>
        <!-- End Header -->

        <!-- Navigation drawer -->

        <!-- patient navigation menu -->
        <v-navigation-drawer v-model="drawer" fixed right class="medist-drawer px-4" v-if="userRoutes.includes($route.name)">
            <v-list dense rounded class="rounded-xl mt-16 pa-0" :class="$route.name =='dashboard-user-transactions' || $route.name =='dashboard-user-all-turn' || $route.name =='dashboard-user' ? 'medist-right-menu-active-color' : ''" width="100%">
                <!-- List group -->
                <v-list-group v-for="(item, i) in PatientRightMenu" :key="i" color="primary" :value="$route.name =='dashboard-user-chat' ? false : true" append-icon="mdi-chevron-left" active-class="medist-menu-active-calss" eager>
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='dashboard-user-transactions' || $route.name =='dashboard-user-all-turn' || $route.name =='dashboard-user' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-hover v-for="(item1, j) in item.children" :key="j">
                        <v-list-item dense>
                            <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                            <v-list-item-icon />
                            <v-list-item-content>
                                <v-list-item-title>
                                    <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-hover>
                </v-list-group>
                <!-- End List group -->
            </v-list>
            <!-- List single -->
            <v-hover v-for="(item, i) in lists1" :key="i">
                <v-list-item dense>
                    <img width="24.5" height="100%" :src="$route.name == item.link ? item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="py-1">
                            <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'info--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                            <v-chip x-small color="primary" v-if="item.chip">
                                <small class="white--text">{{ item.chip }}</small>
                            </v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-hover>
            <template v-slot:append>
                <v-list-item dense class="mb-5">
                    <img width="24.5" height="100%" src="/assets/icons/patient/power.png" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md error--text" :to="{ name: '' }">خروج</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-navigation-drawer>
        <!-- end patient navigation menu -->

        <!-- admin navigation menu -->
        <v-navigation-drawer  v-model="drawer" fixed right class="medist-drawer px-4" v-if="adminRoutes.includes($route.name)">
            <v-list dense rounded class="rounded-xl mt-16 pa-0" :class="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ? 'medist-right-menu-active-color' : ''">
                <!-- List group -->
                <v-list-group v-for="(item, i) in AdminRightMenu" :key="i" :value="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ? true : false" append-icon="mdi-chevron-left">
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='admin-managment-all-turns' || $route.name =='admin-managment-transactions-bill' || $route.name =='admin-managment-journals' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                        <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <!-- End List group -->
            </v-list>


            <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' ||$route.name =='admin-doctor-unit-pricing' ? 'medist-right-menu-active-color' : ''">
                <!-- List group -->
                <v-list-group v-for="(item, i) in AdminRightMenu1" :key="i" :value="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' ||$route.name =='admin-doctor-unit-pricing' ? true : false" append-icon="mdi-chevron-left">
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='admin-doctor-list' || $route.name =='admin-doctor-doctor-define' ||$route.name =='admin-doctor-expret-define' ||$route.name =='admin-doctor-unit-pricing' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                        <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <!-- End List group -->
            </v-list>


            <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ? 'medist-right-menu-active-color' : ''">
                <!-- List group -->
                <v-list-group v-for="(item, i) in AdminRightMenu2" :key="i" :value="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ? true : false" append-icon="mdi-chevron-left">
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='admin-patient-list' || $route.name =='admin-patient-manual-trun' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                        <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <!-- End List group -->
            </v-list>


            <!-- List single -->
            <v-list-item dense  v-for="(item, i) in AdminLists" :key="i">
                <img width="24.5" height="100%" :src="$route.name == item.link ? item.iconActive : item.icon" alt="">
                <v-list-item-icon />
                <v-list-item-content>
                    <v-list-item-title class="py-1">
                        <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'black--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                        <v-chip x-small color="primary" class="mr-3 white--text px-2 py-3 font-small rounded-pill" v-if="item.chip">
                            <small class="white--text">{{ item.chip }}</small>
                        </v-chip>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- End List single -->

            <v-list dense rounded class="rounded-xl pa-0" :class="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ? 'medist-right-menu-active-color' : ''">
                <!-- List group -->
                <v-list-group v-for="(item, i) in AdminRightMenu3" :key="i" :value="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ? true : false" append-icon="mdi-chevron-left">
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='admin-transaction-employee-doctor' || $route.name =='admin-transaction-gift-card' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item dense v-for="(item1, j) in item.children" :key="j">
                        <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title>
                                <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <!-- End List group -->
            </v-list>

            <!-- List single -->
            <v-list-item dense v-for="(item, i) in AdminLists1" :key="i">
                <img width="24.5" height="100%" :src="$route.name == item.link ? item.iconActive : item.icon" alt="">
                <v-list-item-icon />
                <v-list-item-content>
                    <v-list-item-title class="py-1">
                        <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'black--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                        <v-chip x-small color="primary" class="mr-3 px-2 py-3 font-small rounded-pill" v-if="item.chip">
                            <small class="white--text">{{ item.chip }}</small>
                        </v-chip>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- End List single -->

        </v-navigation-drawer>
        <!-- end admin navigation menu -->

        <!-- doctor navigation menu -->
        <v-navigation-drawer v-model="drawer" fixed right class="medist-drawer px-4" v-if="doctorRoutes.includes($route.name)">
            <v-list dense rounded class="rounded-xl mt-16 pa-0" :class="$route.name =='dashboard-doctor-request-send' || $route.name =='dashboard-doctor-request-new' || $route.name =='dashboard-doctor-chat' ? '' : 'medist-right-menu-active-color'" width="100%">
                <!-- List group -->
                <v-list-group v-for="(item, i) in DoctorRightMenu" :key="i" color="primary" :value="$route.name =='dashboard-user-chat' ? false : true" append-icon="mdi-chevron-left" active-class="medist-menu-active-calss" eager>
                    <template v-slot:activator>
                        <img width="24.5" height="100%" :src="$route.name =='dashboard-doctor-request-send' || $route.name =='dashboard-doctor-request-new' || $route.name =='dashboard-doctor-chat' ? item.iconActive : item.icon" alt="">
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-md">{{ item.header }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-hover v-for="(item1, j) in item.children" :key="j">
                        <v-list-item dense>
                            <img width="24.5" height="100%" :src="$route.name == item1.link ? item1.iconActive : item1.icon" alt="">
                            <v-list-item-icon />
                            <v-list-item-content>
                                <v-list-item-title>
                                    <nuxt-link class="font-md" :class="$route.name == item1.link ? 'primary--text' : 'info--text' " :to="{ name: item1.link }">{{ item1.title }}</nuxt-link>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-hover>
                </v-list-group>
                <!-- End List group -->
            </v-list>
            <!-- List single -->
            <v-hover v-for="(item, i) in doctorlists1" :key="i">
                <v-list-item dense>
                    <!-- <v-icon :color="menuColor[$route.name]" >{{ item.icon }}</v-icon> -->
                    <img width="24.5" height="100%" :src="$route.name == item.link || $route.name == item.link1 ? item.iconActive : item.icon" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title class="py-1">
                            <nuxt-link exact class="font-md" :class="$route.name == item.link || $route.name == item.link1 ? 'primary--text' : 'info--text' " :to="{ name: item.link }">{{ item.title }}</nuxt-link>
                            <v-chip x-small color="primary" v-if="item.chip">
                                <small class="white--text">{{ item.chip }}</small>
                            </v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-hover>
            <template v-slot:append>
                <v-list-item dense class="mb-5">
                    <img width="24.5" height="100%" src="/assets/icons/doctor/power-off.png" alt="">
                    <v-list-item-icon />
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="font-md error--text" :to="{ name: '' }">خروج</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-navigation-drawer>
        <!-- end doctor navigation menu -->

        <!-- public navigation -->
        <v-navigation-drawer v-model="drawer" fixed right class="medist-drawer px-4" v-if="publicRoutes.includes($route.name)">
            <v-list dense shaped height="100%" class="px-0">
                <v-list-item>
                <ul class="col-auto medist-cursor-pointer" @click="$router.push({ name:'index'})">
                    <v-img :src="logo" width="120" height="50" />
                </ul>
                </v-list-item>
                <ul class="font-xl">
                    <li v-for="(item, i) in publicNav" :key="i" class="d-flex align-center mr-2 d-block">
                        <!-- <v-img height="auto" v-if="$route.name == item.link" :src="item.icon" /> -->
                        <v-hover v-slot="{ hover }">
                            <nuxt-link :class="hover || $route.name == item.link ? 'medist-header-link' : 'black--text'" class="col-auto font-xl medist-header-link" :to="{ name: item.link }">
                                <v-icon v-if="$route.name == item.link" small class="ml-1" color="#6d0091">{{ item.icon }}</v-icon>
                                {{ item.title }}
                            </nuxt-link>
                        </v-hover>
                    </li>
                </ul>
            </v-list>
        </v-navigation-drawer>
        <!-- end public navigation -->
        
        <!-- End Navigation drawer -->
    </section>
</template>

<script>
    export default {
        mounted(){
            setTimeout(() => {
                this.login = true
            }, 5000);
        },
        data(){
            return{
                logo: '/assets/images/logo/logo.png',
                avatar:'/assets/images/avatar.png',
                patientNav:[
                    { icon:'mdi-home', title:'خانه', link:'dashboard-user'},
                    { icon:'mdi-doctor', title:'مشاوره پزشکی', link:''},
                    { icon:'mdi-clock-time-ten', title:'نوبت دهی', link:''},
                    { icon:'mdi-account-heart', title:'مشاوره روانشناسی', link:''},
                    { icon:'mdi-web', title:'وبلاگ', link:''},
                    { icon:'mdi-headphones', title:'تماس با ما', link:''},
                    { icon:'mdi-account-question', title:'سوالات متداول', link:''}
                ],
                publicNav:[
                    { icon:'mdi-home', title:'صفحه اصلی', link:'index'},
                    { icon:'mdi-doctor', title:'تخصص ها', link:'experts'},
                    { icon:'mdi-magnify', title:'جستجو', link:'search'},
                    { icon:'mdi-newspaper', title:'مقالات', link:'journals'},
                    { icon:'mdi-frequently-asked-questions', title:'سوالات متداول', link:'faq'},
                    { icon:'mdi-chat-alert', title:'درباره ما', link:'about-us'},
                ],
                doctorNav:[
                    { icon:'mdi-home', title:'خانه', link:'dashboard-doctor'},
                    { icon:'mdi-doctor', title:'مشاوره پزشکی', link:''},
                    { icon:'mdi-clock-time-ten', title:'نوبت دهی', link:''},
                    { icon:'mdi-account-heart', title:'مشاوره روانشناسی', link:''},
                    { icon:'mdi-web', title:'وبلاگ', link:''},
                    { icon:'mdi-headphones', title:'تماس با ما', link:''},
                    { icon:'mdi-account-question', title:'سوالات متداول', link:''}
                ],
                adminNav:[
                    { icon:'mdi-home', title:'خانه', link:'dashboard-admin'},
                    { icon:'mdi-doctor', title:'مشاوره پزشکی', link:''},
                    { icon:'mdi-clock-time-ten', title:'نوبت دهی', link:''},
                    { icon:'mdi-account-heart', title:'مشاوره روانشناسی', link:''},
                    { icon:'mdi-web', title:'وبلاگ', link:''},
                    { icon:'mdi-headphones', title:'تماس با ما', link:''},
                    { icon:'mdi-account-question', title:'سوالات متداول', link:''}
                ],
                menu:[
                    { color:'primary', title:'ورود به مطلب / نوبت', icon:'mdi-format-list-checkbox', link:''},
                    { color:'primary', title:'پروفایل من', icon:'mdi-account', link:''}
                ],
                login: false,
                incomeMessage:'10+',
                model: null,
                model1: null,
                drawer: false,
                PatientRightMenu:[
                    { 
                        header:'داشتبورد بیمار',
                        icon:'/assets/icons/patient/dashboard.png',
                        iconActive:'/assets/icons/patient/dashboard-a.png',
                        children:[
                            { icon:'/assets/icons/patient/transaction.png', iconActive:'/assets/icons/patient/transaction-a.png', title:'تراکنش های بیمار', link:'dashboard-user-transactions'},
                            { icon:'/assets/icons/patient/turns.png', iconActive:'/assets/icons/patient/turns-a.png', title:'نمایش نوبت ها', link:'dashboard-user-all-turn'},
                            { icon:'/assets/icons/patient/profile.png', iconActive:'/assets/icons/patient/profile-a.png', title:'پروفایل بیماران', link:'dashboard-user'},
                        ]
                    }
                ],
                DoctorRightMenu:[
                    { 
                        header:'داشتبورد پزشک',
                        icon:'/assets/icons/doctor/doctor.png',
                        iconActive:'/assets/icons/doctor/doctor-c.png',
                        children:[
                            { icon:'/assets/icons/doctor/turns.png', iconActive:'/assets/icons/doctor/turns-c.png', title:'تعیین وقت ها و نوبت ها', link:'dashboard-doctor-set-turn-and-time'},
                            { icon:'/assets/icons/doctor/transactions.png', iconActive:'/assets/icons/doctor/transactions-c.png', title:'تراکنش های پزشک', link:'dashboard-doctor-transactions'},
                            { icon:'/assets/icons/doctor/turn.png', iconActive:'/assets/icons/doctor/turn-c.png', title:'نمایش تمام نوبت های پزشک', link:'dashboard-doctor-all-turn'},
                            { icon:'/assets/icons/doctor/profile.png', iconActive:'/assets/icons/doctor/profile-c.png', title:'پروفایل پزشک', link:'dashboard-doctor'},
                        ]
                    }
                ],
                AdminRightMenu:[
                    { 
                        header:'داشتبورد مدیریت',
                        icon:'/assets/icons/admin/panel/admin.png',
                        iconActive:'/assets/icons/admin/panel/admin-c.png',
                        children:[
                            { icon:'/assets/icons/admin/panel/allTurn.png', iconActive:'/assets/icons/admin/panel/allTurn-c.png', title:'نمایش تمام نوبت ها', link:'admin-managment-all-turns'},
                            { icon:'/assets/icons/admin/panel/bill.png', iconActive:'/assets/icons/admin/panel/bill-c.png', title:'نمایش صورت حساب ها و تراکنش ها', link:'admin-managment-transactions-bill'},
                            { icon:'/assets/icons/admin/panel/journal.png', iconActive:'/assets/icons/admin/panel/journal-c.png', title:'متن گذاری برای مقالات', link:'admin-managment-journals'},
                        ],
                    },
                ],
                AdminRightMenu1:[
                    {
                        header:'پنل پزشک',
                        icon:'/assets/icons/admin/panel/doctor.png',
                        iconActive:'/assets/icons/admin/panel/doctor-c.png',
                        children:[
                            { icon:'/assets/icons/admin/panel/allDoctor.png', iconActive:'/assets/icons/admin/panel/allDoctor-c.png', title:'نمایش تمام پزشکان', link:'admin-doctor-list' },
                            { icon:'/assets/icons/admin/panel/newDoctor.png', iconActive:'/assets/icons/admin/panel/newDoctor-c.png', title:'تعریف پزشک', link:'admin-doctor-doctor-define' },
                            { icon:'/assets/icons/admin/panel/expert.png', iconActive:'/assets/icons/admin/panel/expert-c.png', title:'تعریف تخصص', link:'admin-doctor-expret-define' },
                            { icon:'/assets/icons/admin/panel/pricing.png', iconActive:'/assets/icons/admin/panel/pricing-c.png', title:'قیمت گذاری ویزیت', link:'admin-doctor-unit-pricing' },
                        ],
                    },
                ],
                AdminRightMenu2:[
                    {
                        header:'پنل بیماران',
                        icon:'/assets/icons/admin/panel/patient.png',
                        iconActive:'/assets/icons/admin/panel/patient-c.png',
                        children:[
                            { icon:'/assets/icons/admin/panel/allPatient.png', iconActive:'/assets/icons/admin/panel/allPatient-c.png', title:'لیست بیماران', link:'admin-patient-list' },
                            { icon:'/assets/icons/admin/panel/setTurning.png', iconActive:'/assets/icons/admin/panel/setTurning-c.png', title:'نوبت دهی دستی', link:'admin-patient-manual-trun' },
                        ],
                    },
                ],
                AdminRightMenu3:[
                    {
                        header:'صفحه پرداخت',
                        icon:'/assets/icons/admin/panel/transaction.png',
                        iconActive:'/assets/icons/admin/panel/transaction-c.png',
                        children:[
                            { icon:'/assets/icons/admin/panel/payPaid.png', iconActive:'/assets/icons/admin/panel/paypaid-c.png', title:'پرداخت کارمندان و پزشکان', link:'admin-transaction-employee-doctor' },
                            { icon:'/assets/icons/admin/panel/giftCode.png', iconActive:'/assets/icons/admin/panel/giftCode-c.png', title:'صدور کد تخفیف', link:'admin-transaction-gift-card' },
                        ]
                    }
                ],
                lists1:[
                    { icon:'/assets/icons/patient/chat.png',iconActive:'/assets/icons/patient/chat-a.png', title:'صفحه چت', link:'dashboard-user-chat', chip:'21'},
                ],
                AdminLists:[
                    { icon:'/assets/icons/admin/panel/employe.png', iconActive:'/assets/icons/admin/panel/employe-c.png', title:'تعریف کارمند', link:'admin-employee' },
                    { icon:'/assets/icons/admin/panel/confirm.png', iconActive:'/assets/icons/admin/panel/confirm-c.png', title:'تایید آزمایش ارسالی', link:'admin-experiment-confirm', chip:'21' },
                ],
                AdminLists1:[
                    { icon:'/assets/icons/admin/panel/chat.png', iconActive:'/assets/icons/admin/panel/chat-c.png', title:'صفحه چت', link:'admin-chat', chip:'21' },
                    { icon:'/assets/icons/admin/panel/ticket.png', iconActive:'/assets/icons/admin/panel/ticket-c.png', title:'تیکت', link:'admin-ticket' },
                    { icon:'/assets/icons/admin/panel/comment.png', iconActive:'/assets/icons/admin/panel/comment-c.png', title:'تایید نظرات', link:'admin-comments' },
                ],
                doctorlists1:[
                    { icon:'/assets/icons/doctor/chat.png',iconActive:'/assets/icons/doctor/chat-c.png', title:'صفحه چت', link:'dashboard-doctor-chat', chip:'21'},
                    { icon:'/assets/icons/doctor/ticket.png',iconActive:'/assets/icons/doctor/ticket-c.png', title:'ارسال تیک به مدیریت', link:'dashboard-doctor-request-send', link1:'dashboard-doctor-request-new'},
                ],
                PublicRightMenu:[
                    { 
                        header:'داشتبورد بیمار',
                        icon:'mdi-doctor',
                        children:[
                            { icon:'mdi-credit-card-scan', title:'تراکنش های بیمار', link:'dashboard-user-transactions'},
                            { icon:'mdi-playlist-edit', title:'نمایش نوبت ها', link:'dashboard-user-all-turn'},
                            { icon:'mdi-account-edit', title:'پروفایل بیماران', link:'dashboard-user'},
                        ]
                    }
                ],
                publicLists1:[
                    { icon:'mdi-wechat', title:'صفحه چت', link:'dashboard-user-chat', chip:'21'},
                ],
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
			doctorRoutes:[
				'dashboard-doctor',
				'dashboard-doctor-all-turn',
				'dashboard-doctor-chat',
				'dashboard-doctor-request-new',
				'dashboard-doctor-request-send',
				'dashboard-doctor-set-turn-and-time',
				'dashboard-doctor-transactions'
			],
			userRoutes:[
				'dashboard-user',
				'dashboard-user-chat',
				'dashboard-user-all-turn',
                'dashboard-user-transactions'
			],
            adminRoutes:[
                'admin',
                'admin-managment-all-turns',
                'admin-managment-transactions-bill',
                'admin-managment-journals',
                'admin-comments',
                'admin-chat',
                'admin-comments',
                'admin-employee',
                'admin-experiment-confirm',
                'admin-ticket',
                'admin-transaction-employee-doctor',
                'admin-transaction-gift-card',
                'admin-patient-list',
                'admin-patient-manual-trun',
                'admin-doctor-list',
                'admin-doctor-doctor-define',
                'admin-doctor-expret-define',
                'admin-doctor-unit-pricing',
                'admin-doctor-list-id',
                'admin-doctor-list-edit-id',
                'admin-employee-duty'
            ],
            publicRoutes:[
                'index',,
                'about-us',
                'auth',
                'experts',
                'faq',
                'journals',
                'search',
                'auth-login',
                'auth-register-doctor-email',
                'auth-register-doctor-mobile',
                'auth-register-patient-email',
                'auth-register-patient-mobile',
                'experts-slug',
                'journals-id',
                'experts-slug-id'
            ],
            }
        },
        methods:{
            openNotifs(){},
        },
    }
</script>

<style lang="scss" scoped>

</style>