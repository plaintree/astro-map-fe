import { createContext, useState } from "react";

export const EventContext = createContext({
  eventType: {
    title: "",
    type: "",
    icon: "",
    slug: "",
  },
  setEventType: () => {},
  date: "",
  setDate: () => {},
  // eventCoordinates: [],
  // setEventCoordinates: () => {},
});

const EventContextProvider = ({ children }) => {
  const [eventType, setEventType] = useState({
    title: "Solar Eclipse",
    type: "annular",
    icon: "weather-sunny-off",
    slug: "solar-eclipse",
  });
  const [date, setDate] = useState(new Date());
  // const [eventCoordinates, setEventCoordinates] = useState(testData[0].coordinateData);

  return (
    <EventContext.Provider value={{ eventType, setEventType, date, setDate }}>
      {children}
    </EventContext.Provider>
  );
};
export default EventContextProvider;
