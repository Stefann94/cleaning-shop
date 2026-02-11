import { createClient } from '@supabase/supabase-js';

// Vite citește variabilele din .env (local) sau din setările Vercel (online)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Creăm clientul
export const supaClient = createClient(supabaseUrl, supabaseKey);

// Atașăm clientul la obiectul window pentru a păstra compatibilitatea 
// cu scripturile tale actuale (baie.js) fără a le modifica pe toate acum
window.supaClient = supaClient;

console.log("Conexiune Supabase configurată prin Vite!");