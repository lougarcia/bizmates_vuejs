import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LOCALE } from "./constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toKm(number) {
  return new Intl.NumberFormat(
    LOCALE,
    {
      style: "unit",
      unit: "kilometer",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ).format(number / 1000)
}

export function toTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString(
    LOCALE,
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

export function toWeekdayTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString(
    LOCALE,
    {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

export function toSimpleDateTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString(
    LOCALE,
    {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

export function toWeekdayDateTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString(
    LOCALE,
    {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

export function mpsToKph(mps) {
  const factor = 3.6;
  const kph = mps * factor;

  return new Intl.NumberFormat(LOCALE, {
    style: "unit",
    unit: "kilometer-per-hour",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(kph);
}

export function kelvinToCelcius(deg) {
  const factor = 273.15;
  const celcius = deg - factor;

  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(celcius);
}