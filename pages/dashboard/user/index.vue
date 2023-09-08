<template>
    <section>
        <DashIndex  />
    </section>
</template>

<script>
import DashIndex from '@/components/dashboard/user/Index.vue';
    export default {
        components:{DashIndex},
        header(){
            return{
                title:'Dashboard',
                meta:[
                    {
                        hid:'مدیست',
                        name:'مدیست',
                        content:'نوبت دهی پزشکی - مشاوره پزشکی - مدیست'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>