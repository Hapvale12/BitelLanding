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

                <h2 class="title">Plan Fibra {{ props.plan?.gb_alta_velocidad || 'No especificado' }} </h2>
                <div class="form-container">
                    <h1>¡Cámbiate a Bitel!</h1>
                    <p class="caption">Descubre la velocidad imparable de nuestra fibra óptica de última generación.</p>

                    <div class="progress-bar">
                        <div class="progress" :style="{ width: step === 1 ? '50%' : '100%' }">
                            Paso {{ step }} de 2
                        </div>
                    </div>

                    <h2 class="title-data">{{ step == 1 ? 'Ingresa tus Datos' : 'Ubicación para instalación' }}</h2>
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
                                <select id="departamento" v-model="formStep2.departamento"
                                    @change="onDepartamentoChange" class="nice-select" required>
                                    <option disabled value="">Seleccione un departamento</option>
                                    <option v-for="dep in ubigeo.departamentos" :key="dep.id_ubigeo" :value="dep">
                                        {{ dep.nombre_ubigeo }}
                                    </option>
                                </select>
                                <small v-if="errors.departamento" class="error-msg">{{ getErrorMessage('departamento')
                                    }}</small>
                            </div>

                            <div class="form-group">
                                <label for="provincia">{{ getLabel('provincia') }}</label>
                                <select id="provincia" v-model="formStep2.provincia" @change="onProvinciaChange"
                                    class="nice-select" required>
                                    <option disabled value="">Seleccione una provincia</option>
                                    <option v-for="prov in provinciasFiltradas" :key="prov.id_ubigeo" :value="prov">
                                        {{ prov.nombre_ubigeo }}
                                    </option>
                                </select>
                                <small v-if="errors.provincia" class="error-msg">{{ getErrorMessage('provincia')
                                    }}</small>
                            </div>

                            <div class="form-group">
                                <label for="distrito">{{ getLabel('distrito') }}</label>
                                <select id="distrito" v-model="formStep2.distrito" @change="onDistritoChange"
                                    class="nice-select" required>
                                    <option disabled value="">Seleccione un distrito</option>
                                    <option v-for="distr in distritosFiltrados" :key="distr.id_ubigeo" :value="distr">
                                        {{ distr.nombre_ubigeo }}
                                    </option>
                                </select>
                                <small v-if="errors.distrito" class="error-msg">{{ getErrorMessage('distrito')
                                    }}</small>
                            </div>


                            <!-- Solo reCAPTCHA v2 -->
                            <div class="form-group" v-if="step === 2">
                                <div class="g-recaptcha" data-sitekey="6LdFs08rAAAAAKuYgSm5bIuhpCkvarQkTa8zLxR4"></div>
                                <small v-if="errors.recaptcha" class="error-msg">Por favor completa el
                                    reCAPTCHA*</small>
                            </div>
                        </div>

                        <div class="checkbox-group" v-if="step === 1">
                            <input type="checkbox" id="autorizo" v-model="formStep1.autorizo"
                                :class="{ invalid: errors.autorizo }" />
                            <div class="checkbox-label">
                                <label for="autorizo">Autorizo el uso de mis datos personales.</label>
                                <small v-if="errors.autorizo && !formStep1.autorizo" class="error-msg"> {{
                                    getErrorMessage('autorizo') }}</small>
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

    <transition name="fade-zoom">
        <div v-if="showSuccessModal" class="modal-overlay success">
            <div class="modal-box">
                <div class="modal-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                        <path d="M16 8l-6.5 7L8 12.5" stroke="#fff" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <h2 class="modal-title">¡Enviado con éxito!</h2>
                <p class="modal-text">Tus datos han sido registrados correctamente. Muy pronto nos comunicaremos
                    contigo.</p>
                <button @click="closeSuccessModal" class="modal-button">Cerrar</button>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import ubigeo from '../assets/ubigeo.js';

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
    emit('update:modelValue', false)
    step.value = 1

    formStep1.value = {
        plan: '',
        dni: '',
        telefono: '',
        nombre: '',
        apellido: '',
        correo: '',
        autorizo: false,
    }
    formStep2.value = {
        departamento: '',
        provincia: '',
        distrito: '',
    }

    // Resetear errores
    errors.value = {
        dni: false,
        telefono: false,
        nombre: false,
        apellido: false,
        correo: false,
        autorizo: false,

        // Paso 2
        recaptcha: false,
        distrito: false,
        provincia: false,
        departamento: false
    }
}

const step = ref(1)
const showSuccessModal = ref(false)

function mostrarConfirmacion() {
    showSuccessModal.value = true
    setTimeout(() => {
        showSuccessModal.value = false
        close() // También cierra el modal principal
    }, 3000)
}

function closeSuccessModal() {
    showSuccessModal.value = false
    close()
}
// Datos del formulario

const formStep1 = ref({
    plan: '',
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
    departamento: ''
})

const errors = ref({
    dni: false,
    telefono: false,
    nombre: false,
    apellido: false,
    correo: false,
    autorizo: false,

    // Paso 2
    recaptcha: false,
    distrito: false,
    provincia: false,
    departamento: false
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
        dni: 'DNI inválido*',
        telefono: 'Teléfono inválido*',
        nombre: 'Nombre inválido*',
        apellido: 'Apellido inválido*',
        correo: 'Correo electrónico inválido*',
        autorizo: 'Debes autorizar el uso de tus datos*',
        distrito: 'Debes seleccionar un distrito*',
        provincia: 'Debes seleccionar una provincia*',
        departamento: 'Debes seleccionar un departamento*',
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

function validarFormularioPaso2() {
    errors.value.departamento = !formStep2.value.departamento;
    errors.value.provincia = !formStep2.value.provincia;
    errors.value.distrito = !formStep2.value.distrito;

    return !Object.values(errors.value).some(Boolean);
}

async function continuar() {

    if (step.value === 1) {
        formStep1.value.plan = props.plan.plan_nombre;
        if (validarFormularioPaso1()) {
            step.value = 2
        }
    } else {
        if (validarFormularioPaso2()) {

            const recaptchaResponse = grecaptcha.getResponse();
            errors.value.recaptcha = recaptchaResponse === '';
            if (errors.value.recaptcha) return;

            formStep2.value.departamento = formStep2.value.departamento.nombre_ubigeo || '';
            formStep2.value.provincia = formStep2.value.provincia.nombre_ubigeo || '';
            formStep2.value.distrito = formStep2.value.distrito.nombre_ubigeo || '';

            const datosFinales = {
                ...formStep1.value,
                ...formStep2.value
            };

            fetch('https://playful-amusement-d45dfce0db.strapiapp.com/api/customer/nuevoCliente', {  // Cambia URL si es necesario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFinales)
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error en la solicitud');
                    return response.json();
                })
                .then(json => {
                })
                .catch(error => {
                });

            // Mostrar modal de éxito
            mostrarConfirmacion()

            // Cerrar modal principal después de un tiempo
            setTimeout(() => {
                close()
            }, 3000)
        }
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

watch(() => step.value, async (newStep) => {
    if (newStep === 2) {
        await nextTick()
        if (window.grecaptcha && window.grecaptcha.render) {
            const recaptchaElement = document.querySelector('.g-recaptcha')
            if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
                window.grecaptcha.render(recaptchaElement, {
                    sitekey: '6LdFs08rAAAAAKuYgSm5bIuhpCkvarQkTa8zLxR4',
                })
            }
        }
    }
})


//Step 2: Cambiar provincia al seleccionar departamento
function onDepartamentoChange() {
    formStep2.value.departamento = formStep2.value.departamento;
    formStep2.value.provincia = '';
    formStep2.value.distrito = '';
}

function onProvinciaChange() {
    formStep2.value.provincia = formStep2.value.provincia;
    formStep2.value.distrito = '';
}

function onDistritoChange() {
    formStep2.value.distrito = formStep2.value.distrito;
}

const provinciasFiltradas = computed(() => {
    // Filtrar provincias según el departamento seleccionado
    const provincias = ref([]);
    provincias.value = ubigeo.provincias[formStep2.value.departamento.id_ubigeo] || [];
    return provincias.value;
});

const distritosFiltrados = computed(() => {
    // Filtrar distritos según la provincia seleccionada
    const distritos = ref([]);
    distritos.value = ubigeo.distritos[formStep2.value.provincia.id_ubigeo] || [];
    return distritos.value;
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

.g-recaptcha {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
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
    font-family: 'BreeCFApp', sans-serif;
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
    font-family: 'BreeCFApp', sans-serif;
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

.nice-select {
    width: 100%;
    padding: 0.6em;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-size: 1em;
    color: #333;
    cursor: pointer;
}

.nice-select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Modal Success */

.modal-overlay.success {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-box {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    animation: popIn 0.35s ease-out;
}

.modal-icon {
    margin-bottom: 1rem;
    animation: bounce 0.6s ease;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    transition: transform 0.2s;
}

.close-btn:hover {
    transform: rotate(90deg);
}

.modal-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
}

.modal-text {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.modal-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.modal-button:hover {
    background-color: #43a047;
}

/* Animaciones */
@keyframes popIn {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes bounce {
    0% {
        transform: scale(0.8);
    }

    60% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
    opacity: 0;
    transform: scale(1.1);
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