-- Role helpers
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','admin','staff'));
$$;
CREATE OR REPLACE FUNCTION public.is_manager(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','admin'));
$$;
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid), public.is_manager(uuid), public.is_super_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Admin profiles (username, display, status)
CREATE TABLE public.admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  email text,
  display_name text,
  is_active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.admin_profiles TO authenticated;
GRANT ALL ON public.admin_profiles TO service_role;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff view admin profiles" ON public.admin_profiles FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Own profile update" ON public.admin_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Submissions
CREATE SEQUENCE public.form_submission_ref_seq START 1001;
CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code text NOT NULL UNIQUE DEFAULT ('GF-' || nextval('public.form_submission_ref_seq')::text),
  form_type text NOT NULL CHECK (form_type IN ('contact','demo','requirements','product_inquiry')),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  organization text CHECK (organization IS NULL OR char_length(organization) <= 150),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 200),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  product text CHECK (product IS NULL OR char_length(product) <= 100),
  facility_type text CHECK (facility_type IS NULL OR char_length(facility_type) <= 100),
  province text CHECK (province IS NULL OR char_length(province) <= 50),
  requester_role text CHECK (requester_role IS NULL OR char_length(requester_role) <= 100),
  source_page text CHECK (source_page IS NULL OR char_length(source_page) <= 200),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','responded','closed')),
  assigned_to uuid,
  follow_up_date date,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX form_submissions_created_idx ON public.form_submissions (created_at DESC);
CREATE INDEX form_submissions_type_status_idx ON public.form_submissions (form_type, status);
CREATE INDEX form_submissions_email_idx ON public.form_submissions (lower(email));
GRANT SELECT, UPDATE ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO service_role;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff view submissions" ON public.form_submissions FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff update submissions" ON public.form_submissions FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Backfill legacy forms
INSERT INTO public.form_submissions (form_type, full_name, email, phone, organization, subject, message, province, requester_role, source_page, status, created_at)
SELECT 'contact', left(name,100), left(email,200), left(phone,30), left(organization,150), left(subject,200), left(message,2000), left(province,50), left(role,100), '/contact',
  CASE WHEN is_read THEN 'in_progress' ELSE 'new' END, created_at FROM public.contact_submissions;
INSERT INTO public.form_submissions (form_type, full_name, email, phone, organization, facility_type, message, source_page, status, created_at)
SELECT 'demo', left(name,100), left(email,200), left(phone,30), left(organization,150), left(facility_type,100), left(notes,2000), 'demo-dialog',
  CASE WHEN is_read THEN 'in_progress' ELSE 'new' END, created_at FROM public.demo_requests;
COMMENT ON TABLE public.contact_submissions IS 'DEPRECATED: replaced by form_submissions';
COMMENT ON TABLE public.demo_requests IS 'DEPRECATED: replaced by form_submissions';

-- Notes
CREATE TABLE public.submission_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES public.form_submissions(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX submission_notes_sub_idx ON public.submission_notes (submission_id, created_at);
GRANT SELECT, INSERT ON public.submission_notes TO authenticated;
GRANT ALL ON public.submission_notes TO service_role;
ALTER TABLE public.submission_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff view notes" ON public.submission_notes FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff add notes" ON public.submission_notes FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()) AND author_id = auth.uid());

-- Activity logs
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL CHECK (char_length(action) <= 100),
  entity_type text CHECK (entity_type IS NULL OR char_length(entity_type) <= 50),
  entity_id text CHECK (entity_id IS NULL OR char_length(entity_id) <= 100),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX activity_logs_created_idx ON public.activity_logs (created_at DESC);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Managers view logs" ON public.activity_logs FOR SELECT TO authenticated USING (public.is_manager(auth.uid()));
CREATE POLICY "Staff write own logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()) AND actor_id = auth.uid());

-- Privacy policy versions
CREATE TABLE public.privacy_policy_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL CHECK (char_length(version) BETWEEN 1 AND 30),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  content text NOT NULL CHECK (char_length(content) <= 100000),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_by uuid,
  published_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
CREATE INDEX ppv_published_idx ON public.privacy_policy_versions (status, published_at DESC);
GRANT SELECT ON public.privacy_policy_versions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.privacy_policy_versions TO authenticated;
GRANT ALL ON public.privacy_policy_versions TO service_role;
ALTER TABLE public.privacy_policy_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published policy" ON public.privacy_policy_versions FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Staff read all policies" ON public.privacy_policy_versions FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Managers create drafts" ON public.privacy_policy_versions FOR INSERT TO authenticated WITH CHECK (public.is_manager(auth.uid()) AND status = 'draft');
CREATE POLICY "Managers edit drafts" ON public.privacy_policy_versions FOR UPDATE TO authenticated USING (public.is_manager(auth.uid()) AND status = 'draft') WITH CHECK (public.is_manager(auth.uid()) AND status = 'draft');
CREATE POLICY "Managers delete drafts" ON public.privacy_policy_versions FOR DELETE TO authenticated USING (public.is_manager(auth.uid()) AND status = 'draft');

-- Settings (non-secret)
CREATE TABLE public.app_settings (
  key text PRIMARY KEY CHECK (char_length(key) <= 100),
  value jsonb NOT NULL,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read settings" ON public.app_settings FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Managers insert settings" ON public.app_settings FOR INSERT TO authenticated WITH CHECK (public.is_manager(auth.uid()));
CREATE POLICY "Managers update settings" ON public.app_settings FOR UPDATE TO authenticated USING (public.is_manager(auth.uid())) WITH CHECK (public.is_manager(auth.uid()));
INSERT INTO public.app_settings (key, value) VALUES
  ('notification_email', '""'::jsonb),
  ('submission_retention_days', '730'::jsonb),
  ('public_rate_limit_per_hour', '5'::jsonb);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER fs_touch BEFORE UPDATE ON public.form_submissions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER ppv_touch BEFORE UPDATE ON public.privacy_policy_versions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER ap_touch BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Audit submission changes
CREATE OR REPLACE FUNCTION public.log_submission_change() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE changes jsonb := '{}'::jsonb;
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN changes := changes || jsonb_build_object('status', jsonb_build_array(OLD.status, NEW.status)); END IF;
  IF NEW.assigned_to IS DISTINCT FROM OLD.assigned_to THEN changes := changes || jsonb_build_object('assigned_to', NEW.assigned_to); END IF;
  IF NEW.follow_up_date IS DISTINCT FROM OLD.follow_up_date THEN changes := changes || jsonb_build_object('follow_up_date', NEW.follow_up_date); END IF;
  IF (NEW.archived_at IS NULL) IS DISTINCT FROM (OLD.archived_at IS NULL) THEN changes := changes || jsonb_build_object('archived', NEW.archived_at IS NOT NULL); END IF;
  IF changes <> '{}'::jsonb THEN
    INSERT INTO public.activity_logs (actor_id, action, entity_type, entity_id, metadata)
    VALUES (auth.uid(), 'submission.updated', 'submission', NEW.ref_code, changes);
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER fs_audit AFTER UPDATE ON public.form_submissions FOR EACH ROW EXECUTE FUNCTION public.log_submission_change();

-- Public submission RPC: server-side validation + rate limiting
CREATE OR REPLACE FUNCTION public.submit_form(
  _form_type text, _full_name text, _email text, _phone text DEFAULT NULL, _organization text DEFAULT NULL,
  _subject text DEFAULT NULL, _message text DEFAULT NULL, _product text DEFAULT NULL, _facility_type text DEFAULT NULL,
  _province text DEFAULT NULL, _requester_role text DEFAULT NULL, _source_page text DEFAULT NULL, _website text DEFAULT NULL
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.form_submissions; recent int; lim int;
BEGIN
  IF coalesce(_website,'') <> '' THEN RAISE EXCEPTION 'Submission rejected' USING ERRCODE = 'P0001'; END IF;
  IF _form_type NOT IN ('contact','demo','requirements','product_inquiry') THEN RAISE EXCEPTION 'Invalid form type' USING ERRCODE='22023'; END IF;
  _full_name := btrim(coalesce(_full_name,'')); _email := lower(btrim(coalesce(_email,'')));
  IF char_length(_full_name) < 1 OR char_length(_full_name) > 100 THEN RAISE EXCEPTION 'Invalid name' USING ERRCODE='22023'; END IF;
  IF _email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR char_length(_email) > 200 THEN RAISE EXCEPTION 'Invalid email' USING ERRCODE='22023'; END IF;
  IF _form_type IN ('contact','requirements','product_inquiry') AND char_length(btrim(coalesce(_message,''))) < 10 THEN RAISE EXCEPTION 'Message too short' USING ERRCODE='22023'; END IF;
  SELECT coalesce((value)::text::int, 5) INTO lim FROM public.app_settings WHERE key = 'public_rate_limit_per_hour';
  SELECT count(*) INTO recent FROM public.form_submissions WHERE lower(email) = _email AND created_at > now() - interval '1 hour';
  IF recent >= coalesce(lim,5) THEN RAISE EXCEPTION 'Too many submissions. Please try again later.' USING ERRCODE='P0002'; END IF;
  INSERT INTO public.form_submissions (form_type, full_name, email, phone, organization, subject, message, product, facility_type, province, requester_role, source_page)
  VALUES (_form_type, _full_name, _email, nullif(btrim(coalesce(_phone,'')),''), nullif(btrim(coalesce(_organization,'')),''),
    nullif(btrim(coalesce(_subject,'')),''), nullif(btrim(coalesce(_message,'')),''), nullif(btrim(coalesce(_product,'')),''),
    nullif(btrim(coalesce(_facility_type,'')),''), nullif(btrim(coalesce(_province,'')),''), nullif(btrim(coalesce(_requester_role,'')),''),
    left(nullif(btrim(coalesce(_source_page,'')),''),200))
  RETURNING * INTO r;
  RETURN jsonb_build_object('ref_code', r.ref_code, 'created_at', r.created_at);
END; $$;
REVOKE ALL ON FUNCTION public.submit_form(text,text,text,text,text,text,text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_form(text,text,text,text,text,text,text,text,text,text,text,text,text) TO anon, authenticated;

-- Publish policy RPC
CREATE OR REPLACE FUNCTION public.publish_privacy_policy(_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v text;
BEGIN
  IF NOT public.is_manager(auth.uid()) THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  UPDATE public.privacy_policy_versions SET status='published', published_by=auth.uid(), published_at=now()
    WHERE id=_id AND status='draft' RETURNING version INTO v;
  IF v IS NULL THEN RAISE EXCEPTION 'Draft not found'; END IF;
  INSERT INTO public.activity_logs (actor_id, action, entity_type, entity_id, metadata)
  VALUES (auth.uid(), 'privacy_policy.published', 'privacy_policy', _id::text, jsonb_build_object('version', v));
END; $$;
REVOKE ALL ON FUNCTION public.publish_privacy_policy(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_privacy_policy(uuid) TO authenticated;

-- Record login
CREATE OR REPLACE FUNCTION public.record_admin_login() RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN RETURN; END IF;
  UPDATE public.admin_profiles SET last_login_at = now() WHERE user_id = auth.uid();
  INSERT INTO public.activity_logs (actor_id, action, entity_type) VALUES (auth.uid(), 'auth.login', 'admin_user');
END; $$;
REVOKE ALL ON FUNCTION public.record_admin_login() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_admin_login() TO authenticated;