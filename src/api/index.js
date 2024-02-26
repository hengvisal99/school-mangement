import axios from '@/utils/axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabaseConfig = {
  baseURL: supabaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseAnonKey
  }
};

const supabase = axios.create(supabaseConfig);

export default supabase;
