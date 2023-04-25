import { useState } from "react";
import Button from "../../../app/UIComponents/Button";
import ContentPageTopButtons from "../../../app/UIComponents/ContentPageTopButtons";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import { bookService, findAvailablePractitionersAndStartingTimes, getSpaDetailsById, getUnavailableDatesByServiceId } from "../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../utilities/customHooks";
import { secondsToDuration } from "../../../utilities/utilityFunctions";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as T from "../../../utilities/types";

export default function ViewSpaDetails() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState("");
  const spaId = useRequiredParams('spaId');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [selectedBookingDate, setSelectedBookingDate] = useState<Date | null>(null);


  const [availablePractitionersAndStartingTimes, setAvailablePractitionersAndStartingTimes] = useState<T.AvailablePractitionerWithAvailableTime[]>([]);

  const [availablePractitioners, setAvailablePractitioners] = useState<{ practitionerId: string, practitionerName: string }[]>([]);
  const [availableStartingTimes, setAvailableStartingTimes] = useState<Date[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<{
    practitionerId: string;
    practitionerName: string;
}>({practitionerId: "", practitionerName: ""});
  const [selectedBookingDateTime, setSelectedBookingDateTime] = useState<Date | null>(null);

  const spaDetailsAsync = useAsync(() => getSpaDetailsById(spaId), []);

  if (spaDetailsAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (spaDetailsAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const spaDetails = spaDetailsAsync.value;

  const handleBookService = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setIsModalOpen(true);
  }

  const handleBookNextAvailableService = (serviceId: string) => {
    window.alert("Under construction.");
  }

  const serviceHTML = spaDetails.services.map((service) => {
    const duration = secondsToDuration(service.durationInSeconds);
  
    return (
      <div 
        key={service._id}
        className="p-5 rounded-lg shadow-lg my-5 relative border border-white/50"
      >
        <div className="absolute top-4 right-4">
        <Button 
          actionType="primary"
          actionText="Book Service" 
          actionHandler={() => handleBookService(service._id)}        
        />
        <Button 
          actionType="secondary"
          actionText="Book Next Available" 
          actionHandler={() => handleBookNextAvailableService(service._id)}        
        />
        </div>
        <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
        <p className="text-gray-700 mb-2">{service.description}</p>
        <p className="text-accent font-bold text-lg mb-2">
          Cost Per Session: {service.cost}
        </p>
        <p className="text-primary font-bold mb-2">
          Duration: {duration.hours}h {duration.minutes}m
        </p>
      </div>
    );
  });

  const afterOpenModal = async () => {
    setIsModalLoading(true);
    setUnavailableDates(await getUnavailableDatesByServiceId(spaId, bookingServiceId));
    setIsModalLoading(false);
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setAvailablePractitioners([])
    setUnavailableDates([])
    setAvailablePractitionersAndStartingTimes([])
    setSelectedBookingDate(null)
    setAvailableStartingTimes([])
    setSelectedPractitioner({practitionerId: "", practitionerName: ""})
    setSelectedBookingDateTime(null)
  }

  const handleBookingDateSelected = async (date: Date | null) => {
    setSelectedBookingDate(date);
    if (date !== null) {
      setIsModalLoading(true);
      const availablePractitionersAndStartingTimes = await findAvailablePractitionersAndStartingTimes(date, spaId, bookingServiceId);
      
      setAvailablePractitionersAndStartingTimes(availablePractitionersAndStartingTimes);

      // [TODO]!!!!!!!!!! Order n^2, not cool!!!!!!!!!!!!
      const uniqueAvailablePractitionerIds: string[] = [];
      const availablePractitioners = availablePractitionersAndStartingTimes.map( availablePractitionerAndStartingTime => availablePractitionerAndStartingTime.practitioner);
      
      const uniqueAvailablePractitioner = availablePractitioners.filter( availablePractitioner => {
        let isUnique = true;
        uniqueAvailablePractitionerIds.forEach( uniqueAvailablePractitionerId => {
          if (uniqueAvailablePractitionerId === availablePractitioner.practitionerId) {
            isUnique = false;
          }
        })
        if (isUnique) {
          uniqueAvailablePractitionerIds.push(availablePractitioner.practitionerId);
          return availablePractitioner;
        }
      })
      
      setAvailablePractitioners(uniqueAvailablePractitioner);
      const availableStartingTimes = availablePractitionersAndStartingTimes.map(availablePractitionerAndStartingTime => {
        return availablePractitionerAndStartingTime.startTime;
      })
      // setAvailableStartingTimes(availableStartingTimes);
      setIsModalLoading(false);
    }
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#343541',
      color: '#E9EDF2',
      minHeight: '500px',
      minWidth: '500px',
    },
  };

  const handleBookServiceDetails = async () => {
    setIsModalLoading(true);
    
    await getUnavailableDatesByServiceId(spaId, bookingServiceId);

    if (selectedBookingDateTime === null) {
      throw new Error("Cannot book service without selecting booking date time first.");
    }
    
    const res = await bookService(selectedBookingDateTime, spaId, bookingServiceId, selectedPractitioner.practitionerId);
    
    setIsModalLoading(false);
    console.log(res)
    if (res.status === 200) {
      window.location.href = '/client/appointments';
    } else {
      return (<ErrorIndicator />);
    }

  }
  
  return (
    <div className="relative flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center text-textsIcons">
      <ContentPageTopButtons 
        hideEditDeleteButtons={true}
        editCallback={() => {}} 
        deleteCallback={() => {}} 
      />
      <div className="bg-lightBackgrounds w-full mt-10">
        <h1 className="text-3xl font-bold text-accent mb-2">
          {spaDetails.name}
        </h1>
        <p className="text-gray-700 mb-2">{spaDetails.description}</p>
        {serviceHTML}
      </div>

      <Modal
        style={modalStyles}
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {
          isModalLoading
          ?
          <LoadingIndicator />
          :
          <div>
            <h1 className="text-3xl mb-5">Booking: {spaDetails.services.find(service => service._id === bookingServiceId)?.name}</h1>
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="avilable-date-selector">
                Please select an available date for the service:
              </label>
              <DatePicker 
                name="avilable-date-selector"
                selected={selectedBookingDate}
                onChange={(date) => handleBookingDateSelected(date)}
                excludeDates={unavailableDates}
                className="bg-lightBackgrounds border border-white/30 rounded-md p-2"
                filterDate={ (date) => {
                  const today = new Date()
                  const twoWeeksInTheFuture = new Date();
                  twoWeeksInTheFuture.setDate(today.getDate() + 14);
                  return date >= today && date < twoWeeksInTheFuture;
                }}
              />
              {
                availablePractitioners.length !== 0
                &&
                <div className="flex flex-col">
                  <div className="font-semibold mb-1 mt-5">Select available practitioner(s)</div>
                  <div>
                    {
                      availablePractitioners.map( uniqueAvilablePractitioner => {
                        return (
                          <div className="flex">
                            <input 
                              className="mr-3"
                              checked={selectedPractitioner.practitionerId === uniqueAvilablePractitioner.practitionerId }
                              type="checkbox"
                              onChange={(e) => {
                                if (e.currentTarget.checked) {
                                  setSelectedPractitioner({
                                    practitionerId: uniqueAvilablePractitioner.practitionerId,
                                    practitionerName: uniqueAvilablePractitioner.practitionerName,
                                  })

                                  const selectedPractitionerAndStartingTimes = availablePractitionersAndStartingTimes.filter( practitionerAndStartingTime => {
                                    return practitionerAndStartingTime.practitioner.practitionerId === uniqueAvilablePractitioner.practitionerId
                                  })

                                  const avilableStartingTimes = selectedPractitionerAndStartingTimes.map(selectedPractitionerAndStartingTime => selectedPractitionerAndStartingTime.startTime);
                                  
                                  setAvailableStartingTimes(avilableStartingTimes);
                                }
                              }}
                            />
                            {uniqueAvilablePractitioner.practitionerName}
                          </div>
                        )
                      })
                    }
                    
                  </div>
                </div>
              }
              {
                availableStartingTimes.length !== 0
                &&
                <div className="flex flex-col">
                  <div className="font-semibold mb-1 mt-5">Select an available time slot</div>
                  <DatePicker 
                    name="avilable-date-selector"
                    selected={selectedBookingDateTime}
                    onChange={setSelectedBookingDateTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="bg-lightBackgrounds border border-white/30 rounded-md p-2"
                    includeTimes={availableStartingTimes}
                  />
                </div>
              }
              {
                selectedBookingDateTime !== null 
                &&
                <div className="flex mt-10 justify-center">
                  <Button 
                    actionType="primary"
                    actionText="Book"
                    actionHandler={handleBookServiceDetails}                  
                  />
                  <Button 
                    actionType="secondary"
                    actionText="Cancel"
                    actionHandler={closeModal}                  
                  />
                </div>
              }
            </div>
          </div>
        }
      </Modal>
    </div>
  );
}