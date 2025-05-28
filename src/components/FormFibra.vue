<template>
    <transition name="modal-fade">
        <!--@click.self="close"-->
        <div v-if="modelValue" class="modal-overlay">
            <div class="modal-content">

                <button class="close-btn" @click="close" aria-label="Cerrar">
                    <svg width="24" height="24" viewBox="0 -5 26 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </button>

                <h2 class="title">Formulario Fibra - Plan: {{ plan?.name || 'Ninguno' }}</h2>
                <div class="form-container">
                    <h1>¡Cámbiate a Bitel!</h1>
                    <p class="caption">Descubre la velocidad imparable de nuestra fibra óptica de última generación.</p>

                    <div class="progress-bar">
                        <div class="progress" :style="{ width: step === 1 ? '50%' : '100%' }">
                            Paso {{ step }} de 2
                        </div>
                    </div>

                    <h2 class="title-data">Ingresa tus Datos</h2>
                    <form @submit.prevent="continuar()" novalidate>
                        <div v-if="step === 1">
                            <!-- Inputs declarados uno a uno -->
                            <div class="form-group">
                                <label for="dni">{{ getLabel('dni') }}</label>
                                <input type="tel" id="dni" v-model="formStep1.dni" :maxlength="getMaxLength('dni')"
                                    :class="{ invalid: errors.dni }" required />
                                <small v-if="errors.dni" class="error-msg">{{ getErrorMessage('dni') }}</small>
                            </div>

                            <div class="form-group">
                                <label for="telefono">{{ getLabel('telefono') }}</label>
                                <input type="tel" id="telefono" v-model="formStep1.telefono"
                                    :maxlength="getMaxLength('telefono')" :class="{ invalid: errors.telefono }"
                                    required />
                                <small v-if="errors.telefono" class="error-msg">{{ getErrorMessage('telefono')
                                }}</small>
                            </div>

                            <div class="form-group">
                                <label for="nombre">{{ getLabel('nombre') }}</label>
                                <input type="text" id="nombre" v-model="formStep1.nombre"
                                    :class="{ invalid: errors.nombre }" required />
                                <small v-if="errors.nombre" class="error-msg">{{ getErrorMessage('nombre') }}</small>
                            </div>

                            <div class="form-group">
                                <label for="apellido">{{ getLabel('apellido') }}</label>
                                <input type="text" id="apellido" v-model="formStep1.apellido"
                                    :class="{ invalid: errors.apellido }" required />
                                <small v-if="errors.apellido" class="error-msg">{{ getErrorMessage('apellido')
                                }}</small>
                            </div>

                            <div class="form-group">
                                <label for="correo">{{ getLabel('correo') }}</label>
                                <input type="email" id="correo" v-model="formStep1.correo"
                                    :class="{ invalid: errors.correo }" required />
                                <small v-if="errors.correo" class="error-msg">{{ getErrorMessage('correo') }}</small>
                            </div>

                            <div class="checkbox-group">
                                <input type="checkbox" id="autorizo" v-model="formStep1.autorizo" />
                                <label for="autorizo">Autorizo el uso de mis datos personales.</label>
                            </div>
                        </div>

                        <div v-else>
                            <!-- Para step 2 también sin v-for -->
                            <div class="form-group">
                                <label for="provincia">{{ getLabel('provincia') }}</label>
                                <input type="text" id="provincia" v-model="formStep2.provincia" required />
                            </div>

                            <div class="form-group">
                                <label for="ciudad">{{ getLabel('ciudad') }}</label>
                                <input type="text" id="ciudad" v-model="formStep2.ciudad" required />
                            </div>

                            <div class="form-group">
                                <label for="distrito">{{ getLabel('distrito') }}</label>
                                <input type="text" id="distrito" v-model="formStep2.distrito" required />
                            </div>
                        </div>


                        <div class="button-container">
                            <button type="submit">{{ step === 1 ? 'Siguiente' : 'Enviar' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import ubigeo from '../assets/ubigeo.js';
// Componente para el formulario de Fibra

const props = defineProps({
    modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

function close() {
    emit('update:modelValue', false)
}

const plan = ref({ name: 'Plan Básico' })
const step = ref(1)
const ubigeoData = ref(ubigeo);
// Datos del formulario

const formStep1 = ref({
    dni: '',
    telefono: '',
    nombre: '',
    apellido: '',
    correo: '',
    autorizo: false,
})

const formStep2 = ref({
    distrito: '',
    provincia: '',
    ciudad: ''
})

const errors = ref({
    dni: false,
    telefono: false,
    nombre: false,
    apellido: false,
    correo: false,
})

// funcion hotkey para ejecutar funcion console.log('Hotkey pressed!')
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
        console.log(ubigeoData.value);
        console.log('Hotkey pressed!');
        
    }
})

function getLabel(key) {
    const labels = {
        dni: 'DNI',
        telefono: 'Número de contacto',
        nombre: 'Nombre',
        apellido: 'Apellido',
        correo: 'Correo electrónico',
        direccion: 'Dirección',
        referencia: 'Referencia',
        distrito: 'Distrito',
    }
    return labels[key] || key
}

function getInputType(key) {
    return key === 'correo' ? 'email' : key === 'telefono' || key === 'dni' ? 'tel' : 'text'
}

function getMaxLength(key) {
    const max = {
        dni: 8,
        telefono: 9,
    }
    return max[key] || null
}

function getErrorMessage(key) {
    const msgs = {
        dni: 'DNI inválido. Debe tener 8 dígitos numéricos.',
        telefono: 'Teléfono inválido.',
        nombre: 'Nombre inválido.',
        apellido: 'Apellido inválido.',
        correo: 'Correo electrónico inválido.',
    }
    return msgs[key]
}

function validarFormularioPaso1() {
    errors.value.dni = !/^[0-9]{8}$/.test(formStep1.value.dni)
    errors.value.telefono = !/^(9\d{8}|0\d{7,8})$/.test(formStep1.value.telefono)
    errors.value.nombre = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(formStep1.value.nombre)
    errors.value.apellido = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(formStep1.value.apellido)
    errors.value.correo = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formStep1.value.correo)

    // Mostrar error si el checkbox no está marcado
    if (!formStep1.value.autorizo) {
        return false
    }

    return !Object.values(errors.value).some(Boolean)
}

function continuar() {
    // Validar el paso 1 antes de continuar al paso 2
    if (step.value === 1) {
        if (validarFormularioPaso1()) {
            step.value = 2
        }
    } else {
        const datosFinales = {
            ...formStep1.value,
            ...formStep2.value,
            plan: plan.value?.name || null,
        }

        console.log('JSON enviado:', datosFinales)
        alert('Formulario enviado:\n' + JSON.stringify(datosFinales, null, 2))

        step.value = 1
        formStep1.value = {
            dni: '',
            telefono: '',
            nombre: '',
            apellido: '',
            correo: '',
            autorizo: false,
        }
        formStep2.value = {
            direccion: '',
            referencia: '',
            distrito: '',
        }

        close()
    }
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

.form-container {
    margin: auto;
    font-family: 'BreeCFApp', sans-serif;
    border-radius: 10px;
    background: white;
    padding: 15px 30px;
    border-radius: 10px;
    width: 100%;
    text-align: center;
}

.caption {
    margin-bottom: 1.5rem;
    color: #000000;
    opacity: 0.6;
    font-size: 13px;
    margin-top: -5px;
}

.progress-bar {
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    height: 20px;
    margin-bottom: 15px;
}

.progress {
    background-color: #fdf100;
    color: #494949;
    height: 100%;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    transition: width 0.3s;
}

h1 {
    color: #057689;
    text-align: center;
    font-size: 35px;
}

.title {
    padding: 15px;
    margin: 0;
    background-color: #057689;
    color: white;
    border-radius: 5px 5px 0 0;
}

.title-data {
    font-size: 22px;
    color: #333;
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

.form-group label {
    display: block;
    color: #444;
    font-size: 14px;
    text-align: left;
}

.form-group input {
    width: 100%;
    padding: 4px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 1rem;
}

.checkbox-group {
    margin: 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #555;
}


.button-container button {
    background-color: #057689;
    color: white;
    padding: 12.5px 22.5px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.button-container button:hover {
    background-color: #008f45;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.invalid {
    border-color: red;
}

.error-msg {
    color: red;
    font-size: 0.75rem;
    margin-top: 2px;
}






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
    overflow-y: scroll;
}

.modal-content {
    border: 2px solid #057689;
    background: white;
    border-radius: 10px;
    max-height: 100vh;
    max-width: 768px;
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

@media (max-width: 600px) {
    .modal-content {
        width: 90%;
        max-width: none;
        border-radius: 10px;
    }

    .form-container {
        padding: 10px 15px;
    }

    h1 {
        font-size: 24px;
    }

    .title {
        font-size: 18px;
        padding: 10px;
    }

    .title-data {
        font-size: 18px;
    }

    .form-group input {
        font-size: 0.95rem;
    }

    .button-container button {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
    }

    .checkbox-group {
        gap: 0.25rem;
        font-size: 0.85rem;
    }

    .progress-bar {
        height: 16px;
    }

    .progress {
        font-size: 11px;
        line-height: 16px;
    }

    .close-btn {
        top: 8px;
        right: 10px;
        font-size: 1.1rem;
    }
}
</style>