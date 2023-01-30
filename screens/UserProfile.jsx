import {useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { List, Text, Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";

import { UserContext } from "../context/UserContext";

const UserProfile = ({ navigation }) => {
  const {userName, setFavoriteType, avatarUrl, setIsLogin} = useContext(UserContext);
  const [expandList, setExpandList] = useState(false);
  const [accordion, setAccordion] = useState({
    title: "Type",
    icon: "orbit",
  });
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", marginVertical: 50}}>
      <Avatar.Image size={150} source={{uri: avatarUrl}}/>
      <Text variant="displaySmall" style={{marginTop: 20, fontWeight: "800"}}>{userName}</Text>
      <ScrollView style={{marginTop: 20, marginHorizontal: 20}}>
          <Text
            variant="titleLarge"
            style={{ marginBottom: 20, fontWeight: "700", textAlign: "center" }}
          >
            Set favorite type of astronomical event
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
                  setFavoriteType("solar-eclipse");
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
                  setFavoriteType("comet");
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
                  setFavoriteType("meteor-shower");
                }}
              />
            </List.Accordion>
          </List.Section>
        <Button mode="contained" style={{marginTop: 40}} onPress={() => {
          setIsLogin(false);
          setFavoriteType("");
          }}
        >Sign out</Button>
        </ScrollView>
    </SafeAreaView>
  );
};
export default UserProfile;
