<template>
    <div class="carousel-wrapper">
        <div class="carousel-track">
            <div class="carousel-inner" :style="trackStyle">
                <div v-for="(plan, index) in extendedPlans" :key="plan.plan_nombre + index" class="plan-container-map">
                    <div class="plan-container">
                        <header class="header-select-plan">
                            {{ plan.plan_nombre }} {{ plan.gb_alta_velocidad }}
                        </header>
                        <div class="gb-data-container">
                            <h1 class="gb-tittle">{{ plan.gb_alta_velocidad }} Mbps</h1>
                            <h2 class="gb-text">100% Fibra Óptica</h2>
                        </div>
                        <div class="price-data-container">
                            <h1 class="month-discount">S/ {{ plan.precio.toFixed(2) }}</h1>
                            <h2 class="gb-text">Mensual
                            </h2>
                        </div>
                        <p class="paragraph">{{ plan.descripcion }}</p>
                        <div class="suscription-container">
                            <h1 class="suscription">{{ plan.suscripcion_incluida }}</h1>
                        </div>
                        <div class="images-container">
                            <img :src="paramount" alt="Logo de Paramount+" width="40" height="28" />
                            <img :src="bitel_tv" alt="Logo de Bitel TV" width="35" height="30" />
                            <img :src="cable_go" alt="Logo de Cable GO" width="35" height="30" />
                        </div>

                        <h1 class="gb-text" style="color: black;">{{ plan.duracion_suscripcion }}</h1>
                        <a class="button-select-promo" :href="plan.url_solicitud || '#'" target="_blank">
                            Solicítalo aquí
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, onMounted, onUnmounted } from 'vue';
import paramount from '../assets/paramount.png';
import bitel_tv from '../assets/bitel_tv.png';
import cable_go from '../assets/cable_go.png';

const slideWidth = ref(getSlideWidth());

function getSlideWidth() {
    return window.innerWidth <= 768 ? window.innerWidth * 0.85 + 16 : 18.5 * 16 + 7.5;
}

function handleResize() {
    slideWidth.value = getSlideWidth();
}

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

// Beneficios: 
// 200 mbps velocidad 
// 101 canales cable go 
// Películas y series paramount +
// Liga 1 Max TV360

const plans = [
    {
        plan_nombre: "Bitel Fibra",
        precio: 55,
        gb_alta_velocidad: 200,
        descripcion: "Plan todo ilimitado: llamadas, SMS, internet, más 60 GB en alta velocidad y 30 GB para TikTok.",
        suscripcion_incluida: "Paramount+ y BITEL TV 360"
    },
    {
        plan_nombre: "Bitel Fibra",
        precio: 69.9,
        gb_alta_velocidad: 400,
        descripcion: "Plan todo ilimitado: llamadas, SMS, internet. Incluye suscripción a plataformas de streaming.",
        suscripcion_incluida: "Paramount+ y BITEL TV 360"
    },
    {
        plan_nombre: "Bitel Fibra",
        precio: 79.9,
        gb_alta_velocidad: 1000,
        descripcion: "Plan todo ilimitado: llamadas, SMS, internet, más 60 GB en alta velocidad y 30 GB para TikTok.",
        suscripcion_incluida: "Paramount+ y BITEL TV 360"
    }
];

const extendedPlans = computed(() => plans);

const trackStyle = computed(() => ({
    transform: `translateX(0px)`,
}));
</script>

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
    justify-content: center;
    /* AÑADIDO PARA CENTRAR LOS PLANES */
    gap: 3rem;
    transition: all 0.3s ease-in-out;
}

.plan-container-map {
    flex: 0 0 16.5rem;
    padding: 0rem;
    border-radius: 8px;
    text-align: center;
    flex-shrink: 0;
    /* Coincide con flex-basis para evitar salto */
    transition: transform 0.3s ease;
}

.plan-container {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
    border: 0.09rem solid #21bdbb;
    overflow: hidden;
    min-height: 525px;
    width: 100%;
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
    background-color: #e7f1f1;
}

.gb-tittle {
    color: #057689;
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.2rem;
    margin: 0;
}

.gb-text {
    font-size: 0.8rem;
    color: #057689;
    font-weight: 300;
    line-height: 1.1rem;
    margin-top: -3px;
}

.month-discount {
    color: #057689;
    background-color: #e7f1f1;
    font-size: 1.5rem;
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
    background-color: #e7f1f1;
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
    text-decoration: none;
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
        min-height: 55vh;
    }

    .paragraph {
        font-size: 0.8rem;
        line-height: 1.2rem;
        height: 80px;
    }

    .gb-data-container {
        height: 3.5rem;
    }

    .carousel-inner {
        justify-content: center;
        /* CENTRADO EN MÓVIL TAMBIÉN */
        padding-left: 0;
        /* OPCIONAL: elimina padding si descuadra */
        padding-right: 0;
    }

    .images-container {
        padding-top: 0;
    }

}
</style>