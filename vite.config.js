import { defineConfig } from 'vite';
import { resolve } from 'path';

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
        
        // Adaugă aici restul paginilor pe măsură ce le faci:
        // bucatarie: resolve(__dirname, 'bucatarie/bucatarie.html'),
      },
    },
  },
});