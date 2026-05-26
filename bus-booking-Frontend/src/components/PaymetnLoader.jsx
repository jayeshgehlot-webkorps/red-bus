import React from 'react'

const PaymetnLoader = ({ content }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <p className="text-lg font-semibold mb-3">
                    {content}
                </p>

                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    )
}

export default PaymetnLoader