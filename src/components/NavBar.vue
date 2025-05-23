<template>
    <header class="navbar">
        <div class="logo">
            <img src="../assets/logo_bitel.png" alt="Bitel Logo" />
        </div>
        <nav class="nav-links">
            <a href="#" class="nav-button" @click.prevent="handleClick($event, '/')"
                :class="{ loading: activePath === '/' }">
                Cámbiate a Bitel
            </a>
            <a href="#" class="nav-button" @click.prevent="handleClick($event, '/fibra')"
                :class="{ loading: activePath === '/fibra' }">
                Fibra Óptica
            </a>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const activePath = ref<string | null>(null);

function handleClick(event: Event, path: string) {
    if (activePath.value) return; // evita múltiples clics
    activePath.value = path;

    // Simula una animación de carga antes de navegar
    setTimeout(() => {
        router.push(path);
        activePath.value = null;
    }, 200); // ajusta el tiempo a gusto
}
</script>


<style>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 32px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    font-family: 'BreeCFApp', sans-serif;
}

.logo img {
    height: 50px;
}

.nav-links {
    display: flex;
    gap: 40px;
    min-width: 400px;
}

.nav-button {
    color: #057689;
    font-size: 19.5px;
    font-weight: bolder;
    letter-spacing: 0.15em;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    transition:
        color 0.4s ease,
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        text-shadow 0.3s ease;
}

.nav-button:hover {
    color: #fdf100;
    transform: scale(1.1) scaleY(1.2);

    /* Sombra amarilla + borde negro */
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
    /* Mantener borde negro sin brillo */
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}

.nav-button.loading {
    pointer-events: none;
    /* no permite clicks mientras carga */
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
</style>