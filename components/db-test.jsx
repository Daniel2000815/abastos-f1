import React, { useState, useEffect } from "react";
import { app, db } from "../config/firebase";
import { collection, getDocs, addDoc, setDoc, doc} from "firebase/firestore";
import TimeInput from "../components/time-input";

export const DbTest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [time, setTime] = useState(0);

  // Función fetchData que puede ser llamada manualmente
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

  const addUser = async (newUser) => {
    try {

      await setDoc(doc(db, "users", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });

      // const docRef = await addDoc(collection(db, "users"), {
      //   first: newUser.first,
      //   last: newUser.last,
      //   born: newUser.born,
      // });
      // console.log("Document written with ID: ", docRef.id);
      // return docRef.id; // Retorna el ID del documento creado
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Error adding document");
    }
  };
  // useEffect para ejecutar fetchData solo una vez al montar el componente
  useEffect(() => {
    fetchData();
    addUser({
      first: "firstName",
      last: "lastName",
      born: parseInt(2, 10),
    });
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      <TimeInput value={time} onValueChange={setTime} />
      <h1>Lista de Usuarios</h1>

      {/* Botón para volver a ejecutar fetchData */}
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Refrescar Usuarios
      </button>

      {/* Estado de carga */}
      {loading && <p>Cargando usuarios...</p>}

      {/* Estado de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar los usuarios */}
      {users.length > 0 && !loading ? (
        <ul>
          <li>{users[0]["time"]}</li>
          {/* Aquí puedes personalizar la lista */}
          {/* {users.map(user => (
            <li key={user.id}>
              {user.id} = {JSON.stringify(user)}
            </li>
          ))} */}
        </ul>
      ) : (
        !loading && <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};
