import { createContext, useState } from "react";
import testData from "../data/testData";

export const EventContext = createContext({
  eventType: {
    title: "",
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
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(new Date());
  // const [eventCoordinates, setEventCoordinates] = useState(testData[0].coordinateData);

  return (
    <EventContext.Provider value={{ eventType, setEventType, date, setDate }}>
      {children}
    </EventContext.Provider>
  );
};
export default EventContextProvider;
