"use client";

import { useEffect, useState } from "react";
import { Lab_Reports_Column } from "./columns";
import type { Labreport_Type } from "./columns";
import { DataTable } from "./data-table";

function getData(): Labreport_Type[] {
  return [
    {
      test_name: "TMT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "Echo",
      referred_by: "Dr. Thejeswi N Marla",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "ECG",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
    {
      test_name: "KFT",
      referred_by: "Dr. Jhon Doe",
      date: new Date(),
      comments: "Excelent Health",
      result: "Great",
    },
  ];
}

export default function MedicalReportsTable() {
  const [data, setData] = useState<Labreport_Type[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <section className="bg-white p-4 rounded-4xl w-[70%]">
      <DataTable columns={Lab_Reports_Column} data={data} />
    </section>
  );
}
