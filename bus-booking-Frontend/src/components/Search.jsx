import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setfrom, setto } from '../redux/slices/searchSlice';

const SearchField = ({ icon, label, placeholder, type = "text", value, onChange }) => (
  <div className="flex items-center gap-4 px-8 flex-1 h-full border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
    <i className={`${icon} text-3xl text-gray-400 group-hover:text-[#d84e55] transition-colors`}></i>
    <div className="flex flex-col w-full">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg font-bold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-300"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const Search = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const search = () => {
    
    dispatch(setfrom(from));
    dispatch(setto(to));
  }

  return (
    <div className="w-full flex items-center justify-center my-10 px-4">
      <div className="w-full max-w-[1150px] h-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center overflow-hidden">

        <SearchField
          icon="ri-bus-2-line"
          label="From"
          placeholder="Departure City"
          value={from}
          onChange={setFrom}
        />

        <div className="relative z-20">
          <button
            onClick={handleSwap}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:border-[#d84e55] hover:text-[#d84e55] transition-all active:scale-90"
            title="Swap locations"
          >
            <i className="ri-arrow-left-right-line text-lg"></i>
          </button>
        </div>

        <SearchField
          icon="ri-bus-2-line"
          label="To"
          placeholder="Destination City"
          value={to}
          onChange={setTo}
        />

        <SearchField
          icon="ri-calendar-event-line"
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
        />

        <button className="h-full px-10 bg-[#d84e55] text-white text-lg font-bold hover:bg-[#c3444b] transition-all flex items-center justify-center gap-2 active:opacity-90 cursor-pointer" onClick={() => search()}>
          <span>SEARCH</span>
          <i className="ri-search-line"></i>
        </button>

      </div>
    </div>
  );
};

export default Search;

