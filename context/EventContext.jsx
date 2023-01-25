import { createContext, useState } from "react";

export const EventContext = createContext({
  eventType: "",
  setEventType: () => {},
  date: "",
  setDate: () => {},
});

const EventContextProvider = ({ children }) => {
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <EventContext.Provider value={{ eventType, setEventType, date, setDate }}>
      {children}
    </EventContext.Provider>
  );
};
export default EventContextProvider;
