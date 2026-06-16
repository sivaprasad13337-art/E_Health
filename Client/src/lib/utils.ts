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

// console.log("====================================");
// console.log(formateDateForBill("2026-12-08"));
// console.log("====================================");
