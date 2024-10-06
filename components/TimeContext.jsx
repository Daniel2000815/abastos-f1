"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

// Crear el contexto
const TimeContext = createContext();

// Proveedor del contexto
export const TimeProvider = ({ children }) => {
  const [times, setTimes] = useState([]);

  // Función para añadir un nuevo tiempo
  const addNewTime = async (timeSeconds, user, track, mode) => {
    try {
        const newTime = {
            user: user,
            time: timeSeconds,
            track: track,
            mode: mode,
            date: new Date(),
        };

        const docRef = await addDoc(collection(db, "times"), newTime);

        // Añadimos el ID al nuevo objeto
        const newTimeWithId = {
            ...newTime,
            id: docRef.id,  // Añadimos el ID del documento
        };

        setTimes(prevTimes => [...prevTimes, newTimeWithId]); // Actualizamos el estado

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Error adding document " + e);
    }
};


  // Función para descargar los tiempos
  const fetchTimes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "times"));
      const fetchedTimes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(fetchTimes)
      setTimes(fetchedTimes);  // Guardamos los tiempos en el estado
    } catch (error) {
      console.error("Error fetching times data:", error);
    }
  };

  // Descargar los tiempos al iniciar
  useEffect(() => {
    fetchTimes();  // Cargar los tiempos cuando el componente se monte
  }, []);

  return (
    <TimeContext.Provider value={{ times, addNewTime }}>
      {children}
    </TimeContext.Provider>
  );
};

// Hook para usar el contexto
export const useTime = () => {
  return useContext(TimeContext);
};
