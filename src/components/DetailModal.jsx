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

const CheckIcon = (props) => <Icon {...props} name="checkmark" />;
const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;
const CancelIcon = (props) => <Icon {...props} name="close" />;

export default function DetailModal(props) {
  const { data, visible, setVisible, fetchTodos } = props;
  // console.log(props);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const url = "http://192.168.42.12:4000/api/v1";

  const handleSubmit = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        return Alert.alert("OOPS!", "You Need To Fill All Fields");
      }

      const dataUpdate = {
        title,
        description,
      };

      const response = await axios.patch(
        `${url}/todo/${data.id}/body`,
        dataUpdate
      );

      fetchTodos();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const detailTodos = () => {
    setTitle(data.title);
    setDescription(data.description);
  };

  React.useEffect(() => {
    detailTodos();
  }, [props]);

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
          {isEdit ? (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Update Your Todo
              </Text>
              <Divider style={{ borderColor: "#3366FF", borderWidth: 1 }} />

              <Layout style={{ padding: 10, width: 300 }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Title
                </Text>
                <Input
                  placeholder="Input your Title"
                  value={title}
                  onChangeText={(nextValue) => setTitle(nextValue)}
                  style={{ marginBottom: 15 }}
                  autoFocus={true}
                />

                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Description
                </Text>
                <Input
                  placeholder="Input the Description"
                  value={description}
                  onChangeText={(nextValue) => setDescription(nextValue)}
                  multiline={true}
                  numberOfLines={4}
                  style={{ marginBottom: 15 }}
                />
              </Layout>
              <Layout style={styles.btnContainer}>
                <Button
                  accessoryLeft={CancelIcon}
                  appearance="outline"
                  status="danger"
                  onPress={() => setIsEdit(false)}
                ></Button>
                <Button
                  onPress={handleSubmit}
                  accessoryLeft={CheckIcon}
                  t
                  appearance="outline"
                  status="success"
                ></Button>
              </Layout>
            </>
          ) : (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Your Todo
              </Text>
              <Divider style={{ borderColor: "#3366FF", borderWidth: 1 }} />

              <Layout style={{ padding: 10, width: 300 }}>
                <Layout>
                  <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                    Title
                  </Text>
                  <Text style={{ marginBottom: 15 }}>{title}</Text>
                </Layout>

                <Layout>
                  <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                    Description
                  </Text>
                  <Text style={{ marginBottom: 15 }}>{description}</Text>
                </Layout>
              </Layout>
              <Layout style={styles.btnContainer}>
                <Button
                  accessoryLeft={CancelIcon}
                  appearance="outline"
                  status="danger"
                  onPress={() => setVisible(false)}
                ></Button>
                <Button
                  onPress={() => setIsEdit(true)}
                  accessoryLeft={EditIcon}
                  appearance="outline"
                  status="primary"
                ></Button>
              </Layout>
            </>
          )}
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
