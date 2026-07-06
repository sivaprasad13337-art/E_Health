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
import { createMedicalReport, getAppointmentByCode } from "@/api/appointment";
import { useParams } from "react-router-dom";
import type { Appointment } from "@/features/appointment/interface/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useHospitalStore } from "@/zustand/hospital";

const WriteReport = () => {
  const { id } = useParams();
  const [reportType, setReportType] = useState({
    title: "",
    type: "",
    notes: "",
  });
  const [appointmentFormData, setAppointmentFormData] = useState({
    title: "",
    type: "",
    patient: 0,
    doctor: [0],
    appointment: 0,
    follow_up: [],
    notes: "",
    vitals: {
      blood_pressure: "",
      heart_rate: "",
      temperature: "",
      spo2: "",
      weight: "",
    },
    diagnosis_and_findings: {
      primary_diagnosis: "",
      secondary_findings: "",
      notes: "",
    },
    prescription: {
      medicines: [
        {
          medicine: "",
          dosage: "",
          frequency: "",
          time: "",
          duration: "",
        },
      ],
    },
    status: "Normal",
  });

  const [labFormData, setLabFormData] = useState({
    title: "",
    type: "",
    patient: 0,
    doctor: [0],
    appointment: 0,
    follow_up: [],
    lab_details: {
      name: "",
      location: "",
      collected: "",
      reported: "",
    },
    tests: [],
    lab_notes: "",
    doctor_notes: "",
    status: "Normal",
  });

  useEffect(() => {
    const getAppointment = async () => {
      const appointment: Appointment = await getAppointmentByCode(id);
      console.log("====================================");
      console.log(appointment);
      console.log("====================================");

      if (appointment)
        if (reportType.type === "Lab") {
          setLabFormData((prev) => ({
            ...prev,
            appointment: appointment.id,
            patient: appointment.patient.id,
            doctor: [appointment.doctor.id],
            type: reportType.type,
            title: reportType.title,
            lab_notes: reportType.notes,
          }));
        } else {
          setAppointmentFormData((prev) => ({
            ...prev,
            appointment: appointment.id,
            patient: appointment.patient.id,
            doctor: [appointment.doctor.id],
            type: reportType.type,
            title: reportType.title,
            notes: reportType.notes,
          }));
        }
    };

    getAppointment();
  }, [id, reportType]);

  useEffect(() => {
    console.log("====================================");
    console.log("This is Report Form Data: ", labFormData);
    console.log("====================================");
    // setLabFormData((prev) => ({ ...prev, type: type }));
    // setAppointmentFormData((prev) => ({ ...prev, type: type }));
  }, [labFormData]);

  const handleUpload = async () => {
    let payload;
    if (reportType.type === "Lab") {
      payload = labFormData;
    } else {
      payload = appointmentFormData;
    }

    const res = await createMedicalReport(payload);
    console.log(res);
  };

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
    <section>
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
              formData={reportType}
              setFormData={setReportType}
              // setType={setReportType}
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
        ].includes(reportType.type)
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
          : reportType.type === "Lab"
            ? LabReportRender.map((card, idx) => (
                <MedicalDataAccordionCard
                  title={card.title}
                  description={card.description}
                  Icon={card.Icon}
                  bg={card.bg}
                  text={card.text}
                  children={
                    <card.children
                      formData={labFormData}
                      setFormData={setLabFormData}
                    />
                  }
                  required={card.required}
                  key={idx}
                />
              ))
            : null}
      </div>

      <Card className="sticky left-0 bottom-0 rounded-none shadow-2xl">
        <CardContent className="flex justify-end">
          <Button className="rounded-sm px-6 py-5" onClick={handleUpload}>
            Upload
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default WriteReport;
