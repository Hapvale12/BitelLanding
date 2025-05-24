<template>
	<div class="app-layout">
	  <Navbar />
	  <main class="main-content">
		<transition mode="in-out">
		  <router-view />
		</transition>
	  </main>
	  <FooterCambiate />
	</div>
  </template>
  
  <script setup lang="ts">
  import Navbar from './components/NavBar.vue';
  import FooterCambiate from './components/FooterCambiate.vue';
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
  