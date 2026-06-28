from google import genai
from dotenv import load_dotenv
import os
import json
import re
import pdfplumber

load_dotenv()        


def extract_text_from_pdf(pdf_path):
    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text

# from pathlib import Path

# BASE_DIR = Path(__file__).resolve().parent

# pdf_path = BASE_DIR.parent / "data" / "reports" / "Mr.SIVA PRASAD_APF117.pdf"

# text = pdf_path
# print()



def structure_with_ai(content):

    client = genai.Client(
        api_key=os.getenv("GEMINI_GENAI_KEY")
    )
    
    SCHEMA = """{
  "patient_name": null,
  "lab_details": {
    "name": null,
    "location": null,
    "collected": null,
    "reported": null
  },
  "tests": [
    {
      "panel": "Complete Blood Count (CBC)",
      "subtests": [
        {
          "name": "Hemoglobin",
          "value": {"raw": "18.8", "numeric": 18.8, "text": null},
          "unit": "g/dL",
          "reference_range": "13.5-17.5" or {"male": "13.0-17.0", "female": "11.5-15.0", "children": "11.5-14.5"},
          "status": "Low or Normal or Elevated or High"
          "flag":"L"
        },
        {
          "name": "WBC",
          "value": 7500,
          "unit": "/uL",
          "reference_range": "4000-11000" or {"male": "4000-11000", "female": "4000-11000", "children": "4000-11000"},
          "status": "Low or Normal or Elevated or High"
          "flag":"L"
        }
      ]
    }
  ]
}"""

    prompt = f"""
    You are an expert laboratory report parser.

Your task is to extract information from the provided lab report.

Rules:
- Return ONLY valid JSON.
- Do NOT wrap the response in ```json or markdown.
- Do NOT include explanations.
- If a field is missing, return null.
- Do NOT guess or invent values.
- Preserve units exactly as written.
- Preserve reference ranges exactly as written.
- Preserve abnormal flags (High, Low, Normal, Critical, Positive, Negative, etc.) if present.
- If no status is explicitly written, determine it by comparing the value against the reference range.
- Reports may contain multiple test panels.

Return JSON in this Schema:

{SCHEMA}


"Lap Report" : {content}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    cleaned = re.sub(r"```json|```", "", response.text).strip()

    return json.loads(cleaned)
    
    # return response.text

# print(ask_ai(extract_text_from_pdf(text)))

def parse_lab_report(pdf):
    text = extract_text_from_pdf(pdf)
    result = structure_with_ai(text)
    
    return result
    