import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const Pic = ({ img, className }: { img: string; className?: string }) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={img} />
      <AvatarFallback>
        <UserRound />
      </AvatarFallback>
    </Avatar>
  );
};

export default Pic;
