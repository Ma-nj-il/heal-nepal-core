import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9771000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Growfund Support"
      title="Chat with Growfund Support"
      className="fixed bottom-6 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-elegant grid place-items-center hover:scale-110 transition"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
