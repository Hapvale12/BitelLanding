<template>
    <div class="fibra-container">
        <BannerCarousel />
        <PlansFibraCarousel />
    </div>
    <FooterFibra />
</template>

<script setup lang="ts">

import BannerCarousel from '../components/BannerCarousel.vue';
import PlansFibraCarousel from '../components/PlansFibraCarousel.vue';
import FooterFibra from '../components/FooterFibra.vue';

</script>

<style>
.fibra-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fdf100;
}
</style>