import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Grid2X2 } from "lucide-react";
import { TestsTable } from "./tests-table";

const TestResultes = ({ tests }) => {
  return (
    <Card className="p-4">
      <CardTitle className="px-4">
        <Grid2X2 className="icon-text text-primary" /> Test results
      </CardTitle>

      <CardContent>
        <TestsTable tests={tests} />
      </CardContent>
    </Card>
  );
};

export default TestResultes;
