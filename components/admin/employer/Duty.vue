<template>
    <section class="medist-admin-middle-panel">
        <div class="table">
            <div class="duty-content">
                <v-col cols="12" md="8">
                    <div class="data-table">
                        <div class="windows-mode">
                            <div class="thead">
                                <div class="tr">
                                    <div class="th">
                                        <div class="text">نام وظیفه</div>
                                    </div>
                                    <div class="th">
                                        <div class="text">تعداد کارکنان</div>
                                    </div>
                                    <div class="th justify-end">
                                        <div class="text">عملیات</div>
                                    </div>
                                </div>
                            </div>
                            <div class="tbody">
                                <div class="tr" v-for="(duty, i) in table" :key="i">
                                    <div class="td">
                                        <v-checkbox dense hide-details class="mt-n1" />
                                        <div class="text">{{ duty.duty }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="text">{{ duty.employerCount }}</div>
                                    </div>
                                    <div class="td">
                                        <div class="action">
                                            <v-btn icon color="primary">
                                                <v-icon>mdi-circle-edit-outline</v-icon>
                                            </v-btn>
                                            <v-btn icon color="error">
                                                <v-icon>mdi-trash-can</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tablet-mode">
                            <v-expansion-panels flat class="expansion-panels">
                                <v-expansion-panel class="expansion-panel" v-for="(tr, i) in table.slice(0, 8)" :key="i">
                                    <v-expansion-panel-header class="panel-header">
                                        <div class="tr">
                                            <div class="th">
                                                <img src="" alt="" class="icon">
                                                <div class="text">نام وظیفه</div>
                                            </div>
                                            <div class="th">
                                                <div class="text">{{ tr.duty }}</div>
                                            </div>
                                        </div>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="panel-content">
                                        <div class="content">
                                            <div class="tr">
                                                <div class="td">
                                                    <div class="text">تعداد اعضای عضو</div>
                                                </div>
                                                <div class="td">
                                                    <div class="text">{{ tr. employerCount }}</div>
                                                </div>
                                                <div class="td">
                                                    <div class="action mt-n2">
                                                        <v-btn icon color="primary">
                                                            <v-icon>mdi-circle-edit-outline</v-icon>
                                                        </v-btn>
                                                        <v-btn icon color="error">
                                                            <v-icon>mdi-trash-can</v-icon>
                                                        </v-btn>
                                                    </div>
                                                </div>
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
                    </div>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="dutys">
                        <v-text-field class="input"  placeholder="نام وظیفه" hide-details="" flat filled rounded />
                        <div class="subtext">دسترسی ها</div>
                        <div class="duty-boxes">
                            <v-checkbox v-for="(item, i) in 40" :key="i" dense hide-details="" label="label" class="checkbox" />
                        </div>
                        <v-btn rounded depressed color="secondary" class="d-flex mr-auto">ایجاد وظیفه</v-btn>
                    </div>
                </v-col>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                page:1,
                table:[
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''},
                    {duty:'وظیفه1', employerCount:'1', action:''}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>