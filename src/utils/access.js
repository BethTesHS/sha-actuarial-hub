export function isSuperAdminUser(user) {
  if (!user) return false;
  // Role is derived from `public.profiles` (passed in as `user.role`), not JWT metadata.
  return user.role === "admin" || user.role === "superadmin";
}

export function isSupervisorUser(user) {
  if (!user) return false;
  // Role is derived from `public.profiles` (passed in as `user.role`), not JWT metadata.
  return user.role === "supervisor";
}
