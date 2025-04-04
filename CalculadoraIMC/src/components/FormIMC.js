import { View, TextInput, Button, StyleSheet } from 'react-native';
import Result from './result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
import React, { useState } from 'react';
import Title from './title';

const FormIMC = () => {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setImc] = useState(null);
    const [classification, setClassification] = useState('');
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');

    const subVirgulaPorPonto = (texto) => {
        return texto.replace(/,/g, ".");
    };

    const calcularIMC = () => {
        const pesoCorrigido = subVirgulaPorPonto(peso);
        const alturaCorrigida = subVirgulaPorPonto(altura);

        if (!isNaN(pesoCorrigido) && !isNaN(alturaCorrigida) && parseFloat(pesoCorrigido) > 0 && parseFloat(alturaCorrigida) > 0) {
            const alturaMetros = parseFloat(alturaCorrigida) / 100;
            const imcCalculado = (parseFloat(pesoCorrigido) / (alturaMetros * alturaMetros)).toFixed(2);
            setImc(imcCalculado);
            classificarIMC(imcCalculado);
            calcularPesosIdeais(alturaCorrigida);
        } else {
            alert('Por favor, insira valores válidos para peso e altura.');
        }
    };

    const classificarIMC = (imc) => {
        if (imc < 18.5) setClassification("Abaixo do peso");
        else if (imc >= 18.5 && imc < 24.9) setClassification("Peso normal");
        else if (imc >= 25 && imc < 29.9) setClassification("Sobrepeso");
        else if (imc >= 30 && imc < 34.9) setClassification("Obesidade grau 1");
        else if (imc >= 35 && imc < 39.9) setClassification("Obesidade grau 2");
        else if (imc >= 40) setClassification("Obesidade grau 3");
    };

    const calcularPesosIdeais = (alturaCorrigida) => {
        const alturaMetros = parseFloat(alturaCorrigida) / 100;
        const pesoMinCalculado = (18.5 * (alturaMetros * alturaMetros)).toFixed(2);
        const pesoMaxCalculado = (24.9 * (alturaMetros * alturaMetros)).toFixed(2);
        setPesoMin(pesoMinCalculado);
        setPesoMax(pesoMaxCalculado);
    };

    return (
        <View style={styles.formContainer}>
            <Title/>
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
            {imc && (
                <>
                    <Result imc={imc} />
                    <Classification classification={classification} />
                    <IdealWeight pesoMin={pesoMin} pesoMax={pesoMax} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "lightblue",
        padding: 16,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});

export default FormIMC;