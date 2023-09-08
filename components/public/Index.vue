<template>
    <section class="medist-public-section">
        <top-banner />
        <Expertknowledge />
        <AboutMedist />
        <DoctorsSlider />
        <ConsultingSteps />
        <Comments />
        <LastPosts />
        <Guides />
    </section>
</template>

<script>
import TopBanner from './TopBanner.vue'
import Expertknowledge from './ExpertKnowledge.vue'
import AboutMedist from './AboutMedist.vue'
import DoctorsSlider from './DoctorsSlider.vue'
import ConsultingSteps from './ConsultingSteps.vue'
import Comments from './Comments.vue'
import LastPosts from './LastPosts.vue'
import Guides from './Guides.vue'
    export default {
        components: {
            TopBanner,
            Expertknowledge,
            AboutMedist,
            DoctorsSlider,
            ConsultingSteps,
            Comments,
            LastPosts,
            Guides
        }
    }
</script>