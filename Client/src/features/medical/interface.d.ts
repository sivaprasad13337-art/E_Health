type PrescriptionType = {
  medicine: string;
  dosage: number;
  frequency: string;
  time: string;
  duration: number;
};

type VitalsType = {
  blood_pressure: string;
  heart_rate: number;
  temperature: number;
  spo2: number;
  weight: number;
};

type DiagnosisAndFindingsType = {
  primary_diagnosis: string;
  secondary_findings: string;
  notes: string;
};

export interface MedicalReport {
  patient: number;
  doctor: number;
  appointment: number;
  prescription: { medicines: PrescriptionType[] };
  title: string;
  type: string;
  vitals: VitalsType;
  diagnosis_and_findings: DiagnosisAndFindingsType;
  notes: string;
  follow_up: { date: string; time: string };
}

export interface MedicalReportFromProps {
  formData: MedicalReport;
  setFormData: (args: MedicalReport) => void;
}
