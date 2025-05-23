<template>
    <div class="carousel-wrapper">

        <button class="nav-button left" @click="prev">&#10094;</button>
        <!-- Contenedor de las tarjetas -->
        <div class="carousel-track">
            <div class="carousel-inner" :style="trackStyle">
                <div v-for="(plan, index) in extendedPlans" :key="index" class="plan-container-map">

                    <!-- Tu estructura de tarjeta -->
                    <div class="plan-container">
                        <header class="header-select-plan">{{ plan.plan_nombre }} x S/. {{ plan.precio_referencia }}
                        </header>
                        <div class="gb-data-container">
                            <h1 class="gb-tittle">+{{ plan.gb_alta_velocidad }} GB</h1>
                            <h2 class="gb-text">En alta velocidad</h2>
                        </div>
                        <div class="price-data-container">
                            <h1 class="month-discount">S/ {{ plan.precio_descuento }}</h1>
                            <h2 class="gb-text">{{ plan.descuento_porcentaje }}% dscto. por {{ plan.meses_descuento }}
                                meses</h2>
                        </div>
                        <p class="paragraph">{{ plan.descripcion }}</p>
                        <div class="suscription-container">
                            <h1 class="suscription">{{ plan.suscripcion_incluida }}</h1>
                            <h1 class="suscription">{{ plan.duracion_suscripcion }}</h1>
                        </div>
                        <div class="images-container">
                            <img :src="images[0]" alt="Paramount+" width="40" height="28" />
                            <img :src="images[1]" alt="Bitel TV" width="35" height="30" />
                        </div>
                        <button class="button-select-promo">Solicítalo aquí</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="nav-button right" @click="next">&#10095;</button>
    </div>
</template>


<style scoped>
@font-face {
    font-family: BreeCFApp;
    src: url(../assets/BreeCFApp-Bold-b9af3499.otf) format("truetype");
    font-weight: 700;
}

@font-face {
    font-family: BreeCFApp;
    src: url(../assets/BreeCFApp-Regular-87a9cb2f.otf) format("truetype");
    font-weight: 400;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: BreeCFApp, sans-serif;
}

.carousel-wrapper {
    width: 80%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0 auto;
    overflow: visible;
    position: relative;
}

/* Ajustar el ancho del track para que encaje con los botones */

.carousel-track {
    overflow: hidden;
    width: 100%;
    position: relative;
}

.carousel-inner {
    display: flex;
    transition: all 0.3s ease-in-out;
}

.plan-container-map {
    flex: 0 0 18.5rem;
    padding: 0rem;
    margin-right: 7.5px;
    border-radius: 8px;
    text-align: center;
    flex-shrink: 0;
    width: 18.5rem;
    /* Coincide con flex-basis para evitar salto */
    transition: transform 0.3s ease;
}

.plan-container {
    width: 15rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
    border: 0.09rem solid #21bdbb;
    overflow: hidden;
    min-height: 65dvh;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #057689;
    font-weight: bold;
    z-index: 10;
    padding: 0 0.5rem;
}

.nav-button.left {
    left: -2.5rem;
    /* justo afuera y pegado */
}

.nav-button.right {
    right: -2.5rem;
    /* justo afuera y pegado */
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.header-select-plan {
    padding: 0.6rem 0;
    background-color: #057689;
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.gb-data-container {
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.price-data-container {
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2fbfb;
}

.gb-tittle {
    color: #057689;
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.2rem;
    margin: 0;
}

.gb-text {
    font-size: 0.9rem;
    color: #057689;
    font-weight: 300;
    line-height: 1.1rem;
}

.month-discount {
    color: #057689;
    background-color: #f2fbfb;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 2.4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.suscription-container {
    text-align: center;
    padding: 0.6rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #f2fbfb;
    width: 100%;
}

.suscription {
    color: #057689;
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1rem;
    margin: 0;
}

.images-container {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    gap: 1rem;
    width: 100%;
}

.images-container img {
    object-fit: cover;
    border-radius: 0.5rem;
    -webkit-user-drag: none;
}

.button-select-promo {
    padding: 0.6rem 0;
    background-color: #057689;
    width: 9rem;
    border: 0;
    border-radius: 1.7rem;
    margin: 1rem;
    color: #fff;
    font-weight: 700;
    transition: background-color 0.2s ease;
    cursor: pointer;
    font-size: 0.9rem;
}

.paragraph {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.5rem;
    margin: 0;
    height: 90px;
    padding: 0.5rem 1rem;
}

@media (max-width: 768px) {
    
    .carousel-wrapper {
        width: 80%;
    }

    .carousel-track {
        max-width: 100vw;
        padding: 0 1rem;
    }

    .plan-container-map {
        flex: 0 0 80%;
        margin-right: 1rem;
        margin-left: 1rem;
        scroll-snap-align: center;
    }

    .plan-container {
        width: 100%;
        min-height: 55dvh;
    }

    .paragraph {
        font-size: 0.8rem;
        line-height: 1.2rem;
        height: 80px;
    }

    .gb-data-container {
        height: 3.5rem;
    }

    .nav-button.left {
        left: 0;
    }

    .nav-button.right {
        right: 0;
    }
    
    .carousel-inner {
        padding-left: 10%;
        padding-right: 10%;
    }
}
</style>

<script setup>

import { ref, computed } from 'vue';

import paramount from '../assets/paramount.png';
import bitel_tv from '../assets/bitel_tv.png';
const slideWidth = ref(getSlideWidth());

function getSlideWidth() {
  return window.innerWidth <= 768 ? window.innerWidth * 0.85 + 16 : 18.5 * 16 + 7.5;
}

window.addEventListener('resize', () => {
  slideWidth.value = getSlideWidth();
});

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideWidth.value}px)`,
  transition: isTransitioning.value ? 'transform 0.3s ease-in-out' : 'none',
  display: 'flex',
}));

const isTransitioning = ref(false);
const images = [paramount, bitel_tv];

const extendedPlans = computed(() => {
    return [
        ...plans.slice(-3),  // últimos 3 (clones)
        ...plans,
        ...plans.slice(0, 3), // primeros 3 (clones)
    ];
});

const currentIndex = ref(3); // empieza en el primer real (por los clones delante)

const plans = [
    {
        "plan_nombre": "Plan Ilimitado",
        "precio_referencia": 55.90,
        "gb_alta_velocidad": 75,
        "descuento_porcentaje": 50,
        "precio_descuento": 27.90,
        "meses_descuento": 12,
        "descripcion": "Plan todo ilimitado, llamadas, sms, internet, más 60GB en alta velocidad, 30GB para Tik Tok.",
        "suscripcion_incluida": "Paramount+ y BITEL TV 360",
        "duracion_suscripcion": "6 meses"
    },
    {
        "plan_nombre": "Plan ilimitado",
        "precio_referencia": 69.90,
        "gb_alta_velocidad": 110,
        "descuento_porcentaje": 50,
        "precio_descuento": 34.90,
        "meses_descuento": 12,
        "descripcion": "Plan todo ilimitado, llamadas, sms, internet.Incluye suscripción a streaming",
        "suscripcion_incluida": "Paramount+ y BITEL TV 360",
        "duracion_suscripcion": "6 meses"
    },
    {
        "plan_nombre": "Plan Ilimitado",
        "precio_referencia": 79.90,
        "gb_alta_velocidad": 125,
        "descuento_porcentaje": 50,
        "precio_descuento": 39.90,
        "meses_descuento": 12,
        "descripcion": "Plan todo ilimitado, llamadas, sms, internet, más 60GB en alta velocidad, 30GB para Tik Tok.",
        "suscripcion_incluida": "Paramount+ y BITEL TV 360",
        "duracion_suscripcion": "6 meses"
    },
    {
        "plan_nombre": "Plan flash",
        "precio_referencia": 109.90,
        "gb_alta_velocidad": 200,
        "descuento_porcentaje": 50,
        "precio_descuento": 54.95,
        "meses_descuento": 12,
        "descripcion": "Plan todo ilimitado, llamadas, sms, internet.Incluye suscripción a streaming",
        "suscripcion_incluida": "Paramount+ y BITEL TV 360",
        "duracion_suscripcion": "6 meses"
    }
];

function next() {
    if (isTransitioning.value) return;
    isTransitioning.value = true;
    currentIndex.value++;

    setTimeout(() => {
        isTransitioning.value = false;
        if (currentIndex.value === plans.length + 3) {
            // saltar sin transición al primer real
            isTransitioning.value = false;
            currentIndex.value = 3;
        }
    }, 500);
}

function prev() {
    if (isTransitioning.value) return;
    isTransitioning.value = true;
    currentIndex.value--;

    setTimeout(() => {
        isTransitioning.value = false;
        if (currentIndex.value === 2) {
            // saltar sin transición al último real
            isTransitioning.value = plans.length + 2;
        }
    }, 500);
}
</script>