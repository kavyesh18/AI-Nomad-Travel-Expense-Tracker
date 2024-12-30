import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <div className='flex items-center mx-56 gap-9 flex-col'>
           <h1 className='font-extrabold text-[49px] text-center mt-16'> <span className='text-[#f56551]'>Embark on Your Next Journey with AI:</span><br></br>Tailored Itineraries at Your Fingertips</h1>
           <p className='text-xl text-gray-500 text-center'>Your personal travel planner and curator, designing bespoke itineraries tailored to your unique interests and budget.</p>

            <Link to="/create-trip">
           <Button>Get Started</Button>
           </Link>
        </div>
    );
};

export default Hero;