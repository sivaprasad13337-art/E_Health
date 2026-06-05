import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
// Helper function to format breadcrumb labels
const formatLabel = (segment: string) => {
  return segment
    .replace(/[^a-zA-Z0-9-]/g, " ") // Remove special characters
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim() // Remove trailing and leading spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Convert to Title Case
};

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation(); // Get the current location from React Router
  const currentPath = location.pathname; // Current URL path
  const pathSegments = currentPath.split("/").filter((segment) => segment); // Split and filter empty strings

  const items = pathSegments.map((segment, index) => {
    const pathSoFar = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;

    return (
      <React.Fragment key={pathSoFar}>
        <BreadcrumbItem className={isLast ? "text-primary font-semibold" : ""}>
          {formatLabel(segment)}
        </BreadcrumbItem>
        {index + 1 !== pathSegments.length && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center uppercase tracking-wider m-0">
        {items}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
