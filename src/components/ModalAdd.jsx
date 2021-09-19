import React from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Modal,
  Text,
  Button,
  Icon,
  Card,
  Layout,
  Input,
  Divider,
} from "@ui-kitten/components";
import axios from "axios";

const CheckIcon = (props) => <Icon {...props} name="checkmark-outline" />;
const CancelIcon = (props) => <Icon {...props} name="close" />;

export default function ModalAdd({ visible, setVisible, url, fetchTodos }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        return Alert.alert("OOPS!", "You Need To Fill All Fields");
      }

      const data = {
        title,
        description,
      };

      const response = await axios.post(`${url}/todo`, data);

      setTitle("");
      setDescription("");
      fetchTodos();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card
          disabled={true}
          style={{ borderWidth: 2, borderColor: "#3366ff", borderRadius: 10 }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Add New Todo
          </Text>
          <Divider style={{ borderColor: "#3366FF", borderWidth: 1 }} />

          <Layout style={{ padding: 10, width: 300 }}>
            <Text>Title</Text>
            <Input
              placeholder="Input your Title"
              value={title}
              onChangeText={(nextValue) => setTitle(nextValue)}
            />

            <Text>Description</Text>
            <Input
              placeholder="Input the Description"
              value={description}
              onChangeText={(nextValue) => setDescription(nextValue)}
              multiline={true}
              numberOfLines={4}
            />
          </Layout>
          <Layout style={styles.btnContainer}>
            <Button
              accessoryLeft={CancelIcon}
              appearance="filled"
              status="danger"
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSubmit}
              accessoryLeft={CheckIcon}
              t
              appearance="filled"
              status="success"
            >
              Add
            </Button>
          </Layout>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
