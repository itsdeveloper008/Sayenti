"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const companySizes = [
  "50-199 employees",
  "200-999 employees",
  "1,000-4,999 employees",
  "5,000+ employees",
];

const painPoints = [
  "No 24/7 monitoring coverage",
  "Incident response too slow",
  "Cloud migration risk",
  "Connectivity / resilience gaps",
  "Audit / compliance pressure",
  "Other",
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  companySize: string;
  painPoint: string;
  message: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  companySize: "",
  painPoint: "",
  message: "",
};

function buildMailto(form: FormState) {
  const subject = `Risk Review request - ${form.company}`;
  const lines = [
    "New risk review request from the website.",
    "",
    `Name: ${form.name}`,
    `Company: ${form.company}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Company size: ${form.companySize}`,
    `Pain point: ${form.painPoint}`,
  ];
  if (form.message.trim()) {
    lines.push("", "Notes:", form.message.trim());
  }
  lines.push("", " - Sent from sayenti.co.uk/risk-review");

  const params = new URLSearchParams({
    subject,
    body: lines.join("\n"),
  });

  return `mailto:${siteConfig.email}?${params.toString()}`;
}

export function RiskReviewForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.companySize ||
      !form.painPoint
    ) {
      setError("Please complete all required fields.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid work email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    // No database - open the visitor's email client with a prefilled message.
    const href = buildMailto(form);
    window.location.href = href;

    window.setTimeout(() => {
      setStatus("success");
      setForm(initial);
    }, 400);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-foreground" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          Email ready to send
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your email app should open with the request filled in. Send it and a
          Sayenti specialist will reply within one business day. Prefer not to
          use mail? Call{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-medium text-foreground underline decoration-black/20 underline-offset-2 hover:decoration-black/50"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="outline"
            className="border-border"
            onClick={() => setStatus("idle")}
          >
            Edit details
          </Button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-9 max-w-full items-center gap-2 truncate rounded-full border border-black/10 px-4 text-sm font-medium text-foreground hover:bg-white/60"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{siteConfig.email}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="h-11 border-border bg-white"
            required
          />
        </Field>
        <Field label="Company" htmlFor="company" required>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="h-11 border-border bg-white"
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Work email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="h-11 border-border bg-white"
            required
          />
        </Field>
        <Field label="Phone" htmlFor="phone" required>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-11 border-border bg-white"
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company size" htmlFor="companySize" required>
          <Select
            value={form.companySize}
            onValueChange={(v) => update("companySize", v ?? "")}
          >
            <SelectTrigger
              id="companySize"
              className="h-11 w-full border-border bg-white"
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Current pain point" htmlFor="painPoint" required>
          <Select
            value={form.painPoint}
            onValueChange={(v) => update("painPoint", v ?? "")}
          >
            <SelectTrigger
              id="painPoint"
              className="h-11 w-full border-border bg-white"
            >
              <SelectValue placeholder="Select focus area" />
            </SelectTrigger>
            <SelectContent>
              {painPoints.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Anything else we should know?" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="border-border bg-white"
          placeholder="Optional context for the review"
        />
      </Field>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90 sm:w-auto sm:px-8"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Opening email…
          </>
        ) : (
          "Request Risk Review"
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        Opens your email app to message {siteConfig.email}. Nothing is stored on
        this website. Confidential. No obligation.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm text-muted-foreground">
        {label}
        {required && <span className="text-foreground"> *</span>}
      </Label>
      {children}
    </div>
  );
}
