import { writable } from "svelte/store";
import { supabase } from "@/supabase";

export const user = writable(null);

// load session on init
supabase.auth.getSession().then(({ data: { session } }) => {
  user.set(session?.user ?? null);

  if (session?.user) {
    console.log("📥 Initial session loaded:", session.user);
  }
});
// react to login/logout/refresh events
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event);
  
  if (session) {
    user.set(session.user);
  } else {
    user.set(null);
  }
  
  // handle different cases
  if (event === "TOKEN_REFRESHED") {
    console.log("🔄 Access token refreshed");
  }
  
  if (event === "SIGNED_OUT" || event === "USER_DELETED") {
    console.log("🚪 Signed out or account deleted");
  }
});
