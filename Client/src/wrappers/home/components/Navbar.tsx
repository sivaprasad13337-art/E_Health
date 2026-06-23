import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { CustomCommand } from "./CustomCommand";
import Pic from "@/components/Pic";
import CustomDropdown from "./custom-dropdown";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BadgeX, BellDotIcon, Bolt } from "lucide-react";
import CustomTooltip from "@/components/custom-tooltip";
import { useAuthStore } from "@/zustand/auth";
import { getCloudinaryUrl } from "@/lib/utils";

const Navbar = () => {
  const { user } = useAuthStore();
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

      <section className="flex gap-5">
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

          <CustomTooltip
            trigger={
              <Button variant="outline" size="icon">
                {" "}
                {user?.is_verified ? (
                  <BadgeCheckIcon className="text-sky-500" />
                ) : (
                  <BadgeX className="text-red-500" />
                )}
              </Button>
            }
            tip={user?.is_verified ? "Verified" : "Unverified"}
          />
        </div>

        <div className="flex gap-2">
          <Pic
            img={getCloudinaryUrl(user?.profile_img)} //"https://github.com/shadcn.png"
            className="w-[2.5rem] h-[2.5rem]"
          />

          <div>
            <p className="font-semibold text-lg">
              {user?.role === "DOCTOR" ? "Dr. " : ""}
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs">{user?.role}</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Navbar;
