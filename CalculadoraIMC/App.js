import { StyleSheet, View } from "react-native";
import Title from "./src/components/title";
import FormIMC from "./src/components/FormIMC";

export default function App() {
    return (
        <View style={styles.container}>
            <Title />
            <FormIMC />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
    },
});
