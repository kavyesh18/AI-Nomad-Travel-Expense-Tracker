import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '@/service/FireBaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
const ViewTrip = () => {

    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
       tripId&&getTripData();
    },[tripId])

    /**
     *Used To Retrive The information from the Database
     */
    const getTripData=async()=>{
        const docRef = doc(db,"AI Nomad Trips",tripId)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data())
            setTrip(docSnap.data());
        }
        else{
            console.log("No Trip Found")
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 font-[poppins]'>
           <InfoSection trip={trip}/>

           <Hotels trip={trip}/>

           <Places trip={trip}/>
        </div>
    );
};

export default ViewTrip;