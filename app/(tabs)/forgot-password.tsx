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
            <Text style={styles.title}>Recuperar Contraseña</Text>
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
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    backButton: {
        backgroundColor: "#999",
    },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
