export type FutureCompany = {
  id: string;
  name: string;
  slug: string;
  status: "active" | "paused" | "archived";
};
