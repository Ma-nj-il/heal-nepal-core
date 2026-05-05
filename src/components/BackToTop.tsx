import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
// import logo from "/logo-growfund.png?url";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-40 h-12 w-12 rounded-full bg-white shadow-elegant border border-brand-royal/20 grid place-items-center hover:scale-110 transition animate-pulse-glow"
    >
      {/* <img src={logo} alt="Top" className="h-7 w-7 object-contain" /> */}
      <ArrowUp/>
    </button>
  );
}
