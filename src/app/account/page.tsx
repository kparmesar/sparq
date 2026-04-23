import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";
import { getUserPreferences } from "@/lib/db/queries";
import PreferencesForm from "./PreferencesForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/auth/sign-in");

  const prefs = await getUserPreferences(session.user.id);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            My Account
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Welcome back, {session.user.name}
          </p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Profile info */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-500">Name</span>
                <p className="font-medium text-neutral-900">{session.user.name}</p>
              </div>
              <div>
                <span className="text-neutral-500">Email</span>
                <p className="font-medium text-neutral-900">{session.user.email}</p>
              </div>
            </div>
          </div>

          {/* Notification preferences */}
          <PreferencesForm prefs={prefs ?? null} />
        </div>
      </section>
    </div>
  );
}
