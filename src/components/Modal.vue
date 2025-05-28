<template>
    <transition name="modal-fade">
        <div v-if="modelValue" class="modal-overlay" @click.self="close">
            <div class="modal-content">
                <slot></slot>
                <button class="close-btn" @click="close">✕</button>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

function close() {
    emit('update:modelValue', false);
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    border: 2px solid #057689;
    background: white;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
    position: relative;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
}

/* Animación simple */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>