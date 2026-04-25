
/**
 * Converts a Date to a specific time zone without mutating the original Date.
 * Returns a new Date object representing the same wall-clock time in the target time zone.
 */
export const toZonedTime = (date: Date, timeZone: string): Date => {
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const lookup: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      lookup[part.type] = parseInt(part.value, 10);
    }
  }

  // Months in JS Date are 0-based
  return new Date(
    lookup.year,
    lookup.month - 1,
    lookup.day,
    lookup.hour,
    lookup.minute,
    lookup.second
  );
};

// const CALENDAR_TZ = "UTC";

/**
 * Start of day in a specific time zone.
 * Returns a new Date at 00:00:00 in that time zone.
 */
export const toZonedStartOfDay = (date: Date, timeZone: string): Date => {
  const zoned = toZonedTime(date, timeZone);
  return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
};

/**
 * Create a zoned date from year, month, day in the given time zone.
 */
export const createZonedDate = (
  year: number,
  month: number,
  day: number,
  timeZone: string
): Date => {
  // Create a UTC date and then shift it to the target timezone start of day
  const date = new Date(Date.UTC(year, month, day));
  return toZonedStartOfDay(date, timeZone);
};
/**
 * Checks if a date is in the past relative to today.
 */
export const isPastZonedDate = (date: Date, today: Date): boolean => {
  if (isNaN(date.getTime()) || isNaN(today.getTime())) return false;
  return date.getTime() < today.getTime();
};

/**
 * Checks if two dates fall on the same day (in local time).
 */
export const isSameZonedDay = (a: Date, b: Date): boolean => {
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

interface FormatDateOptions {
  date: Date | string; // input date
  isReturnAsDate?: boolean; // true -> JS Date, false -> formatted string
}
