import React from 'react';
import { FaWrench, FaRocket, FaLightbulb } from 'react-icons/fa';

export const Services = () => {
  return (
    <div className="mt-10 flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-500 to-white p-4">
      <div className="mt-16 w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Our Creative Services</h1>
        <p className="text-lg text-gray-700 mb-10 text-center">
          Explore a range of innovative services designed to elevate your business. Our team is committed to delivering exceptional quality and creative solutions. Discover what we can do for you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaWrench className="text-6xl text-gray-900 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Solutions</h3>
            <p className="text-center text-gray-600">Tailored solutions to fit your unique needs. We ensure top quality and timely delivery.</p>
          </div>
          <div className="flex flex-col items-center bg-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaRocket className="text-6xl text-gray-900 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Innovative Growth</h3>
            <p className="text-center text-gray-600">Driving growth with cutting-edge technology and innovative strategies for your business.</p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaLightbulb className="text-6xl text-gray-900 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Creative Consulting</h3>
            <p className="text-center text-gray-600">Personalized consultation and support to navigate complex challenges with creative insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
