import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedBus } from '../redux/slices/busSlice';
import { selectedSeats } from '../redux/slices/bookingSlice';

const BusCard = ({ bus }) => {
    let left = 0;
    bus.seats.forEach((e) => {
        if (!e.isBooked) left++;
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();



    function busselect(buss) {
        dispatch(setSelectedBus(buss))
        navigate(`bus/${buss._id}`)
    }
    return (

        <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
                <div className="w-1/4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-600 font-bold italic text-lg">Prime</span>
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{bus.busName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{bus.bustype}</p>
                </div>
                <div className="flex-1 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">{bus.departureTime}</p>
                        <p className="text-sm text-slate-500 font-semibold">{bus.from}</p>
                    </div>

                    <div className="flex flex-col items-center min-w-[100px]">
                        <p className="text-xs text-slate-400 font-medium mb-1">{bus.duration}</p>
                        <div className="w-full h-[1px] bg-slate-200 relative">
                            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-slate-300 rounded-full -translate-y-1/2" />
                            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-slate-300 rounded-full -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">{bus.arrivalTime}</p>
                        <p className="text-sm text-slate-500 font-semibold">{bus.to}</p>
                        <p className="text-[10px] text-orange-600 font-bold">{bus.arrivalDate}</p>
                    </div>
                </div>

                <div className="w-1/4 flex flex-col items-end gap-3">
                    <div className="flex items-center gap-1.5 bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                        <i className="ri-star-fill text-[10px]"></i>
                        <span>4</span>
                        <span className="text-[10px] opacity-70 font-normal ml-1">({bus.reviews})</span>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold">INR</p>
                        <p className="text-2xl font-black text-slate-900">₹{bus.price}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                <div className="flex gap-2">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                        <i className="ri-map-pin-2-fill"></i> Live Tracking
                    </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                    <span className="font-bold text-slate-700">{left} seats left</span> • 4 window
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-6 text-[11px] font-bold text-slate-500">
                    <button className="flex items-center gap-1 hover:text-slate-800">Boarding & Dropping points <i className="ri-arrow-down-s-line"></i></button>
                    <button className="flex items-center gap-1 hover:text-slate-800">Reviews <i className="ri-arrow-down-s-line"></i></button>
                    <button className="flex items-center gap-1 hover:text-slate-800">Amenities <i className="ri-arrow-down-s-line"></i></button>
                    <button className="flex items-center gap-1 hover:text-slate-800">Bus Photos <i className="ri-arrow-down-s-line"></i></button>
                </div>
                <button className="bg-[#fcd4d5] text-[#D84E55] px-8 py-2.5 rounded-lg font-black text-sm hover:bg-[#D84E55] hover:text-white transition-all active:scale-95 shadow-sm cursor-pointer" onClick={() => busselect(bus)}>
                    SELECT SEATS
                </button>
            </div>
        </div>

    );
};

export default BusCard;