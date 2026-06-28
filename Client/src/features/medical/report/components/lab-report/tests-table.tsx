import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>
                  {test.value.numeric} {test.unit}
                </TableCell>
                <TableCell className="">
                  {JSON.stringify(test.reference_range)}
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
