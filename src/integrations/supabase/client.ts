// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://synabhmsxsvsxkyzhfss.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bmFiaG1zeHN2c3hreXpoZnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjg2MjMsImV4cCI6MjA1Nzk0NDYyM30.jzCMXi4f7i6EAdABneTYc55oVI2bs8e5CVtnyWJ1rG0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);