import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <label className="block text-sm font-bold text-primary" htmlFor={id}>
      {label}
      <input
        id={id}
        className={`mt-2 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 ${className}`}
        {...props}
      />
    </label>
  );
}

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <label className="block text-sm font-bold text-primary" htmlFor={id}>
      {label}
      <textarea
        id={id}
        className={`mt-2 min-h-36 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 ${className}`}
        {...props}
      />
    </label>
  );
}
