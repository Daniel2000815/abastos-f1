
import { app, db } from "@/config/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, where, query} from "firebase/firestore";

const fetchData = async () => {
    try {
        setLoading(true); // Activa el estado de carga
        setError(null); // Resetea el estado de error

        const querySnapshot = await getDocs(collection(db, "times"));
        const usersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setUsers(usersData); // Actualiza el estado con los datos obtenidos
    } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los usuarios"); // Si hay un error, actualiza el estado
    } finally {
        setLoading(false); // Desactiva el estado de carga
    }
};

const addUser = async (username) => {
    try {

        const canCreateUser = await !userExists(username);
        if (!canCreateUser)
            throw new Error("USER_ALREADY_EXISTS");

        await setDoc(doc(db, "users", username), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });

    } catch (e) {
        if (e.message === "USER_ALREADY_EXISTS") {
            console.error("El usuario ya existe:", username);
            throw error;
        } else {
            console.error("Error al crear el usuario:", e);
            throw new Error("GENERIC_ERROR");
        }
    }
};

const addTime = async (timeSeconds, user, track, mode) => {
    try {
        const docRef = await addDoc(collection(db, "times"), {
            user: user,
            time: timeSeconds,
            track: track,
            mode: mode,
            date: serverTimestamp()
        });

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Error adding document " + e);
    }
}

export {addTime}