import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/src/presentation/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/Firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfileScreen() {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");

    const handleUpdate = async () => {
        try {
            if (!auth.currentUser) return;
            await updateProfile(auth.currentUser, { displayName });
            await updateDoc(doc(db, "users", auth.currentUser.uid), { displayName });
            Alert.alert("Éxito", "Perfil actualizado correctamente");
        } catch (e) {
            Alert.alert("Error", "No se pudo actualizar el perfil");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
            <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Nombre de usuario"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    text: { fontSize: 16, marginBottom: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 20 },
    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
