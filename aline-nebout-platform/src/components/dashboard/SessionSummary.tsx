"use client";

interface WorkshopBooking {
  id: string;
  status: string;
  workshop: {
    id: string;
    date: string;
    time_display: string;
    location: string;
  } | null;
}

interface SessionSummaryProps {
  bookings: WorkshopBooking[];
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
}

export default function SessionSummary({ bookings }: SessionSummaryProps) {
  const now = new Date();

  const upcoming = bookings.filter(
    (b) => b.workshop && new Date(b.workshop.date) >= now
  );
  const past = bookings.filter(
    (b) => b.workshop && new Date(b.workshop.date) < now
  );

  return (
    <div className="space-y-4">
      {upcoming.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
            A venir
          </p>
          <ul className="space-y-2">
            {upcoming.map((b) => (
              <li
                key={b.id}
                className="flex items-start gap-3 p-2 rounded-lg bg-emerald-50/50"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-dark">
                    {formatDate(b.workshop!.date)}
                  </p>
                  <p className="text-xs text-text-muted">
                    {b.workshop!.time_display} — {b.workshop!.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Passées
          </p>
          <ul className="space-y-2">
            {past.map((b) => (
              <li
                key={b.id}
                className="flex items-start gap-3 p-2 rounded-lg opacity-60"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-dark">
                    {formatDate(b.workshop!.date)}
                  </p>
                  <p className="text-xs text-text-muted">
                    {b.workshop!.time_display} — {b.workshop!.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
