import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

interface SearchbarProps {
  className?: string;
  placeholder: string;
  handler: (args: string) => void;
}

const Searchbar = ({ className, placeholder, handler }: SearchbarProps) => {
  return (
    <InputGroup
      className={cn(
        "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!",
        className,
      )}
    >
      <Input
        data-slot="command-input"
        className={cn(
          "w-full text-sm focus:outline-none border-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent focus-visible:border-transparent",
        )}
        placeholder={placeholder}
        onChange={(e) => handler(e.currentTarget.value)}
      />
      <InputGroupAddon>
        <SearchIcon className="size-4 shrink-0 opacity-50" />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Searchbar;
