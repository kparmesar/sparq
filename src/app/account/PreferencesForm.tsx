"use client";

import { useActionState } from "react";
import { updatePreferences, signOutAction } from "./actions";
import { SITE_OPTIONS } from "@/lib/constants";
import type { UserPreference } from "@/lib/db/schema";

const TYPE_OPTIONS = [
  { value: "research", label: "Research" },
  { value: "qi", label: "Quality Improvement" },
  { value: "audit", label: "Audit" },
];

export default function PreferencesForm({ prefs }: { prefs: UserPreference | null }) {
  const [state, formAction, pending] = useActionState(updatePreferences, null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-1">
          Notification Preferences
        </h2>
        <p className="text-sm text-neutral-500 mb-6">
          Choose what you&apos;d like to be notified about. Delivery coming soon.
        </p>

        {state?.success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
            Preferences saved!
          </div>
        )}
        {state?.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Event notifications */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="notifyEvents"
              name="notifyEvents"
              defaultChecked={prefs?.notifyEvents ?? false}
              className="mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary/30"
            />
            <div>
              <label htmlFor="notifyEvents" className="text-sm font-medium text-neutral-900 cursor-pointer">
                Event notifications
              </label>
              <p className="text-xs text-neutral-500">
                Get notified when new events are published.
              </p>
            </div>
          </div>

          {/* Project notifications */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="notifyProjects"
              name="notifyProjects"
              defaultChecked={prefs?.notifyProjects ?? false}
              className="mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary/30"
            />
            <div>
              <label htmlFor="notifyProjects" className="text-sm font-medium text-neutral-900 cursor-pointer">
                Project notifications
              </label>
              <p className="text-xs text-neutral-500">
                Get notified about new projects matching your filters below.
              </p>
            </div>
          </div>

          {/* Project type filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Project types of interest
            </label>
            <div className="flex flex-wrap gap-3">
              {TYPE_OPTIONS.map((t) => (
                <label
                  key={t.value}
                  className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="projectTypes"
                    value={t.value}
                    defaultChecked={(prefs?.projectTypes ?? []).includes(t.value)}
                    className="rounded border-neutral-300 text-primary focus:ring-primary/30"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          {/* Site filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Sites of interest
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 max-h-48 overflow-y-auto">
              {SITE_OPTIONS.map((site) => (
                <label
                  key={site}
                  className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer hover:bg-white rounded-lg px-2 py-1.5"
                >
                  <input
                    type="checkbox"
                    name="projectSites"
                    value={site}
                    defaultChecked={(prefs?.projectSites ?? []).includes(site)}
                    className="rounded border-neutral-300 text-primary focus:ring-primary/30"
                  />
                  {site}
                </label>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label
              htmlFor="projectKeywords"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Keywords{" "}
              <span className="text-neutral-400 font-normal">
                (comma-separated, optional)
              </span>
            </label>
            <input
              type="text"
              id="projectKeywords"
              name="projectKeywords"
              defaultValue={(prefs?.projectKeywords ?? []).join(", ")}
              placeholder="neonatal, sepsis, prescribing"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      </div>

      {/* Sign out */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-2">Session</h2>
        <form action={signOutAction}>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-accent-coral rounded-lg transition-all hover:bg-accent-coral/90"
          >
            Sign Out
          </button>
        </form>
      </div>
    </>
  );
}
