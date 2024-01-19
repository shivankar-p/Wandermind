const options = {
    travelStyles: [
      "Cultural",
      "Adventure",
      "Relaxation",
      "Beach",
      "City Break",
      "Road Trip",
      "Wildlife Safari",
      "Ski",
    ],
    interestsNew: [
      { name: "History", emoji: "🏛️" },
      { name: "Art", emoji: "🎨" },
      { name: "Food", emoji: "🍴" },
      { name: "Music", emoji: "🎵" },
      { name: "Nature", emoji: "🌳" },
      { name: "Sports", emoji: "⚽" },
      { name: "Photography", emoji: "📷" },
      { name: "Architecture", emoji: "🏰" },
      { name: "Literature", emoji: "📚" },
    ],
  
    interests: [
      "History",
      "Art",
      "Food",
      "Music",
      "Nature",
      "Sports",
      "Photography",
      "Architecture",
      "Literature",
    ],
  
    accommodationTypes: [
      "Hotel",
      "Boutique Hotel",
      "Hostel",
      "Resort",
      "Vacation Rental",
      "Camping",
      "Homestay",
      "Bed and Breakfast",
    ],
    activityTypes: [
      "Outdoor",
      "Sightseeing",
      "Shopping",
      "Nightlife",
      "Museums",
      "Theme Parks",
      "Water Sports",
      "Yoga and Wellness",
    ],
    cuisineTypes: [
      { name: "Traditional", emoji: "😋" },
      { name: "Japanese", emoji: "🍱" },
      { name: "Italian", emoji: "🍝" },
      { name: "American", emoji: "🍔" },
      { name: "Korean", emoji: "🍜" },
      { name: "Mexican", emoji: "🌮" },
      { name: "Thai", emoji: "🍲" },
      { name: "Turkish", emoji: "🥙" },
      { name: "Indian", emoji: "🍛" },
      { name: "French", emoji: "🥐" },
      { name: "Spanish", emoji: "🥘" },
      { name: "Greek", emoji: "🍗" },
      { name: "Chinese", emoji: "🥡" },
    ],
  
    languages: [
      { value: "en", label: "English", icon: "🇺🇸" },
      { value: "tr", label: "Türkçe", icon: "🇹🇷" },
      { value: "fr", label: "Français", icon: "🇫🇷" },
      { value: "es", label: "Español", icon: "🇪🇸" },
      { value: "de", label: "Deutsch", icon: "🇩🇪" },
      { value: "it", label: "Italiano", icon: "🇮🇹" },
      { value: "pt", label: "Português", icon: "🇵🇹" },
      { value: "ru", label: "Русский", icon: "🇷🇺" },
      { value: "ja", label: "日本語", icon: "🇯🇵" },
    ],
  };
  
  const topLocations = [
    { name: "Milano, Italy", value: "Milano/Italy" },
    { name: "Paris, France", value: "Paris/France" },
    { name: "Los Angeles, CA", value: "Los Angeles/California" },
    // add more top locations as needed
  ];

  var defaultValues = {
    destinationCountry: "",
    budget: "250 USD",
    travelStyle: options.travelStyles[0],
    interestsNew: [],
    accommodationType: options.accommodationTypes[0],
    transportationType: "Bus",
    activityType: [options.activityTypes[0]],
    cuisineType: options.cuisineTypes[0],
    tripDuration: "3",
    language: options.languages[0].value,
    feedbacks: [],
    responses: [],
    feedback: ""
  };

const addDest = (des) => {
  console.log(des);
  defaultValues.destinationCountry = des;
}

export {options, topLocations, defaultValues, addDest};