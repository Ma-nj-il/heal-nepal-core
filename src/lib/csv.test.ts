import { describe, expect, it } from "vitest";
import { toCsv } from "./csv";
import { parsePolicy } from "@/components/PolicyContent";
import { usernameToEmail } from "./admin-auth";

describe("toCsv", () => {
  it("escapes quotes, commas and formula prefixes", () => {
    const out = toCsv([{ a: 'He said "hi", ok', b: "=SUM(A1)" }], ["a", "b"]);
    expect(out).toBe('a,b\r\n"He said ""hi"", ok",\'=SUM(A1)');
  });
});

describe("parsePolicy", () => {
  it("splits sections and bullets", () => {
    const s = parsePolicy("## One\nText\n- a\n- b\n## Two\nMore");
    expect(s.map((x) => x.title)).toEqual(["One", "Two"]);
    expect(s[0].blocks).toEqual(["Text", ["a", "b"]]);
  });
});

describe("usernameToEmail", () => {
  it("normalizes usernames", () => {
    expect(usernameToEmail("  User ")).toBe("user@growfund.local");
  });
});
