<template>
    <Swiper :pagination="{ clickable: true }" :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
        :modules="[Navigation, Pagination]" :loop="true" :breakpoints="{
            960: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            700: {
                slidesPerView: 2
            }
        }">
        <!-- Botones personalizados -->
        <button class="custom-prev">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-arrow" viewBox="-2 0 30 25" fill="none"
                stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
        <button class="custom-next">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-arrow" viewBox="-4 0 30 25" fill="none"
                stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>

        <SwiperSlide v-for="(plan, index) in plans" :key="index">
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
                    <h2 class="gb-text">Mensual</h2>
                </div>

                <p class="paragraph">{{ plan.descripcion }}<br> <em style="color: #404040;">* {{ plan.descripcion2 }}*</em></p>
                <div class="suscription-container">
                    <h1 class="suscription">{{ plan.suscripcion_incluida }}</h1>
                </div>
                <div class="images-container">
                    <div class="subscription-container">
                        <img :src="paramount" alt="Logo de Paramount+" width="40" height="28" />
                        <h1 class="subscription-text">{{ plan.plataformas[0] }}</h1>
                    </div>
                    <div class="subscription-container">
                        <img :src="cable_go" alt="Logo de Cable GO" width="35" height="30" />
                        <h1 class="subscription-text">{{ plan.plataformas[1] }}</h1>
                    </div>
                    <div class="subscription-container">
                        <img :src="bitel_tv" alt="Logo de Bitel TV" width="35" height="30" />
                        <h1 class="subscription-text">{{ plan.plataformas[2] }}</h1>
                    </div>
                    <div class="subscription-container">
                        <img :src="l1max" alt="Logo de L1 MAX" width="35" height="30" />
                        <h1 class="subscription-text">{{ plan.plataformas[3] }}</h1>
                    </div>
                </div>
                <button class="button-select-promo" @click="openModal(plan)">
                    Solicítalo aquí
                </button>
            </div>
        </SwiperSlide>
    </Swiper>

    <FormFibra :plan="selectedPlan" v-model:modelValue="showModal" />
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import FormFibra from './FormFibra.vue';

import paramount from '../assets/paramount.png';
import bitel_tv from '../assets/bitel_tv.png';
import cable_go from '../assets/cable_go.png';
import l1max from '../assets/l1max.png';

const showModal = ref(false);
const selectedPlan = ref(null);

const plans = [
    {
        plan_nombre: 'Bitel Fibra',
        precio: 55,
        gb_alta_velocidad: 200,
        descripcion: 'Internet de fibra óptica con alta velocidad y estabilidad.',
        descripcion2: 'Velocidad simétrica',
        suscripcion_incluida: 'Incluye suscripción a plataformas de streaming.',
        plataformas: ["Paramount +", "Cable GO", "TV 360", "L1 MAX"],
        url_solicitud: '',
    },
    {
        plan_nombre: 'Bitel Fibra',
        precio: 109,
        gb_alta_velocidad: 400,
        descripcion: 'Internet de fibra óptica con alta velocidad y estabilidad.',
        descripcion2: 'Velocidad simétrica',
        suscripcion_incluida: 'Incluye suscripción a plataformas de streaming.',
        plataformas: ["Paramount +", "Cable GO", "TV 360", "L1 MAX"],
        url_solicitud: '',
    },
    {
        plan_nombre: 'Bitel Fibra',
        precio: 139,
        gb_alta_velocidad: 1000,
        descripcion: 'Internet de fibra óptica con alta velocidad y estabilidad.',
        descripcion2: 'Velocidad simétrica',
        suscripcion_incluida: 'Incluye suscripción a plataformas de streaming.',
        plataformas: ["Paramount +", "Cable GO", "TV 360", "L1 MAX"],
        url_solicitud: '',
    }
];

function openModal(plan) {
    selectedPlan.value = plan;
    showModal.value = true;
}
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

.custom-prev,
.custom-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background-color: #057689;
    color: white;
    border: none;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.custom-prev:hover,
.custom-next:hover {
    transform: translateY(-50%) scale(1.05);
}

.custom-prev {
    left: 5px;
}

.custom-next {
    right: 5px;
}

.carousel-track {
    overflow: hidden;
    width: 80%;
    position: relative;
}

.carousel-inner {
    display: flex;
    justify-content: center;
    gap: 3rem;
    transition: all 0.3s ease-in-out;
}

.plan-container-map {
    flex: 0 0 16.5rem;
    padding: 0rem;
    border-radius: 8px;
    text-align: center;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.plan-container {
    max-width: 320px;
    margin: 0 auto;
    width: 100%;
    background: white;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    border: 2px solid #21bdbb;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    overflow: hidden;
    min-height: 500px;
}

.swiper {
    padding: 10px 0 40px 0;
    max-width: 900px;
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
}

.nav-button.right {
    right: -2.5rem;
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
    font-size: 13px;
    font-weight: 300;
    line-height: 1rem;
    margin: 0;
}

.subscription-container {
    width: 71px;
    height: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.subscription-text{
    font-size: 12px;
    font-weight: 300;
    margin-top: -4px;
}

.images-container {
    display: flex;
    padding: 5px 0 0 0;
    width: 100%;
    justify-content: center;
}

.images-container img {
    object-fit: cover;
    border-radius: 0.5rem;
    -webkit-user-drag: none;
}

.button-select-promo {
    text-align: center;
    padding: 0.6rem 0;
    background-color: #057689;
    width: 9rem;
    border: 0;
    border-radius: 1.7rem;
    margin: 6px 0 12px;
    color: #fff;
    font-weight: 700;
    transition: background-color 0.2s ease;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
}

.paragraph {
    font-size: 14.5px;
    line-height: 1.5rem;
    margin: 0;
    height: 90px;
    padding: 8px 16px;
}

.paragraph em {
    font-size: 12px;
}

@media (max-width: 960px) {

    .custom-prev {
        width: 36px;
        height: 36px;
        font-size: 1.3rem;
        left: 5px;
        display: flex;
    }

    .custom-next {
        width: 36px;
        height: 36px;
        font-size: 1.3rem;
        right: 5px;
        display: flex;
    }

    .carousel-wrapper {
        width: 80%;
    }

    .carousel-track {
        max-width: 100vw;
        padding: 0 1rem;
    }

    .swiper {
        width: 100%;
        margin-bottom: 10px;
    }

    .plan-container-map {
        flex: 0 0 80%;
        margin-right: 1rem;
        margin-left: 1rem;
        scroll-snap-align: center;
    }

    .plan-container {
        width: 100%;
        min-height: 475px;
    }

    .paragraph {
        font-size: 14px;
        height: 80px;
        line-height: 1.4rem;
    }

    .paragraph em {
        font-size: 11px;
    }

    .carousel-inner {
        justify-content: center;
    }


}
</style>