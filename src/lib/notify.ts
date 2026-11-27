import { CONTACT } from "./info";

/**
 * Who receives the operator copy of every booking / contact message.
 *
 * The main inbox always gets it. BOOKING_NOTIFY_EMAILS (comma-separated) adds
 * backup inboxes — e.g. a personal Gmail on the owner's phone — so a request is
 * never stuck behind a single mailbox that can't be opened that day.
 */
export function notificationRecipients(): string[] {
  const extra = (process.env.BOOKING_NOTIFY_EMAILS ?? "")
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
  return Array.from(new Set([CONTACT.email, ...extra]));
}
