<template>
    <header class="navbar">
        <div class="navbar-top">
            <div class="logo">
                <img src="../assets/logo_bitel.png" alt="Bitel Logo" />
            </div>
            <button class="hamburger" @click="toggleMenu" :class="{ open: menuOpen }" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <nav class="nav-links" :class="{ open: menuOpen }">
            <a href="#" class="nav-button" @click.prevent="handleClick('/')"
                :class="{ loading: activePath === '/' }">
                Fibra Óptica
            </a>
            <!-- <a href="#" class="nav-button" @click.prevent="handleClick('/fibra')"
                :class="{ loading: activePath === '/fibra' }">
                Fibra Óptica
            </a> -->
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const activePath = ref<string | null>(null);
const menuOpen = ref(false);

function handleClick(path: string) {
    if (activePath.value) return;
    activePath.value = path;
    setTimeout(() => {
        router.push(path);
        activePath.value = null;
        menuOpen.value = false; // Cierra el menú tras hacer clic
    }, 200);
}

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}
</script>

<style>
/* Estilo general (modo desktop) */

/* Hamburguesa animada */
.hamburger {
    display: none;
    width: 30px;
    height: 22px;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000;
}

.hamburger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: #057689;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transition: all 0.3s ease-in-out;
}

.hamburger span:nth-child(1) {
    top: 0;
}

.hamburger span:nth-child(2) {
    top: 9px;
}

.hamburger span:nth-child(3) {
    top: 18px;
}

.hamburger.open span:nth-child(1) {
    top: 9px;
    transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
    opacity: 0;
}

.hamburger.open span:nth-child(3) {
    top: 9px;
    transform: rotate(-45deg);
}

.navbar {
    z-index: 1;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    font-family: 'BreeCFApp', sans-serif;
    padding: 6px 32px;
    display: flex;
    justify-content: space-between;

}

.logo img {
    height: 50px;
    -webkit-user-drag: none;
}

.navbar-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 40px;
}

.nav-button {
    color: #057689;
    font-size: 19.5px;
    font-weight: bolder;
    letter-spacing: 0.15em;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: color 0.4s ease, transform 0.3s, text-shadow 0.3s;
}


.nav-button:hover {
    color: #fdf100;
    transform: scale(1.1) scaleY(1.2);
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0 0 4px rgba(253, 241, 0, 0.8);
}

.nav-button:active {
    transform: scale(0.95) scaleY(1.2);
    color: #e6d800;
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}

.nav-button.loading {
    pointer-events: none;
    color: #fdf100;
    animation: pulse 1s infinite;
    position: relative;
}

@keyframes pulse {

    0%,
    100% {
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 0 10px #fdf100;
    }

    50% {
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 0 20px #fdf100;
    }
}

/* Corrección responsive */

/* SOLO móvil: */
@media (max-width: 768px) {
    .navbar {
        padding: 0;
        flex-direction: column;
        align-items: stretch;
    }

    .hamburger {
        display: block;
    }

    .nav-links {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        gap: 20px;
        transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
    }

    .nav-links.open {
        max-height: 200px;
        opacity: 1;
        transform: translateY(0);
        transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        pointer-events: auto;
        padding: 12px;
    }

    .logo img {
        height: 40px;
    }

    .nav-button {
        font-size: 18px;
        width: 100%;
        text-align: left;
    }

    .navbar-top {
        padding: 8px 16px;
        justify-content: space-between;
    }
}
</style>