/** Renders policy text safely (no HTML injection). "## " = heading, "- " = bullet. */
export function parsePolicy(content: string) {
  const sections: { id: string; title: string; blocks: (string | string[])[] }[] = [];
  let cur: (typeof sections)[number] | null = null;
  let list: string[] | null = null;
  for (const raw of content.split("\n")) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      cur = { id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), title, blocks: [] };
      sections.push(cur);
      list = null;
      continue;
    }
    if (!cur) { cur = { id: "intro", title: "", blocks: [] }; sections.push(cur); }
    if (line.startsWith("- ")) {
      if (!list) { list = []; cur.blocks.push(list); }
      list.push(line.slice(2));
    } else if (line.trim()) {
      list = null;
      cur.blocks.push(line);
    } else list = null;
  }
  return sections;
}

function Text({ t }: { t: string }) {
  const parts = t.split(/(\[CONFIRM:[^\]]*\])/g);
  return <>{parts.map((p, i) => p.startsWith("[CONFIRM:")
    ? <mark key={i} className="rounded bg-brand-yellow/30 px-1 text-brand-deep">{p}</mark>
    : <span key={i}>{p}</span>)}</>;
}

export function PolicyContent({ content, showToc = true }: { content: string; showToc?: boolean }) {
  const sections = parsePolicy(content);
  const titled = sections.filter((s) => s.title);
  return (
    <div className="grid lg:grid-cols-4 gap-10">
      {showToc && (
        <nav className="lg:col-span-1 lg:sticky lg:top-24 self-start rounded-2xl border bg-brand-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-royal mb-3">Contents</p>
          <ol className="space-y-1.5 text-sm list-decimal list-inside">
            {titled.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-brand-deep hover:text-brand-royal">{s.title}</a></li>)}
          </ol>
        </nav>
      )}
      <article className={showToc ? "lg:col-span-3 space-y-10" : "space-y-8"}>
        {sections.map((s, idx) => (
          <section key={s.id + idx} id={s.id} className="scroll-mt-24">
            {s.title && <h2 className="text-xl md:text-2xl font-bold text-brand-deep mb-3">{titled.indexOf(s) + 1}. {s.title}</h2>}
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              {s.blocks.map((b, i) => Array.isArray(b)
                ? <ul key={i} className="list-disc pl-6 space-y-1">{b.map((li, j) => <li key={j}><Text t={li} /></li>)}</ul>
                : <p key={i}><Text t={b} /></p>)}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}
