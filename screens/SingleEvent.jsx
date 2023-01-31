import { useState, useContext, useEffect, useRef } from "react";
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from "react-native-maps";
import { Text, Card, Button, Switch, Avatar, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import axios from 'axios';

import { EventContext } from "../context/EventContext";
import { LocationContext } from "../context/LocationContext";

import eventInformation from "../data/eventInformation";

const SingleEvent = ({ route }) => {
  const { eventType, setEventType, date } = useContext(EventContext);
  const { userLocation, userCountry } = useContext(LocationContext);
  const [ text, setText ] = useState("");
  const [ showCommentInput, setShowCommentInput ] = useState(false);
  const [ showMap, setShowMap ] = useState(false);
  const theme = useTheme();
  
  const [ currEvent, setCurrEvent ] = useState({});
  const [ eventInfo, setEventInfo ] = useState({});

  const { id } = route.params

  useEffect(() => {
    
    if (id !== undefined) {
      const getEvents = async () => {
        try {
          const response = await axios.get(`https://astro-map-be.onrender.com/api/eclipses/all/${id}`)
          const formattedDate = moment(id, "YYYY-MM-DD")
  
          const timeDiff = response.data.map((event) => {
            const formattedEventDate = moment(event.date, "YYYY-MM-DD")
            return moment.duration(formattedEventDate.diff(formattedDate)).asDays();
          })
      
          const filteredDiff = timeDiff.filter((x) => x >= 0);
      
          const nextEvent = response.data[timeDiff.indexOf(Math.min(...filteredDiff))];
          
          const currEventInfo = eventInformation.filter((event) => event.type === nextEvent.type);

          setEventInfo(currEventInfo[0]);
          setCurrEvent(nextEvent);  
          setEventType((currEventType) => ({...currEventType, type: nextEvent.type}))

          } catch (error) {
            console.log(error);
          }
        }
        getEvents();
    } else {
      const getEvents = async () => {
        try {
          const inputDate = moment(date).format("YYYY-MM-DD");
          const response = await axios.get(`https://astro-map-be.onrender.com/api/eclipses/all/${inputDate}`)
          const formattedDate = moment(inputDate, "YYYY-MM-DD")
  
          const timeDiff = response.data.map((event) => {
            const formattedEventDate = moment(event.date, "YYYY-MM-DD")
            return moment.duration(formattedEventDate.diff(formattedDate)).asDays();
          })
      
          const filteredDiff = timeDiff.filter((x) => x >= 0);
      
          const nextEvent = response.data[timeDiff.indexOf(Math.min(...filteredDiff))];
    
          const currEventInfo = eventInformation.filter((event) => event.type === nextEvent.type);
    
          setEventInfo(currEventInfo[0]);
          setCurrEvent(nextEvent);
          setEventType((currEventType) => ({...currEventType, type: nextEvent.type}))

        } catch (error) {
          console.log(error);
        }
      }
      getEvents();
    }
  }, [])

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 40}}>
      <View style={{ marginBottom: 10, paddingLeft: 30, flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
        <Avatar.Icon style={{ marginRight: 10, backgroundColor: theme.colors.surfaceVariant }} size={40} icon={eventType.icon}/>
        <Text variant="headlineLarge" style={{ fontWeight: "700"}}>{eventType.title}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 30, alignItems: "flex-end", justifyContent: "space-between" }}>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "700"}}>{userCountry}</Text>
          <Text variant="headlineSmall" style={{ fontWeight: "700"}}>{date.toDateString()}</Text>
          <Text variant="titleMedium" style={{ marginTop: 10, fontWeight: "700"}}>Here is the next event</Text>
          <Text variant="titleMedium" style={{ fontWeight: "700"}}>closest to this date:</Text>
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
              longitudeDelta: 75,
            }}
            style={{ marginTop: 20, width: "85%", height: "25%", alignSelf: "center" }}
          >
            {currEvent.coordinateData.map((tick, i) => {
              return (
                <View key={i}>
                  <Circle  
                    center={{
                      latitude: tick.centerCoordinates.latitude,
                      longitude: tick.centerCoordinates.longitude,
                      }} 
                    radius={tick.pathWidth * 1000}
                    strokeColor="red"
                    fillColor="red"
                  />
                  <Circle
                    center={{
                      latitude: tick.centerCoordinates.latitude,
                      longitude: tick.centerCoordinates.longitude,
                      }} 
                    radius={tick.pathWidth * 4000}
                    strokeColor="red"
                  />
                </View>
              )
            })}
          </MapView>}
      <ScrollView style={{ marginTop: 30, marginHorizontal: 30 }}>
        <Card mode="elevated">
          <Card.Cover source={{ uri: eventInfo.imageURL }}/>
          <Card.Content>
            <Text style={{ marginTop: 10, fontWeight: "800" }} variant="titleLarge">{eventType.title}</Text>
            <Text variant="titleSmall">({eventInfo.type})</Text>
            <Text style={{ marginBottom: 10, fontStyle: "italic" }} variant="titleSmall">{moment(currEvent?.date, 'YYYYMMMDD').format("MMM DD YYYY")}</Text>
            <Text variant="bodyMedium">{eventInfo.desc}</Text>
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
