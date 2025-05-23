<template>
    <div class="carousel-container">
        <div class="carousel" @mousedown="startDrag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag"
            @touchend="endDrag" @touchcancel="endDrag" @touchmove="onDrag">

            <!-- Imagen anterior (saliente) -->
            <img v-if="transitionClass !== ''" :src="images[previousIndex]" class="carousel-image"
                :class="exitTransitionClass" />

            <!-- Imagen actual (entrante) -->
            <img :src="images[currentIndex]" class="carousel-image" :class="transitionClass" alt="Imagen actual"
                @animationend="resetTransitionClass" />
            <!-- Botones con SVG -->
            <button class="arrow left" @click="prev" aria-label="Imagen anterior" role="button" tabindex="0">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-arrow" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <button class="arrow right" @click="next" aria-label="Imagen siguiente" role="button" tabindex="0">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-arrow" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <!-- Indicadores y botón pausa/play -->
            <div class="controls-bottom">
                <div class="indicators">
                    <span v-for="(image, index) in images" :key="index" class="dot"
                        :class="{ active: index === currentIndex }" @click="goTo(index)"
                        :aria-label="`Ir a imagen ${index + 1}`"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import banner1 from '../assets/banner_1.png';
import banner2 from '../assets/banner_2.png';

const images = [banner1, banner2];

const currentIndex = ref(0);
const previousIndex = ref(0);

const transitionClass = ref('');
const exitTransitionClass = ref('');

let interval: ReturnType<typeof setInterval>;

const isPlaying = ref(true);
function next() {
  transitionClass.value = 'slide-in-right';
  exitTransitionClass.value = 'slide-out-left';
  previousIndex.value = currentIndex.value;
  currentIndex.value = (currentIndex.value + 1) % images.length;
}

function prev() {
  exitTransitionClass.value = 'slide-out-right';
  transitionClass.value = 'slide-in-left';
  previousIndex.value = currentIndex.value;
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
}

function goTo(index: number) {
  if (index === currentIndex.value) return;
  exitTransitionClass.value = index > currentIndex.value ? 'slide-out-left' : 'slide-out-right';
  transitionClass.value = index > currentIndex.value ? 'slide-in-right' : 'slide-in-left';
  previousIndex.value = currentIndex.value;
  currentIndex.value = index;
}

function resetTransitionClass() {
  transitionClass.value = '';
  exitTransitionClass.value = '';
}

function startAutoplay() {
    if (interval) clearInterval(interval);
    interval = setInterval(next, 5000);
    isPlaying.value = true;
}

function stopAutoplay() {
    if (interval) clearInterval(interval);
    isPlaying.value = false;
}

// Iniciar autoplay al montar y limpiar al desmontar
onMounted(() => {
    startAutoplay();
});
onBeforeUnmount(() => {
    stopAutoplay();
});

// Drag para cambiar imágenes
const dragStartX = ref<number | null>(null);
const dragDeltaX = ref(0);
const dragging = ref(false);

function startDrag(event: MouseEvent | TouchEvent) {
    dragging.value = true;
    dragDeltaX.value = 0;
    if (event instanceof MouseEvent) {
        dragStartX.value = event.clientX;
    } else if (event.touches && event.touches.length > 0) {
        dragStartX.value = event.touches[0].clientX;
    }
}

function onDrag(event: TouchEvent) {
    if (!dragging.value) return;
    if (event.touches && event.touches.length > 0) {
        dragDeltaX.value = event.touches[0].clientX - (dragStartX.value ?? 0);
    }
}

function endDrag(event: MouseEvent | TouchEvent) {
    if (!dragging.value) return;
    dragging.value = false;
    if (dragDeltaX.value > 50) {
        prev();
    } else if (dragDeltaX.value < -50) {
        next();
    }
    if (isPlaying.value) startAutoplay();
}
</script>

<style scoped>

.carousel-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding: 0 16px;
}

.carousel {
    position: relative;
    width: 100%;
    max-width: 1000px;
    min-width: 0;
    height: auto;
    aspect-ratio: 30 / 10;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    background: linear-gradient(90deg, #fdf100, #000);
}

.carousel-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.8s ease;
    border-radius: 8px;
    user-select: none;
    pointer-events: none;
    z-index: 1;
}

.slide-out-left {
    transform: translateX(0);
    animation: slideOutLeft 0.6s ease forwards;
    z-index: 1;
}


.slide-out-right {
    transform: translateX(0);
    animation: slideOutRight 0.6s ease forwards;
    z-index: 1;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

.slide-in-right {
    animation: slideInRight 0.6s ease forwards;
}

.slide-in-left {
    animation: slideInLeft 0.6s ease forwards;
}

/* Botones flecha mejorados */
.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 5;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    color: #fff;
    user-select: none;
}

.arrow:hover,
.arrow:focus {
    background-color: rgba(0, 0, 0, 0.75);
    outline: none;
    transform: translateY(-50%) scale(1.1);
}

.arrow:active {
    transform: translateY(-50%) scale(0.95);
}

.arrow.left {
    left: 16px;
}

.arrow.right {
    right: 16px;
}

/* Iconos flechas SVG */
.icon-arrow {
    width: 24px;
    height: 24px;
    stroke: currentColor;
}

/* Contenedor de indicadores + botón */
.controls-bottom {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    z-index: 3;
}

/* Indicadores */
.indicators {
    display: flex;
    gap: 12px;
}

.dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background-color: #fdf100;
    box-shadow: 0 0 5px #000;
}

/* Botón play/pausa */
.btn-play-pause {
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;
}

.btn-play-pause:hover {
    background: rgba(255, 255, 255, 1);
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .arrow {
        display: none;
    }

    .dot {
        width: 10px;
        height: 10px;
    }

    .btn-play-pause {
        display: none;
    }
    
    .carousel {
        position: relative;
        width: 100%;
        max-width: 1000px;
        min-width: 0;
        height: auto;
        aspect-ratio: 30 / 11;
    }
}
</style>