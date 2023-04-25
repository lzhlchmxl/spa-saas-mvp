import { RecordInterface } from "../models/record.model";
import { VendorServiceInterface } from "../models/vendorService.model";

// [TODO]
export function getUnavailableDates(occupiedRecords: RecordInterface[], bookingService: VendorServiceInterface): Date[] {

  const today = new Date();
  const twoDaysInTheFuture = new Date();
  twoDaysInTheFuture.setDate(today.getDate() + 2);
  const fourDaysInTheFuture = new Date();
  fourDaysInTheFuture.setDate(today.getDate() + 4);

  return [today, twoDaysInTheFuture, fourDaysInTheFuture];
}

// [TODO]
export function getAvailablePractitionersWithAvailableTimes(sortedOccupiedRecordsForSelectedDate: RecordInterface[], serviceDurationInSeconds: number, startHourOfOperation: number, endHourOfOperation: number):{ practitioner: { practitionerId: string, practitionerName: string }, startTime: Date}[] {
  
  const availablePractitionersWithAvailableTimes = [
    { 
      practitioner: {
        practitionerId: "642a6d90b9adb519597dc15d",
        practitionerName: "Bill L",
      },
      startTime: new Date('April 4, 2023, 12:30:00'),
    },
    { 
      practitioner: {
        practitionerId: "642a6d90b9adb519597dc15d",
        practitionerName: "Bill L",
      },
      startTime: new Date('April 4, 2023, 13:30:00'),
    },
    { 
      practitioner: {
        practitionerId: "642a6d90b9adb519597dc15d",
        practitionerName: "Bill L",
      },
      startTime: new Date('April 4, 2023, 15:00:00'),
    },
    { 
      practitioner: {
        practitionerId: "642a6d79b9adb519597dc142",
        practitionerName: "Tracy F",
      },
      startTime: new Date('April 4, 2023, 10:00:00'),
    },
    { 
      practitioner: {
        practitionerId: "642a6d79b9adb519597dc142",
        practitionerName: "Tracy F",
      },
      startTime: new Date('April 4, 2023, 11:00:00'),
    },
    { 
      practitioner: {
        practitionerId: "642a6d79b9adb519597dc142",
        practitionerName: "Tracy F",
      },
      startTime: new Date('April 4, 2023, 12:30:00'),
    }
  ]

  return availablePractitionersWithAvailableTimes;
}