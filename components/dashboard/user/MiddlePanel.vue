<template>
    <div class="user-info">
        <!-- <span class="medist-middle-panel-chevron-icon-dashboard-user">
            <v-img :src="chevron" />
        </span> -->
        <!-- user avatar -->
        <div class="user-avatar">
            <v-file-input hide-input prepend-icon="" append-icon="" accept=".png, .jpeg" @change="uploadAvatar($event)" v-model="user.avatar" id="file_input" />
            <div class="avatar">
                <img class="img" :src="img"  />
            </div>
            <v-btn depressed class="btn" @click="pickFile">ویرایش عکس پروفایل</v-btn>
        </div>
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
        <!-- End user avatar -->
        <!-- User detail -->
        <v-form ref="form" class="user-form">

            <div class="form">
                <div class="icon-text">
                    <v-icon color="#474747">mdi-account-outline</v-icon>
                    <div class="text">نام</div>
                </div>
                <v-text-field background-color="white" height="48" filled rounded hide-details v-model="user.firstName" class="input" />
            </div>
            
            <div class="form">
                <div class="icon-text">
                    <v-icon color="#474747">mdi-account-outline</v-icon>
                    <div class="text">نام خانوادگی</div>
                </div>
                <v-text-field background-color="white" height="48" filled rounded hide-details v-model="user.lastName" class="input" />
            </div>
            
            <div class="form">
                <div class="icon-text">
                    <v-icon color="#474747">mdi-lock-outline</v-icon>
                    <div class="text">رمز</div>
                    <div class="btn" @click="show =! show">تغییر رمز</div>
                </div>
                <v-text-field background-color="white" height="48" filled rounded :type="show ? 'text' : 'password'" hide-details v-model="user.password" class="input" />
            </div>

            <div class="form">
                <div class="icon-text">
                    <v-icon color="#474747">mdi-email-outline</v-icon>
                    <div class="text">ایمیل</div>
                </div>
                <v-text-field background-color="white" height="48" filled rounded type="email" hide-details v-model="user.email" class="input" />
            </div>

            <div class="form">
                <div class="icon-text">
                    <v-icon color="#474747">mdi-integrated-circuit-chip</v-icon>
                    <div class="text">شماره همراه</div>
                </div>
                <v-text-field background-color="white" height="48" filled rounded hide-details v-model="user.phoneNumber" class="input" prepend-inner-icon="mdi-check-circle-outline" />
            </div>
        </v-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                chevron:'/assets/images/chevron.png',
                img:null,
                show:null,
                notifs:'4',
                user:{
                    avatar:'/assets/images/avatar.png',
                    firstName:'مجید',
                    lastName:'عطائی',
                    email:'majid.ataie79@gmail.com',
                    password:'password',
                    phoneNumber:'09198412978'
                },
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
                document.getElementById('file_input').click()
            },
            uploadAvatar(){
                this.img = URL.createObjectURL(this.user.avatar)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>