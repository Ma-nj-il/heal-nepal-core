import { createStart } from "@tanstack/react-start";
import { attachBearer } from "@/lib/bearer-middleware";

export const startInstance = createStart(() => ({
  functionMiddleware: [attachBearer],
}));
