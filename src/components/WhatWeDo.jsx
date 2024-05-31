import React from 'react';
import reliable from '../assets/reliable.gif';
import repeatable from '../assets/repeat.gif';
import analysis from '../assets/analysis.gif';

const WhatWeDo = () => {
  return (
    <div className="text-center inter-font mt-10">
      <h2 className="text-4xl  font-bold">What we do?</h2>
      <p className='text-gray-400 mt-4 text-xl'>Our Investment process is</p>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-8  md:space-y-0 md:space-x-28">
        <div className="flex border rounded-lg w-1/3   flex-col items-center text-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={reliable} alt="Reliable" className="h-12 w-12" />
          </div>
          <p className="mt-4 text-gray-700  text-xl font-semibold">Reliable</p>
          <p>Consistent Returns through data driven strategies</p>
        </div>
        <div className="flex border rounded-lg w-1/3   flex-col text-center items-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={repeatable} alt="Repeatable" className="h-12 w-12" />
          </div>
          <p className="mt-4 text-gray-700  text-xl font-semibold">Repeatable</p>
          <p> Proven methods for continuous <br /> growth</p>
        </div>
        <div className="flex border rounded-lg w-1/3   flex-col text-center items-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={analysis} alt="Emotion Free" className="h-12 w-12" />
          </div>
          <p className="mt-4 text-gray-700  text-xl font-semibold">Emotion Free</p>
          <p>Objective investments, devoid of emotional bias</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;