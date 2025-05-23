<template>
    <div>
        <BannerCarousel />
    </div>
    <div>
        <PlansCarousel />
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BannerCarousel from '../components/BannerCarousel.vue';
import PlansCarousel from '../components/PlansCarousel.vue';
</script>