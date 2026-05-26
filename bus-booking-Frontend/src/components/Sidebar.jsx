import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBusTypes } from '../redux/slices/busSlice';

const FilterSection = ({ title, children }) => (
    <div className="mb-8 last:mb-0">
        <h3 className="text-[11px] font-black uppercase tracking-[1.5px] text-slate-800 mb-4 px-1">
            {title}
        </h3>
        <div className="flex flex-col gap-1">
            {children}
        </div>
    </div>
);

const FilterItem = ({ label, icon, count, onToggle, isChecked }) => {
    return (
        <label
            className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200
            ${isChecked ? 'bg-red-50 text-red-600' : 'hover:bg-slate-50 text-slate-600'}`}
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isChecked} 
                    onChange={(e) => onToggle(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-red-500 focus:ring-red-500 cursor-pointer"
                />
                <i className={`${icon} text-lg opacity-70 group-hover:opacity-100 transition-opacity`}></i>
                <span className="text-sm font-semibold tracking-tight">{label}</span>
            </div>
            {count && <span className="text-[10px] font-bold opacity-40">{count}</span>}
        </label>
    );
};

const Sidebar = () => {
    const dispatch = useDispatch();

    const [selectedBusTypes, setselectedBusTypes] = useState([]);

    const handleBusToggle = (label, isAdded) => {
        setselectedBusTypes((prev) =>
            isAdded
                ? [...prev, label]
                : prev.filter((item) => item !== label)
        );
    };

    useEffect(() => {
        dispatch(setBusTypes(selectedBusTypes));
    }, [selectedBusTypes, dispatch]);

    return (
        <aside className="w-[250px] bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 h-fit sticky top-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <h2 className="font-black text-slate-900 tracking-tight italic">FILTERS</h2>

                <button
                    onClick={() => setselectedBusTypes([])} 
                    className="text-[10px] font-bold text-red-500 hover:underline"
                >
                    CLEAR ALL
                </button>
            </div>

            <FilterSection title="Bus Types">
                <FilterItem
                    label="Sleeper"
                    icon="ri-hotel-bed-line"
                    onToggle={(c) => handleBusToggle("sleeper", c)}
                    isChecked={selectedBusTypes.includes("sleeper")}
                />

                <FilterItem
                    label="AC"
                    icon="ri-windy-line"
                    onToggle={(c) => handleBusToggle("AC", c)}
                    isChecked={selectedBusTypes.includes("AC")}
                />

                <FilterItem
                    label="Non-AC"
                    icon="ri-temp-hot-line"
                    onToggle={(c) => handleBusToggle("Non-AC", c)}
                    isChecked={selectedBusTypes.includes("Non-AC")}
                />
            </FilterSection>
        </aside>
    );
};

export default Sidebar;