import { supabase } from "@/integrations/supabase/client";

export type FormType = "contact" | "demo" | "requirements" | "product_inquiry";
export type SubmissionStatus = "new" | "in_progress" | "responded" | "closed";

export const FORM_TYPE_LABELS: Record<FormType, string> = {
  contact: "Contact Inquiry",
  demo: "Demo Request",
  requirements: "Requirements Discussion",
  product_inquiry: "Healthcare Solution Inquiry",
};

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  responded: "Responded",
  closed: "Closed",
};

export interface PublicSubmission {
  form_type: FormType;
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
  product?: string;
  facility_type?: string;
  province?: string;
  requester_role?: string;
  source_page?: string;
  /** Honeypot — must stay empty. */
  website?: string;
}

/**
 * Sends a public form submission. The database function validates input,
 * rate-limits by email, stores the record and returns its reference code.
 * Throws on any failure so callers never show a false success.
 */
export async function submitPublicForm(input: PublicSubmission): Promise<{ ref_code: string }> {
  const { data, error } = await supabase.rpc("submit_form", {
    _form_type: input.form_type,
    _full_name: input.full_name,
    _email: input.email,
    _phone: input.phone,
    _organization: input.organization,
    _subject: input.subject,
    _message: input.message,
    _product: input.product,
    _facility_type: input.facility_type,
    _province: input.province,
    _requester_role: input.requester_role,
    _source_page: input.source_page,
    _website: input.website,
  });
  if (error) {
    const msg = /Too many/i.test(error.message)
      ? "Too many submissions from this email. Please try again in an hour."
      : /Invalid|short/i.test(error.message)
        ? "Please check your details and try again."
        : "We couldn't save your message. Please try again.";
    throw new Error(msg);
  }
  const res = data as { ref_code?: string } | null;
  if (!res?.ref_code) throw new Error("We couldn't save your message. Please try again.");
  return { ref_code: res.ref_code };
}
