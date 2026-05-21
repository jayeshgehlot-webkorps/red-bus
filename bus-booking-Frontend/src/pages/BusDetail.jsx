import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSelectedBus } from '../redux/slices/busSlice';
import { selectedSeats } from '../redux/slices/bookingSlice';

const BusDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedbus = useSelector((state) => state.bus.selectedBus);
    const selectseat = useSelector((state) => state.booking.selectedSeats);
    const [loading, setloading] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (id && !selectedbus) {
            const fetchBusData = async () => {
                setloading(true);
                try {
                    const response = await axios.get("http://localhost:3000/api/bus/buses", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    const busmatch = response.data.allbus.find((e) => e._id === id);
                    if (busmatch) {
                        dispatch(setSelectedBus(busmatch));
                    }
                } catch (er) {
                    console.error("Fetch failed:", er);
                } finally {
                    setloading(false);
                }
            };
            fetchBusData();
        }
    }, [id, selectedbus, dispatch]);

    if (loading || !selectedbus) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="font-bold text-slate-400 animate-pulse">
                    Loading seat layout...
                </div>
            </div>
        );
    }
    const allSeats = selectedbus.seats;

    const handleSeatClick = (seatNumber) => {
        setSelectedSeat((prev) =>
            prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const proceedpay = () => {
        dispatch(selectedSeats(selectedSeat));
        navigate(`/payment/${selectedbus._id}`);
    }
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="max-w-[300px] mx-auto relative border-l-4 border-slate-100 pl-8 pb-4">

                    <div className="absolute -top-2 -left-1 text-slate-300">
                        <i className="ri-steering-2-line text-3xl"></i>
                    </div>

                    <div className="grid grid-cols-4 gap-y-4 gap-x-3">
                        {allSeats.map((seat, index) => {
                            const isAisleBefore = index % 4 === 2;
                            const isSelected = selectedSeat.includes(seat.seatNumber);

                            return (
                                <React.Fragment key={seat.seatNumber}>
                                    {isAisleBefore && <div className="w-6" />}

                                    <button
                                        type="button"
                                        disabled={seat.isBooked}
                                        onClick={() => handleSeatClick(seat.seatNumber)}
                                        className={`
                                            group cursor-pointer relative h-12 w-12 rounded-lg border-2 transition-all duration-200
                                            flex flex-col items-center justify-center
                                            ${seat.isBooked
                                                ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                                                : isSelected
                                                    ? 'bg-[#D84E55] border-[#D84E55] text-white shadow-md scale-95'
                                                    : 'bg-white border-slate-300 hover:border-[#D84E55] text-slate-500 hover:text-[#D84E55]'}
                                        `}
                                    >
                                        <i className="ri-armchair-fill text-xl"></i>
                                        <span className={`text-[9px] font-bold absolute -bottom-1 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                                            {seat.seatNumber}
                                        </span>

                                        {!seat.isBooked && (
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                                Seat {seat.seatNumber} • ₹300
                                            </div>
                                        )}
                                    </button>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-slate-200 rounded-sm"></div> Available</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-100 rounded-sm"></div> Booked</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#D84E55] rounded-sm"></div> Selected</div>
                </div>
            </div>

            {selectedSeat.length > 0 && (
                <div className="w-full max-w-[400px] flex flex-col gap-3 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

                    {/* Price Summary Card */}
                    <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center shadow-lg">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black">Selected Seats</p>
                            <p className="text-sm font-bold">{selectedSeat.join(', ')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase font-black">Total Price</p>
                            <p className="text-xl font-black text-red-400">₹{selectedSeat.length * selectedbus.price}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => { proceedpay() }}
                        className="w-full bg-[#D84E55] hover:bg-[#b53f45] text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        Proceed to Pay
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            )}

        </div>
    );
};

export default BusDetail;