type Medicine = {
  time: string;
  dosage: number;
  duration: number;
  medicine: string;
  frequency: string;
};

export interface AppointmentMedicalReport {
  id: number;
  title: string;
  type: string;
  follow_up: string[];
  created_at: string;
  updated_at: string;
  notes: string;
  prescription: {
    medicines: Medicine[];
  };
  vitals: {
    spo2: number;
    weight: number;
    heart_rate: number;
    temperature: number;
    blood_pressure: string;
  };
  diagnosis_and_findings: {
    notes: string;
    primary_diagnosis: string;
    secondary_findings: string;
  };
  patient: number;
  appointment: number;
  doctor: number[];
}

export interface LabReport {
  id: 3;
  title: string;
  type: string;
  follow_up: [];
  created_at: string;
  updated_at: string;
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
          unit: string;
          reference_range: string;
          status: string;
          flag: string;
        },
      ];
    },
  ];
  lab_notes: string;
  doctor_notes: string;
  patient: number;
  appointment: number;
  doctor: number[];
}
