import { useState, useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import MapView, { Circle } from "react-native-maps";
import {
  Text,
  Card,
  Button,
  Switch,
  Avatar,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import axios from "axios";

import { EventContext } from "../context/EventContext";
import { LocationContext } from "../context/LocationContext";
import { UserContext } from "../context/UserContext";

import CommentList from "../components/CommentList";

import eventInformation from "../data/eventInformation";

const SingleEvent = ({ route }) => {
  const { eventType, setEventType, date } = useContext(EventContext);
  const { setFavEvents, favEventId, setFavEventId, userName, isLogin } =
    useContext(UserContext);
  const { userCountry } = useContext(LocationContext);
  const [text, setText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMsg, setLoginMsg] = useState(null);
  const [refreshComments, setRefreshComments] = useState(null);

  const theme = useTheme();
  const [commentData, setCommentData] = useState([]);
  const [currEvent, setCurrEvent] = useState({});
  const [eventInfo, setEventInfo] = useState({});

  useEffect(() => {
    if (route.params !== undefined) {
      const getEvents = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://astro-map-be.onrender.com/api/eclipses/all/${route.params.id}`
          );
          const formattedDate = moment(route.params.id, "YYYY-MM-DD");

          const timeDiff = response.data.map((event) => {
            const formattedEventDate = moment(event.date, "YYYY-MM-DD");
            return moment
              .duration(formattedEventDate.diff(formattedDate))
              .asDays();
          });

          const filteredDiff = timeDiff.filter((x) => x >= 0);

          const nextEvent =
            response.data[timeDiff.indexOf(Math.min(...filteredDiff))];

          const currEventInfo = eventInformation.filter(
            (event) => event.type === nextEvent.type
          );

          const { data } = await axios.get(
            `https://astro-map-be.onrender.com/api/comments/${nextEvent.date}`
          );

          setCommentData(data);
          setEventInfo(currEventInfo[0]);
          setCurrEvent(nextEvent);
          setIsFav(favEventId.includes(nextEvent._id));

          setEventType((currEventType) => ({
            ...currEventType,
            type: nextEvent.type,
          }));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getEvents();
    } else {
      const getEvents = async () => {
        try {
          setIsLoading(true);
          const inputDate = moment(date).format("YYYY-MM-DD");
          const response = await axios.get(
            `https://astro-map-be.onrender.com/api/eclipses/`
          );
          const formattedDate = moment(inputDate, "YYYY-MM-DD");

          const timeDiff = response.data.map((event) => {
            const formattedEventDate = moment(event.date, "YYYY-MM-DD");
            return moment
              .duration(formattedEventDate.diff(formattedDate))
              .asDays();
          });

          const filteredDiff = timeDiff.filter((x) => x >= 0);

          const nextEvent =
            response.data[timeDiff.indexOf(Math.min(...filteredDiff))];

          const currEventInfo = eventInformation.filter(
            (event) => event.type === nextEvent.type
          );
          const { data } = await axios.get(
            `https://astro-map-be.onrender.com/api/comments/${nextEvent.date}`
          );

          setCommentData(data);
          setEventInfo(currEventInfo[0]);
          setCurrEvent(nextEvent);
          setEventType((currEventType) => ({
            ...currEventType,
            type: nextEvent.type,
          }));
          setIsFav(favEventId.includes(nextEvent._id));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getEvents();
    }
    return () => {
      setRefreshComments(null);
    };
  }, [refreshComments]);

  const handleFavButtonClick = (username, date) => {
    if (isFav) {
      setIsFav(false);
      setFavEvents((existingDates) =>
        existingDates.filter((date) => date !== currEvent.date)
      );
      setFavEventId((existingEventId) =>
        existingEventId.filter((id) => id !== currEvent._id)
      );
      axios.patch(
        `https://astro-map-be.onrender.com/api/users/${username}/favourites/remove`,
        {
          username: username,
          favourite: date,
        }
      );
    } else {
      setIsFav(true);
      setFavEvents((existingDates) => [...existingDates, currEvent.date]);
      setFavEventId((existingEventId) => [...existingEventId, currEvent._id]);
      axios.patch(
        `https://astro-map-be.onrender.com/api/users/${username}/favourites`,
        {
          username: username,
          favourite: date,
        }
      );
    }
  };

  const handleSubmitClick = async (user, content, id) => {
    if (isLoading) {
      setIsSubmitting(true);
      await axios.post(`https://astro-map-be.onrender.com/api/comments/${id}`, {
        username: user,
        body: content,
        event: id,
      });
      setIsSubmitting(false);
      setText("");
      setLoginMsg(null);
      setRefreshComments(true);
    } else {
      setLoginMsg("Please login first before submitting comment");
      setText("");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View
        style={{
          marginBottom: 10,
          paddingLeft: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Avatar.Icon
          style={{
            marginRight: 10,
            backgroundColor: theme.colors.surfaceVariant,
          }}
          size={40}
          icon={eventType.icon}
        />
        <Text variant="headlineLarge" style={{ fontWeight: "700" }}>
          {eventType.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "700" }}>
            {userCountry}
          </Text>
          <Text variant="headlineSmall" style={{ fontWeight: "700" }}>
            {moment(date).format("DD MMM YYYY")}
          </Text>
          {route.params === undefined && (
            <>
              <Text
                variant="titleMedium"
                style={{ marginTop: 10, fontWeight: "700" }}
              >
                Here is the next event
              </Text>

              <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                closest to this date:
              </Text>
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text variant="titleMedium">Map</Text>
          <Switch
            value={showMap}
            onValueChange={() => setShowMap((currentState) => !currentState)}
          />
        </View>
      </View>
      {showMap && !isLoading && (
        <MapView
          provider="google"
          region={{
            latitude: currEvent.coordinateData[0].centerCoordinates.latitude,
            longitude: currEvent.coordinateData[0].centerCoordinates.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 150,
          }}
          style={{
            marginTop: 20,
            width: "85%",
            height: "25%",
            alignSelf: "center",
          }}
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
                  strokeColor="#f4433640"
                  fillColor="#f4433666"
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
            );
          })}
        </MapView>
      )}
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        />
      ) : (
        <ScrollView style={{ marginTop: 30, marginHorizontal: 30 }}>
          <Card mode="elevated">
            <Card.Cover source={{ uri: eventInfo.imageURL }} />
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{ marginTop: 10, fontWeight: "800" }}
                    variant="titleLarge"
                  >
                    {eventType.title}
                  </Text>
                  <Text
                    variant="titleSmall"
                    style={{ textTransform: "capitalize" }}
                  >
                    {eventInfo.type}
                  </Text>
                  <Text
                    style={{ marginBottom: 10, fontStyle: "italic" }}
                    variant="titleSmall"
                  >
                    {moment(currEvent?.date, "YYYY-MM-DD").format(
                      "DD MMM YYYY"
                    )}
                  </Text>
                </View>
                {isFav ? (
                  <IconButton
                    size={24}
                    mode="contained-tonal"
                    icon="star"
                    onPress={() =>
                      handleFavButtonClick(userName, currEvent?.date)
                    }
                  />
                ) : (
                  <IconButton
                    size={24}
                    mode="contained-tonal"
                    icon="star-outline"
                    onPress={() =>
                      handleFavButtonClick(userName, currEvent?.date)
                    }
                  />
                )}
              </View>

              <Text variant="bodyMedium">{eventInfo.desc}</Text>
            </Card.Content>
            {!showCommentInput && (
              <Card.Actions style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <Button
                  mode="contained-tonal"
                  dark
                  onPress={() => setShowCommentInput(true)}
                >
                  Comment
                </Button>
              </Card.Actions>
            )}
            {showCommentInput && (
              <>
                <Card.Content style={{ marginVertical: 20 }}>
                  {commentData.map((comm) => (
                    <CommentList comment={comm} key={comm._id} />
                  ))}
                </Card.Content>
                <TextInput
                  mode="outlined"
                  label="Enter comment..."
                  style={{
                    marginBottom: 10,
                    width: "90%",
                    alignSelf: "center",
                  }}
                  multiline
                  editable={isSubmitting ? false : true}
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
                {loginMsg && (
                  <Text style={{ marginLeft: 20, color: theme.colors.error }}>
                    {loginMsg}
                  </Text>
                )}
                <Card.Actions>
                  <Button
                    onPress={() =>
                      handleSubmitClick(userName, text, currEvent?.date)
                    }
                    loading={isSubmitting ? true : false}
                    disabled={isSubmitting ? true : false}
                  >
                    Submit
                  </Button>
                  <Button
                    onPress={() => {
                      setShowCommentInput(false);
                      setText("");
                      setLoginMsg(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Card.Actions>
              </>
            )}
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default SingleEvent;
