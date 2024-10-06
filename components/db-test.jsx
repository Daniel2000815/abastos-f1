import React, { useState, useEffect } from "react";
import { app, db } from "../config/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, where, query} from "firebase/firestore";
import TimeInput from "../components/time-input";
import { timeStringToSeconds, secondsToTimeString } from "@/utils/raceUtils";

export const DbTest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [time, setTime] = useState(0);

  const userExists = async (user) => {
    try {
      const userDocRef = doc(collection(db, "users"), user);
      
      const userDocSnap = await getDoc(userDocRef);

      // Verificar si el documento existe
      console.log("Documento encontrado:", userDocSnap.exists());
      return userDocSnap.exists();
    } catch (e) {
      console.error("Error al verificar la clave 'usuario': ", e);
    }
  };

  return (
    <div>

      <TimeInput value={time} onValueChange={setTime} />
      <h1>Lista de Usuarios</h1>



      {/* Estado de carga */}
      {loading && <p>Cargando usuarios...</p>}

      {/* Estado de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar los usuarios */}
      {users.length > 0 && !loading ? (
        <ul>
          
          {/* Aquí puedes personalizar la lista */}
          {users.map(user => (
            <li key={user.id}>
              {user.id} = {new Date(user["date"]["seconds"] * 1000 + user["date"]["nanoseconds"]/1000).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};
