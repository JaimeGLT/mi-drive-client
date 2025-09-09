import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const formatRelativeTime = (dateString: string): string => {
  const date = parseISO(dateString);
  let text = formatDistanceToNowStrict(date, { addSuffix: true, locale: es });
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
};
