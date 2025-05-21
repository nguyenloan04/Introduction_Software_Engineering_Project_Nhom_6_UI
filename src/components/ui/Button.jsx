import React from 'react';

export const Button= ({ children, className = '', ...props })=>{
    return (
        <button
            className={`bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
