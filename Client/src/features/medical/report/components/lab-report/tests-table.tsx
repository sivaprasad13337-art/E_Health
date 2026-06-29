import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SubTest = {
  name: string;
  value: {
    raw: string;
    numeric: number;
    text: string;
  };
  unit: string;
  reference_range: string;
  status: string;
  flag: string;
};

interface TestsTableProps {
  panel: string;
  subtests: SubTest[];
}

// {
//     panel: "GLYCOSYLATED HAEMOGLOBIN (GHB/HBA1C) , WHOLE BLOOD EDTA",
//     subtests: [
//       {
//         name: "Glycosylated Haemoglobin HbA1c",
//         value: {
//           raw: "5.5",
//           numeric: 5.5,
//           text: null,
//         },
//         unit: "%",
//         reference_range:
//           "Normal: < 5.9 HPLC Pre-Diabetes: 5.9 - 6.4 Diabetes: > 6.5",
//         status: "Normal",
//         flag: null,
//       },
//       {
//         name: "Approximate Mean Plasma Glucose",
//         value: {
//           raw: "111.15",
//           numeric: 111.15,
//           text: null,
//         },
//         unit: null,
//         reference_range: null,
//         status: null,
//         flag: null,
//       },
//     ],
//   },

export function TestsTable({ tests }: { tests: TestsTableProps[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead className="">Test</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Reference range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.map((item) => (
          <>
            {" "}
            <TableRow className="bg-gray-100 w-full">
              <TableCell colSpan={3} className="font-bold text-gray-600 py-1">
                {item.panel}
              </TableCell>
            </TableRow>
            {item.subtests.map((test) => (
              <TableRow>
                <TableCell className="font-semibold">{test.name}</TableCell>
                <TableCell>
                  <span
                    className={`font-extrabold ${
                      test.status === "Low" || test.status === "High"
                        ? "text-red-600"
                        : test.status === "Normal"
                          ? "text-green-600"
                          : "text-amber-600"
                    }`}
                  >
                    {test.value.numeric}
                  </span>{" "}
                  <span className="text-gray-600 font-semibold">
                    {test.unit}
                  </span>
                </TableCell>
                <TableCell className="">
                  {/* {Object.entries(test.reference_range).length
                    ? Object.entries(test.reference_range).map((item) => item)
                    : ""} */}
                  <p className="">
                    {JSON.stringify(test.reference_range).replace('"', "")}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
