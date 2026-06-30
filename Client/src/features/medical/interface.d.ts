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

export interface LabReport {
  patient_name: string;
  lab_details: {
    name: string;
    location: string;
    collected: string;
    reported: string;
  };
  tests: [
    {
      panel: string;
      subtests: [
        {
          name: string;
          value: {
            raw: string;
            numeric: number;
            text: string;
          };
          unit: "mg/dL";
          reference_range: string;
          status: string;
          flag: string;
        },
      ];
    },
  ];
}
export interface LabReportFromProps {
  formData: LabReport;
  setFormData: (args: LabReport) => void;
}
