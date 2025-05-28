<template>
    <div class="carousel-container" @keydown="handleKeydown" tabindex="0">
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

            <!-- Indicadores con progress ring -->
            <div class="controls-bottom">
                <div class="indicators">
                    <div v-for="(_, index) in images" :key="index" class="dot" @click="goTo(index)"
                        :aria-label="`Ir a imagen ${index + 1}`">
                        <svg class="progress-ring" width="16" height="16" viewBox="0 0 16 16">
                            <circle class="progress-ring__background" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2"
                                fill="transparent" r="6" cx="8" cy="8" />
                            <circle class="progress-ring__progress" stroke="#fdf100" stroke-width="2" fill="transparent"
                                r="6" cx="8" cy="8" :style="getProgressStyle(index)" />
                        </svg>
                    </div>
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

const slideDuration = 5000; // ms

const progress = ref(0); // 0 a 1
let animationFrameId: number | null = null;
let lastTimestamp = 0;

const isPlaying = ref(true);

function next() {
    transitionClass.value = 'slide-in-right';
    exitTransitionClass.value = 'slide-out-left';
    previousIndex.value = currentIndex.value;
    currentIndex.value = (currentIndex.value + 1) % images.length;
    resetProgress();
}

function prev() {
    exitTransitionClass.value = 'slide-out-right';
    transitionClass.value = 'slide-in-left';
    previousIndex.value = currentIndex.value;
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
    resetProgress();
}

function goTo(index: number) {
    if (index === currentIndex.value) return;
    exitTransitionClass.value = index > currentIndex.value ? 'slide-out-left' : 'slide-out-right';
    transitionClass.value = index > currentIndex.value ? 'slide-in-right' : 'slide-in-left';
    previousIndex.value = currentIndex.value;
    currentIndex.value = index;
    resetProgress();
}

function resetTransitionClass() {
    transitionClass.value = '';
    exitTransitionClass.value = '';
}

function resetProgress() {
    progress.value = 0;
    lastTimestamp = 0;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (isPlaying.value) {
        animationFrameId = requestAnimationFrame(stepProgress);
    }
}

function stepProgress(timestamp?: number) {
    if (!lastTimestamp) lastTimestamp = timestamp ?? 0;
    const elapsed = (timestamp ?? 0) - lastTimestamp;
    progress.value += elapsed / slideDuration;
    if (progress.value >= 1) {
        next();
        progress.value = 0;
        lastTimestamp = timestamp ?? 0;
    } else {
        lastTimestamp = timestamp ?? 0;
        animationFrameId = requestAnimationFrame(stepProgress);
    }
}

function startAutoplay() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    isPlaying.value = true;
    progress.value = 0;
    lastTimestamp = 0;
    animationFrameId = requestAnimationFrame(stepProgress);
}

function stopAutoplay() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    isPlaying.value = false;
}

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

function endDrag() {
    if (!dragging.value) return;
    dragging.value = false;
    if (dragDeltaX.value > 50) {
        prev();
    } else if (dragDeltaX.value < -50) {
        next();
    }
    if (isPlaying.value) startAutoplay();
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
        prev();
    } else if (event.key === 'ArrowRight') {
        next();
    }
}

// Devuelve el estilo para la barra de progreso del círculo en el índice dado
function getProgressStyle(index: number) {
    const radius = 6;
    const circumference = 2 * Math.PI * radius;
    if (index !== currentIndex.value) {
        return `stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference}; transition: stroke-dashoffset 0.3s ease;`;
    }
    const offset = circumference * (1 - progress.value);
    return `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}; transition: stroke-dashoffset 0.1s linear;`;
}
</script>

<style scoped>
.carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* opcional */
    margin: 25px 0 20px 0;
    overflow: hidden;
    width: 100%;
    padding: 15px 0;
}

.carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 1000px;
    min-width: 0;
    height: auto;
    aspect-ratio: 30 / 11;
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
    align-items: center;
    padding: 5px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

.dot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-ring {
    transform: rotate(-90deg);
}

.progress-ring__background {
    stroke-linecap: round;
}

.progress-ring__progress {
    stroke-linecap: round;
    transition: stroke-dashoffset 0.1s linear;
}

@media (max-width: 768px) {
    .arrow.left {
        display: none;
    }

    .arrow.right {
        display: none;
    }
    .carousel-container {
        margin: 0;
        padding: 20px 0 15px;
    }
}

@media (max-width: 1060px) {

    .carousel {

        max-width: 95%;
    }

    /* Indicadores */
    .indicators {
        display: flex;
        gap: 6px;
        align-items: center;
        padding: 2.5px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
    }

}
</style>