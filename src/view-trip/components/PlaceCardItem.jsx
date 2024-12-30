import { Button } from "@/components/ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const PlaceCardItem = ({place}) => {
    return (
        <div className="shadow-md border-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all">
            <img className="w-[130px] h-[130px] rounded-xl" src="/placeholder.jpg" alt="" />

            <div>
            <h2 className="font-bold text-lg mt-2">{place.placeName}</h2>
            <p className="text-sm text-gray-500 mt-2">{place.placeDetails}</p>
            <p className="text-sm mt-2"> 🕰️ {place.timeToTravel}</p>
            <Button className="mt-2"><Link target="_blank" to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeName}><FaLocationDot /></Link>
            </Button>
            </div>
        </div>
    );
};

export default PlaceCardItem;