import { redirect } from "next/navigation";
import { defaultLocale } from "@meishi/i18n";

export default function Home() {
  redirect(`/${defaultLocale}`);
}
