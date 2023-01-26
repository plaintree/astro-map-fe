import { useState, useContext } from "react";
import { Image, View, ScrollView } from "react-native";
import { Text, Button, List, useTheme } from "react-native-paper";
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import Banner from "../assets/timeMachineLogo.jpeg";
import { EventContext } from "../context/EventContext";
import LinkButton from "../components/LinkButton";

const TimeMachine = ({ navigation }) => {
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expandList, setExpandList] = useState(false);
  const [accordion, setAccordion] = useState({
    title: "Type",
    icon: "orbit",
  });
  const { setEventType, date, setDate } = useContext(EventContext);

  const theme = useTheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
    setShowSelectDate(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <Text
        variant="headlineLarge"
        style={{ fontWeight: "700", textAlign: "center" }}
      >
        Time Machine
      </Text>
      <MaterialCommunityIcons
        name="timer-cog-outline"
        size={200}
        color={theme.colors.secondary}
        style={{ textAlign: "center", marginVertical: 20 }}
      />
      <ScrollView style={{ paddingHorizontal: 50 }}>
        <Text
          variant="titleLarge"
          style={{ fontWeight: "700", textAlign: "center" }}
        >
          Let's travel in time to view astronomical events
        </Text>
        <View>
          <Button
            onPress={() => setShowDatePicker(true)}
            mode="contained-tonal"
            dark
            icon="calendar-clock"
            style={{ borderRadius: 10, marginVertical: 10 }}
          >
            {showSelectDate ? (
              <Text
                style={{ alignItems: "center", justifyContent: "center" }}
                variant="bodyLarge"
              >
                <Text>{date.toDateString()} </Text>
                <MaterialIcons name="keyboard-arrow-down" size={12} />
              </Text>
            ) : (
              "Select Date"
            )}
          </Button>

          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode="date"
              onChange={onChange}
              themeVariant="dark"
              display="default"
            />
            // <DatePickerModal
            //   locale="en"
            //   mode="range"
            //   visible={true}
            //   onDismiss={() => setShowDatePicker(false)}
            //   startDate={range.startDate}
            //   endDate={range.endDate}
            //   onConfirm={onConfirm}
            // />
          )}
        </View>
        <View>
          <Text
            variant="titleLarge"
            style={{ fontWeight: "700", textAlign: "center" }}
          >
            Choose a type of astronomical event
          </Text>
          <List.Section>
            <List.Accordion
              title={accordion.title}
              left={(props) => <List.Icon {...props} icon={accordion.icon} />}
              expanded={expandList}
              onPress={() => setExpandList((currState) => !currState)}
              style={{
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: 10,
              }}
            >
              <List.Item
                title="Solar Eclipse"
                left={(props) => (
                  <List.Icon {...props} icon="weather-sunny-off" />
                )}
                onPress={() => {
                  setExpandList(false);
                  setAccordion({
                    title: "Solar Eclipse",
                    icon: "weather-sunny-off",
                  });
                  setEventType({
                    title: "Solar Eclipse",
                    icon: "weather-sunny-off",
                    slug: "solar-eclipse",
                  });
                }}
              />
              <List.Item
                title="Comet"
                left={(props) => (
                  <List.Icon {...props} icon="star-shooting-outline" />
                )}
                onPress={() => {
                  setExpandList(false);
                  setAccordion({
                    title: "Comet",
                    icon: "star-shooting-outline",
                  });
                  setEventType({
                    title: "Comet",
                    icon: "star-shooting-outline",
                    slug: "comet",
                  });
                }}
              />
              <List.Item
                title="Meteor Shower"
                left={(props) => <List.Icon {...props} icon="shower-head" />}
                onPress={() => {
                  setExpandList(false);
                  setAccordion({
                    title: "Meteor Shower",
                    icon: "shower-head",
                  });
                  setEventType({
                    title: "Meteor Shower",
                    icon: "shower-head",
                    slug: "meteor-shower",
                  });
                }}
              />
            </List.Accordion>
          </List.Section>
        </View>
        {!expandList && (
          <LinkButton
            to={{ screen: "Single Event" }}
            disabled={accordion.title === "Type" ? true : false}
          >
            Continue
          </LinkButton>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default TimeMachine;
