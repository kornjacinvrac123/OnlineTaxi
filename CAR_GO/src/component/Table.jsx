import React, { useState } from 'react';
import useStore from '../Functions/useStore';

const Table = ({ Rows = [] ,handleShowDirection}) => {
   const setRepeatData=useStore((state)=>state.setRepeatData);
   const serviceData=useStore((state)=>state.serviceData);
   const setEditStatus=useStore((state)=>state.setEditStatus);

  return (
    <div className="p-6"  >
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Start</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">End</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Length</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Time</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Price</th>
          </tr>
        </thead>
        <tbody>
          {Rows.map((items) => (
            <tr className="hover:bg-green-400 cursor-pointer transition-colors"onClick={()=>{
              //Handler func that passes through UserPanel->ServiceHistory->Table just to shutdown
              // main showDirection panel ... not the best usage but i can not now make all the change
              // i just could use global state with zustand and it will be a lot clearer than this...  
              handleShowDirection();
              setRepeatData({
                    id:items.id,
                    UserId:items.UserId,
                    StartLocation:items.StartLocation,
                    EndLocation:items.EndLocation,
                    RoadLength:items.RoadLength,
                    Price:items.Price,
               });
    
               setEditStatus(true);
                }} >
              <td className="py-3 px-4 border-b text-sm text-gray-700">{items.StartLocation}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{items.EndLocation}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{items.RoadLength}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{items.ReservationTime}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{items.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;