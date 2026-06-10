import { StarFilledIcon } from "@radix-ui/react-icons";

const Rating = ({ rating }: { rating: string }) => {
  return (
    <span className="bg-red-400 px-2 p-[2px] h-[1.6rem] text-white rounded-md text-sm">
      <StarFilledIcon className="inline-block w-[1rem] h-[1rem] -mt-1 font-semibolds" />{" "}
      <small className="text-sm">{rating}</small>
    </span>
  );
};

export default Rating;
