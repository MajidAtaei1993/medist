<template>
    <section class="medist-top-banner">
        <div class="right">
            <img class="dna" :src="dna" alt="">
            <div class="head">مشاوره آنلاین پزشکی</div>
            <div class="subtitle">مشاره تخصصی با پزشکان به صورت چت و تلفنی</div>
            <div class="desc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
            <div class="actions">
                <v-btn depressed class="btn-outline">
                    <v-icon size="23">mdi-head-question</v-icon>
                    راهنمایی رزرو نوبت
                </v-btn>
                <v-btn depressed class="btn">
                    <v-icon>mdi-contacts-outline</v-icon>
                    دریافت مشاوره
                </v-btn>

            </div>
        </div>
        <div class="left">
            <img class="heart" src="/assets/images/public/Heart.png" alt="">
            <img class="doctor" :src="doctor">
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                doctor:'/assets/images/public/doctor.png',
                dna:'/assets/images/journals/DNA.png'
            }
        }
    }
</script>