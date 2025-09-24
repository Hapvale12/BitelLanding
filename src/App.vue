<template>
    <div class="app-layout">
        <Navbar />
        <main class="main-content">
            <transition name="fade" mode="in-out">
                <router-view />
            </transition>
        </main>
        <Footer />
    </div>
    <FloatingContactButtons phone="51994992412" />
</template>

<script setup lang="ts"> 
import Navbar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import FloatingContactButtons from './components/FloatingContactButtons.vue';
</script>

<style>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #fdf100;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}

/* Transición */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<style>
/* Reset global */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>