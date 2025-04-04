import React from "react";
import { Text, StyleSheet } from "react-native";

const Result = ({ pesoMin, pesoMax }) => { //retorna a mensagem com o peso ideal
    return (
        <>
            <Text style={styles.resultText}>Seu peso minimo é: {pesoMin} kg</Text>
            <Text style={styles.resultText}>Seu peso maximo é: {pesoMax} kg</Text>
        </>
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