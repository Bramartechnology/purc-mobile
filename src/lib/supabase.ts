/**
 * Cliente de Supabase para la App Móvil (purc-mobile)
 *
 * Este archivo crea la conexión entre la app y Supabase.
 * Se importa así: import { supabase } from '@/lib/supabase';
 *
 * Usa AsyncStorage para guardar la sesión del usuario
 * (así no tiene que loguearse cada vez que abre la app).
 */
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ ERROR: Faltan las variables de entorno de Supabase. ' +
    'Revisá que el archivo .env tenga EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // AsyncStorage guarda la sesión del usuario en el teléfono
    storage: AsyncStorage,
    // Refresca automáticamente el token cuando expira
    autoRefreshToken: true,
    // Guarda la sesión para que persista al cerrar la app
    persistSession: true,
    // No detectar sesión en la URL (eso es para web, no para móvil)
    detectSessionInUrl: false,
  },
});

console.log('✅ Supabase conectado:', supabaseUrl);
