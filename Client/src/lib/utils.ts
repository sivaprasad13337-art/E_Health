import { clsx, type ClassValue } from "clsx";
// import { data } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateForDjango = (isoDate: string) => {
  const d = new Date(isoDate);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Mon, 16 Jun 2026 2026-06-15

export const formatDateForBill = (date: string) => {
  const d = date.split("-");
  const dayName = new Date(date).toLocaleString("en-US", {
    weekday: "long",
  });

  const month = new Date(date).toLocaleString("default", {
    month: "long",
  });

  return `${dayName}, ${d[2]} ${month} ${d[0]}`;
};

export const getCloudinaryUrl = (path: string) => {
  return `https://res.cloudinary.com/dhpugjush/${path}`;
};

export const formateDateAndTime = (timestamp: string) => {
  const date = new Date(timestamp);

  const formatted = date
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ");

  return [
    `${formatted[0]} ${formatted[1]} ${formatted[2]}`,
    `${formatted[4]} ${formatted[5]}`,
  ];
};
