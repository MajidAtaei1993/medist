<template>
    <section class="medist-about-us">
        <div class="breadcrumbs">
            <v-breadcrumbs :items="items" />
        </div>
        <div class="content">
            <div class="body">
                <div class="head">درباره ما</div>
                <div class="text">
                    مجموعه مدیست در سال 1400 و با هدف خدمت رسانی به مراجعینی که امکان ویزیت حضوری توسط پزشک
                    به دلایل متعدد را ندارند تأسیس شده است
                </div>
                <div class="text">
                    مدیریت سایت نیز توسط تیم پزشکی اداره می شود و تلاش شده است بستری فراهم شود تا پزشکان بتوانند
                    مراجعینشان را به صورت غیر حضوری پیگیری کنند  و بیماران نیز بدون نگرانی از شلوغی مطب ها و مراکز درمانی،
                    خدمات پزشکی و مشاوره ای خود را دریافت کنند
                </div>
                <div class="text">
                    در تمامی مراحل اگر مشکلی در ارتباط با پزشک خود دارید می توانید از بخش پشتیبانی در ساعاتی که پزشکان فعال
                    هستندبا ما در ارتباط باشید تا در اسرع وقت مشکل برطرف گردد
                </div>
                <div class="call">تلفن تماس: 021-28428751</div>
            </div>
            <img :src="aboutUs" alt="" class="img">
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                dna:'/assets/images/journals/DNA.png',
                aboutUs:'/assets/images/aboutUs.png',
                items:[
                    { text:'خانه', disabled:false, to:'index' },
                    { text:'درباره ما', disabled:false, to:'/public/about-us' },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
p{
    font-size: 16px;
    line-height: 2.5;
}
h2{
    font-size: 20px;
}
</style>