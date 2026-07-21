import type { Metadata } from "next";
import { RouteDesk } from "./RouteDesk";

export const metadata: Metadata = {
  title: "Auntie AI: Blackwards Route Desk",
  description: "Turn the visible terms of an opportunity into an owner-first route packet before your work moves.",
};

export default function Home() {
  return <RouteDesk />;
}
