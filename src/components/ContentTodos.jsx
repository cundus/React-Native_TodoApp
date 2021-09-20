import React from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CheckBox, Layout, Text } from "@ui-kitten/components";

export default function ContentTodos(props) {
  const { cb, isLoading, fetchTodos, todos, navigation } = props;
  // console.log(props);
  const [checked, setChecked] = React.useState(false);

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.todoCont}
        onPress={() => navigation("Details", item)}
      >
        <CheckBox
          status="primary"
          checked={checked}
          onChange={(nextChecked) => setChecked(nextChecked)}
        />
        <Layout style={{ marginLeft: 10, backgroundColor: "transparent" }}>
          <Text style={styles.textContent}>{item.title}</Text>
          <Text style={styles.textContent}>{item.description}</Text>
        </Layout>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={todos}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isLoading}
      onRefresh={fetchTodos}
    />
  );
}

const styles = StyleSheet.create({
  todoCont: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#D6E4FF",
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
  textContent: {
    color: "black",
  },
});
