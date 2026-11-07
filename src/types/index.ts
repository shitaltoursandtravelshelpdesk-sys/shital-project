export type ServiceKey = "airport" | "local" | "outstation" | "bus";
export type VehicleKey = "Car" | "Bus" | "Not sure";

/** Booking as saved by the request form (all values come from FormData, so strings). */
export interface Booking {
  service: string;
  bookingFor: string;
  name: string;
  mobile: string;
  email: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: string;
  duration: string;
  customDays?: string;
  vehicle: string;
  passengers: string;
  notes: string;
  instructions?: string;
  payment?: "now" | "later";
}

export interface Vehicle {
  name: string;
  desc: string;
  rate: number;
}

export interface Fare {
  v: Vehicle;
  d: number;
  rental: number;
  tolls: number;
  allowance: number;
  total: number;
}

export interface ConfirmedBooking extends Booking {
  id: string;
  fare: Fare;
  confirmedAt: number;
}

export interface DriverApplication {
  name: string;
  mobile: string;
  email: string;
  city: string;
  licenceNo: string;
  experience: string;
  years: string;
  work: string;
  licenceFile: string;
  appliedOn: string;
}

export interface Trip {
  id: string;
  driverPhone: string;
  driverName: string;
  guest: string;
  guestPhone: string;
  pickup: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  drop: string;
  dropAddress: string;
  dropLat: number;
  dropLng: number;
  date: string;
  time: string;
  passengers: number;
  vehicle: string;
  vehicleNo: string;
  assignedBy: string;
  adminPhone: string;
  amount: number;
  instructions: string;
}
