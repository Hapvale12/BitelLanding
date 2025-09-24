<template>
    <div class="floating-buttons">
      <a
        :href="`https://wa.me/${phone}`"
        class="button whatsapp"
        target="_blank"
        rel="noopener"
        title="Contáctanos por WhatsApp"
      >
        <svg class="icon" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M16 2.94A13.06 13.06 0 0 0 4.94 16a12.89 12.89 0 0 0 1.77 6.52L4 30l7.74-2.66a13.06 13.06 0 1 0 4.26-24.4ZM16 26.5a10.5 10.5 0 1 1 10.5-10.5A10.52 10.52 0 0 1 16 26.5Zm5.44-7.75c-.3-.15-1.75-.86-2.02-.96s-.47-.15-.67.15-.77.96-.94 1.16-.35.22-.65.07a8.59 8.59 0 0 1-2.52-1.54 9.51 9.51 0 0 1-1.75-2.17c-.18-.3 0-.46.13-.61s.3-.35.45-.52a2.12 2.12 0 0 0 .3-.5.55.55 0 0 0 0-.52c-.15-.15-.67-1.61-.91-2.2s-.48-.5-.67-.51h-.57a1.1 1.1 0 0 0-.8.37 3.34 3.34 0 0 0-1 2.47 5.84 5.84 0 0 0 1.23 2.73 13.37 13.37 0 0 0 5.3 4.72 6.24 6.24 0 0 0 3.84.8 3.19 3.19 0 0 0 2.1-1.51 2.61 2.61 0 0 0 .18-1.51c-.08-.14-.27-.21-.57-.36Z"
          />
        </svg>
      </a>
  
      <a
        :href="`tel:+npm ${phone}`"
        class="button phone"
        title="Llamar por teléfono"
      >
        <svg class="icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17.93 17.93 0 0 1 3 5a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1c0 1.21.2 2.42.57 3.54a1 1 0 0 1-.24 1.05l-2.2 2.2z"
          />
        </svg>
      </a>
    </div>
  </template>
  
  <script setup>
  defineProps({
    phone: {
      type: String,
      required: true,
      default: '51994992412'
    }
  })
  </script>
  
  <style scoped>
  .floating-buttons {
    position: fixed;
    bottom: 20px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 1000;
  }
  
  .button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease, background-color 0.3s ease;
    text-decoration: none;
  }
  
  .button:hover {
    transform: scale(1.05);
  }
  
  .whatsapp {
    background-color: #25d366;
  }
  
  .phone {
    background-color: #0a66c2;
  }
  
  .icon {
    width: 28px;
    height: 28px;
  }
  </style>
  