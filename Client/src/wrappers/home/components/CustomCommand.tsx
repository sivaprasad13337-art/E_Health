"use client";

import * as React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useNavigate } from "react-router-dom";
import { routes } from "@/data/routes";

export function CustomCommand() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  //   const handleNavigation = (root, url) => {
  //     navigate(`${root}${url}`);
  //     setOpen(false);
  //   };

  //   const url = data.root;

  const handleNavigation = (url: string) => {
    navigate(url);
    setOpen(!open);
  };

  return (
    <div className="">
      <p
        onClick={() => setOpen(true)}
        className="text-sm w-72 items-center justify-between bg-background border-sidebar-border border rounded-lg flex gap-16 p-2 px-4 text-muted-foreground"
      >
        <span>Search options...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl/⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No results found.</CommandEmpty>

              {routes.map(({ icon: Icon, ...item }) => (
                <>
                  <CommandGroup heading={item.title} key={item.path}>
                    <div onClick={() => handleNavigation(`/${item.path}`)}>
                      <CommandItem className="cursor-pointer">
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </CommandItem>
                    </div>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
