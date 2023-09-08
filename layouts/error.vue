<template>
    <v-card height="93vh" width="100%" class="d-flex flex-column justify-center align-center text-center">
        <v-card-text>
            <img :src="error" />
        </v-card-text>
        <h1 class="font-header">صفحه مورد نظر یافت نشد !</h1>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                error:'/assets/public/404.png',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>