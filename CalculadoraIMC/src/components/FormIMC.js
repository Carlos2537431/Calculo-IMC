import { View, TextInput, Button, StyleSheet } from "react-native";
import Result from "./result";
import React, { useState } from "react";
const FormIMC = () => {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setImc] = useState(null);

    const calcularIMC = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            const imcCalculado = parseFloat(peso) / (alturaMetros * alturaMetros).toFixed(2);
            setImc(imcCalculado);
        
        }
    };
        const classificaçãoIMC = () => {
            if (imc < 18.5) {
                return "Abaixo do Peso";
            }else if (imc >= 18.5 && imc < 24.9) {
                    return "Peso Normal";
            }else if (imc >= 25 && imc < 29.9) {
                return "Sobrepeso";
            }else if (imc >= 30 && imc < 34.9) {
                return "Obesidade Grau I";
            }else if (imc >= 35 && imc < 39.9) {
                return "Obesidade Grau II";
            } 
            
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
            />
            <TextInput
                style={styles.input}
                placeholder="Altura (cm)"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
            />
            <Button title="Calcular IMC" onPress={calcularIMC} />
            {imc && <Result imc={imc} />}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#f0f0f0",
        padding: 16,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: "#gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },

});
export default FormIMC;