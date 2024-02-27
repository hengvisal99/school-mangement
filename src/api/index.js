
import { createClient } from '@supabase/supabase-js'
import store from "@/store/store";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseJwtToken = store.getters.getToken
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  headers: {
    Authorization: `Bearer ${supabaseJwtToken}`,
  },
})


export default supabase