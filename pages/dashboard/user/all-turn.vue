<template>
    <section >
        <Index />
    </section>
</template>

<script>
import Index from '~/components/dashboard/user/all-turn/Index.vue'
    export default {
        components: { Index },
        data(){
            return{
                expandMenu:0,
            }
        },       
    }
</script>