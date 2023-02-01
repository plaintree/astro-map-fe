import { useContext, useState } from "react";

import { View, TouchableOpacity } from "react-native";
import {
  Text,
  Avatar,
  useTheme,
  Modal,
  Portal,
  TouchableRipple,
  Button,
} from "react-native-paper";

import { UserContext } from "../context/UserContext";

const CommentList = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const { avatarUrl } = useContext(UserContext);

  return (
    <>
      {showModal && (
        <Portal>
          <Modal
            visible={true}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={{
              borderRadius: 20,
              height: "12%",
              width: "80%",
              marginHorizontal: 45,
              backgroundColor: theme.colors.surfaceVariant,
              alignItems: "center",
            }}
          >
            <Text variant="titleMedium">
              Are you sure deleting this comment?
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Button mode="outlined" style={{ marginRight: 10 }}>
                Confirm
              </Button>
              <Button mode="contained" onPress={() => setShowModal(false)}>
                Cancel
              </Button>
            </View>
          </Modal>
        </Portal>
      )}
      <TouchableOpacity
        style={{
          borderColor: theme.colors.outline,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginBottom: 5,
        }}
        onLongPress={() => setShowModal(true)}
      >
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Avatar.Image
              source={{ uri: avatarUrl }}
              size={30}
              style={{ marginRight: 10 }}
            />
            <Text variant="bodyMedium">
              {comment.username}
              {/* ({comment.date.slice(4, 15)}) */}
            </Text>
          </View>
          <Text variant="bodySmall">{comment.body}</Text>
        </>
      </TouchableOpacity>
    </>
  );
};
export default CommentList;
