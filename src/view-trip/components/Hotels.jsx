import React from 'react';
import { Link } from 'react-router';

const Hotels = ({trip}) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Recommended Hotels For Staying in {trip?.userSelection?.location?.label}</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel,index)=>(

                    <Link to={'https://www.google.com/maps/search/?api=1&query=' +hotel?.hotelAddress} target='_blank'>
                    <div key={index} className='hover:scale-105 cursor-pointer transition-all'>
                        <img className='rounded-xl' src="/placeholder.jpg" alt="" />
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-bold '>{hotel?.hotelName}</h2>
                            <h2 className='text-sm text-gray-600'>{hotel?.description}</h2>
                            <h2 className='text-xs font-semibold text-gray-500'> 📍{hotel?.hotelAddress}</h2>
                            <h2 className='text-sm'> 💰 {hotel?.price}</h2>
                            <h2 className='text-sm'> ⭐ {hotel?.rating}</h2>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hotels;