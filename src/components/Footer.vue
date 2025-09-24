<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-column">
                <h3>Horario de instalación</h3>
                <p>Lunes a Sábado de 9:00 a.m. a 6:00 p.m.</p>

                <h3>Contrato de Voz </h3>
                <p>
                    Contrato forzoso por el periodo de 6 meses.<br>
                    (instalación gratis y router de préstamo)
                </p>

                <h3>Método de Pago</h3>
                <p class="last-text">
                    El pago del servicio es <strong>por adelantado</strong>.<br>
                    El módem se brinda en comodato (préstamo).
                </p>
            </div>

            <div class="footer-column">
                <h3>Periodo de instalación</h3>
                <p>72 horas después del pago de la renta adelantada.</p>

                <h3>Contacto</h3>
                <p>Teléfono: <a href="tel:+51900375029">+51 994 992 412</a></p>
                <p>Correo: <a href="mailto:cambiate@cambiateabitel.com">cambiate@cambiateabitel.com</a></p>
            </div>
        </div>

        <div class="footer-bottom">
            Distribuidor Autorizado Bitel - Todos los derechos reservados © 2024
            <br>
            <br>
            <!-- button que redirija href="/politica-privacidad-bitel" -->
            <a class="link-button" href="/politica-privacidad-bitel" target="_blank"><button class="link-button">Terminos y condiciones de uso</button></a>
            - 
            <a class="link-button" href="/politica-privacidad-bitel" target="_blank"><button class="link-button">Política de Privacidad</button></a>
            <!-- <button @click="handleClick" class="link-button">
                Consideraciones y política de datos personales.
            </button> -->
        </div>

        <!-- Modal -->
        <!-- <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Política de Datos Personales</h2>
                    <button class="modal-close" @click="closeModal" aria-label="Cerrar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
                <iframe :src="pdfUrl" width="100%" height="500px" style="border: none"></iframe>
            </div>
        </div> -->
    </footer>
</template>

<script>
export default {
    name: 'FooterFibra',
    data() {
        return {
            // showModal: false,
            // pdfUrl: './politica_de_datos_bitel.pdf'
        };
    },
    methods: {
        // handleClick() {
        //     // Detectamos si el ancho es menor o igual a 768px (mobile)
        //     if (window.innerWidth <= 768) {
        //         // Abrir link en una pestaña nueva para móvil
        //         window.open(this.pdfUrl, '_blank');
        //     } else {
        //         // Mostrar modal para escritorio
        //         this.showModal = true;
        //     }
        // },
        // closeModal() {
        //     this.showModal = false;
        // }
    }
};
</script>

<style scoped>
.footer {
    background-color: #1e1e1e;
    color: white;
    font-family: Arial, sans-serif;
}

.footer-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 20px 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-column {
    flex: 1 1 300px;
}

.footer-column h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #ffcc00;
}

.footer-column p,
.footer-column ul {
    margin-top: 0.5rem;
    line-height: 1.5;
    font-size: 0.9rem;
}

.footer-column ul {
    padding-left: 1.2rem;
    list-style-type: disc;
}

.footer-column a {
    color: #ffcc00;
}

.footer-column a:hover {
    text-decoration: underline;
}

.footer-bottom {
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
    opacity: 1;
    background-color: rgb(109, 109, 109);
}

.link-button {
    background: none;
    border: none;
    color: #ffcc00;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: underline;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal-content {
    background: #fff;
    padding: 1rem;
    max-width: 90%;
    width: 700px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

.modal-header h2 {
    font-size: 1.25rem;
    margin: 0;
    color: #000;
}

.modal-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    transition: transform 0.2s;
}

.modal-close:hover {
    transform: rotate(90deg);
}

@media (max-width: 768px) {
    .footer-container {
        gap: 0;
        flex-direction: column;
        align-items: center;
    }

    .footer-column {
        flex: 1 1 100%;
        text-align: center;
    }

    .footer-bottom {
        font-size: 0.8rem;
    }

    .modal-content {
        width: 90%;
    }

    .last-text {
        margin-bottom: 0;
    }
}
</style>