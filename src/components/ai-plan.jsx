import { GoogleGenerativeAI } from "@google/generative-ai";

let validSchema=`
please return response in valid json according to following Schema.
Schema:
{
  "tripData": {
  tripPlan:{
  "bestTimetoVisit": string,
  "budget": string,
  "destination": string,
  "duration": string,
  "hotels": [{
     "address": string,
     "description": string,
     "hotelImageURL": string,
     "hotelName": string,
     "price": string,
     "rating": string,
     "geoCoordinates": []
  }],
  "itinerary": [{
    "day": string,
    "plan": [{
    "placeDetails": string,
    "placeImageURL": string,
    "placeName": string,
    "ticketPricing": string
    "travelTime": string
    "geoCoordinates":[]
    }]
  }]
  "travelers": string

  }
  },
  "userEmail": string
}

Return only valid JSON.
`;

export async function GenerateDetail(userInput) {
  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_API);

  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash", // or 'gemini-pro'
    generationConfig: {
      temperature: 1.05,
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContentStream({
    contents: [
      {
        role: "user",
        parts: [{ text: userInput+"/n"+validSchema }],
      },
    ],
  });

  let fullResponse = "";
  for await (const chunk of result.stream) {
    if (chunk.text()) {
      fullResponse += chunk.text();
    }
  }
  return fullResponse;
}
