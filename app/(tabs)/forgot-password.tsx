import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebaseconfig";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");

    const handleReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Éxito", "Revisa tu correo para restablecer la contraseña");
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
            />
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 20 },
    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
