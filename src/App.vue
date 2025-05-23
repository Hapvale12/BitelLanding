<template>
	<Navbar />
	<transition name="fade" mode="out-in">
		<router-view />
	</transition>
</template>
<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>
<style>
/* Asegúrate de que tu body y app tengan altura completa */
html,
body,
#app {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	max-width: none;
	background-color: #fdf100;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}


</style>