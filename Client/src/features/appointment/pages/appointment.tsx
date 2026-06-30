import { useParams } from "react-router-dom";
import AppointmentDetailHeaderCard from "../book/components/appointment-detail-page-comps/appointment-detail-header-card";
import AppointmentDetailProgress from "../book/components/appointment-detail-page-comps/appointment-detail-progress";
import AppointmentDetailsCard from "../book/components/appointment-detail-page-comps/appointment-details-card";
import AppoitmentReportsAndDocuments from "../book/components/appointment-detail-page-comps/appointment-reports-documents";
import AppointmentPaymentAndFollowUpCards from "../book/components/appointment-detail-page-comps/appoitment-paymentandfollowup";
import PeopleInvolved from "../book/components/appointment-detail-page-comps/people-involved-card";
import { useEffect, useState } from "react";
import { getAppointmentByCode } from "@/api/appointment";
import { GetBillByAPt } from "@/api/payment-services";
import type { Appointment } from "../interface/interface";
import type { BillingDetail } from "@/types/payment";

const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState<Appointment>();
  const [bill, setBill] = useState<BillingDetail>();
  const { id } = useParams();
  console.log("====================================");
  console.log(id);
  console.log("====================================");

  useEffect(() => {
    const getAppointment = async () => {
      const data = await getAppointmentByCode(id);
      const Bill = await GetBillByAPt(data.id);

      setAppointment(data);
      if (Bill) setBill(Bill);
    };

    getAppointment();
  }, []);

  return (
    appointment && (
      <>
        <AppointmentDetailHeaderCard appointment={appointment} />

        <AppointmentDetailProgress appointment={appointment} bill={bill} />

        <PeopleInvolved patient={appointment.patient} doctor={appointment.doctor}/>

        <section className="flex gap-6">
          <div className="w-[60%]">
            <AppointmentDetailsCard appointment={appointment}/>
          </div>

          <div className="w-[40%]">
            {bill && <AppointmentPaymentAndFollowUpCards bill={bill}/>}
          </div>
        </section>

        <AppoitmentReportsAndDocuments />
      </>
    )
  );
};

export default AppointmentDetail;
