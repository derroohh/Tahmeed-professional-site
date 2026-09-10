import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  CalendarCheck,
  User,
  Mail,
  Phone,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { Service, Booking } from '../types';

interface BookingsSectionProps {
  services: Service[];
  onBookService: (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<Booking | null>;
}

export const BookingsSection: React.FC<BookingsSectionProps> = ({
  services,
  onBookService,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-09-18');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('14:00 - 15:00 UTC');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Available sample slots
  const availableDates = [
    { date: '2026-09-18', label: 'Fri, Sep 18' },
    { date: '2026-09-21', label: 'Mon, Sep 21' },
    { date: '2026-09-22', label: 'Tue, Sep 22' },
    { date: '2026-09-24', label: 'Thu, Sep 24' },
    { date: '2026-09-25', label: 'Fri, Sep 25' },
    { date: '2026-09-28', label: 'Mon, Sep 28' },
  ];

  const timeSlots = [
    '09:00 - 10:00 UTC',
    '11:30 - 12:30 UTC',
    '14:00 - 15:00 UTC',
    '16:30 - 17:30 UTC',
    '19:00 - 20:00 UTC',
  ];

  const handleStartBooking = (service: Service) => {
    setSelectedService(service);
    setConfirmedBooking(null);
    setBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !clientName || !clientEmail) return;

    setIsSubmitting(true);
    try {
      const result = await onBookService({
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        clientName,
        clientEmail,
        clientPhone: clientPhone || '+1 (555) 000-0000',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        notes,
        totalPrice: selectedService.price,
      });

      if (result) {
        setConfirmedBooking(result);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadIcs = (booking: Booking) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tahmeed.com//Booking Schedule//EN
BEGIN:VEVENT
SUMMARY:${booking.serviceTitle} with Tahmeed
DESCRIPTION:Official service booking confirmation on tahmeed.com. Ref: ${booking.id}
DTSTART:${booking.date.replace(/-/g, '')}T140000Z
DTEND:${booking.date.replace(/-/g, '')}T150000Z
LOCATION:Online Encrypted Meeting (Link provided via email)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tahmeed-Booking-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="bookings" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-Style Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200/80 mb-3 shadow-2xs">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Performances & Studio Bookings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
            Artist Bookings & Shows.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Direct reservations for mainstage festival sets, headline tour stops, private VIP acoustic sessions, and collaborative studio tracking with Tahmeed.
          </p>
        </div>

        {/* Services Grid (Apple Clean White Cards on Light Canvas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#fbfbfd] rounded-3xl border border-stone-200/90 p-7 sm:p-9 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-stone-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      High Demand
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Key Metadata Chips */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 font-medium bg-white px-3 py-1.5 rounded-full border border-stone-200/80 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{service.durationMinutes} Min Session</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium bg-white px-3 py-1.5 rounded-full border border-stone-200/80 shadow-2xs">
                    <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Available: {service.availableDays.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Price and Booking Action */}
              <div className="mt-8 pt-6 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-medium text-stone-400 block">
                    Artist / Session Fee
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-stone-900">
                    ${service.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleStartBooking(service)}
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold px-6 py-3 rounded-full shadow-xs transition active:scale-98"
                >
                  <span>Reserve Booking Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Booking Modal (Apple Light Mode) */}
      {bookingModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setConfirmedBooking(null);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-full hover:bg-stone-100"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              <form onSubmit={handleSubmitBooking}>
                <div className="border-b border-stone-100 pb-4 mb-5">
                  <span className="text-xs font-mono uppercase text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Step 1 of 2: Schedule & Confirm
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    Book {selectedService.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Fee: ${selectedService.price.toFixed(2)} • {selectedService.durationMinutes} min executive session
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Select Date */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-2">
                      Select Preferred Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDates.map((item) => (
                        <button
                          type="button"
                          key={item.date}
                          onClick={() => setSelectedDate(item.date)}
                          className={`py-2 px-2 text-xs rounded-xl border text-center transition font-medium ${
                            selectedDate === item.date
                              ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-2">
                      Select Available Time Slot (UTC)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 text-[11px] rounded-xl border text-center transition ${
                            selectedTimeSlot === slot
                              ? 'bg-emerald-700 border-emerald-700 text-white font-semibold shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 font-medium'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Sarah Connor"
                          className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-8 pr-3 py-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                        <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="sarah@example.com"
                          className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-8 pr-3 py-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                        <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Phone Number (Optional for SMS reminder)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-8 pr-3 py-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                      <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Session Objectives & Agenda Notes
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Briefly describe what you'd like to achieve during the consultation..."
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-600">
                    <span className="text-stone-400">Invitee:</span> <br />
                    <span className="font-semibold text-stone-800">{clientEmail || 'your email'}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-stone-900 hover:bg-black text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-xs transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirming Reservation...' : 'Confirm & Reserve Slot'}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-stone-900">
                  Service Reservation Confirmed!
                </h3>
                <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
                  Your appointment has been booked in the <strong>tahmeed.com</strong> reservation system.
                </p>

                <div className="my-6 p-4 bg-[#f5f5f7] rounded-2xl border border-stone-200 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Booking Reference:</span>
                    <span className="font-bold text-stone-900">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Service:</span>
                    <span className="text-stone-800">{confirmedBooking.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Scheduled Date:</span>
                    <span className="text-stone-800">{confirmedBooking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Time Window:</span>
                    <span className="text-stone-800">{confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Client:</span>
                    <span className="text-stone-800">{confirmedBooking.clientName} ({confirmedBooking.clientEmail})</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2">
                    <span className="text-stone-500">Status:</span>
                    <span className="font-semibold text-emerald-700 uppercase">Confirmed / Active</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => handleDownloadIcs(confirmedBooking)}
                    className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 text-stone-800 font-medium text-xs px-5 py-2.5 rounded-full border border-stone-300 transition shadow-2xs"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-stone-600" />
                    <span>Download Calendar (.ics)</span>
                  </button>

                  <button
                    onClick={() => {
                      setBookingModalOpen(false);
                      setConfirmedBooking(null);
                    }}
                    className="bg-stone-900 hover:bg-black text-white font-medium text-xs px-7 py-2.5 rounded-full transition shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
