import MethodPage from "@/components/marketing/MethodPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Method | Performance Rhythm",
  description: "Learn the four-step Performance Rhythm Method: Notice, Reset, Strengthen, Repeat. Science-based practices for nervous system regulation and sustainable performance."
};

export default function Page() {
  return <MethodPage />;
}
