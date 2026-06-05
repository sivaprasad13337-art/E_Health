import type { ReactNode } from "react";
import Wrapper from "./wrapper";

const Index = ({ children }: { children: ReactNode }) => {
  return <Wrapper children={children} />;
};

export default Index;
