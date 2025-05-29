<template>
    <transition name="modal-fade">
        <!--@click.self="close"-->
        <div v-if="modelValue" class="modal-overlay" @click.self="close">
            <div class="modal-content">

                <button class="close-btn" @click="close" aria-label="Cerrar">
                    <svg width="24" height="24" viewBox="0 -5 26 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </button>

                <h2 class="title">Plan Fibra {{ props.plan.gb_alta_velocidad }} </h2>
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
                        <div v-if="step === 1" class="form-grid">
                            <div class="form-group">
                                <label for="telefono">{{ getLabel('telefono') }}</label>
                                <input type="tel" id="telefono" v-model="formStep1.telefono"
                                    :maxlength="getMaxLength('telefono')" :class="{ invalid: errors.telefono }"
                                    required />
                                <small v-if="errors.telefono" class="error-msg">{{ getErrorMessage('telefono')
                                }}</small>
                            </div>
                            <div class="form-group">
                                <label for="dni">{{ getLabel('dni') }}</label>
                                <input type="tel" id="dni" v-model="formStep1.dni" :maxlength="getMaxLength('dni')"
                                    :class="{ invalid: errors.dni }" required />
                                <small v-if="errors.dni" class="error-msg">{{ getErrorMessage('dni') }}</small>
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
                        </div>

                        <div v-else class="form-grid">
                            <div class="form-group">
                                <label for="departamento">{{ getLabel('departamento') }}</label>
                                <input type="text" id="departamento" v-model="formStep2.departamento" required />
                            </div>
                            <div class="form-group">
                                <label for="provincia">{{ getLabel('provincia') }}</label>
                                <input type="text" id="provincia" v-model="formStep2.provincia" required />
                            </div>
                            <div class="form-group">
                                <label for="distrito">{{ getLabel('distrito') }}</label>
                                <input type="text" id="distrito" v-model="formStep2.distrito" required />
                            </div>
                        </div>

                        <div class="checkbox-group" v-if="step === 1">
                            <input type="checkbox" id="autorizo" v-model="formStep1.autorizo"
                                :class="{ invalid: errors.autorizo }" />
                            <div class="checkbox-label">
                                <label for="autorizo">Autorizo el uso de mis datos personales.</label>
                                <small v-if="errors.autorizo && !formStep1.autorizo" class="error-msg"> {{
                                    getErrorMessage('autorizo')}}</small>
                            </div>
                        </div>

                        <br v-if="step === 2">
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
import { watch } from 'vue';

// Componente para el formulario de Fibra

const props = defineProps({
    modelValue: Boolean,
    plan: {
        type: Object,
        default: () => ({ name: 'Plan Básico' })
    }
})

const emit = defineEmits(['update:modelValue'])

function close() {
    console.log(props.plan);
    emit('update:modelValue', false)
    emit('update:plan', null);

    // formStep1.value = {
    //     dni: '',
    //     telefono: '',
    //     nombre: '',
    //     apellido: '',
    //     correo: '',
    //     autorizo: false,
    // }
    // formStep2.value = {
    //     departamento: '',
    //     provincia: '',
    //     distrito: '',
    // }

    // Resetear errores
    errors.value = {
        dni: false,
        telefono: false,
        nombre: false,
        apellido: false,
        correo: false,
        autorizo: false,

        // Paso 2
        distrito: false,
        provincia: false,
        departamento: false
    }
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
    autorizo: false,

    // Paso 2
    distrito: false,
    provincia: false,
    departamento: false
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
        departamento: 'Departamento',
        provincia: 'Provincia',
        distrito: 'Distrito',
    }
    return labels[key] || key
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
        dni: 'DNI inválido.',
        telefono: 'Teléfono inválido.',
        nombre: 'Nombre inválido.',
        apellido: 'Apellido inválido.',
        correo: 'Correo electrónico inválido.',
        autorizo: 'Debes autorizar el uso de tus datos.',
    }
    return msgs[key]
}

function validarFormularioPaso1() {
    errors.value.dni = !/^[0-9]{8}$/.test(formStep1.value.dni)
    errors.value.telefono = !/^(9\d{8}|0\d{7,8})$/.test(formStep1.value.telefono)
    errors.value.nombre = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(formStep1.value.nombre)
    errors.value.apellido = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(formStep1.value.apellido)
    errors.value.correo = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formStep1.value.correo)
    errors.value.autorizo = !formStep1.value.autorizo

    return !Object.values(errors.value).some(Boolean)
}



function continuar() {
    // Validar el paso 1 antes de continuar al paso 2
    if (step.value === 1) {
        step.value = 2
        if (validarFormularioPaso1()) {
        }
    } else {
        const datosFinales = {
            ...formStep1.value,
            ...formStep2.value,
            plan: plan.value?.name || null,
        }

        step.value = 1
        close()
    }
}

//STEP => 1
watch(() => formStep1.value.dni, (newVal) => {
    errors.value.dni = !/^[0-9]{8}$/.test(newVal);
});

watch(() => formStep1.value.telefono, (newVal) => {
    errors.value.telefono = !/^(9\d{8}|0\d{7,8})$/.test(newVal);
});

watch(() => formStep1.value.nombre, (newVal) => {
    errors.value.nombre = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(newVal);
});

watch(() => formStep1.value.apellido, (newVal) => {
    errors.value.apellido = !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(newVal);
});

watch(() => formStep1.value.correo, (newVal) => {
    errors.value.correo = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newVal);
});

watch(() => formStep1.value.autorizo, (newVal) => {
    errors.value.autorizo = !newVal;
});

//STEP => 2
watch(() => formStep2.value.distrito, (val) => {
    errors.value.distrito = val.trim() === ''
})

watch(() => formStep2.value.provincia, (val) => {
    errors.value.provincia = val.trim() === ''
})

watch(() => formStep2.value.departamento, (val) => {
    errors.value.departamento = val.trim() === ''
})
watch(() => formStep2.value.departamento, (val) => {
    if (val.trim() !== '') {
        const departamento = ubigeoData.value.find(d => d.departamento.toLowerCase() === val.toLowerCase());
        if (departamento) {
            formStep2.value.provincia = departamento.provincias[0].nombre;
            formStep2.value.distrito = departamento.provincias[0].distritos[0].nombre;
        } else {
            formStep2.value.provincia = '';
            formStep2.value.distrito = '';
        }
    } else {
        formStep2.value.provincia = '';
        formStep2.value.distrito = '';
    }
});

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
    box-sizing: border-box;
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
    margin: 10px 0;
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

.form-group:last-child {
    margin-bottom: 0;
}

.form-group label {
    display: block;
    color: #444;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
}

small.error-msg {
    color: red;
    font-size: 10.5px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.form-group input {
    width: 100%;
    padding: 6px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 1rem;
}

.checkbox-group {
    margin: 12.5px 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #555;
}

.checkbox-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow-y: scroll;
}

.invalid {
    border-color: red;
}

.error-msg {
    color: red;
    font-size: 0.75rem;
    margin-top: 2px;
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

.caption {
    font-size: 0.9rem;
    margin-bottom: 1rem;
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

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 15px;
}

/* Que los elementos ocupen una sola columna si es necesario */
.form-grid .form-group,
.form-grid .checkbox-group {
    width: 100%;
}

.form-group {
    justify-content: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

@media (max-width: 800px) {
    .modal-content {
        width: 90%;
        max-width: none;
        border-radius: 10px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
    }

    .form-container {
        padding: 10px 25px;
        /* max-height: 600px; */
        overflow-y: auto;
    }

    h1 {
        font-size: 30px;
    }

    .title {
        font-size: 18px;
        padding: 10px;

    }

    .title-data {
        font-size: 18px;
        margin-bottom: 4px;
    }


    .form-group input {
        font-size: 0.95rem;
    }

    .button-container button {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
        font-family: 'BreeCFApp', sans-serif;
    }

    .checkbox-group {
        gap: 0.25rem;
        font-size: 0.85rem;
        padding: 0px 0 5px;
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