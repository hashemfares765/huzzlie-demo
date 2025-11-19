import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fhdfcwnlepltxfbqegib.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZGZjd25sZXBsdHhmYnFlZ2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTA3NDcsImV4cCI6MjA3ODc4Njc0N30.p19anoq1eBGhiTYEVYMC7kM5UG41Q6RJuhJ6bZT8yr8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
