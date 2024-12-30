export const SelectTravelsList = [
    {
        id:1,
        title:'Solo Travel',
        desc:'A solo Traveller Exploration',
        icon:'✈️',
        people:'1',
    },

    {
        id:2,
        title:'Couple',
        desc:'Two Travellers in Tandem',
        icon:'💕',
        people:'2'
    },

    {
        id:3,
        title:'Family',
        desc:'A group of Fun loving adventure',
        icon:'👪',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill seekers',
        icon:'😎',
        people:'5-6'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Keep your consicious on costs',
        icon:'💲'
    },

    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },

    {
        id:3,
        title:'Luxury',
        desc:'Focus on luxury amenities.',
        icon:'🤑'
    }
]

export const AI_PROMPT = "Generate Travel Plan For Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options at least 6 list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details, place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location the time should be the clock time for {totalDays} days with each day plan with best time to visit in JSON format. "