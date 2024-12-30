import React from 'react';
import PlaceCardItem from './placeCardItem';

const Places = ({ trip }) => {
    return (
        <div>
            <h2 className="font-bold text-lg mt-5">Places to Visit</h2>

            <div>
                {trip.tripData?.itinerary &&
                    Object.values(trip.tripData.itinerary).map((item, index) => (
                        <div key={index}>
                            <h2 className="font-medium text-lg mt-5">Day {index + 1}</h2>
                            <div className='grid grid-cols-2 gap-5'>
                            {item.places.map((place, idx) => (
                                <div key={idx}>
                                    <h2 className='font-medium text-sm text-orange-400'>{item.bestTimeToVisit}</h2>
                                        <PlaceCardItem place={place}/>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Places;
