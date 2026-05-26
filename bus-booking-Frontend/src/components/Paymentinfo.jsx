import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSelectedBus } from '../redux/slices/busSlice';
import { toast } from 'react-toastify';
import PaymetnLoader from './PaymetnLoader';


const Paymentinfo = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSeats = useSelector((state) => state.booking.selectedSeats);
    const selectedbus = useSelector((state) => state.bus.selectedBus);

    const [isLoading, setIsLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [fetchingBus, setFetchingBus] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pyLoaderData, setpyLoaderData] = useState("Securing your payment...");

    useEffect(() => {
        if (id && !selectedbus) {
            const reFetchBus = async () => {
                setFetchingBus(true);
                try {
                    const response = await axios.get("http://localhost:3000/api/bus/buses", {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    });
                    const busmatch = response.data.allbus.find((e) => e._id === id);
                    if (busmatch) {
                        dispatch(setSelectedBus(busmatch));
                    }
                } catch (err) {
                    console.error("Recovery fetch failed:", err);
                } finally {
                    setFetchingBus(false);
                }
            };
            reFetchBus();
        }
    }, [id, selectedbus, dispatch]);


    const handlePayment = async () => {
        if (selectedSeats.length === 0) {
            toast.error("No seats selected. Please go back.");
            return;
        }

        setIsProcessing(true);
        setpyLoaderData("Securing your payment...");

        const exactBusPrice = selectedbus.totalPrice || selectedbus.price || 0;
        const computedTotalAmount = selectedSeats.length * exactBusPrice;

        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/payment/create-order",
                { amount: computedTotalAmount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const order = data.order;

            const options = {
                key: "rzp_test_SrfbjVbXPMC6Nd",
                amount: order.amount,
                currency: "INR",
                order_id: order.id,

                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(
                            "http://localhost:3000/api/payment/verify-payment",
                            response,
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }
                        );

                        if (verifyRes.data.success) {
                            await axios.post(
                                "http://localhost:3000/api/booking/add",
                                {
                                    busId: selectedbus._id,
                                    selectedSeats: selectedSeats,
                                    totalPrice: computedTotalAmount,
                                    bookingDate: selectedbus.date
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                }
                            );
                            setIsProcessing(false);
                            toast.success("Booking Confirmed ✅");
                            setIsPaid(true);

                        } else {
                            toast.error("Payment verification failed ❌");
                            setIsProcessing(false);
                        }
                    } catch (handlerError) {

                        console.error("Internal Gateway Process Crash:", handlerError);
                        setIsProcessing(false);
                        toast.error(
                            handlerError.response?.data?.message ||
                            "Payment verified but failed to write booking to database."
                        );
                    }
                },
                modal: {
                    ondismiss: function () {
                        // toast.error("Payment cancelled ❌");
                        setpyLoaderData("Payment cancelled ❌");
                        setTimeout(() => {
                            setIsProcessing(false);
                        }, 1500);
                    }
                }
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response) {
                console.error("Payment Failed:", response);
                setIsProcessing(false);
                toast.error("Payment failed ❌");
            });

            rzp.open();
            // setIsProcessing(false);

        } catch (error) {
            console.error("Order Generation Failure:", error);
            toast.error("Could not initialize transaction gateway. Try again.");
        } finally {
            // setIsLoading(false);
        }
    };



    if (fetchingBus || !selectedbus) {
        return <div className="text-center mt-20">Verifying booking details...</div>;
    }

    if (isPaid) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                <i className="ri-checkbox-circle-fill text-7xl text-green-500 mb-4 animate-bounce"></i>
                <h1 className="text-3xl font-bold text-slate-800">Payment Successful!</h1>
                <p className="text-slate-500 mt-2">Your tickets for seats {selectedSeats.join(", ")} have been booked.</p>
                <p className='mt-5 text-blue-500 ' onClick={() => { navigate("/mybooking") }} >Go to MyBookings</p>
            </div>
        );
    }

    return (
        <>
            {isProcessing && <PaymetnLoader content={pyLoaderData} />}
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Passenger Information</h2>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Full Name</label>
                                <input type="text" placeholder="Enter name" className="p-3 border rounded-xl focus:ring-2 focus:ring-[#D84E55] outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Age</label>
                                <input type="number" placeholder="Age" className="p-3 border rounded-xl focus:ring-2 focus:ring-[#D84E55] outline-none transition-all" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-600">Email Address</label>
                            <input type="email" placeholder="email@example.com" className="p-3 border rounded-xl focus:ring-2 focus:ring-[#D84E55] outline-none transition-all" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Payment</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-6">
                        <div className="flex justify-between mb-4">
                            <span className="text-slate-600">Selected Seats ({selectedSeats.length})</span>
                            <span className="font-bold">{selectedSeats.join(", ")}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold border-t pt-4 mb-6">
                            <span>Total Amount</span>
                            <span className="text-[#D84E55]">₹{selectedSeats.length * selectedbus.price}</span>
                        </div>

                        <div className="space-y-4">

                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="w-full bg-[#D84E55] hover:bg-[#c14147] text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    "Pay Now"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Paymentinfo;