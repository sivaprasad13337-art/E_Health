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
  setType?: (args: string) => void;
}

export interface LabReportPart {
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
  formData: LabReportPart;
  setFormData: (args: LabReportPart) => void;
}

type MedicalHistory = {
  surgery: {
    patient: number;
    surgery: string;
    reason: string;
    date: string;
    hospital: string;
    notes: string;
    summary: string;
  };
};

// export interface MedicalHistoryFormProps {
//   formData: MedicalHistory;
//   setFormData: (args: MedicalHistory) => void;
// }

export type MedicalCondition = {
  id: number;
  patient: number;
  condition: string;
  since: string;
  management: string;
  medication: string;
};

type Severity = "High" | "Moderate" | "Low";

export type Allergy = {
  id: 1;
  patient: number;
  allergy: string;
  severity: Severity;
  note: string;
};

export type Surgery = {
  id: number;
  surgery: string;
  date: string;
  reason: string;
  hospital: string;
  notes: string;
  summary: string;
};

export type LifestyleType = {
  id: number;
  patient: number;
  smoking: string;
  alcohol: string;
  activity: string;
  diet: string;
  sleep: string;
  taking_medication: string;
};

export interface PatientDetails {
  age: number;
  sex: string;
  dob: string;
  pat_id: string;
  bloog_grp: string;
  allergies: Allergy[];
  medicalConditions: MedicalCondition[];
  surgeries: Surgery[];
  lifyeStyle: LifestyleType;
}
