import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect } from 'react';
import { BsShareFill } from "react-icons/bs";

const InfoSection = ({ trip }) => {

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        };

        try {
            const result = await GetPlaceDetails(data);
            console.log(result); 
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    return (
        <div>
            <img className='h-[340px] w-full object-cover rounded-xl' src="/placeholder.jpg" alt="" />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No of Travellers: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><BsShareFill /></Button>
            </div>
        </div>
    );
};

export default InfoSection;
