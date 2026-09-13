"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Loader2 } from "lucide-react";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
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
  "50–199 employees",
  "200–999 employees",
  "1,000–4,999 employees",
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

export function RiskReviewForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
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

    try {
      if (!isFirebaseConfigured()) {
        // Dev / pre-Firebase fallback: accept locally so UX can be reviewed
        await new Promise((r) => setTimeout(r, 600));
        console.info("[risk-review] submission (Firebase not configured)", form);
        setStatus("success");
        setForm(initial);
        return;
      }

      const db = getDb();
      if (!db) throw new Error("Firestore unavailable");

      await addDoc(collection(db, "riskReviews"), {
        ...form,
        createdAt: serverTimestamp(),
        source: "website",
      });

      setStatus("success");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please call us or try again shortly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-foreground" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          Request received
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A Sayenti specialist will contact you within one business day to
          schedule your 30-minute risk review. All details are treated as
          confidential.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-border"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </Button>
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
            Submitting…
          </>
        ) : (
          "Request Risk Review"
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        Confidential. No obligation. We never share your details with third
        parties for marketing.
        {!isFirebaseConfigured() && (
          <span className="mt-1 block text-muted-foreground">
            Firebase env vars not set — submissions are logged locally in
            development.
          </span>
        )}
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
