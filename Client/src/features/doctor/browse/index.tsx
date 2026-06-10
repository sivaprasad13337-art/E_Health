import { useEffect, useState } from "react";
import CardFlat from "./components/doctor-card-flat";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const doctors = [
  {
    name: "Charles Scott",
    qualification: "MBBS, DNB",
    specialization: "Neurologist",
    department: "Neurology",
    languages: ["English", "French"],
    address: "Hamshire, TX",
    experience: "20",
    fee: "1050",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Robert Thomas",
    qualification: "MBBS, MD",
    specialization: "Cardiologist",
    department: "Cardialogy",
    languages: ["English", "Spanish"],
    address: "Oakland, CA",
    experience: "27",
    fee: "1500",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Margaret Koller",
    qualification: "B.S, M.S",
    specialization: "Psychologist",
    department: "Psychology",
    languages: ["English", "Portuguese"],
    address: "Killeen, TX",
    experience: "5",
    fee: "2500",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Cath Busick",
    qualification: "MBBS, MD",
    specialization: "Pediatrician",
    department: "Pediatrics",
    languages: ["English", "Arabic", "German"],
    address: "Schenectady, NY",
    experience: "12",
    fee: "2800",
    availability: false,
    ratings: "5.0",
  },
  {
    name: "Cath Busick",
    qualification: "MBBS, MD",
    specialization: "Pediatrician",
    department: "Pediatrics",
    languages: ["English", "Arabic", "German"],
    address: "Schenectady, NY",
    experience: "12",
    fee: "2800",
    availability: false,
    ratings: "5.0",
  },
  {
    name: "Cath Busick",
    qualification: "MBBS, MD",
    specialization: "Pediatrician",
    department: "Pediatrics",
    languages: ["English", "Arabic", "German"],
    address: "Schenectady, NY",
    experience: "12",
    fee: "2800",
    availability: false,
    ratings: "5.0",
  },
  {
    name: "Robert Thomas",
    qualification: "MBBS, MD",
    specialization: "Cardiologist",
    department: "Cardialogy",
    languages: ["English", "Spanish"],
    address: "Oakland, CA",
    experience: "27",
    fee: "1500",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Margaret Koller",
    qualification: "B.S, M.S",
    specialization: "Psychologist",
    department: "Psychology",
    languages: ["English", "Portuguese"],
    address: "Killeen, TX",
    experience: "5",
    fee: "2500",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Charles Scott",
    qualification: "MBBS, DNB",
    specialization: "Neurologist",
    department: "Neurology",
    languages: ["English", "French"],
    address: "Hamshire, TX",
    experience: "20",
    fee: "1050",
    availability: true,
    ratings: "5.0",
  },
  {
    name: "Robert Thomas",
    qualification: "MBBS, MD",
    specialization: "Cardiologist",
    department: "Cardialogy",
    languages: ["English", "Spanish"],
    address: "Oakland, CA",
    experience: "27",
    fee: "1500",
    availability: true,
    ratings: "5.0",
  },
];

const BrowseDoctors = () => {
  const [limit, setLimit] = useState(2);
  //   const count = 2;
  const [data, setData] = useState([]);

  const paginatePrev = () => {
    setData([]);
    const newData = [];
    for (let i = limit - 6; i < limit - 4; i++) {
      newData.push(doctors[i]);
      console.log("====================================");
      console.log(i);
      console.log("====================================");
    }

    console.log(newData);

    setData(newData);
    setLimit(limit - 2);
  };

  const paginateNext = () => {
    setData([]);
    const newData = [];
    for (let i = limit - 2; i < limit; i++) {
      newData.push(doctors[i]);
    }

    console.log(newData);

    setData(newData);
    setLimit(limit + 2);
  };

  useEffect(() => {
    const callPaginate = () => {
      paginateNext();
    };

    callPaginate();
  }, []);

  return (
    <section>
      <section>
        {data.length
          ? data.map((item, idx) => <CardFlat doctor={item} key={idx} />)
          : ""}

        {}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginatePrev()} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => paginateNext()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </section>
  );
};

export default BrowseDoctors;
