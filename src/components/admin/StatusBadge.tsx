import { STATUS_LABELS, type SubmissionStatus } from "@/lib/submissions";

const STYLES: Record<SubmissionStatus, string> = {
  new: "bg-brand-royal/10 text-brand-royal",
  in_progress: "bg-brand-yellow/20 text-brand-deep",
  responded: "bg-brand-green/15 text-brand-green",
  closed: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${STYLES[status]}`}>{STATUS_LABELS[status]}</span>;
}
