import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const DOMAIN = "growfund.local";
const roleSchema = z.enum(["super_admin", "admin", "staff"]);

async function assertSuperAdmin(supabase: { rpc: (fn: "is_super_admin", args: { _user_id: string }) => PromiseLike<{ data: unknown }> }, userId: string) {
  const { data } = await supabase.rpc("is_super_admin", { _user_id: userId });
  if (data !== true) throw new Response("Forbidden", { status: 403 });
}

export const createAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      username: z.string().trim().toLowerCase().regex(/^[a-z0-9._-]{3,32}$/, "3–32 letters, numbers, . _ -"),
      password: z.string().min(10, "Password must be at least 10 characters").max(72),
      role: roleSchema,
      display_name: z.string().trim().max(100).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase as never, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: `${data.username}@${DOMAIN}`,
      password: data.password,
      email_confirm: true,
    });
    if (error || !created.user) return { ok: false as const, error: error?.message?.includes("already") ? "Username already exists" : "Could not create user" };
    const uid = created.user.id;
    await supabaseAdmin.from("admin_profiles").insert({ user_id: uid, username: data.username, display_name: data.display_name || null });
    await supabaseAdmin.from("user_roles").insert({ user_id: uid, role: data.role });
    await supabaseAdmin.from("activity_logs").insert({ actor_id: context.userId, action: "admin_user.created", entity_type: "admin_user", entity_id: data.username, metadata: { role: data.role } });
    return { ok: true as const };
  });

export const updateAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      user_id: z.string().uuid(),
      role: roleSchema.optional(),
      is_active: z.boolean().optional(),
      password: z.string().min(10).max(72).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase as never, context.userId);
    if (data.user_id === context.userId && (data.role && data.role !== "super_admin" || data.is_active === false)) {
      return { ok: false as const, error: "You cannot demote or disable your own account" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.role) {
      await supabaseAdmin.from("user_roles").delete().eq("user_id", data.user_id).in("role", ["super_admin", "admin", "staff"]);
      await supabaseAdmin.from("user_roles").insert({ user_id: data.user_id, role: data.role });
    }
    if (data.is_active !== undefined) {
      await supabaseAdmin.from("admin_profiles").update({ is_active: data.is_active }).eq("user_id", data.user_id);
      await supabaseAdmin.auth.admin.updateUserById(data.user_id, { ban_duration: data.is_active ? "none" : "876000h" });
    }
    if (data.password) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(data.user_id, { password: data.password });
      if (error) return { ok: false as const, error: "Could not change password" };
    }
    await supabaseAdmin.from("activity_logs").insert({
      actor_id: context.userId, action: "admin_user.updated", entity_type: "admin_user", entity_id: data.user_id,
      metadata: { role: data.role ?? null, is_active: data.is_active ?? null, password_changed: !!data.password },
    });
    return { ok: true as const };
  });
