import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type React from "react";

interface CustomSearchBarProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  handleFuntion: (arg: string) => void;
}

export function CustomSearchBar({
  data,
  setData,
  handleFuntion,
}: CustomSearchBarProps) {
  return (
    <Field>
      {/* <FieldLabel htmlFor="input-button-group">Search</FieldLabel> */}
      <ButtonGroup>
        <Input
          id="input-button-group"
          placeholder="Type to search..."
          className="py-4.5"
          value={data}
          onInput={(e: React.InputEvent<HTMLInputElement>) =>
            setData(e.currentTarget.value)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFuntion(e.currentTarget.value)
          }
        />
        <Button variant="outline" onClick={() => handleFuntion(data)}>
          Search
        </Button>
      </ButtonGroup>
    </Field>
  );
}
