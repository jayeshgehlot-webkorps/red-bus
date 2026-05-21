import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import BusCard from './BusCard';
import Sidebar from './Sidebar';

const Allbuses = () => {

    const allbuses = useSelector((state) => state.bus.buses);
    const busTypes = useSelector((state) => state.bus.filter.busTypes);
    const from = useSelector((state) => state.search.from);
    const to = useSelector((state) => state.search.to);

    useEffect(() => {
        
    }, [from, to]);

    const filteredBuses = allbuses.filter((e) => {
        return (
            (busTypes.length === 0 || busTypes.includes(e.bustype)) &&
            (!from || e.from.toLowerCase() === from.toLowerCase()) &&
            (!to || e.to.toLowerCase() === to.toLowerCase())
        );
    });

    return (
        <div className='flex justify-center gap-5 w-full'>
            <Sidebar />
            <div className='flex flex-col items-center gap-2 w-full'>

                {filteredBuses.length === 0 ? (
                    <p className="text-gray-500 text-lg mt-10">
                        No buses found {from && `from ${from}`} {to && `to ${to}`} 🚫
                    </p>
                ) : (
                    filteredBuses.map((e, idx) => (
                        <BusCard key={idx} bus={e} />
                    ))
                )}
            </div>
        </div>
    )
}
export default Allbuses;