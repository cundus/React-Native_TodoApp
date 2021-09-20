import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Layout,
  TopNavigation,
} from "@ui-kitten/components";
import axios from "axios";

import ModalAdd from "../components/ModalAdd";
import ContentTodos from "../components/ContentTodos";

const PlusIcon = (props) => <Icon {...props} name="plus" />;

export const HomeScreen = ({ navigation }) => {
  // console.log(navigation);
  const [visible, setVisible] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const url = "http://192.168.42.12:4000/api/v1";

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/todo/undone`);

      setTodos(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <ContentTodos
          fetchTodos={fetchTodos}
          todos={todos}
          isLoading={isLoading}
          navigation={navigation.navigate}
        />
      </Layout>

      <ModalAdd
        visible={visible}
        setVisible={setVisible}
        url={url}
        fetchTodos={fetchTodos}
      />
      <Button
        style={style.btnAdd}
        accessoryLeft={PlusIcon}
        onPress={() => setVisible(true)}
      />
    </Layout>
  );
};

const style = StyleSheet.create({
  btnAdd: {
    alignSelf: "center",
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    // backgroundColor: "black",
    borderWidth: 0,
    bottom: 30,
  },
});
