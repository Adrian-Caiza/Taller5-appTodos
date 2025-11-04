import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebaseconfig";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleReset = async () => {
        try {
            if (!email.trim()) {
                Alert.alert("Atención", "Por favor ingresa tu correo electrónico.");
                return;
            }
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                "Éxito",
                "Revisa tu correo para restablecer la contraseña",
                [
                    {
                        text: "Volver al login",
                        onPress: () => router.replace("/(tabs)/login"),
                    },
                ]
            );
        } catch (e) {
            Alert.alert("Error", "No se pudo enviar el correo. Verifica el email.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔑 Recuperar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Enviar correo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => router.replace("/(tabs)/login")}
            >
                <Text style={styles.buttonText}>Volver al login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingHorizontal: 25, // Aumenta el padding lateral para que no toque los bordes
        justifyContent: "center",
        backgroundColor: "#000", // Asegura que el fondo sea negro (si no lo es por defecto)
    },
    // --- ESTILOS MEJORADOS PARA LA LLAVE Y EL TEXTO SUPERIOR ---
    title: {
        // La imagen de la llave y el texto están mezclados en el HTML.
        // Si el ícono de la llave no es un componente aparte, necesitas ajustar el texto.
        // Si quieres que el título esté arriba, quita justifyContent: "center" del container y usa paddingTop
        fontSize: 32, // Reducido para que sea más legible
        fontWeight: "bold",
        color: "#fff", // El texto debe ser blanco sobre fondo negro
        marginBottom: 50, // Añade más espacio debajo del título (separándolo del input)
        textAlign: "center",
    },
    // --- ESTILOS MEJORADOS PARA EL INPUT ---
    input: {
        height: 50, // Altura definida para mejor usabilidad
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#222", // Un gris oscuro para que el input se destaque ligeramente
        color: "#fff", // Texto de entrada blanco
        paddingHorizontal: 15, // Más relleno horizontal
        borderRadius: 8,
        marginBottom: 20, // Más separación debajo del input
    },
    // --- ESTILOS MEJORADOS PARA LOS BOTONES ---
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        // Eliminamos el 'marginTop: 10' de aquí para controlarlo mejor en 'backButton'
        width: '100%', // Asegura que el botón ocupe todo el ancho con el padding del container
    },
    backButton: {
        backgroundColor: "#555", // Gris más oscuro para diferenciarse mejor
        marginTop: 15, // ¡CLAVE! Separa el botón gris del botón azul (15px)
    },
    buttonText: { 
        color: "#fff", 
        textAlign: "center", 
        fontWeight: "bold", 
        fontSize: 16 // Aumenta el tamaño de la fuente para mejor lectura
    },
});