export const root = "/";

export const auth_path = "/auth";
export const login_path = "/login";
export const registor_path = "/sign-up";
export const forget_password_path = "/forget-password";

export const actions = `/actions`;
export const dashboard = `${actions}/dashboard`;
export const profile = `${actions}/profile`;

export const appointment = `/appointments`;
export const bookAppointment = `${appointment}/book-appointment`;
export const appointmentStatus = `${appointment}/appointment-status`;
export const appointmentHistoy = `${appointment}/appointment-history`;

export const patients = `/patients`;

export const doctors = `/doctors`;
export const doctorProfile = `${doctors}/doctor`;
export const my_doctors = `${doctors}/my-doctors`;
export const browse_doctors = `${doctors}/browse-doctors`;
export const doctors_requests = `${doctors}/requests`;

export const medicalRecords = `/medical-records`;
export const medicalReport = `${medicalRecords}/medical-reports`;
export const detailedMedicalReport = `${medicalReport}/report`;
export const diagnosis = `${medicalRecords}/diagnosis`;
export const medicalHistory = `${medicalRecords}/medical-history`;
export const medicalHistory_form = `${medicalRecords}/medical-history-form`;

export const payments = `/payments`;
export const transaction = `${payments}/transactions`;
export const refunds = `${payments}/refunds`;
export const paymentAnalytics = `${payments}/analytics`;
// export const doctor_payments_dashboard = `${payments}`;

export const appointment_service = `service`;
export const appointment_personal_details = `personal-details`;
export const appointment_add_ons = `add-ons`;
export const appointment_appointment = `appointment`;
export const appointment_payment = `payment`;
export const appointment_confirmation = `confirmation`;

export const settings = `/settings/*`;
export const set_profile_info = `edit-profile`;
export const availability_settings = `availability`;
export const notifications_settings = `notifications`;
export const password_settings = `password`;
export const practice_info_settings = `practice-info`;
export const privacy_settings = `privacy`;
