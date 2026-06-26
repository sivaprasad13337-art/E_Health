import AppointmentDetailHeaderCard from "../book/components/appointment-detail-page-comps/appointment-detail-header-card";
import AppointmentDetailProgress from "../book/components/appointment-detail-page-comps/appointment-detail-progress";
import AppointmentDetailsCard from "../book/components/appointment-detail-page-comps/appointment-details-card";
import AppoitmentReportsAndDocuments from "../book/components/appointment-detail-page-comps/appointment-reports-documents";
import AppointmentPaymentAndFollowUpCards from "../book/components/appointment-detail-page-comps/appoitment-paymentandfollowup";
import PeopleInvolved from "../book/components/appointment-detail-page-comps/people-involved-card";

const AppointmentDetail = () => {
  return (
    <>
      <AppointmentDetailHeaderCard />

      <AppointmentDetailProgress />

      <PeopleInvolved />

      <section className="flex gap-6">
        <div className="w-[60%]">
          <AppointmentDetailsCard />
        </div>

        <div className="w-[40%]">
          <AppointmentPaymentAndFollowUpCards />
        </div>
      </section>

      <AppoitmentReportsAndDocuments />
    </>
  );
};

export default AppointmentDetail;
