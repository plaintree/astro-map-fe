import { View } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";
const CommentList = ({ comment }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        borderColor: theme.colors.outline,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Avatar.Image
          source={{ uri: comment.avatarURL }}
          size={30}
          style={{ marginRight: 10 }}
        />
        <Text variant="bodyMedium">
          {comment.username} ({comment.date})
        </Text>
      </View>
      <Text variant="bodySmall">{comment.body}</Text>
    </View>
  );
};
export default CommentList;
