import { DateFilter } from "@/components/shared-components/date-filter";
import { Filter } from "@/components/shared-components/filter";
import Searchbar from "@/components/shared-components/searchbar";
import { Card, CardContent } from "@/components/ui/card";

const Reports = () => {
  const filters = [
    "cardio",
    "blood-report",
    "Pulmonology",
    "ECG",
    "Echo",
    "X-Ray",
  ];

  const handler = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const handleDateFilter = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  return (
    <section>
      <div className="flex gap-4 items-center">
        <Searchbar className="" placeholder="Search reports" />
        <Filter values={filters} handler={handler} />
        <DateFilter onClick={handleDateFilter} />
      </div>

      <div>
        <Card>
          <CardContent>
            
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Reports;
