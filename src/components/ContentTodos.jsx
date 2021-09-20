import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Button, CheckBox, Layout, Text, Icon } from "@ui-kitten/components";
import DetailModal from "./DetailModal";
import axios from "axios";

const DeleteIcon = (props) => <Icon {...props} name="trash-2" />;

export default function ContentTodos(props) {
  const { isLoading, fetchTodos, todos, navigation } = props;
  // console.log(props);
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const url = "http://192.168.42.12:4000/api/v1";

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      await axios.delete(`${url}/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (id) =>
    Alert.alert("Warning", "Are You Sure Want To Delete this?", [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => handleDelete(id),
        style: "true",
      },
    ]);

  const handleChange = async ({ id, action }) => {
    try {
      // const dataUpdate = {
      //   title,
      //   description,
      // };
      console.log(id, action);

      const response = await axios.patch(`${url}/todo/${id}/${action}`);

      fetchTodos();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <Layout style={styles.todoCont}>
        <CheckBox
          status="primary"
          checked={checked}
          onChange={() =>
            handleChange({
              action: item.status ? "undone" : "done",
              id: item.id,
            })
          }
          checked={item.status}
        />
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.todoPressable}
        >
          <Layout style={{ marginLeft: 10, backgroundColor: "transparent" }}>
            <Text style={styles.textContentTitle}>{item.title}</Text>
            <Text style={styles.textContent} numberOfLines={2}>
              {item.description}
            </Text>
          </Layout>
          {visible ? (
            <DetailModal
              data={item}
              visible={visible}
              fetchTodos={fetchTodos}
              setVisible={setVisible}
            />
          ) : null}
        </TouchableOpacity>
        <Button
          accessoryLeft={DeleteIcon}
          appearance="ghost"
          status="danger"
          onPress={() => showAlert(item.id)}
        />
      </Layout>
    );
  };
  return (
    <>
      <FlatList
        data={todos}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={fetchTodos}
      />
    </>
  );
}

const styles = StyleSheet.create({
  todoCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#D6E4FF",
    marginVertical: 10,
    width: 400,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
  },
  textContentTitle: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  textContent: {
    color: "black",
  },
  todoPressable: {
    width: 250,
  },
  btnDelete: {},
});
