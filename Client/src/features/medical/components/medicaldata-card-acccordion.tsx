import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
// import { SquareActivity } from "lucide-react";
import type React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const items = [
//   {
//     value: "plans",
//     trigger: "What subscription plans do you offer?",
//     content:
//       "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
//   },
//   {
//     value: "billing",
//     trigger: "How does billing work?",
//     content:
//       "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
//   },
//   {
//     value: "cancel",
//     trigger: "How do I cancel my subscription?",
//     content:
//       "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
//   },
// ];

interface MedicalDataAccordionCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  bg: string;
  text: string;
  required: boolean;
  children: React.ReactElement;
}

const MedicalDataAccordionCard = ({
  title,
  description,
  Icon,
  bg,
  text,
  required,
  children,
}: MedicalDataAccordionCardProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="plans" className="my-6">
      <AccordionItem value="abc" className="bg-white shadow-sm rounded-xl p-6">
        <AccordionTrigger
          className="cursor-pointer items-center"
          chevron={false}
        >
          <div className="flex gap-6 items-center">
            <div
              className={`w-10 h-10 flex justify-center items-center bg-${bg} text-${text} rounded-md`}
            >
              {<Icon className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-gray-700 font-bold">{title}</p>
              <p className="text-gray-500 font-semibold">{description}</p>
            </div>
          </div>

          {required ? (
            <Badge className="bg-red-100 text-red-600">Required</Badge>
          ) : (
            <Badge className="bg-gray-200 text-gray-700 font-semibold">
              Optional
            </Badge>
          )}
        </AccordionTrigger>
        <AccordionContent className=" pt-4">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MedicalDataAccordionCard;
