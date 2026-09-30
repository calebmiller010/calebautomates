// Single source for contact destinations (was pasted into 7 files).
export const BOOKING_URL = 'https://calendar.app.google/NUxmMR4GipiHsD7d9';
export const EMAIL = 'caleb@calebautomates.com';

// Prefilled mailto. Subject/body are optional; both are URI-encoded here.
export function mailto(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push('subject=' + encodeURIComponent(subject));
  if (body) params.push('body=' + encodeURIComponent(body));
  return 'mailto:' + EMAIL + (params.length ? '?' + params.join('&') : '');
}

// The default "or email me" link used next to every primary CTA.
export const CONTACT_MAILTO = mailto(
  'A manual task I want to automate',
  "Hi Caleb — here's what my team keeps doing by hand:\n\n(what it is, roughly how often, and which tools are involved)\n\n"
);

// Canonical CTA labels — use these, don't invent new ones.
export const CTA_PRIMARY = 'Book a 20-minute call';
export const CTA_EMAIL = 'or email me →';
