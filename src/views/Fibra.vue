<template>
    <div class="fibra-container">
        <BannerCarousel />
        <PlansFibraCarousel />
    </div>

</template>

<script setup lang="ts">

import BannerCarousel from '../components/BannerCarousel.vue';
import PlansFibraCarousel from '../components/PlansFibraCarousel.vue';

</script>

<style scoped>
.fibra-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fdf100;
}

</style>