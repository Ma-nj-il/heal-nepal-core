import { supabase } from "@/integrations/supabase/client";

export type AdminRole = "super_admin" | "admin" | "staff";
export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  staff: "Staff",
};
const RANK: Record<AdminRole, number> = { staff: 1, admin: 2, super_admin: 3 };

/** Usernames map to an internal sign-in address; it never receives email. */
export const ADMIN_EMAIL_DOMAIN = "growfund.local";
export function normalizeUsername(u: string) {
  return u.trim().toLowerCase();
}
export function usernameToEmail(u: string) {
  return `${normalizeUsername(u)}@${ADMIN_EMAIL_DOMAIN}`;
}
export const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;

export interface AdminSession {
  userId: string;
  username: string;
  role: AdminRole;
}

export function hasAtLeast(role: AdminRole, min: AdminRole) {
  return RANK[role] >= RANK[min];
}

/** Returns the signed-in admin with their highest role, or null. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return null;
  const [{ data: roles }, { data: profile }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id),
    supabase.from("admin_profiles").select("username,is_active").eq("user_id", user.id).maybeSingle(),
  ]);
  const staffRoles = (roles ?? [])
    .map((r) => r.role as string)
    .filter((r): r is AdminRole => r in RANK);
  if (!staffRoles.length || profile?.is_active === false) return null;
  const role = staffRoles.sort((a, b) => RANK[b] - RANK[a])[0];
  return { userId: user.id, username: profile?.username ?? user.email?.split("@")[0] ?? "admin", role };
}

export async function logActivity(action: string, entity_type?: string, entity_id?: string, metadata: Record<string, unknown> = {}) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;
  await supabase.from("activity_logs").insert({
    actor_id: data.user.id,
    action,
    entity_type: entity_type ?? null,
    entity_id: entity_id ?? null,
    metadata: metadata as never,
  });
}
