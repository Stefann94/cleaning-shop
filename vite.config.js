import { defineConfig } from 'vite';
import { resolve } from 'path';
import { access } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        baie: resolve(__dirname, 'baie/baie.html'),
        login: resolve(__dirname, 'login/login.html'),
        bucatarie: resolve(__dirname, 'bucatarie/bucatarie.html'),
        pardoseli: resolve(__dirname, 'pardoseli/pardoseli.html'),
        rufe: resolve(__dirname, 'rufe/rufe.html'),
        igiena: resolve(__dirname, 'igiena/igiena.html'),
        accesorii: resolve(__dirname, 'accesorii/accesorii.html'),
        contact: resolve(__dirname, 'contact/contact.html'),
        checkout: resolve(__dirname, 'checkout/checkout.html')
        
        
      },
    },
  },
});