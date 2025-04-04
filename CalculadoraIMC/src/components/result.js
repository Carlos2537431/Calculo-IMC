import React from "react";
import { Text, StyleSheet } from "react-native";

const Result = ({ imc }) => { //retorna a mensagem com o resultado do IMC
    return (
        <Text style={styles.resultText}>Seu IMC é: {imc}</Text>
    );
};

const styles = StyleSheet.create({ //estilo da mensagem
    resultText: {
        marginTop: 20,
        fontSize: 30,
        textAlign: "center",
        color: "black",
    },
});

export default Result; //exporta o componente Result