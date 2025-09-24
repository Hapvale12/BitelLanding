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

<style>
.footer {
    width: 100%;
}

.fibra-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fdf100;
}
</style>