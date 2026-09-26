"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildingTypes, contactMethods, contactSchema, type ContactInput } from "./contact-schema";

type FieldName = keyof ContactInput;

const labels: Partial<Record<FieldName, string>> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  role: "Role",
  country: "Country",
  buildingType: "Building type",
  buildingCount: "Number of buildings",
  annualEnergy: "Approximate annual energy use",
  bms: "Existing BMS or control system",
  goal: "What you are trying to improve",
  contactMethod: "Preferred contact method",
  phone: "Phone number",
};

const order: FieldName[] = ["name", "email", "company", "role", "country", "buildingType", "buildingCount", "annualEnergy", "bms", "goal", "contactMethod", "phone"];

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <span aria-hidden className="font-mono">!</span>
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [summary, setSummary] = useState<FieldName[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: { contactMethod: "Email" },
  });

  // Move focus to the error summary whenever a submission fails validation.
  useEffect(() => {
    if (summary.length) summaryRef.current?.focus();
  }, [summary]);

  useEffect(() => {
    if (status === "sent") confirmRef.current?.focus();
  }, [status]);

  const method = watch("contactMethod");
  // Keep the summary in step with live validation as fields are corrected.
  const open = summary.filter((k) => errors[k]);

  const a11y = (name: FieldName, hintId?: string) => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [hintId, errors[name] ? `${name}-error` : undefined].filter(Boolean).join(" ") || undefined,
  });

  const onInvalid = (errs: FieldErrors<ContactInput>) => {
    const failing = order.filter((k) => errs[k]);
    setSummary(failing);
  };

  const onValid = async (data: ContactInput) => {
    setSummary([]);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message || "Something went wrong.");
      setStatus("sent");
      reset({ contactMethod: "Email" });
    } catch (e) {
      setServerMessage(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div ref={confirmRef} tabIndex={-1} role="status" className="border-t-2 border-moss-ink bg-paper-white px-6 py-10 focus:outline-none sm:px-10">
        <p className="label text-moss-ink">● Building context sent</p>
        <h2 className="h-sub mt-4">Thank you. We have your details.</h2>
        <p className="mt-4 max-w-prose text-forest/85">
          Someone from GridSync will read what you have sent and contact you using your preferred method. If anything changes in
          the meantime, you can write to <a className="link" href="mailto:hello@gridsync.build">hello@gridsync.build</a>.
        </p>
        <button type="button" className="btn-secondary mt-8" onClick={() => setStatus("idle")}>
          Send details for another building
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate aria-describedby="form-intro" className="space-y-10">
      <p id="form-intro" className="text-[15px] text-mineral-ink">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {open.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="error-summary-title" className="border-l-2 border-[#9b2c1f] bg-paper-white px-5 py-4 focus:outline-none">
          <h2 id="error-summary-title" className="text-[16px] font-medium text-[#9b2c1f]">
            {open.length === 1 ? "One field needs attention" : `${open.length} fields need attention`}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">
            {open.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="text-[#9b2c1f] underline underline-offset-4">
                  {labels[k]}: {errors[k]?.message as string}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="space-y-6">
        <legend className="label mb-2">About you</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">Name *</label>
            <input className="field" autoComplete="name" {...a11y("name")} {...register("name")} />
            <ErrorText id="name-error" message={errors.name?.message} />
          </div>
          <div>
            <label htmlFor="email" className="field-label">Work email *</label>
            <input className="field" type="email" autoComplete="email" {...a11y("email")} {...register("email")} />
            <ErrorText id="email-error" message={errors.email?.message} />
          </div>
          <div>
            <label htmlFor="company" className="field-label">Company *</label>
            <input className="field" autoComplete="organization" {...a11y("company")} {...register("company")} />
            <ErrorText id="company-error" message={errors.company?.message} />
          </div>
          <div>
            <label htmlFor="role" className="field-label">Role</label>
            <input className="field" autoComplete="organization-title" placeholder="e.g. Facilities manager" {...a11y("role")} {...register("role")} />
            <ErrorText id="role-error" message={errors.role?.message} />
          </div>
          <div>
            <label htmlFor="country" className="field-label">Country *</label>
            <input className="field" autoComplete="country-name" {...a11y("country")} {...register("country")} />
            <ErrorText id="country-error" message={errors.country?.message} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-forest/15 pt-8">
        <legend className="label mb-2 bg-paper pr-3">About the building</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="buildingType" className="field-label">Building type *</label>
            <select className="field" defaultValue="" {...a11y("buildingType")} {...register("buildingType")}>
              <option value="" disabled>
                Choose one
              </option>
              {buildingTypes.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ErrorText id="buildingType-error" message={errors.buildingType?.message} />
          </div>
          <div>
            <label htmlFor="buildingCount" className="field-label">Number of buildings *</label>
            <input className="field" inputMode="numeric" {...a11y("buildingCount")} {...register("buildingCount")} />
            <ErrorText id="buildingCount-error" message={errors.buildingCount?.message} />
          </div>
          <div>
            <label htmlFor="annualEnergy" className="field-label">Approximate annual energy use</label>
            <input className="field" placeholder="e.g. 2.4 GWh" {...a11y("annualEnergy", "annualEnergy-hint")} {...register("annualEnergy")} />
            <p id="annualEnergy-hint" className="field-hint">Optional. Any unit is fine—kWh, MWh or GWh per year. A rough figure is enough.</p>
            <ErrorText id="annualEnergy-error" message={errors.annualEnergy?.message} />
          </div>
          <div>
            <label htmlFor="bms" className="field-label">Existing BMS or control system</label>
            <input className="field" placeholder="Manufacturer, version, or “not sure”" {...a11y("bms", "bms-hint")} {...register("bms")} />
            <p id="bms-hint" className="field-hint">Optional. It helps us prepare the right questions.</p>
            <ErrorText id="bms-error" message={errors.bms?.message} />
          </div>
        </div>
        <div>
          <label htmlFor="goal" className="field-label">What are you trying to improve? *</label>
          <textarea
            className="field min-h-[9rem] resize-y"
            {...a11y("goal", "goal-hint")}
            {...register("goal")}
          />
          <p id="goal-hint" className="field-hint">For example: peak charges, demand-response participation, EV charging schedules, or visibility across sites.</p>
          <ErrorText id="goal-error" message={errors.goal?.message} />
        </div>
      </fieldset>

      <fieldset className="border-t border-forest/15 pt-8" aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}>
        <legend className="field-label">Preferred contact method *</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {contactMethods.map((m) => (
            <label key={m} className="inline-flex cursor-pointer items-center gap-2.5 rounded-[3px] border border-forest/25 bg-paper-white px-4 py-2.5 text-[15px] has-[:checked]:border-forest">
              <input type="radio" value={m} className="h-4 w-4 accent-[#9A5530]" {...register("contactMethod")} />
              {m}
            </label>
          ))}
        </div>
        <ErrorText id="contactMethod-error" message={errors.contactMethod?.message} />
        {method === "Phone" && (
          <div className="mt-6 max-w-sm">
            <label htmlFor="phone" className="field-label">Phone number *</label>
            <input className="field" type="tel" autoComplete="tel" {...a11y("phone")} {...register("phone")} />
            <ErrorText id="phone-error" message={errors.phone?.message} />
          </div>
        )}
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-[#9b2c1f] bg-paper-white px-4 py-3 text-[15px] text-[#9b2c1f]">
          {serverMessage} Please try again, or email <a className="underline" href="mailto:hello@gridsync.build">hello@gridsync.build</a>.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 border-t border-forest/15 pt-8">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send building context"}
        </button>
        <p className="text-[14px] text-mineral-ink">
          We use these details only to reply. See the <a className="link" href="/privacy">privacy notice</a>.
        </p>
      </div>
    </form>
  );
}
