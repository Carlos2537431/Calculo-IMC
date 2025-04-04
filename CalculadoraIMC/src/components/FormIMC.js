// Importações necessárias para o componente, incluindo elementos do React Native e outros componentes personalizados.
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Result from './result'; // Componente para exibir o resultado do IMC.
import Classification from './Classification'; // Componente para exibir a classificação do IMC.
import IdealWeight from './IdealWeight'; // Componente para exibir o peso ideal.
import React, { useState } from 'react';
import Title from './title'; // Componente para exibir o título.

// Definição do componente funcional FormIMC.
const FormIMC = () => {
    // Estados para armazenar os valores de peso, altura, IMC, classificação e pesos ideais.
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setImc] = useState(null);
    const [classification, setClassification] = useState('');
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');

    // Função para substituir vírgulas por pontos nos valores de entrada (para evitar problemas de formatação numérica).
    const subVirgulaPorPonto = (texto) => {
        return texto.replace(/,/g, ".");
    };

    // Função principal para calcular o IMC.
    const calcularIMC = () => {
        const pesoCorrigido = subVirgulaPorPonto(peso); // Corrige o formato do peso.
        const alturaCorrigida = subVirgulaPorPonto(altura); // Corrige o formato da altura.

        // Verifica se os valores são válidos e realiza o cálculo do IMC.
        if (!isNaN(pesoCorrigido) && !isNaN(alturaCorrigida) && parseFloat(pesoCorrigido) > 0 && parseFloat(alturaCorrigida) > 0) {
            const alturaMetros = parseFloat(alturaCorrigida) / 100; // Converte altura de cm para metros.
            const imcCalculado = (parseFloat(pesoCorrigido) / (alturaMetros * alturaMetros)).toFixed(2); // Calcula o IMC com 2 casas decimais.
            setImc(imcCalculado); // Atualiza o estado do IMC.
            classificarIMC(imcCalculado); // Classifica o IMC calculado.
            calcularPesosIdeais(alturaCorrigida); // Calcula os pesos ideais com base na altura.
        } else {
            alert('Por favor, insira valores válidos para peso e altura.'); // Alerta caso os valores sejam inválidos.
        }
    };

    // Função para classificar o IMC com base no valor calculado.
    const classificarIMC = (imc) => {
        if (imc < 18.5) setClassification("Abaixo do peso");
        else if (imc >= 18.5 && imc < 24.9) setClassification("Peso normal");
        else if (imc >= 25 && imc < 29.9) setClassification("Sobrepeso");
        else if (imc >= 30 && imc < 34.9) setClassification("Obesidade grau 1");
        else if (imc >= 35 && imc < 39.9) setClassification("Obesidade grau 2");
        else if (imc >= 40) setClassification("Obesidade grau 3");
    };

    // Função para calcular os pesos ideais com base na altura.
    const calcularPesosIdeais = (alturaCorrigida) => {
        const alturaMetros = parseFloat(alturaCorrigida) / 100; // Converte altura de cm para metros.
        const pesoMinCalculado = (18.5 * (alturaMetros * alturaMetros)).toFixed(2); // Calcula o peso mínimo ideal.
        const pesoMaxCalculado = (24.9 * (alturaMetros * alturaMetros)).toFixed(2); // Calcula o peso máximo ideal.
        setPesoMin(pesoMinCalculado); // Atualiza o estado do peso mínimo.
        setPesoMax(pesoMaxCalculado); // Atualiza o estado do peso máximo.
    };

    // Renderização do componente.
    return (
        <View style={styles.formContainer}>
            <Title/> {/* Exibe o título do formulário. */}
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)" // Placeholder para o campo de peso.
                keyboardType="numeric" // Define o teclado numérico.
                value={peso} // Valor do estado peso.
                onChangeText={setPeso} // Atualiza o estado peso ao digitar.
            />
            <TextInput
                style={styles.input}
                placeholder="Altura (cm)" // Placeholder para o campo de altura.
                keyboardType="numeric" // Define o teclado numérico.
                value={altura} // Valor do estado altura.
                onChangeText={setAltura} // Atualiza o estado altura ao digitar.
            />
            <Button title="Calcular IMC" onPress={calcularIMC} /> {/* Botão para calcular o IMC. */}
            {imc && ( // Renderiza os resultados apenas se o IMC foi calculado.
                <>
                    <Result imc={imc} /> {/* Exibe o resultado do IMC. */}
                    <Classification classification={classification} /> {/* Exibe a classificação do IMC. */}
                    <IdealWeight pesoMin={pesoMin} pesoMax={pesoMax} /> {/* Exibe os pesos ideais. */}
                </>
            )}
        </View>
    );
};

// Estilos do componente.
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "lightblue", // Cor de fundo do formulário.
        padding: 16, // Espaçamento interno.
        borderRadius: 10, // Bordas arredondadas.
    },
    input: {
        height: 40, // Altura do campo de entrada.
        borderColor: "gray", // Cor da borda.
        borderWidth: 1, // Largura da borda.
        marginBottom: 12, // Margem inferior.
        paddingHorizontal: 8, // Espaçamento interno horizontal.
        borderRadius: 5, // Bordas arredondadas.
    },
});

// Exporta o componente para ser usado em outros arquivos.
export default FormIMC;