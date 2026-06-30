import {
  Activity,
  CalendarPlus,
  ClipboardList,
  FileText,
  FlaskConical,
  Pill,
} from "lucide-react";
import PatientCard from "../components/patient-header-card";
import ReportTypeForm from "../forms/medical-reports-forms/report-type";
import MedicalDataAccordionCard from "../components/medicaldata-card-acccordion";
import VitalsForm from "../forms/medical-reports-forms/vitals-form";
import DiagnosisAndFindingsForm from "../forms/medical-reports-forms/diagnosis-findings";
import PrescriptionForm from "../forms/medical-reports-forms/prescription-form";
import FollowUpForm from "../forms/medical-reports-forms/follow-up";
import { useEffect, useState } from "react";
import LabDetailsForm from "../forms/medical-reports-forms/lab/lab-details";
import ParseLabReport from "../forms/medical-reports-forms/lab/lap-report-parse";

const WriteReport = () => {
  const [appointmentFormData, setAppointmentFormData] = useState({
    title: "Cardiology",
    type: "Cardiology",
    notes:
      "Patient is responding well to Amlodipine 5mg. Advised to reduce sodium intake, maintain regular exercise routine, and monitor BP at home twice daily. Stress management techniques recommended. Return for follow-up in 4 weeks.",
    vitals: {
      blood_pressure: "118/64",
      heart_rate: 72,
      temperature: 94,
      spo2: 98,
      weight: 65,
    },
    diagnosis_and_findings: {
      primary_diagnosis: "Essential Hypertension (Stage 1) — I10",
      secondary_findings: "Mild tachycardia — under observation",
      notes:
        "Patient presented with elevated BP readings over the past 3 months. ECG shows normal sinus rhythm. Echo findings within normal limits. Continue current medication and lifestyle modifications advised.",
    },
    prescription: {
      medicines: [
        {
          medicine: "Amlodipine",
          dosage: 5,
          frequency: "Once a day",
          time: "After Breakfast",
          duration: 30,
        },
        {
          medicine: "Telmisartan",
          dosage: 40,
          frequency: "Once a day",
          time: "Before Food",
          duration: 30,
        },
        {
          medicine: "Aspirin",
          dosage: 75,
          frequency: "Once a day",
          time: "After Food",
          duration: 15,
        },
      ],
    },
    follow_up: {
      date: "2026-07-10T18:30:00.000Z",
      time: "11:00",
    },
  });

  const [labFormData, setLabFormData] = useState();

  useEffect(() => {
    console.log("====================================");
    console.log("This is Report Form Data: ", appointmentFormData.type);
    console.log("====================================");
  }, [appointmentFormData]);

  const appointment = {
    apt_id: "APT-20260616-084",
    date: "Mon, 16 Jun 2026",
    time: " 10:30 AM",
    location: "Apollo Hospital",
    type: " In-person",
  };

  const ReportType = {
    title: "Report type",
    description: "What kind of report is this?",
    Icon: FileText,
    bg: "yellow-100",
    text: "yellow-600",
    children: ReportTypeForm,
    required: true,
  };

  const AppointmentReportRender = [
    {
      title: "Vitals recorded",
      description: "Measured during this visit",
      Icon: Activity,
      bg: "red-100",
      text: "red-600",
      children: VitalsForm,
      required: false,
    },
    {
      title: "Diagnosis & findings",
      description: "Primary diagnosis, secondary findings, notes",
      Icon: ClipboardList,
      bg: "sky-100",
      text: "sky-600",
      children: DiagnosisAndFindingsForm,
      required: true,
    },
    {
      title: "Prescription",
      description: "Medicines prescribed this visit",
      Icon: Pill,
      bg: "purple-100",
      text: "purple-600",
      children: PrescriptionForm,
      required: false,
    },
    {
      title: "Follow-up",
      description: "Schedule next appointment if needed",
      Icon: CalendarPlus,
      bg: "green-100",
      text: "green-600",
      children: FollowUpForm,
      required: false,
    },
  ];

  const LabReportRender = [
    {
      title: "Parse",
      description: "Upload & parse your lab report with AI!",
      Icon: FlaskConical,
      bg: "green-100",
      text: "green-600",
      children: ParseLabReport,
      required: false,
    },
    {
      title: "Lab Details",
      description: "Measured during this visit",
      Icon: FlaskConical,
      bg: "blue-100",
      text: "blue-600",
      children: LabDetailsForm,
      required: false,
    },
    
  ];

  return (
    <>
      <PatientCard appointment={appointment} />

      <div>
        <MedicalDataAccordionCard
          title={ReportType.title}
          description={ReportType.description}
          Icon={ReportType.Icon}
          bg={ReportType.bg}
          text={ReportType.text}
          children={
            <ReportType.children
              formData={appointmentFormData}
              setFormData={setAppointmentFormData}
            />
          }
          required={ReportType.required}
        />

        {/* [
  "Lab",
  "Imaging",
  "Prescription",
  "Discharge Summary",
  "Surgical",
  "Vaccination",
  "Cardiology",
  "Neurology",
  "Pulmonology",
  "Orthopedics",
  "Dermatology",
  "Other",
] */}
        {[
          "Prescription",
          "Discharge Summary",
          "Vaccination",
          "Cardiology",
          "Neurology",
          "Pulmonology",
          "Orthopedics",
          "Dermatology",
          "Other",
        ].includes(appointmentFormData.type)
          ? AppointmentReportRender.map((card, idx) => (
              <MedicalDataAccordionCard
                title={card.title}
                description={card.description}
                Icon={card.Icon}
                bg={card.bg}
                text={card.text}
                children={
                  <card.children
                    formData={appointmentFormData}
                    setFormData={setAppointmentFormData}
                  />
                }
                required={card.required}
                key={idx}
              />
            ))
          : LabReportRender.map((card, idx) => (
              <MedicalDataAccordionCard
                title={card.title}
                description={card.description}
                Icon={card.Icon}
                bg={card.bg}
                text={card.text}
                children={
                  <card.children
                    formData={appointmentFormData}
                    setFormData={setAppointmentFormData}
                  />
                }
                required={card.required}
                key={idx}
              />
            ))}
      </div>
    </>
  );
};

export default WriteReport;
