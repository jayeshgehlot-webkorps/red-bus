// import AdminSidebar from "../components/AdminSidebar";
// import AdminHeader from "../components/AdminHeader";
// import { Outlet } from "react-router-dom";

// const Admin = () => {
//     return (
//         <div style={{ display: "flex" }}>
//             <AdminSidebar />
//             <div style={{ flex: 1 }}>
//                 <AdminHeader />
//                 <div style={{ padding: "20px" }}>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admin;




// import React, { useState } from 'react';

// const initialBuses = [
//     { id: 1, busName: "Super Deluxe Express", from: "Indore", to: "Mumbai", departureTime: "08:00 PM", arrivalTime: "06:00 AM", totalPrice: 1200, busType: "Sleeper AC" },
//     { id: 2, busName: "Chartered Travels", from: "Bhopal", to: "Indore", departureTime: "04:00 PM", arrivalTime: "08:00 PM", totalPrice: 450, busType: "Seater Non-AC" }
// ];

// const initialAdmins = [
//     { id: 1, name: "Rahul Sharma", email: "rahul@busapp.com", role: "admin" },
//     { id: 2, name: "Amit Verma", email: "amit@busapp.com", role: "admin" }
// ];

// const Admin = () => {
//     // Current User Session Simulation (Change role to 'admin' to see Super Admin features hide)
//     const [currentUser, setCurrentUser] = useState({ name: "Ghanshyam", role: "superadmin" });

//     // UI Navigation State
//     const [activeTab, setActiveTab] = useState('all-buses'); // 'all-buses', 'add-bus', 'manage-admins'

//     // Functional States
//     const [buses, setBuses] = useState(initialBuses);
//     const [admins, setAdmins] = useState(initialAdmins);

//     // Form State for Adding New Bus
//     const [newBus, setNewBus] = useState({
//         busName: '', from: '', to: '', departureTime: '', arrivalTime: '', totalPrice: '', busType: 'Sleeper AC'
//     });

//     // Form State for Adding New Admin (Super Admin Feature)
//     const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'admin' });

//     // --- BUS MANAGEMENT ACTIONS ---
//     const handleAddBus = (e) => {
//         e.preventDefault();
//         if (!newBus.busName || !newBus.from || !newBus.to || !newBus.totalPrice) return alert("Please fill all required fields");

//         const busWithId = { ...newBus, id: Date.now(), totalPrice: Number(newBus.totalPrice) };
//         setBuses([...buses, busWithId]);
//         setNewBus({ busName: '', from: '', to: '', departureTime: '', arrivalTime: '', totalPrice: '', busType: 'Sleeper AC' });
//         setActiveTab('all-buses'); // Redirect to inventory list
//     };

//     const handleRemoveBus = (id) => {
//         if (window.confirm("Are you sure you want to remove this bus route?")) {
//             setBuses(buses.filter(bus => bus.id !== id));
//         }
//     };

//     // --- SUPER ADMIN ACTIONS ---
//     const handleAddAdmin = (e) => {
//         e.preventDefault();
//         if (!newAdmin.name || !newAdmin.email) return alert("Please fill all admin fields");

//         const adminWithId = { ...newAdmin, id: Date.now() };
//         setAdmins([...admins, adminWithId]);
//         setNewAdmin({ name: '', email: '', role: 'admin' });
//     };

//     const handleRemoveAdmin = (id) => {
//         if (window.confirm("Are you sure you want to revoke this admin's access?")) {
//             setAdmins(admins.filter(admin => admin.id !== id));
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-slate-100 font-sans">
//             {/* --- SIDEBAR MENU --- */}
//             <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-xl">
//                 <div className="mb-8 border-b border-slate-800 pb-4">
//                     <h1 className="text-xl font-black tracking-wider text-red-500 italic">BUS-BOSS</h1>
//                     <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">
//                         {currentUser.role === 'superadmin' ? '⚡ Super Admin Portal' : '⚙️ Admin Portal'}
//                     </p>
//                 </div>

//                 <nav className="flex-1 space-y-2">
//                     <button
//                         onClick={() => setActiveTab('all-buses')}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
//                         ${activeTab === 'all-buses' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
//                     >
//                         🚌 View Active Buses
//                     </button>

//                     <button
//                         onClick={() => setActiveTab('add-bus')}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
//                         ${activeTab === 'add-bus' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
//                     >
//                         ➕ Add New Bus Route
//                     </button>

//                     {/* CRITICAL: Guarded Super Admin Option */}
//                     {currentUser.role === 'superadmin' && (
//                         <button
//                             onClick={() => setActiveTab('manage-admins')}
//                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer border border-dashed border-red-500/30 mt-6
//                             ${activeTab === 'manage-admins' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' : 'text-amber-400 hover:bg-slate-800'}`}
//                         >
//                             👑 Manage Control Panel Admins
//                         </button>
//                     )}
//                 </nav>

//                 <div className="border-t border-slate-800 pt-4 mt-auto">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-red-400">
//                             {currentUser.name[0].toUpperCase()}
//                         </div>
//                         <div>
//                             <p className="text-xs font-black text-slate-200 capitalize">{currentUser.name}</p>
//                             <p className="text-[10px] text-slate-500 font-mono">Session Active</p>
//                         </div>
//                     </div>
//                 </div>
//             </aside>

//             {/* --- MAIN WORKSPACE --- */}
//             <main className="flex-1 p-8 overflow-y-auto">

//                 {/* 1. VIEW ALL BUSES VIEW */}
//                 {activeTab === 'all-buses' && (
//                     <div>
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-slate-800">Active Fleet Operations</h2>
//                                 <p className="text-xs text-slate-500">Live operational monitoring and fleet route cancellations.</p>
//                             </div>
//                             <span className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-full font-bold">
//                                 Total Live Routes: {buses.length}
//                             </span>
//                         </div>

//                         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-wider">
//                                         <th className="p-4">Bus Service Details</th>
//                                         <th className="p-4">Route Info</th>
//                                         <th className="p-4">Schedule Details</th>
//                                         <th className="p-4">Ticket Price</th>
//                                         <th className="p-4 text-center">Operational Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-100 text-sm">
//                                     {buses.map((bus) => (
//                                         <tr key={bus.id} className="hover:bg-slate-50/80 transition-colors">
//                                             <td className="p-4">
//                                                 <p className="font-bold text-slate-800">{bus.busName}</p>
//                                                 <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">{bus.busType}</span>
//                                             </td>
//                                             <td className="p-4">
//                                                 <p className="text-slate-700 font-semibold text-xs capitalize">🗺️ {bus.from} ➔ {bus.to}</p>
//                                             </td>
//                                             <td className="p-4 text-xs">
//                                                 <p className="text-slate-600">🛫 Dep: <span className="font-bold text-slate-800">{bus.departureTime}</span></p>
//                                                 <p className="text-slate-600">🛬 Arr: <span className="font-bold text-slate-800">{bus.arrivalTime}</span></p>
//                                             </td>
//                                             <td className="p-4">
//                                                 <p className="font-black text-slate-800 text-base">₹{bus.totalPrice}</p>
//                                             </td>
//                                             <td className="p-4 text-center">
//                                                 <button
//                                                     onClick={() => handleRemoveBus(bus.id)}
//                                                     className="bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all cursor-pointer"
//                                                 >
//                                                     ⛔ Terminate Route
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     {buses.length === 0 && (
//                                         <tr>
//                                             <td colSpan="5" className="text-center p-12 text-slate-400 font-medium">No operational bus systems running. Add a bus route to start operations.</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* 2. ADD BUS VIEW */}
//                 {activeTab === 'add-bus' && (
//                     <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
//                         <div className="mb-6 border-b pb-4">
//                             <h2 className="text-xl font-bold text-slate-800">Deploy New Bus Fleet Element</h2>
//                             <p className="text-xs text-slate-500">Configure specifications, destinations, pricing details, and logistics.</p>
//                         </div>

//                         <form onSubmit={handleAddBus} className="space-y-5">
//                             <div>
//                                 <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Bus/Service Operating Name *</label>
//                                 <input
//                                     type="text" placeholder="e.g. Intercity Hitech Volvo" required
//                                     value={newBus.busName} onChange={(e) => setNewBus({ ...newBus, busName: e.target.value })}
//                                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Origin Boarding Point *</label>
//                                     <input
//                                         type="text" placeholder="e.g. Indore" required
//                                         value={newBus.from} onChange={(e) => setNewBus({ ...newBus, from: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Destination Drop Point *</label>
//                                     <input
//                                         type="text" placeholder="e.g. Mumbai" required
//                                         value={newBus.to} onChange={(e) => setNewBus({ ...newBus, to: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Departure Time</label>
//                                     <input
//                                         type="text" placeholder="e.g. 09:30 PM"
//                                         value={newBus.departureTime} onChange={(e) => setNewBus({ ...newBus, departureTime: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Expected Arrival Time</label>
//                                     <input
//                                         type="text" placeholder="e.g. 06:15 AM"
//                                         value={newBus.arrivalTime} onChange={(e) => setNewBus({ ...newBus, arrivalTime: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Flat Ticket Price (Rs.) *</label>
//                                     <input
//                                         type="number" placeholder="Value in INR" required
//                                         value={newBus.totalPrice} onChange={(e) => setNewBus({ ...newBus, totalPrice: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Chassis Class Configuration</label>
//                                     <select
//                                         value={newBus.busType} onChange={(e) => setNewBus({ ...newBus, busType: e.target.value })}
//                                         className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     >
//                                         <option value="Sleeper AC">Sleeper AC</option>
//                                         <option value="Sleeper Non-AC">Sleeper Non-AC</option>
//                                         <option value="Seater AC">Seater AC</option>
//                                         <option value="Seater Non-AC">Seater Non-AC</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all cursor-pointer mt-4 text-sm"
//                             >
//                                 Launch Active Logistics Route
//                             </button>
//                         </form>
//                     </div>
//                 )}

//                 {/* 3. SUPER ADMIN EXCLUSIVE VIEW: MANAGE OTHER ADMINS */}
//                 {activeTab === 'manage-admins' && currentUser.role === 'superadmin' && (
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Provision Admin Form */}
//                         <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
//                             <div className="mb-4 border-b pb-3">
//                                 <h3 className="text-base font-bold text-slate-800">Add Control Administrator</h3>
//                                 <p className="text-xs text-slate-400">Grant route deployment capabilities.</p>
//                             </div>
//                             <form onSubmit={handleAddAdmin} className="space-y-4">
//                                 <div>
//                                     <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Legal Name</label>
//                                     <input
//                                         type="text" placeholder="John Doe" required
//                                         value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
//                                         className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Secure Control Email Address</label>
//                                     <input
//                                         type="email" placeholder="john@domain.com" required
//                                         value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
//                                         className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-amber-700 shadow-md shadow-amber-600/10 cursor-pointer"
//                                 >
//                                     Authorize System Admin
//                                 </button>
//                             </form>
//                         </div>

//                         {/* Admins Directory Table */}
//                         <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                             <div className="p-6 border-b border-slate-100 bg-slate-50/50">
//                                 <h3 className="text-base font-bold text-slate-800">Command System Personnel</h3>
//                                 <p className="text-xs text-slate-400">Active operators with permissions over server configurations.</p>
//                             </div>
//                             <table className="w-full text-left">
//                                 <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
//                                     <tr>
//                                         <th className="p-4">Operator</th>
//                                         <th className="p-4">Authorization Base</th>
//                                         <th className="p-4 text-center">Security Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-100 text-xs">
//                                     {admins.map((admin) => (
//                                         <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors">
//                                             <td className="p-4">
//                                                 <p className="font-bold text-slate-800">{admin.name}</p>
//                                                 <p className="text-slate-400 font-mono text-[11px]">{admin.email}</p>
//                                             </td>
//                                             <td className="p-4">
//                                                 <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border border-red-100">
//                                                     {admin.role}
//                                                 </span>
//                                             </td>
//                                             <td className="p-4 text-center">
//                                                 <button
//                                                     onClick={() => handleRemoveAdmin(admin.id)}
//                                                     className="text-red-500 font-bold hover:underline cursor-pointer tracking-tight"
//                                                 >
//                                                     Revoke Clearance
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Admin;





import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getUserFromToken } from '../utils/getUser';
import { toast } from "react-toastify";

const AdminPanel = () => {
    const user = useSelector((state) => state.auth?.user);
    const currentRole = getUserFromToken().role;
    const currentName = user?.name || 'Operator';

    const [activeView, setActiveView] = useState('add-bus');
    const [buses, setBuses] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [newBus, setNewBus] = useState({
        busName: '', from: '', to: '', departureTime: '', arrivalTime: '', totalPrice: '', busType: 'Sleeper AC'
    });
    const [newAdminEmail, setNewAdminEmail] = useState('');

    const getAuthHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('http://localhost:3000/api/bus/buses', getAuthHeaders());
                setBuses(res.data.allbus);
            } catch (err) { console.error("Error loading buses", err); }
            finally { setIsLoading(false); }
        };

        const fetchAdmins = async () => {
            try {
                const res = await axios.get('http://localhost:3000/admin/all-admin', getAuthHeaders());
                setAdmins(res.data);
            } catch (err) { console.error("Error loading admin roster", err); }
        };

        fetchBuses();
        if (currentRole === 'superadmin') {
            fetchAdmins();
        }
    }, [currentRole]);

    const handleAddBus = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/bus/create', newBus, getAuthHeaders());
            setBuses([...buses, res.data]);
            toast.success("✨ New Bus Route Deployed Successfully!");
            setNewBus({ busName: '', from: '', to: '', departureTime: '', arrivalTime: '', price: '', bustype: 'Sleeper' });
            setActiveView('all-buses');
        } catch (err) { alert(err.response?.data?.message || "Failed to launch route"); }
    };

    const handleRemoveBus = async (id) => {
        if (!window.confirm("Are you sure you want to completely terminate this bus route?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/bus/delete/${id}`, getAuthHeaders());
            setBuses(buses.filter(bus => bus._id !== id));
            toast.error("Route terminated successfully.");
        } catch (err) { alert("Failed to eliminate route mapping."); }
    };

    const handleMakeAdmin = async (e) => {
        e.preventDefault();
        try {
            console.log(newAdminEmail)
            const res = await axios.patch('http://localhost:3000/admin/make-admin', { email: newAdminEmail }, getAuthHeaders());
            setAdmins([...admins, res.data.user]);
            setNewAdminEmail('');
            toast.success("🎉 Success! User account upgraded to  System Admin privileges.")
            setActiveView('remove-admin');
        } catch (err) { alert(err.response?.data?.message || "Privilege elevation error."); }
    };

    const handleStripClearance = async (id) => {
        if (!window.confirm("Are you sure you want to completely remove this admin and downgrade them back to user status?")) return;
        try {
            const res = await axios.patch(`http://localhost:3000/admin/remove-admin/${id}`, {}, getAuthHeaders());
            setAdmins(admins.filter(admin => admin._id !== id));
            toast.success("Clearance successfully revoked.")
        } catch (err) {
            toast.error(err.response?.data?.message || "Revocation routing error.");
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">

            <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-xl sticky top-0 h-screen">
                <div className="mb-8 border-b border-slate-800 pb-5">
                    <h1 className="text-xl font-black tracking-wider text-red-500 italic">BUS-BOSS</h1>
                    <span className={`inline-block text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded mt-2 
                        ${currentRole === 'superadmin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400'}`}>
                        {currentRole === 'superadmin' ? '👑 Super Admin' : '⚙️ Route Admin'}
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1 px-1">Bus Logistics</div>

                    <button onClick={() => setActiveView('add-bus')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeView === 'add-bus' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        ➕ Add New Bus
                    </button>

                    <button onClick={() => setActiveView('all-buses')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeView === 'all-buses' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        🗑️ Remove Active Bus
                    </button>


                    {currentRole === 'superadmin' && (
                        <div className="pt-6 space-y-2">
                            <div className="text-[10px] uppercase tracking-wider font-bold text-amber-500/80 mb-1 px-1 border-t border-slate-800 pt-4">User Authority Security</div>

                            <button onClick={() => setActiveView('make-admin')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeView === 'make-admin' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                                👑 Make New Admin
                            </button>

                            <button onClick={() => setActiveView('remove-admin')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeView === 'remove-admin' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                                ❌ Remove Admin Profile
                            </button>
                        </div>
                    )}
                </nav>

                <div className="border-t border-slate-800 pt-4 mt-auto">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Logged operator</p>
                    <p className="text-sm font-black text-slate-200 truncate capitalize">{currentName}</p>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {isLoading && <div className="text-center font-bold text-sm text-slate-500 py-10 animate-pulse">Syncing system database cluster records...</div>}

                {!isLoading && activeView === 'add-bus' && (
                    <div className="max-w-xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">Deploy New Bus Fleet Element</h2>
                        <form onSubmit={handleAddBus} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Service Operating Name"
                                required
                                className="w-full p-3 border rounded-xl text-sm"
                                value={newBus.busName}
                                onChange={(e) => setNewBus({ ...newBus, busName: e.target.value })}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Origin Boarding City"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.from}
                                    onChange={(e) => setNewBus({ ...newBus, from: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Terminal Destination Drop"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.to}
                                    onChange={(e) => setNewBus({ ...newBus, to: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="time"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.departureTime || ''}
                                    onChange={(e) => setNewBus({ ...newBus, departureTime: e.target.value })}
                                />
                                <input
                                    type="time"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.arrivalTime || ''}
                                    onChange={(e) => setNewBus({ ...newBus, arrivalTime: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.date || ''}
                                    onChange={(e) => setNewBus({ ...newBus, date: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Total Seats Available"
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.seats || ''}
                                    onChange={(e) => setNewBus({ ...newBus, seats: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="Number"
                                    placeholder='Flat Ticket Fare Price (INR)'
                                    required
                                    className="p-3 border rounded-xl text-sm"
                                    value={newBus.price || ''}
                                    onChange={(e) => setNewBus({ ...newBus, price: e.target.value })}
                                />
                                <select name="" id="" className='p-3 border rounded-xl text-sm cursor-pointer' onChange={(e) => setNewBus({ ...newBus, bustype: e.target.value })}>
                                    <option value="">Select Bus Type</option>
                                    <option value="Ac" className='cursor-pointer'>Ac</option>
                                    <option value="Non-Ac" className='cursor-pointer'>Non-Ac</option>
                                    <option value="sleeper" className='cursor-pointer'>Sleeper</option>
                                </select>
                            </div>

                            {/* <input
                                type="number"
                                placeholder="Flat Ticket Fare Price (INR)"
                                required
                                className="w-full p-3 border rounded-xl text-sm"
                                value={newBus.price}
                                onChange={(e) => setNewBus({ ...newBus, price: e.target.value })}
                            /> */}

                            <button type="submit" className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all cursor-pointer">
                                Launch Active Route
                            </button>
                        </form>
                    </div>
                )}

                {!isLoading && activeView === 'all-buses' && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Fleet Management and Cancellation</h2>
                        <p className="text-xs text-slate-400 mb-6">Terminate routes directly from active public view tracking matrices.</p>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 tracking-wider">
                                    <tr>
                                        <th className="p-4">Bus Operations Class</th>
                                        <th className="p-4">Target Destination Tracking</th>
                                        <th className="p-4">Fare Base Price</th>
                                        <th className="p-4 text-center">Operational Execution</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {buses.map((bus) => (
                                        <tr key={bus._id} className="hover:bg-slate-50/40 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">{bus.busName}</td>
                                            <td className="p-4 text-xs font-semibold text-slate-600">🗺️ {bus.from} ➔ {bus.to}</td>
                                            <td className="p-4 font-black text-slate-800">₹{bus.price}</td>
                                            <td className="p-4 text-center">
                                                <button onClick={() => handleRemoveBus(bus._id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                                    Terminate Route
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!isLoading && activeView === 'make-admin' && currentRole === 'superadmin' && (
                    <div className="max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Promote User Account Privilege</h2>
                        <p className="text-xs text-slate-400 mb-6">Elevate an existing standard customer profile to access route creation maps.</p>

                        <form onSubmit={handleMakeAdmin} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Target Account Email Identifier</label>
                                <input
                                    type="email"
                                    placeholder="operator-profile@domain.com"
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                />
                                <p className="text-[9px] text-slate-400 mt-2">The user database object must already exist to execute security mappings.</p>
                            </div>
                            <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-amber-700 shadow-md shadow-amber-600/10 cursor-pointer">
                                Authorize Route Access Permissions
                            </button>
                        </form>
                    </div>
                )}

                {!isLoading && activeView === 'remove-admin' && currentRole === 'superadmin' && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Active Admin clearance Registry</h2>
                        <p className="text-xs text-slate-400 mb-6">Strip user system clearance structures and downgrade records back to regular customer objects.</p>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 tracking-wider">
                                    <tr>
                                        <th className="p-4">Authenticated Identity</th>
                                        <th className="p-4">Clearance Role Status</th>
                                        <th className="p-4 text-center">Administrative Revocation Option</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {admins.map((admin) => (
                                        <tr key={admin._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <p className="font-bold text-slate-800 capitalize">{admin.name}</p>
                                                <p className="text-slate-400 font-mono text-[10px]">{admin.email}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase border 
                                                    ${admin.role === 'superadmin' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                    {admin.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                {admin.role === 'superadmin' ? (
                                                    <span className="text-[10px] text-slate-300 italic select-none">Protected Core Root Account</span>
                                                ) : (
                                                    <button onClick={() => handleStripClearance(admin._id)} className="text-red-500 font-bold hover:underline hover:text-red-700 cursor-pointer">
                                                        Strip Administrative clearance
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;