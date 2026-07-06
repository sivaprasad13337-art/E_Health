// import * as React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  // Line,
  // Svg,
} from "@react-pdf/renderer";
import { useOrderStore } from "@/zustand/appointment";
import { formatDateForBill, formateDateAndTime } from "@/lib/utils";
import { Download } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface InvoiceData {
  invoice_id: string;
  appointment_id: string;
  patient: {
    name: string;
    email: string;
    phone: string;
  };
  doctor: {
    name: string;
    specialization: string;
    hospital: string;
  };
  appointment: {
    date: string; // "16 Jun 2026, 10:30 AM"
    type: string; // "In-person"
    department: string;
  };
  payment: {
    date: string; // "14 June 2026, 9:44 AM"
    method: string; // "Card •••• 4242"
    gateway: string; // "Razorpay"
    transaction_id: string;
    status: "paid" | "pending" | "failed";
  };
  pricing: {
    consultation_fee: number;
    platform_fee: number;
    gst_rate: number; // 18
    discount: number;
    subtotal: number;
    gst_amount: number;
    total: number;
  };
  gstin: string; // "33ABCDE1234F1Z5"
}

// ─── Colours ─────────────────────────────────────────────────────────────────
const C = {
  teal: "#1A9E8F",
  tealLight: "#E1F5EE",
  tealDark: "#0a4f47",
  textPri: "#1a1a1a",
  textSec: "#555555",
  textTer: "#999999",
  bg: "#F4F7F9",
  border: "#dddddd",
  white: "#ffffff",
  green: "#0F6E56",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: C.textPri,
    backgroundColor: C.white,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: C.teal,
    borderBottomStyle: "solid",
    paddingBottom: 20,
    marginBottom: 28,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: C.teal,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { color: C.white, fontSize: 16, fontFamily: "Helvetica-Bold" },
  brandName: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.textPri },
  brandSub: { fontSize: 9, color: C.textTer, marginTop: 2 },
  titleBlock: { alignItems: "flex-end" },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.teal,
    letterSpacing: 1,
  },
  invoiceNum: {
    fontSize: 9,
    color: C.textTer,
    marginTop: 4,
    fontFamily: "Courier",
  },
  paidBadge: {
    marginTop: 6,
    backgroundColor: C.tealLight,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  paidText: { fontSize: 9, color: C.green, fontFamily: "Helvetica-Bold" },

  // Meta row
  metaRow: { flexDirection: "row", gap: 20, marginBottom: 22 },
  metaBlock: { flex: 1 },
  metaLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.textTer,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  metaVal: { fontSize: 10, color: C.textPri, lineHeight: 1.6 },
  metaBold: { fontFamily: "Helvetica-Bold" },
  metaMono: { fontFamily: "Courier", fontSize: 9, color: C.textSec },

  // Appointment strip
  aptStrip: {
    backgroundColor: C.bg,
    borderRadius: 6,
    padding: 14,
    flexDirection: "row",
    gap: 0,
    marginBottom: 24,
  },
  aptItem: { flex: 1 },
  aptLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.textTer,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  aptVal: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.textPri },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.teal,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    borderBottomStyle: "solid",
  },
  tableRowLast: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  colDesc: { flex: 3 },
  colQty: { flex: 0.6, textAlign: "center" },
  colRate: { flex: 1, textAlign: "right" },
  colAmt: { flex: 1, textAlign: "right" },
  itemName: { fontSize: 10, color: C.textPri, marginBottom: 2 },
  itemDesc: { fontSize: 9, color: C.textTer },
  itemQty: { fontSize: 10, color: C.textSec, textAlign: "center" },
  itemRate: { fontSize: 10, color: C.textSec, textAlign: "right" },
  itemAmt: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.textPri,
    textAlign: "right",
  },

  // Totals
  totalsWrap: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
    marginBottom: 24,
  },
  totalsInner: { width: 220 },
  totRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totLabel: { fontSize: 10, color: C.textSec },
  totVal: { fontSize: 10, color: C.textSec },
  totDiscount: { color: C.green },
  totDivider: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    borderTopStyle: "solid",
    marginVertical: 6,
  },
  totFinalLabel: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.teal },
  totFinalVal: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.teal },

  // Payment confirmation
  payConfirm: {
    backgroundColor: C.tealLight,
    borderRadius: 6,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },
  payCheckCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.teal,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  payCheckText: { color: C.white, fontSize: 13, fontFamily: "Helvetica-Bold" },
  payConfirmText: { fontSize: 10, color: C.green, flex: 1, lineHeight: 1.5 },
  payConfirmBold: { fontFamily: "Helvetica-Bold" },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    borderTopStyle: "solid",
    paddingTop: 18,
  },
  footerNote: { fontSize: 9, color: C.textTer, lineHeight: 1.6, maxWidth: 300 },
  footerSign: { alignItems: "flex-end" },
  sigLine: {
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    marginBottom: 4,
  },
  sigLabel: { fontSize: 8, color: C.textTer },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

// ─── Invoice Document ─────────────────────────────────────────────────────────
const InvoiceDocument = ({ data }: { data: InvoiceData }) => {
  const { pricing } = data;

  return (
    <Document
      title={`Invoice ${data.invoice_id}`}
      author="E-Hospital"
      subject="Appointment Payment Invoice"
    >
      <Page size="A4" style={S.page}>
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <View style={S.header}>
          {/* Brand */}
          <View style={S.brand}>
            <View style={S.logoBox}>
              <Text style={S.logoText}>+</Text>
            </View>
            <View>
              <Text style={S.brandName}>E-Hospital</Text>
              <Text style={S.brandSub}>
                Acme Health Pvt. Ltd. · Chennai, India
              </Text>
            </View>
          </View>

          {/* Title block */}
          <View style={S.titleBlock}>
            <Text style={S.invoiceTitle}>INVOICE</Text>
            <Text style={S.invoiceNum}>#{data.invoice_id}</Text>
            <View style={S.paidBadge}>
              <Text style={S.paidText}>✓ PAID</Text>
            </View>
          </View>
        </View>

        {/* ── META ROW ───────────────────────────────────────────────── */}
        <View style={S.metaRow}>
          {/* Billed to */}
          <View style={S.metaBlock}>
            <Text style={S.metaLabel}>Billed to</Text>
            <Text style={[S.metaVal, S.metaBold]}>{data.patient.name}</Text>
            <Text style={S.metaVal}>{data.patient.email}</Text>
            <Text style={S.metaVal}>{data.patient.phone}</Text>
          </View>

          {/* Dates */}
          <View style={S.metaBlock}>
            <Text style={S.metaLabel}>Invoice date</Text>
            <Text style={S.metaVal}>{data.payment.date.split(",")[0]}</Text>
            <Text style={[S.metaLabel, { marginTop: 8 }]}>Payment date</Text>
            <Text style={S.metaVal}>{data.payment.date}</Text>
          </View>

          {/* Payment method */}
          <View style={S.metaBlock}>
            <Text style={S.metaLabel}>Payment method</Text>
            <Text style={S.metaVal}>{data.payment.method}</Text>
            <Text style={S.metaVal}>via {data.payment.gateway}</Text>
            <Text style={[S.metaLabel, { marginTop: 8 }]}>Transaction ID</Text>
            <Text style={S.metaMono}>{data.payment.transaction_id}</Text>
          </View>
        </View>

        {/* ── APPOINTMENT STRIP ──────────────────────────────────────── */}
        <View style={S.aptStrip}>
          <View style={S.aptItem}>
            <Text style={S.aptLabel}>Doctor</Text>
            <Text style={S.aptVal}>{data.doctor.name}</Text>
          </View>
          <View style={S.aptItem}>
            <Text style={S.aptLabel}>Specialty</Text>
            <Text style={S.aptVal}>{data.doctor.specialization}</Text>
          </View>
          <View style={S.aptItem}>
            <Text style={S.aptLabel}>Date & time</Text>
            <Text style={S.aptVal}>{data.appointment.date}</Text>
          </View>
          <View style={S.aptItem}>
            <Text style={S.aptLabel}>Booking ID</Text>
            <Text style={[S.aptVal, { fontFamily: "Courier", fontSize: 9 }]}>
              #{data.appointment_id}
            </Text>
          </View>
        </View>

        {/* ── TABLE ──────────────────────────────────────────────────── */}
        {/* Table header */}
        <View style={S.tableHeader}>
          <Text style={[S.tableHeaderText, S.colDesc]}>Description</Text>
          <Text style={[S.tableHeaderText, S.colQty, { textAlign: "center" }]}>
            Qty
          </Text>
          <Text style={[S.tableHeaderText, S.colRate, { textAlign: "right" }]}>
            Rate
          </Text>
          <Text style={[S.tableHeaderText, S.colAmt, { textAlign: "right" }]}>
            Amount
          </Text>
        </View>

        {/* Row 1: Consultation */}
        <View style={S.tableRow}>
          <View style={S.colDesc}>
            <Text style={S.itemName}>
              {data.doctor.specialization} Consultation
            </Text>
            <Text style={S.itemDesc}>
              {data.appointment.type} · {data.doctor.hospital}
            </Text>
          </View>
          <Text style={[S.colQty, S.itemQty]}>1</Text>
          <Text style={[S.colRate, S.itemRate]}>
            {fmt(pricing.consultation_fee)}
          </Text>
          <Text style={[S.colAmt, S.itemAmt]}>
            {fmt(pricing.consultation_fee)}
          </Text>
        </View>

        {/* Row 2: Platform fee */}
        <View style={S.tableRowLast}>
          <View style={S.colDesc}>
            <Text style={S.itemName}>Platform service fee</Text>
            <Text style={S.itemDesc}>Booking & processing charge</Text>
          </View>
          <Text style={[S.colQty, S.itemQty]}>1</Text>
          <Text style={[S.colRate, S.itemRate]}>
            {fmt(pricing.platform_fee)}
          </Text>
          <Text style={[S.colAmt, S.itemAmt]}>{fmt(pricing.platform_fee)}</Text>
        </View>

        {/* ── TOTALS ─────────────────────────────────────────────────── */}
        <View style={S.totalsWrap}>
          <View style={S.totalsInner}>
            <View style={S.totRow}>
              <Text style={S.totLabel}>Subtotal</Text>
              <Text style={S.totVal}>{fmt(pricing.subtotal)}</Text>
            </View>
            <View style={S.totRow}>
              <Text style={S.totLabel}>GST ({pricing.gst_rate}%)</Text>
              <Text style={S.totVal}>{fmt(pricing.gst_amount)}</Text>
            </View>
            {pricing.discount > 0 && (
              <View style={S.totRow}>
                <Text style={[S.totLabel, S.totDiscount]}>Discount</Text>
                <Text style={[S.totVal, S.totDiscount]}>
                  −{fmt(pricing.discount)}
                </Text>
              </View>
            )}
            <View style={S.totDivider} />
            <View style={S.totRow}>
              <Text style={S.totFinalLabel}>Total paid</Text>
              <Text style={S.totFinalVal}>{fmt(pricing.total)}</Text>
            </View>
          </View>
        </View>

        {/* ── PAYMENT CONFIRMATION ───────────────────────────────────── */}
        <View style={S.payConfirm}>
          <View style={S.payCheckCircle}>
            <Text style={S.payCheckText}>✓</Text>
          </View>
          <Text style={S.payConfirmText}>
            <Text style={S.payConfirmBold}>
              Payment successfully received.{" "}
            </Text>
            This invoice confirms full payment for the above consultation. No
            further action required.
          </Text>
        </View>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <View style={S.footer}>
          <Text style={S.footerNote}>
            This is a computer-generated invoice and does not require a physical
            signature.{"\n"}For queries, contact support@ehospital.com or call
            +91 1800-123-4567.{"\n"}GSTIN: {data.gstin}
          </Text>
          <View style={S.footerSign}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>Authorized signatory</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ─── Download Button ──────────────────────────────────────────────────────────
interface InvoiceDownloadButtonProps {
  // data: InvoiceData;
  className?: string;
}

export const InvoiceDownloadButton = ({
  className,
}: InvoiceDownloadButtonProps) => {
  const { Order } = useOrderStore();
  const data = {
    invoice_id: Order?.razorpay_payment_id,
    appointment_id: Order?.appointment.appointment_code,
    patient: {
      name: `Mr. ${Order?.appointment.patient.user.first_name} ${Order?.appointment.patient.user.last_name}`,
      email: Order?.appointment.patient.user.email,
      phone: Order?.appointment.patient.user.phone,
    },
    doctor: {
      name: `Dr. ${Order?.appointment.doctor.user.first_name} ${Order?.appointment.doctor.user.last_name}`,
      specialization: Order?.appointment.doctor.specialization.name,
      hospital: Order?.appointment.doctor.location,
    },
    appointment: {
      date: formatDateForBill(Order?.appointment.date || ""), // "16 Jun 2026, 10:30 AM"
      type: Order?.appointment.appointment_type, // "In-person"
      department: Order?.appointment.doctor.department.name,
    },
    payment: {
      date: `${formateDateAndTime(Order?.created_at || "")[0]} ${formateDateAndTime(Order?.created_at || "")[1]}`, // "14 June 2026, 9:44 AM"
      method: Order?.payment_method, // "Card •••• 4242"
      gateway: "Razorpay", // "Razorpay"
      transaction_id: Order?.razorpay_payment_id,
      status: Order?.transaction_status,
    },
    pricing: {
      consultation_fee: Order?.appointment.doctor.consultation_fee,
      platform_fee: "Nil",
      gst_rate: "18", // 18
      discount: Order?.discount,
      subtotal: Order?.amount_paid,
      gst_amount: "Nil",
      total: Order?.amount_paid,
    },
    gstin: "33ABCDE1234F1Z5", // "33ABCDE1234F1Z5"
  };

  return (
    <PDFDownloadLink
      document={<InvoiceDocument data={data} />}
      fileName={`invoice-${data.invoice_id}.pdf`}
      className={className}
    >
      {/* <Download />{" "} */}
      {({ loading, error }) => {
        if (error) return "Error generating PDF";
        if (loading) return "Preparing invoice...";
        return <p className="font-bold flex justify-center gap-3"><Download className="w-5 h-5 mt-0.5"/> Download Invoice</p>;
      }}
    </PDFDownloadLink>
  );
};

// ─── Usage example (payment success page) ─────────────────────────────────────
/*
import { InvoiceDownloadButton } from './InvoiceDocument';

// Build this from your API response (orderData + verifyPayment response)
const invoiceData: InvoiceData = {
  invoice_id:      "INV-20260616-084",
  appointment_id:  "APT-20260616-084",
  patient: {
    name:  "Alex Kumar",
    email: "alex@email.com",
    phone: "+91 98765 43210",
  },
  doctor: {
    name:           "Dr. Meera Nair",
    specialization: "Cardiology",
    hospital:       "Apollo Hospital, Chennai",
  },
  appointment: {
    date:       "16 Jun 2026, 10:30 AM",
    type:       "In-person",
    department: "Cardiac Sciences",
  },
  payment: {
    date:           "14 June 2026, 9:44 AM",
    method:         "Card •••• 4242",
    gateway:        "Razorpay",
    transaction_id: "pay_RZP20260616A084",
    status:         "paid",
  },
  pricing: {
    consultation_fee: 800,
    platform_fee:     49,
    gst_rate:         18,
    discount:         0,
    subtotal:         849,
    gst_amount:       153,
    total:            1002,
  },
  gstin: "33ABCDE1234F1Z5",
};

// In your payment success/confirmation component:
function PaymentSuccess() {
  return (
    <div className="flex gap-3 justify-center mt-6">
      <InvoiceDownloadButton
        data={invoiceData}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border text-sm font-medium hover:bg-muted"
      />
      <Button onClick={() => navigate('/dashboard')}>
        Go to Home
      </Button>
    </div>
  );
}
*/

export default InvoiceDocument;
