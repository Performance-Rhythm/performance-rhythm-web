import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Sign In | Performance Rhythm",
  robots: { index: false, follow: false, nocache: true }
};

export default async function StaffLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const query = await searchParams;
  const next = query.next?.startsWith("/staff/") ? query.next : "/staff/workshops";

  return (
    <div className="min-h-[72vh] bg-background px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-[2rem] border border-primary/10 bg-white p-7 shadow-medium sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Staff workspace</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-primary">Sign in</h1>
        <p className="mt-3 leading-7 text-muted">Enter your Performance Rhythm staff credentials to manage workshop surveys.</p>
        <form action="/api/staff/login" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <label className="block text-sm font-bold text-primary">
            Username
            <input name="username" autoComplete="username" required className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary shadow-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
          <label className="block text-sm font-bold text-primary">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary shadow-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
          {query.error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">That username or password was not recognized.</p> : null}
          <button className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-bold text-white shadow-md transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
