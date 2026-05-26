import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BusDetails = ({ id }) => {
    const [booking, setbooking] = useState(null);
     const API = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${API}api/bus/byid/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setbooking(response.data);
            } catch (err) {
                console.error("Error fetching bus details", err);
            }
        };
        if (id) fetch();
    }, [id]);

    if (!booking) {
        return (
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-center justify-center">
                <p className="text-xs text-slate-400 animate-pulse">Loading bus details...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 border-b pb-2 mb-4">Bus Details</h3>
            <div className="grid grid-cols-2 gap-y-4 text-xs">
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Bus Name</p>
                    <p className="font-black text-slate-800 text-sm">{booking.busName}</p>
                </div>
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Travel Date</p>
                    <p className="font-black text-slate-800 text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Departure</p>
                    <p className="font-black text-slate-800 text-sm">{booking.departureTime || '04:08 AM'}</p>
                </div>
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Arrival</p>
                    <p className="font-black text-slate-800 text-sm">{booking.arrivalTime}</p>
                </div>
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Boarding Point</p>
                    <p className="font-black text-slate-800 text-sm">{booking.from || 'Indore'}</p>
                </div>
                <div>
                    <p className="text-slate-400 font-bold uppercase mb-1">Dropping Point</p>
                    <p className="font-black text-slate-800 text-sm">{booking.to || 'Mumbai'}</p>
                </div>
            </div>
        </div>
    );
};

const Mybookings = () => {
    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;
    const downloadTicket = async (bookingId) => {
        const element = document.getElementById(`ticket-${bookingId}`);

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                onclone: (clonedDoc) => {
                    const clonedTicket = clonedDoc.getElementById(`ticket-${bookingId}`);

                    const interactiveElements = clonedTicket.querySelectorAll('button, .no-print');
                    interactiveElements.forEach(el => el.style.display = 'none');
                    const cleanStyles = (el) => {
                        const style = window.getComputedStyle(el);

                        if (style.backgroundColor.includes('oklch')) {
                            el.style.backgroundColor = "#f8fafc";
                        }
                        if (style.color.includes('oklch')) {
                            el.style.color = "#1e293b";
                        }
                        if (style.borderColor.includes('oklch')) {
                            el.style.borderColor = "#e2e8f0";
                        }

                        Array.from(el.children).forEach(cleanStyles);
                    };

                    cleanStyles(clonedTicket);
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`BusTicket-${bookingId.slice(-8)}.pdf`);

        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Your browser is using a color format the PDF generator doesn't support yet. Try a standard browser or update your CSS.");
        }
    };

    const cancel = async (id) => {
        try {
            await axios.delete(`${API}api/booking/cancel/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (err) {
            console.error("Cancellation failed", err);
        }
    };

    useEffect(() => {
        async function fetch() {
            try {
                let responsebook = await axios.get(`${API}api/booking/mybookings`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBookings(responsebook.data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, []);

    if (isLoading) return <div className="text-center mt-20 font-bold text-slate-600">Loading your trips...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">My Trips</h1>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                    {bookings?.length || 0} bookings
                </span>
            </div>

            <div className="space-y-6">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        id={`ticket-${booking._id}`} // ID added for PDF targeting
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
                    >
                        <div className="mb-6 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 capitalize">
                                    {booking.userName || 'Passenger'}
                                </h2>
                                <p className="text-xs text-slate-400">Official Bus Ticket</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                                {(booking.isCancel) ? <p className="text-xs font-bold text-yellow-600">CANCEL</p> : <p className="text-xs font-bold text-green-600">CONFIRMED</p>}
                                {/* <p className="text-xs font-bold text-green-600">{CONFIRMED}</p> */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <BusDetails id={booking.busId} />

                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-800 border-b pb-2 mb-4">Booking Details</h3>
                                <div className="grid grid-cols-2 gap-y-4 text-xs mb-6">
                                    <div className="col-span-1">
                                        <p className="text-slate-400 font-bold uppercase mb-1">Seat Numbers</p>
                                        <p className="font-black text-slate-800 text-sm break-words">
                                            {booking.selectedSeats?.join(", ") || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-bold uppercase mb-1">Seats Booked</p>
                                        <p className="font-black text-slate-800 text-sm">{booking.selectedSeats?.length || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-bold uppercase mb-1">Total Fare</p>
                                        <p className="font-black text-slate-800 text-sm">Rs. {booking.totalPrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-bold uppercase mb-1">Booking ID</p>
                                        <p className="font-black text-slate-800 text-sm">{booking._id?.slice(-8)}</p>
                                    </div>
                                </div>

                                {!(booking.isCancel) ? <div className="flex flex-col sm:flex-row gap-3 no-print">
                                    <button
                                        onClick={() => downloadTicket(booking._id)}
                                        className="flex-1 bg-[#007EA7] text-white py-2 rounded-lg text-xs font-bold shadow-md hover:bg-[#005F7D] transition-all cursor-pointer active:scale-95"
                                    >
                                        Download Ticket PDF
                                    </button>
                                    <button
                                        onClick={() => cancel(booking._id)}
                                        className="flex-1 bg-white border border-red-200 text-red-500 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-all cursor-pointer active:scale-95"
                                    >
                                        Request Cancellation
                                    </button>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mybookings;