import { useState, useContext } from "react";
import { View, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { Text, Card, Button, Switch, Avatar, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventContext } from "../context/EventContext";
import { LocationContext } from "../context/LocationContext";

const SingleEvent = () => {
  const { eventType, date } = useContext(EventContext);
  const { userLocation, userCountry } = useContext(LocationContext);
  const [ text, setText ] = useState("");
  const [ showCommentInput, setShowCommentInput ] = useState(false);
  const [ showMap, setShowMap ] = useState(false);
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 40}}>
      <View style={{ marginBottom: 10, paddingLeft: 30, flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
        <Avatar.Icon style={{ marginRight: 10, backgroundColor: theme.colors.surfaceVariant }} size={40} icon={eventType.icon}/>
        <Text variant="headlineLarge" style={{ fontWeight: "700"}}>{eventType.title}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 30, alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "700"}}>{userCountry}</Text>
          <Text variant="headlineSmall" style={{ fontWeight: "700"}}>{date.toDateString()}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text variant="titleMedium" >Map</Text>
          <Switch 
            value={showMap}
            onValueChange={() => setShowMap((currentState) => !currentState)}
          />
        </View>
      </View>
          {showMap && <MapView
            provider="google"
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 100,
            }}
            style={{ marginTop: 20, width: "85%", height: "25%", alignSelf: "center" }}
          >
          </MapView>}
      <ScrollView style={{ marginTop: 30, marginHorizontal: 30 }}>
        <Card mode="elevated">
          <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1503775012249-06a2b8cd00eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1754&q=80" }}/>
          <Card.Content>
            <Text style={{ marginVertical: 10, fontWeight: "800" }} variant="titleLarge">{eventType.title}</Text>
            <Text variant="bodyMedium">At et invidunt sadipscing sit sanctus sanctus kasd, justo sed voluptua gubergren sed diam ipsum erat, diam vero amet sit kasd justo sea est. Rebum sanctus et ea gubergren dolores.</Text>
          </Card.Content>
          { !showCommentInput && <Card.Actions style={{marginVertical: 5, marginHorizontal: 5}}>
            <Button mode="contained-tonal" dark onPress={() => setShowCommentInput(true)}>Comment</Button>
          </Card.Actions> }
            { showCommentInput && 
            <>
              <TextInput 
                mode="outlined"
                label="Enter comment..."
                style={{ marginVertical: 10 }} 
                multiline
                value={text}
                onChangeText={text => setText(text)}
              />
              <Card.Actions>
                <Button>Submit</Button>
                <Button onPress={() => {
                  setShowCommentInput(false);
                  setText("");
                }}>Cancel</Button>
              </Card.Actions> 
            </>}
        </Card>
      </ScrollView>
      
    </SafeAreaView>
  );
};
export default SingleEvent;
