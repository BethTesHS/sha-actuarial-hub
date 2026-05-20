import { supabase } from "../supabaseClient";

export async function fetchMyProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,username,avatar_url,verification_status,role,created_at,updated_at")
    .eq("id", user.id)
    .maybeSingle();

  // If table/RLS isn't set up yet, don't hard-fail the whole app.
  if (error) {
    const msg = (error?.message || "").toLowerCase();
    if (msg.includes("does not exist") || msg.includes("relation") || msg.includes("permission")) {
      return null;
    }
    throw error;
  }

  return data || null;
}

export function profileToAppUser(profile, fallbackUser) {
  if (!profile && fallbackUser) return fallbackUser;
  if (!profile) return null;

  return {
    ...fallbackUser,
    id: profile.id,
    email: profile.email || fallbackUser?.email,
    name: profile.full_name || fallbackUser?.name || profile.email?.split("@")?.[0],
    username: profile.username || fallbackUser?.username || profile.email?.split("@")?.[0],
    profilePic: profile.avatar_url || fallbackUser?.profilePic || null,
    verificationStatus: profile.verification_status || "approved",
    role: profile.role || fallbackUser?.role || "trainee",
  };
}

