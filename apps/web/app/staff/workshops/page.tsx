import type { Metadata } from "next";
import { WorkshopManager } from "@/components/staff/WorkshopManager";

export const metadata: Metadata = {
  title: "Workshop Survey Manager | Performance Rhythm",
  robots: { index: false, follow: false, nocache: true }
};

export default function StaffWorkshopsPage() {
  return (
    <div className="min-h-[75vh] bg-background px-5 py-14 sm:px-8 sm:py-20">
      <header className="mx-auto mb-10 max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Staff workspace</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-primary sm:text-5xl">Workshop Survey Manager</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Create a private workshop set, then share the pre- and post-session surveys or download presentation-ready QR codes.</p>
      </header>
      <WorkshopManager />
    </div>
  );
}
