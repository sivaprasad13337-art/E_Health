import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { CustomCommand } from "./CustomCommand";
import Pic from "@/components/Pic";
import CustomDropdown from "./custom-dropdown";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BellDotIcon, Bolt } from "lucide-react";

const Navbar = () => {
  return (
    <section className="bg-gray-100 h-[4.5rem] w-full flex justify-between px-4 items-center pt-1">
      <div className="flex items-center gap-2 px-4 bg-red-20">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
      </div>

      <CustomCommand />

      <div className="flex gap-1">
        <CustomDropdown
          trigger={
            <Button variant="outline" size="icon">
              {" "}
              <BellDotIcon />
            </Button>
          }
        />

        <CustomDropdown
          trigger={
            <Button variant="outline" size="icon">
              {" "}
              <Bolt />
            </Button>
          }
        />

        <CustomDropdown
          trigger={
            <Button variant="outline" size="icon">
              {" "}
              <BadgeCheckIcon className="text-sky-500" />
            </Button>
          }
        />
      </div>

      <div className="flex gap-2">
        <Pic
          img="https://github.com/shadcn.png"
          className="w-[2.5rem] h-[2.5rem]"
        />

        <div>
          <p className="font-semibold text-lg">Siva Prasad</p>
          <p className="text-xs">Admin</p>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
