import AppointmentDetailHeaderCard from "../book/components/appointment-detail-header-card";
import AppointmentDetailProgress from "../book/components/appointment-detail-progress";
import PeopleInvolved from "../book/components/people-involved-card";

const AppointmentDetail = () => {
  return (
    <>
      <AppointmentDetailHeaderCard />

      <AppointmentDetailProgress />

      <PeopleInvolved />
    </>
  );
};

export default AppointmentDetail;
