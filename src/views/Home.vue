<template>
    <div class="home">
        <BannerCarousel />
        <FooterCambiate />
    </div>
         
</template>

<script setup lang="ts">
import BannerCarousel from '../components/BannerCarousel.vue';
import FooterCambiate from '../components/FooterCambiate.vue';

</script>
<style>
.home {
    width: 100%;
    height: 100%;
}
</style>