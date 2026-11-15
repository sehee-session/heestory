import type { SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react-router';

export const supabaseContext = createContext<SupabaseClient | null>(null);
