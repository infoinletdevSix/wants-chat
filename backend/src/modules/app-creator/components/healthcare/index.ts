/**
 * Healthcare Component Generators Index
 */

// Core Healthcare
export { generatePatientProfile, generateMedicalHistory, type PatientProfileOptions } from './patient-profile.generator';
export { generateAppointmentCalendar, generateAppointmentForm, type AppointmentCalendarOptions } from './appointment-calendar.generator';
export { generateDoctorGrid, generateDoctorProfile, generateDoctorSchedule, type DoctorGridOptions } from './doctor-grid.generator';

// Dental
export {
  generateAppointmentCalendarDental,
  generateBillingStatsDental,
  generatePatientProfileDental,
  generateDentistProfile,
  generateDentistSchedule,
  generateDentalStats,
  type DentalOptions,
} from './dental.generator';

// Veterinary
export {
  generateAppointmentCalendarVet,
  generateBillingStatsVet,
  generatePatientProfileVet,
  generateVetProfile,
  generateVetSchedule,
  generateVetClinicStats,
  generateVetSearch,
  generateMedicalRecordsVet,
  generatePatientFiltersVet,
  type VetOptions,
} from './vet.generator';

// Rehabilitation / Physical Therapy
export {
  generateAppointmentListTodayRehab,
  generatePatientProfileRehab,
  generatePatientProgressOverview,
  generateRehabStats,
  generateTherapistSchedule,
  type RehabOptions,
} from './rehab.generator';

// Pharmacy
export {
  generatePrescriptionListPending,
  generateCustomerPrescriptions,
  generatePharmacyStats,
  generateMedicationScheduleToday,
  type PharmacyOptions,
} from './pharmacy.generator';

// Healthcare Specialties
export {
  // Chiropractic
  generateChiropractorStats,
  generateSpineAssessment,
  generateAdjustmentHistory,
  // Dermatology
  generateDermatologyStats,
  generateSkinConditionTracker,
  generateBiopsyTracker,
  // Pediatrics
  generatePediatricsStats,
  generateGrowthChart,
  generateVaccinationSchedule,
  // Mental Health
  generateMentalHealthStats,
  generateTherapySessionNotes,
  generateMoodTracker,
  // Radiology
  generateRadiologyStats,
  generateImagingQueue,
  generateScanViewer,
  // Home Care
  generateHomeCareStats,
  generateVisitScheduleMap,
  generateCaregiverAssignment,
  // Lab/Diagnostics
  generateLabStats,
  generateLabResults,
  generateTestOrderForm,
  // All specialty generators share the same options interface.
  type HealthcareSpecialtyOptions,
} from './healthcare-specialties.generator';
