<template>
    <section class="medist-guide-section">
        <div class="head">
            <img :src="help" alt="" class="img">
            <div class="text">به راهنمایی احتیاج دارید ؟</div>
        </div>
        <div class="content">
            <img :src="pills" alt="" class="pill">
            <img :src="box" alt="" class="box">
            <div class="text">
                در صورت نیاز به کسب راهنمایی همکاران ما در ساعات 11 صبح تا 12 شب از طریق گفتگوی چت و از ساعت 1 ظهر تا 12 شب از طرق شماره تماس پاسخگوی شما عزیزان هستند 021-28428751
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                help:'/assets/images/help_1.png',
                pills:'/assets/images/pills.png',
                box:'/assets/images/Box.png',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>