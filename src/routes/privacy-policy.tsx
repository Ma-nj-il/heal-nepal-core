import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PolicyContent } from "@/components/PolicyContent";
import { getPublishedPolicy } from "@/lib/privacy.functions";
import { DEFAULT_POLICY_CONTENT, DEFAULT_POLICY_TITLE, DEFAULT_POLICY_VERSION } from "@/lib/default-privacy-policy";

export const Route = createFileRoute("/privacy-policy")({
  loader: () => getPublishedPolicy(),
  head: () => ({
    meta: [
      { title: "Privacy Policy — Growfund Pvt. Ltd." },
      { name: "description", content: "How Growfund Pvt. Ltd. collects, uses and protects information submitted through its website and Nuronix inquiries." },
      { property: "og:title", content: "Privacy Policy — Growfund" },
      { property: "og:description", content: "How Growfund handles information from website inquiries and demo requests." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const policy = Route.useLoaderData();
  const title = policy?.title ?? DEFAULT_POLICY_TITLE;
  const version = policy?.version ?? DEFAULT_POLICY_VERSION;
  const content = policy?.content ?? DEFAULT_POLICY_CONTENT;
  return (
    <>
      <section className="bg-brand-soft-gradient border-b">
        <div className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-4xl text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center text-primary-foreground"><ShieldCheck className="h-6 w-6" /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-deep">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Version {version}
            {policy?.published_at ? ` · Published ${new Date(policy.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}` : " · Draft — pending review"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <PolicyContent content={content} />
      </div>
    </>
  );
}
