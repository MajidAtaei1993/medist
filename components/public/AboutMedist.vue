<template>
    <section class="medist-why-medist-section">
        <div class="head">
            <img :src="handCogs" alt="" class="img">
            <div class="text">چرا باید از خدمات مدیست استفاده کنیم</div>
        </div>
        <div class="right">
            <img :src="doctor" alt="" class="img">
        </div>
        <div class="left">
            <div class="items">
                <div class="item" v-for="(item, i) in items" :key="i">
                    <img class="img" :src="item.img" alt="">
                    <div class="text">{{ item.title }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                handCogs:'/assets/images/handCogs.png',
                doctor: '/assets/images/doctor1.png',
                items:[
                    { title:'مشاوره با پزشکان حرفه ای و متعهد', img:'/assets/images/labCost.png' },
                    { title:'صرفه جویی در زمان و هزینه', img:'/assets/images/timer.png' },
                    { title:'دسترسی در هر زمان و مکان', img:'/assets/images/internet.png' }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>