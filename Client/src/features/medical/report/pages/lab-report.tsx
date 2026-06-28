import LabReportHeader from "../components/lab-report/lap-report-header";
import TestResultes from "../components/lab-report/test-results";

const LabReport = () => {
  const LabReport = {
    patient_name: "Mr.SIVA PRASAD",
    lab_details: {
      name: "DRL HEALTH CHECK - AP",
      location: null,
      collected: "25/Jun/2025 02:52PM",
      reported: "25/Jun/2025 06:20PM",
    },
    tests: [
      {
        panel: "COMPLETE BLOOD COUNT (CBC) - 25 TESTS",
        subtests: [
          {
            name: "Haemoglobin",
            value: {
              raw: "15.0",
              numeric: 15.0,
              text: null,
            },
            unit: "gm%",
            reference_range: "13 - 17",
            status: "Normal",
            flag: null,
          },
          {
            name: "Total WBC Count",
            value: {
              raw: "6710",
              numeric: 6710,
              text: null,
            },
            unit: "Cells/cumm",
            reference_range: "4000 - 11000",
            status: "Normal",
            flag: null,
          },
          {
            name: "RBC Count",
            value: {
              raw: "5.43",
              numeric: 5.43,
              text: null,
            },
            unit: "Millions/cumm",
            reference_range: "4.5 - 5.9",
            status: "Normal",
            flag: null,
          },
          {
            name: "Platelet Count",
            value: {
              raw: "237",
              numeric: 237,
              text: null,
            },
            unit: "10ˆ3/µL",
            reference_range: "150 - 450",
            status: "Normal",
            flag: null,
          },
          {
            name: "Packed Cell Volume (PCV)",
            value: {
              raw: "45.2",
              numeric: 45.2,
              text: null,
            },
            unit: "%",
            reference_range: "40 - 50",
            status: "Normal",
            flag: null,
          },
          {
            name: "Mean Corpuscular Hb. (MCH)",
            value: {
              raw: "27.7",
              numeric: 27.7,
              text: null,
            },
            unit: "pg",
            reference_range: "30 - 36",
            status: "Low",
            flag: null,
          },
          {
            name: "Mean Corpuscular Volume (MCV)",
            value: {
              raw: "83.4",
              numeric: 83.4,
              text: null,
            },
            unit: "fL",
            reference_range: "80 - 100",
            status: "Normal",
            flag: null,
          },
          {
            name: "MCHC",
            value: {
              raw: "33.2",
              numeric: 33.2,
              text: null,
            },
            unit: "g/dL",
            reference_range: "32 - 36",
            status: "Normal",
            flag: null,
          },
          {
            name: "MPV",
            value: {
              raw: "9.3",
              numeric: 9.3,
              text: null,
            },
            unit: "fL",
            reference_range: "7 - 11",
            status: "Normal",
            flag: null,
          },
          {
            name: "Platelet Crit",
            value: {
              raw: "0.221",
              numeric: 0.221,
              text: null,
            },
            unit: "%",
            reference_range: "0.15 - 0.62",
            status: "Normal",
            flag: null,
          },
          {
            name: "RDW CV",
            value: {
              raw: "13.2",
              numeric: 13.2,
              text: null,
            },
            unit: "%",
            reference_range: "11.5 - 14.5",
            status: "Normal",
            flag: null,
          },
          {
            name: "RDW-SD",
            value: {
              raw: "41.10",
              numeric: 41.1,
              text: null,
            },
            unit: "fL",
            reference_range: "39.5 - 46.0",
            status: "Normal",
            flag: null,
          },
          {
            name: "PDW",
            value: {
              raw: "16.4",
              numeric: 16.4,
              text: null,
            },
            unit: "fL",
            reference_range: "11 - 22",
            status: "Normal",
            flag: null,
          },
          {
            name: "P-LCR",
            value: {
              raw: "39.0",
              numeric: 39.0,
              text: null,
            },
            unit: "%",
            reference_range: "18 - 50",
            status: "Normal",
            flag: null,
          },
          {
            name: "Neutrophils",
            value: {
              raw: "55.1",
              numeric: 55.1,
              text: null,
            },
            unit: "%",
            reference_range: "45 - 75",
            status: "Normal",
            flag: null,
          },
          {
            name: "Lymphocytes",
            value: {
              raw: "34",
              numeric: 34.0,
              text: null,
            },
            unit: "%",
            reference_range: "20 - 40",
            status: "Normal",
            flag: null,
          },
          {
            name: "Eosinophils",
            value: {
              raw: "5.3",
              numeric: 5.3,
              text: null,
            },
            unit: "%",
            reference_range: "1 - 6",
            status: "Normal",
            flag: null,
          },
          {
            name: "Monocytes",
            value: {
              raw: "5.5",
              numeric: 5.5,
              text: null,
            },
            unit: "%",
            reference_range: "2 - 10",
            status: "Normal",
            flag: null,
          },
          {
            name: "Basophils",
            value: {
              raw: "0.1",
              numeric: 0.1,
              text: null,
            },
            unit: "%",
            reference_range: "0 - 2",
            status: "Normal",
            flag: null,
          },
          {
            name: "Absolute Neutrophil Count",
            value: {
              raw: "3697.21",
              numeric: 3697.21,
              text: null,
            },
            unit: "cells/cumm",
            reference_range: "2000 - 7000",
            status: "Normal",
            flag: null,
          },
          {
            name: "Absolute Basophils Count",
            value: {
              raw: "6.71",
              numeric: 6.71,
              text: null,
            },
            unit: "Cells/cumm",
            reference_range: "0 - 100",
            status: "Normal",
            flag: null,
          },
          {
            name: "Absolute Lymphocyte Count",
            value: {
              raw: "2281.4",
              numeric: 2281.4,
              text: null,
            },
            unit: "Cells/cumm",
            reference_range: "1000 - 3000",
            status: "Normal",
            flag: null,
          },
          {
            name: "Absolute Eosinophil Count",
            value: {
              raw: "355.63",
              numeric: 355.63,
              text: null,
            },
            unit: "Cells/cumm",
            reference_range: "50 - 500",
            status: "Normal",
            flag: null,
          },
          {
            name: "Absolute Monocyte Count",
            value: {
              raw: "369.05",
              numeric: 369.05,
              text: null,
            },
            unit: "Cells/cumm",
            reference_range: "200 - 1000",
            status: "Normal",
            flag: null,
          },
          {
            name: "Mixed Cells",
            value: {
              raw: "10.80",
              numeric: 10.8,
              text: null,
            },
            unit: "%",
            reference_range: null,
            status: null,
            flag: null,
          },
        ],
      },
      {
        panel: "GLYCOSYLATED HAEMOGLOBIN (GHB/HBA1C) , WHOLE BLOOD EDTA",
        subtests: [
          {
            name: "Glycosylated Haemoglobin HbA1c",
            value: {
              raw: "5.5",
              numeric: 5.5,
              text: null,
            },
            unit: "%",
            reference_range:
              "Normal: < 5.9 HPLC Pre-Diabetes: 5.9 - 6.4 Diabetes: > 6.5",
            status: "Normal",
            flag: null,
          },
          {
            name: "Approximate Mean Plasma Glucose",
            value: {
              raw: "111.15",
              numeric: 111.15,
              text: null,
            },
            unit: null,
            reference_range: null,
            status: null,
            flag: null,
          },
        ],
      },
      {
        panel: "EGFR - GLOMERULAR FILTRATION RATE , SERUM",
        subtests: [
          {
            name: "Creatinine",
            value: {
              raw: "0.84",
              numeric: 0.84,
              text: null,
            },
            unit: "mg/dL",
            reference_range: {
              male: "0.70 - 1.20",
            },
            status: "Normal",
            flag: null,
          },
          {
            name: "eGFR - Glomerular Filtration Rate",
            value: {
              raw: "126.45",
              numeric: 126.45,
              text: null,
            },
            unit: "mL/min/1.73m²",
            reference_range:
              "Normal : >90 mL/min/1.73 m2 Mildly Decreased : 60-90 mL/min/1.73 m2 Mildly to Moderately Decreased: 45-59 mL/min/1.73 m2 Moderately to Severely Decreased: 30-44 mL/min/1.73m2 Severely Decreased: 15-29 mL/min/1.73m2 Kidney Failure: <15 mL/min/1.7m2",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "THYROID PROFILE (TFT) -I , SERUM",
        subtests: [
          {
            name: "Triiodothyronine Total (TT3)",
            value: {
              raw: "96.40",
              numeric: 96.4,
              text: null,
            },
            unit: "ng/dL",
            reference_range: "80 - 200",
            status: "Normal",
            flag: null,
          },
          {
            name: "Thyroxine (TT4)",
            value: {
              raw: "6.82",
              numeric: 6.82,
              text: null,
            },
            unit: "μg/dL",
            reference_range: "5.1-14.1",
            status: "Normal",
            flag: null,
          },
          {
            name: "Thyroid Stimulating Hormone (TSH)",
            value: {
              raw: "0.95",
              numeric: 0.95,
              text: null,
            },
            unit: "μIU/mL",
            reference_range: "0.27 - 4.2",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "RENAL FUNCTION TEST (RFT) , SERUM",
        subtests: [
          {
            name: "Urea",
            value: {
              raw: "17.9",
              numeric: 17.9,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "16.6 - 48.5",
            status: "Normal",
            flag: null,
          },
          {
            name: "Creatinine",
            value: {
              raw: "0.84",
              numeric: 0.84,
              text: null,
            },
            unit: "mg/dL",
            reference_range: {
              male: "0.70 - 1.20",
            },
            status: "Normal",
            flag: null,
          },
          {
            name: "BUN",
            value: {
              raw: "8.4",
              numeric: 8.4,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "7 - 18",
            status: "Normal",
            flag: null,
          },
          {
            name: "BUN/Cr Ratio",
            value: {
              raw: "9.95",
              numeric: 9.95,
              text: null,
            },
            unit: null,
            reference_range: null,
            status: null,
            flag: null,
          },
          {
            name: "Uric Acid",
            value: {
              raw: "6.16",
              numeric: 6.16,
              text: null,
            },
            unit: "mg/dL",
            reference_range: {
              male: "3.4 - 7.0",
              female: "2.4 - 5.7",
            },
            status: "Normal",
            flag: null,
          },
          {
            name: "Sodium",
            value: {
              raw: "140.1",
              numeric: 140.1,
              text: null,
            },
            unit: "mmol/L",
            reference_range: "135 - 150",
            status: "Normal",
            flag: null,
          },
          {
            name: "Potassium",
            value: {
              raw: "4.3",
              numeric: 4.3,
              text: null,
            },
            unit: "mmol/L",
            reference_range: "3.5 - 5.0",
            status: "Normal",
            flag: null,
          },
          {
            name: "Chloride",
            value: {
              raw: "98.9",
              numeric: 98.9,
              text: null,
            },
            unit: "mmol/L",
            reference_range: "94 - 110",
            status: "Normal",
            flag: null,
          },
          {
            name: "Calcium",
            value: {
              raw: "9.4",
              numeric: 9.4,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "8.6 - 10.0",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "LIVER FUNCTION TEST (LFT) , SERUM",
        subtests: [
          {
            name: "Total Bilirubin",
            value: {
              raw: "0.50",
              numeric: 0.5,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "< 1.2",
            status: "Normal",
            flag: null,
          },
          {
            name: "Direct Bilirubin",
            value: {
              raw: "0.20",
              numeric: 0.2,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "0 - 0.3",
            status: "Normal",
            flag: null,
          },
          {
            name: "Indirect Bilirubin",
            value: {
              raw: "0.30",
              numeric: 0.3,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "0.3 - 1.0",
            status: "Normal",
            flag: null,
          },
          {
            name: "SGOT / AST",
            value: {
              raw: "24.2",
              numeric: 24.2,
              text: null,
            },
            unit: "U/L",
            reference_range: "< 40.0",
            status: "Normal",
            flag: null,
          },
          {
            name: "SGPT / ALT",
            value: {
              raw: "50.0",
              numeric: 50.0,
              text: null,
            },
            unit: "U/L",
            reference_range: "< 42.0",
            status: "High",
            flag: null,
          },
          {
            name: "SGOT (AST) : SGPT (ALT) Ratio",
            value: {
              raw: "0.48",
              numeric: 0.48,
              text: null,
            },
            unit: "Ratio",
            reference_range: "Normal: <1",
            status: "Normal",
            flag: null,
          },
          {
            name: "Alkaline Phosphatase",
            value: {
              raw: "67.3",
              numeric: 67.3,
              text: null,
            },
            unit: "U/L",
            reference_range: "40 ‑ 129",
            status: "Normal",
            flag: null,
          },
          {
            name: "Total Protein",
            value: {
              raw: "7.82",
              numeric: 7.82,
              text: null,
            },
            unit: "g/dL",
            reference_range: "6.6 - 8.7",
            status: "Normal",
            flag: null,
          },
          {
            name: "Albumin",
            value: {
              raw: "5.06",
              numeric: 5.06,
              text: null,
            },
            unit: "g/dL",
            reference_range: "3.5 - 5.2",
            status: "Normal",
            flag: null,
          },
          {
            name: "Globulin",
            value: {
              raw: "2.76",
              numeric: 2.76,
              text: null,
            },
            unit: "g/dL",
            reference_range: "2.5 - 4.5",
            status: "Normal",
            flag: null,
          },
          {
            name: "A/G Ratio",
            value: {
              raw: "1.83",
              numeric: 1.83,
              text: null,
            },
            unit: "Ratio",
            reference_range: "1.0 - 2.1",
            status: "Normal",
            flag: null,
          },
          {
            name: "Gamma Glutamyl Transferase (GGT)",
            value: {
              raw: "23.10",
              numeric: 23.1,
              text: null,
            },
            unit: "U/L",
            reference_range: {
              male: "8 - 61",
              female: "5 - 36",
            },
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "LIPID PROFILE , SERUM",
        subtests: [
          {
            name: "Total Cholesterol",
            value: {
              raw: "175",
              numeric: 175.0,
              text: null,
            },
            unit: "mg/dL",
            reference_range:
              "Desirable : < 200 Borderline High :200 - 239 High : ≥ 240",
            status: "Normal",
            flag: null,
          },
          {
            name: "HDL Cholesterol",
            value: {
              raw: "35.0",
              numeric: 35.0,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "Low: < 40, High: > 60",
            status: "Low",
            flag: null,
          },
          {
            name: "Total Triglycerides",
            value: {
              raw: "156",
              numeric: 156.0,
              text: null,
            },
            unit: "mg/dL",
            reference_range:
              "Desirable Level : < 150 Borderline : 150-199 High : 200-499 Very High : ≥ 500",
            status: "Elevated",
            flag: null,
          },
          {
            name: "VLDL Cholesterol",
            value: {
              raw: "31.2",
              numeric: 31.2,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "≤ 30",
            status: "High",
            flag: null,
          },
          {
            name: "LDL Cholesterol",
            value: {
              raw: "108.8",
              numeric: 108.8,
              text: null,
            },
            unit: "mg/dL",
            reference_range:
              "Optimal: < 100 Above Optimal: 100 - 129 Borderline: 130 - 159 High: 160 - 189 Very High: >= 190",
            status: "Elevated",
            flag: null,
          },
          {
            name: "Non - HDL Cholesterol",
            value: {
              raw: "140",
              numeric: 140.0,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "≤ 130",
            status: "High",
            flag: null,
          },
          {
            name: "Chol / HDL Ratio",
            value: {
              raw: "5.0",
              numeric: 5.0,
              text: null,
            },
            unit: null,
            reference_range:
              "Low Risk: 3.3 - 4.4 Average Risk: 4.5 - 7.1 Moderate Risk: 7.2 - 11.0 High Risk : > 11.0",
            status: "Normal",
            flag: null,
          },
          {
            name: "TGL / HDL Ratio",
            value: {
              raw: "4.5",
              numeric: 4.5,
              text: null,
            },
            unit: null,
            reference_range:
              "Optimal: < 2.5 Mild to moderate risk: 2.5 - 5.0 High Risk: > 5.0",
            status: "Elevated",
            flag: null,
          },
          {
            name: "HDL / LDL Ratio",
            value: {
              raw: "0.3",
              numeric: 0.3,
              text: null,
            },
            unit: null,
            reference_range: null,
            status: null,
            flag: null,
          },
          {
            name: "LDL / HDL Ratio",
            value: {
              raw: "3.1",
              numeric: 3.1,
              text: null,
            },
            unit: null,
            reference_range:
              "Desirable: 0.5 - 3.0 Borderline Risk: 3.0 - 6.0 High Risk: > 6.0",
            status: "Elevated",
            flag: null,
          },
        ],
      },
      {
        panel: "BASIC IRON PROFILE",
        subtests: [
          {
            name: "Iron",
            value: {
              raw: "71.3",
              numeric: 71.3,
              text: null,
            },
            unit: "µg/dL",
            reference_range: "33 - 193",
            status: "Normal",
            flag: null,
          },
          {
            name: "Total Iron Binding Capacity",
            value: {
              raw: "340.3",
              numeric: 340.3,
              text: null,
            },
            unit: "µg/dL",
            reference_range: "250 - 450",
            status: "Normal",
            flag: null,
          },
          {
            name: "Transferrin Saturation%",
            value: {
              raw: "20.95",
              numeric: 20.95,
              text: null,
            },
            unit: null,
            reference_range: "12 - 50",
            status: "Normal",
            flag: null,
          },
          {
            name: "Unsaturated Iron Binding Capacity (UIBC)",
            value: {
              raw: "269",
              numeric: 269.0,
              text: null,
            },
            unit: "µg/dL",
            reference_range: {
              male: "125 - 345",
            },
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "HIGH SENSITIVE CRP (HSCRP) , SERUM",
        subtests: [
          {
            name: "High Sensitive CRP (hsCRP)",
            value: {
              raw: "2.96",
              numeric: 2.96,
              text: null,
            },
            unit: "mg/L",
            reference_range: "Low: < 1.0 Average: 1.0- 3.0 High risk: > 3.0",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "VITAMIN - B12 , SERUM",
        subtests: [
          {
            name: "Vitamin - B12",
            value: {
              raw: "220",
              numeric: 220.0,
              text: null,
            },
            unit: "pg/mL",
            reference_range: "Adults: 191 - 663",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "25 (OH) VITAMIN-D , SERUM",
        subtests: [
          {
            name: "25 (OH) Vitamin-D",
            value: {
              raw: "24.80",
              numeric: 24.8,
              text: null,
            },
            unit: "ng/mL",
            reference_range:
              "Deficient: ≤ 20 Insufficiency: 21-29 Desirable: ≥ 30-100",
            status: "Low",
            flag: null,
          },
        ],
      },
      {
        panel: "GLUCOSE - FASTING (FBS) , NAF PLASMA",
        subtests: [
          {
            name: "Fasting Glucose",
            value: {
              raw: "89.6",
              numeric: 89.6,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "70 - 110",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "HOMOCYSTEINE , SERUM",
        subtests: [
          {
            name: "Homocysteine",
            value: {
              raw: "40.20",
              numeric: 40.2,
              text: null,
            },
            unit: "umol/L",
            reference_range: "6-22",
            status: "High",
            flag: null,
          },
        ],
      },
      {
        panel: "FERRITIN , SERUM",
        subtests: [
          {
            name: "Ferritin",
            value: {
              raw: "84.30",
              numeric: 84.3,
              text: null,
            },
            unit: "ng/mL",
            reference_range: "30 - 400",
            status: "Normal",
            flag: null,
          },
        ],
      },
      {
        panel: "INSULIN , SERUM",
        subtests: [
          {
            name: "Insulin",
            value: {
              raw: "27.59",
              numeric: 27.59,
              text: null,
            },
            unit: "uU/mL",
            reference_range: "2.6 - 24.9",
            status: "High",
            flag: null,
          },
        ],
      },
      {
        panel:
          "CUE - COMPLETE URINE ANALYSIS (AUTOMATED REAGENT STRIP METHOD AND MICROSCOPY) , URINE",
        subtests: [
          {
            name: "Volume",
            value: {
              raw: "NA",
              numeric: null,
              text: "NA",
            },
            unit: "mL",
            reference_range: null,
            status: null,
            flag: null,
          },
          {
            name: "Colour",
            value: {
              raw: "Yellow",
              numeric: null,
              text: "Yellow",
            },
            unit: null,
            reference_range: "Pearly white",
            status: "Abnormal",
            flag: null,
          },
          {
            name: "Appearance",
            value: {
              raw: "Clear",
              numeric: null,
              text: "Clear",
            },
            unit: null,
            reference_range: "Clear",
            status: "Normal",
            flag: null,
          },
          {
            name: "pH",
            value: {
              raw: "6.0",
              numeric: 6.0,
              text: null,
            },
            unit: null,
            reference_range: "5.0 - 8.5",
            status: "Normal",
            flag: null,
          },
          {
            name: "Specific Gravity",
            value: {
              raw: "1.015",
              numeric: 1.015,
              text: null,
            },
            unit: null,
            reference_range: "1.005 - 1.030",
            status: "Normal",
            flag: null,
          },
          {
            name: "Albumin Urine/ Protein Urine",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Glucose",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Ketone Bodies",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Bilirubin",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Urobilinogen",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Blood",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Nitrite",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Leukocyte esterase",
            value: {
              raw: "Negative",
              numeric: null,
              text: "Negative",
            },
            unit: null,
            reference_range: "Negative",
            status: "Normal",
            flag: null,
          },
          {
            name: "Pus Cells (Leucocytes)",
            value: {
              raw: "2-3",
              numeric: null,
              text: "2-3",
            },
            unit: "/hpf",
            reference_range: "0 - 5",
            status: "Normal",
            flag: null,
          },
          {
            name: "Epithelial Cells",
            value: {
              raw: "1-2",
              numeric: null,
              text: "1-2",
            },
            unit: "/hpf",
            reference_range: "0 - 5",
            status: "Normal",
            flag: null,
          },
          {
            name: "RBCs",
            value: {
              raw: "Nil",
              numeric: null,
              text: "Nil",
            },
            unit: "/hpf",
            reference_range: "Nil",
            status: "Normal",
            flag: null,
          },
          {
            name: "Casts",
            value: {
              raw: "Nil",
              numeric: null,
              text: "Nil",
            },
            unit: null,
            reference_range: "Nil",
            status: "Normal",
            flag: null,
          },
          {
            name: "Crystals",
            value: {
              raw: "Nil",
              numeric: null,
              text: "Nil",
            },
            unit: null,
            reference_range: "Nil",
            status: "Normal",
            flag: null,
          },
          {
            name: "Bacteria",
            value: {
              raw: "None seen",
              numeric: null,
              text: "None seen",
            },
            unit: null,
            reference_range: "None seen",
            status: "Normal",
            flag: null,
          },
          {
            name: "Budding Yeast Cells",
            value: {
              raw: "None seen",
              numeric: null,
              text: "None seen",
            },
            unit: null,
            reference_range: "None seen",
            status: "Normal",
            flag: null,
          },
          {
            name: "Others",
            value: {
              raw: "Nil",
              numeric: null,
              text: "Nil",
            },
            unit: null,
            reference_range: "Nil",
            status: "Normal",
            flag: null,
          },
        ],
      },
    ],
  };

  console.log("====================================");
  console.log(LabReport);
  console.log("====================================");
  return (
    <>
      <LabReportHeader action={true} />
      <section>
        <div className="w-[60%]">
          <TestResultes tests={LabReport.tests} />
        </div>
      </section>
    </>
  );
};

export default LabReport;
