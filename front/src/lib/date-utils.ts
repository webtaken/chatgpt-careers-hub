import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

export function formatRelativeTime(dateString: string): string {
  const date = dayjs(dateString);
  const now = dayjs();

  // If the date is more than 30 days ago, show the actual date
  if (now.diff(date, "day") > 30) {
    return date.format("MMM D, YYYY");
  }

  // Otherwise show relative time
  return date.fromNow();
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format("MMM D, YYYY");
}
