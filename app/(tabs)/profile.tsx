import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/src/presentation/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/Firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const router = useRouter();

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
            <Text style={styles.title}>✍ Editar Perfil</Text>
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

            <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => router.replace("/(tabs)/todos")}
            >
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // Contenedor principal con fondo blanco y espaciado general
    container: { 
        flex: 1, 
        paddingHorizontal: 25, // Un poco más de margen horizontal 
        paddingTop: 50,      // Añade un poco de espacio en la parte superior
        backgroundColor: "#fff",
        
    },
    
    // Título principal
    title: { 
        fontSize: 32, 
        fontWeight: "bold", 
        marginBottom: 40,      // Separación adecuada del contenido
        textAlign: "center", 
    },
    
    // Texto del Email
    text: { 
        fontSize: 16, 
        marginBottom: 10,       // Pequeña separación del input
        marginLeft: 5,        // Un pequeño margen para que no esté pegado al borde invisible
    },
    
    // Campo de Entrada (Input)
    input: { 
        borderWidth: 1, 
        borderColor: "#ccc", 
        paddingHorizontal: 15, // Más relleno horizontal
        height: 50,            // Altura cómoda para el dedo
        borderRadius: 8, 
        marginBottom: 25,      // Espaciado generoso antes del primer botón
    },
    
    // Botón principal (Guardar Cambios)
    button: { 
        backgroundColor: "#007AFF", 
        padding: 15, 
        borderRadius: 8, 
        // Eliminamos el marginTop: 10 aquí, ya que el marginBottom del Input lo maneja
    },
    
    // Texto de los botones
    buttonText: { 
        color: "#fff", 
        textAlign: "center", 
        fontWeight: "bold" 
    },
    
    // Botón Volver (Back Button)
    backButton: {
        backgroundColor: "#047016ff",
        // ESTO ES LO CRÍTICO: Añade un margen superior claro para separarlo del botón azul.
        marginTop: 15, 
    },
});