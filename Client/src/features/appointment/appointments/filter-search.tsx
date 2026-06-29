import { DateFilter } from "@/components/shared-components/date-filter";
import { Filter } from "@/components/shared-components/filter";
import Searchbar from "@/components/shared-components/searchbar";
import { ArrowDownWideNarrow, Stethoscope } from "lucide-react";

const AppointmentFilterAndSearch = () => {
  const handelSearchBar = () => {};
  const handelDateFilter = () => {};
  const handelSpecialityFilter = () => {};
  const handelSorting = () => {};

  return (
    <section className="flex justify-between items-center mt-4">
      <Searchbar
        handler={handelSearchBar}
        placeholder="Search by doctor, department, date..."
        className="w-[60%]"
      />

      <div className="w-[30%] flex gap-6">
        <DateFilter onClick={handelDateFilter} />
        <Filter
          icon={Stethoscope}
          text="Speciality"
          values={[
            "Cardiology",
            "Neurology",
            "Pulmonology",
            "Orthopedics",
            "Dermatology",
            "Other",
          ]}
          handler={handelSpecialityFilter}
        />

        <Filter
          icon={ArrowDownWideNarrow}
          text="Sort"
          values={["A-Z", "Date"]}
          handler={handelSorting}
        />
      </div>
    </section>
  );
};

export default AppointmentFilterAndSearch;
