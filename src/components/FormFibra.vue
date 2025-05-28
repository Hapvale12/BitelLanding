<template>
    <div>
        <h2 class="title">Formulario Fibra - Plan: {{ plan?.name || 'Ninguno' }}</h2>
        <div class="modal-content">
            <div class="form-container">
                <h1>¡Cámbiate a Bitel!</h1>
                <p class="caption">Descubre la velocidad imparable de nuestra fibra óptica de última generación.</p>

                <div class="progress-bar">
                    <div class="progress" :style="{ width: '50%' }">Paso 1 de 2</div>
                </div>

                <h2 class="title-data">Ingresa tus Datos</h2>
                <form @submit.prevent="continuar">
                    <div class="form-group">
                        <label for="dni">DNI</label>
                        <input type="text" id="dni" v-model="form.dni" required :class="{ invalid: errors.dni }"
                            maxlength="8" pattern="^[0-9]{8}$" />
                        <small v-if="errors.dni" class="error-msg">DNI inválido. Debe tener 8 dígitos numéricos.</small>
                    </div>

                    <div class="form-group">
                        <label for="telefono">Número de contacto</label>
                        <input type="tel" id="telefono" v-model="form.telefono" required
                            :class="{ invalid: errors.telefono }" pattern="^(9\d{8}|0\d{7,8})$" maxlength="9" />
                        <small v-if="errors.telefono" class="error-msg">
                            Teléfono inválido. Debe ser 9 dígitos para móvil empezando en 9 o fijo con código de área.
                        </small>
                    </div>

                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" v-model="form.nombre" required
                            :class="{ invalid: errors.nombre }" pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$" />
                        <small v-if="errors.nombre" class="error-msg">Nombre inválido. Solo letras, espacios y
                            guiones.</small>
                    </div>

                    <div class="form-group">
                        <label for="apellido">Apellido</label>
                        <input type="text" id="apellido" v-model="form.apellido" required
                            :class="{ invalid: errors.apellido }" pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$" />
                        <small v-if="errors.apellido" class="error-msg">Apellido inválido. Solo letras, espacios y
                            guiones.</small>
                    </div>

                    <div class="form-group">
                        <label for="correo">Correo electrónico</label>
                        <input type="email" id="correo" v-model="form.correo" required
                            :class="{ invalid: errors.correo }" />
                        <small v-if="errors.correo" class="error-msg">Correo electrónico inválido.</small>
                    </div>

                    <div class="checkbox-group">
                        <input type="checkbox" id="autorizo" v-model="form.autorizo" />
                        <label for="autorizo">Autorizo el uso de mis datos personales.</label>
                    </div>

                    <div class="button-container">
                        <button type="submit">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    dni: '',
    telefono: '',
    nombre: '',
    apellido: '',
    correo: '',
    autorizo: false,
});

const errors = ref({
    dni: false,
    telefono: false,
    nombre: false,
    apellido: false,
    correo: false,
});

function validarDNI(dni) {
    return /^[0-9]{8}$/.test(dni);
}

function validarTelefono(tel) {
    // Valida móviles que empiezan con 9 y 8 dígitos más, o fijos (0 + 7 u 8 dígitos)
    return /^(9\d{8}|0\d{9})$/.test(tel);
}

function validarNombreApellido(text) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/.test(text);
}

function validarCorreo(email) {
    // Validación simple de correo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function continuar() {
    errors.value.dni = !validarDNI(form.value.dni);
    errors.value.telefono = !validarTelefono(form.value.telefono);
    errors.value.nombre = !validarNombreApellido(form.value.nombre);
    errors.value.apellido = !validarNombreApellido(form.value.apellido);
    errors.value.correo = !validarCorreo(form.value.correo);

    if (Object.values(errors.value).some((e) => e)) {
        alert('Por favor, corrige los errores en el formulario.');
        return;
    }

    if (!form.value.autorizo) {
        alert('Debes autorizar el uso de tus datos personales.');
        return;
    }

    alert('Formulario enviado correctamente.\n' + JSON.stringify(form.value, null, 2));
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
    height: 24px;
    margin-bottom: 1.5rem;
}

.progress {
    background-color: #fdf100;
    color: #494949;
    height: 100%;
    text-align: center;
    line-height: 24px;
    font-size: 0.9rem;
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
    margin-bottom: 10px;
    font-size: 22px;
    color: #333;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    color: #444;
    font-size: 14px;
    text-align: left;
}

.form-group input {
    width: 100%;
    padding: 5px;
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

.button-container {
    text-align: center;
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

.modal-content {
    background: white;
    padding: 15px 30px;
    border-radius: 10px;
    width: 100%;
    text-align: center;
}


.invalid {
    border-color: red;
}

.error-msg {
    color: red;
    font-size: 0.75rem;
    margin-top: 2px;
}
</style>