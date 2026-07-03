import { Button } from "@/components/ui/button";

const ReportUpload = ({
  data,
  apiCaller,
}: {
  data: object;
  apiCaller: (arg: object) => void;
}) => {
  const handleOnclick = async () => {
    const res = await apiCaller(data);

    if (res) {
      alert("File Uploaded Successfully");
    }
  };
  return (
    <section>
      <Button className="py-5 px-6 rounded-sm" onClick={handleOnclick}></Button>
    </section>
  );
};

export default ReportUpload;
