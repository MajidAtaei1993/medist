<template>
    <v-app>
        <app-header />
        <div :class="PatientRoutes.includes($route.name) || doctorRoutes.includes($route.name) || adminRoutes.includes($route.name)? 'medist-dashboard' : ''">
            <PatientRightPanel v-if="PatientRoutes.includes($route.name)" class="medist-navigation-menu" />
            <DoctorRightPanel v-if="doctorRoutes.includes($route.name)" class="medist-navigation-menu" />
            <AdminRightPanel v-if="adminRoutes.includes($route.name)" class="medist-navigation-menu" />
            <v-main :class="PatientRoutes.includes($route.name) || doctorRoutes.includes($route.name) || adminRoutes.includes($route.name)? 'medist-dashboard-main' : ''">
                <Nuxt />
            </v-main>
        </div>
    	  <app-footer />
    </v-app>
</template>

<script>
import AppFooter from '~/components/dashboard/common/AppFooter.vue'
import AppHeader from '~/components/dashboard/common/AppHeader.vue'
import PatientRightPanel from '@/components/dashboard/user/RightPanel.vue'
import DoctorRightPanel from '@/components/dashboard/doctor/RightPanel.vue'
import AdminRightPanel from '@/components/admin/RightPanel.vue'
    export default {
        components:{ AppFooter, AppHeader, PatientRightPanel, DoctorRightPanel, AdminRightPanel },
        data(){
            return{
                doctorRoutes:[
                    'dashboard-doctor',
                    'dashboard-doctor-all-turn',
                    'dashboard-doctor-chat',
                    'dashboard-doctor-request-new',
                    'dashboard-doctor-request-send',
                    'dashboard-doctor-set-turn-and-time',
                    'dashboard-doctor-transactions'
                ],
                PatientRoutes:[
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
                    'admin-employee-duty',
                    'admin-posts',
                    'admin-posts-post-category',
                ],
            }
        },
    }
</script>


