import { DateTime } from 'luxon';

export function formatCharacterDate(dateString: string): string {
  const date = DateTime.fromISO(dateString);
  return date.toFormat('dd/MM/yyyy HH:mm');
}

export function extractIdFromUrl(url: string): string {
  const trimmedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  return trimmedUrl.substring(trimmedUrl.lastIndexOf('/') + 1);
}
