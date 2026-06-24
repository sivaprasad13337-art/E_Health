import {
  AlertTriangle,
  HeartHandshake,
  Slice,
  SquareActivity,
  Stethoscope,
} from "lucide-react";
import MedicalDataAccordionCard from "../components/medicaldata-card-acccordion";
import BasicHealthInfoForm from "../forms/medical-history-forms/basic-health-info";
import UnderlyingConditionsForm from "../forms/medical-history-forms/underlying-conditions-form";
import SurgeryHistoryForm from "../forms/medical-history-forms/surgery-history-form";
import AllergiesForm from "../forms/medical-history-forms/allergies-form";
import LifestyleHabitsForm from "../forms/medical-history-forms/lifestyle-habits-form";

const CardRenderData = [
  {
    title: "Basic health info",
    description: "Core measurements and blood group",
    Icon: SquareActivity,
    bg: "red-100",
    text: "red-600",
    children: BasicHealthInfoForm,
    required: true,
  },
  {
    title: "Underlying conditions",
    description: "Any diagnosed chronic or existing illnesses",
    Icon: Stethoscope,
    bg: "blue-100",
    text: "blue-600",
    children: UnderlyingConditionsForm,
    required: false,
  },
  {
    title: "Surgery history",
    description: "Past surgical procedures",
    Icon: Slice,
    bg: "purple-100",
    text: "purple-600",
    children: SurgeryHistoryForm,
    required: false,
  },
  {
    title: "Allergies & reactions",
    description: "Medicines, food, environmental triggers",
    Icon: AlertTriangle,
    bg: "yellow-100",
    text: "yellow-500",
    children: AllergiesForm,
    required: false,
  },
  {
    title: "Lifestyle & habits",
    description: "Helps doctors understand your overall health",
    Icon: HeartHandshake,
    bg: "teal-100",
    text: "primary",
    children: LifestyleHabitsForm,
    required: true,
  },
];
const MedicalHistoryForm = () => {
  return (
    <div>
      {CardRenderData.map((card, idx) => (
        <MedicalDataAccordionCard
          title={card.title}
          description={card.description}
          Icon={card.Icon}
          bg={card.bg}
          text={card.text}
          children={<card.children />}
          required={card.required}
          key={idx}
        />
      ))}
    </div>
  );
};

export default MedicalHistoryForm;
