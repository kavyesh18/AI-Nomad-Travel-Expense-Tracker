import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FireBaseConfig";
import { useNavigate } from "react-router";

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
    if (formData.location) {
      console.log("Location Details:", formData.location);
    }
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google Login Response:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.error("Google Login Error:", error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const userData = response.data;
      console.log("User Profile Data:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
  
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
      toast("All fields are required");
      return;
    }
  
    const SaveAiTrip = async (TripData) => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AI Nomad Trips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      navigate('/view-trip/'+docId)
    };
  
    setLoading(true);
  
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
  
    console.log("FormData for Trip:", formData);
    console.log(FINAL_PROMPT);
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponseText = await result?.response?.text();
      console.log("AI Response:", aiResponseText);
  
     
      await SaveAiTrip(aiResponseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold font-[poppins] text-3xl">
        Share Your Travel Preferences with Us.🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Simply provide some basic information, and our trip planner will create
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium font-[poppins]">
            Select Your Destination of Choice.
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl my-3 font-medium font-[poppins]">
            How many days are you planning for your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl my-3 font-medium font-[poppins] ">Select Your Budget.</h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                formData?.budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium font-[poppins]">
          With whom do you plan to travel on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                formData.traveler === item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {
            loading?
            <AiOutlineLoading className="h-7 w-7 spinner" />:'Generate Trip Budget'

          }
          </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="h-20 w-20" src="/logo.svg" alt="" />
              <h3 className="flex flex-row font-mono text-xl text-gray-800 tracking-wide">
                AI-Nomad
              </h3>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in with Google Authentication Securely</p>
              <Button onClick={login} className="w-full mt-5">
                <FcGoogle />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
