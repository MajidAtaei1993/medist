<template>
    <div class="medist-dashbaord-middle">
        <middle-panel class="right" />
        <left-panel class="left" />
    </div>
</template>

<script>
import LeftPanel from './LeftPanel.vue'
import MiddlePanel from './MiddlePanel.vue'
    export default {
        components:{ LeftPanel, MiddlePanel },
        data(){                
            return{
                chevron:'/assets/images/chevron.png',
                user:{
                    avatar:'https://cdn.vuetifyjs.com/images/john.png',
                    name:'سعید قادری',
                    expert:'متخصص مغز و ریه'
                },
            }
        }
    }
</script>
