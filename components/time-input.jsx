"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/input";
import { timeStringToSeconds } from '@/utils/raceUtils';

const TimeInput = ({ onTimeChange }) => {
  // Estados para minutos, segundos y milisegundos
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [miliseconds, setMiliseconds] = useState(0);

  // Estados para validaciones
  const [isMinutesValid, setIsMinutesValid] = useState(true);
  const [isSecondsValid, setIsSecondsValid] = useState(true);
  const [isMilisecondsValid, setIsMilisecondsValid] = useState(true);

  // Función para manejar cambios en el tiempo
  const handleTimeChange = () => {
    if (isMinutesValid && isSecondsValid && isMilisecondsValid) {
      const totalSeconds = timeStringToSeconds(`${minutes}:${seconds}:${miliseconds}`);
      onTimeChange(totalSeconds);  // Llamada al componente padre
    } else {
      onTimeChange(-1);  // Valor por defecto si es inválido
    }
  };

  // useEffect para actualizar cada vez que cambian los valores o la validación
  useEffect(() => {
    if (typeof onTimeChange !== 'function') {
      console.error('onTimeChange is not a function');
      return;
    }
    handleTimeChange();
  }, [minutes, seconds, miliseconds, isMinutesValid, isSecondsValid, isMilisecondsValid]);

  // Funciones de validación
  const validateMinutes = (value) => setIsMinutesValid(value >= 0 && value <= 99);
  const validateSeconds = (value) => setIsSecondsValid(value >= 0 && value <= 59);
  const validateMiliseconds = (value) => setIsMilisecondsValid(value >= 0 && value <= 999);

  return (
    <div className="flex items-center space-x-2 w-full">
      {/* Input de Minutos */}
      <Input
        value={minutes}
        onValueChange={(val) => {
          setMinutes(val);
          validateMinutes(val);
        }}
        isInvalid={!isMinutesValid}
        type="number"
        placeholder="0"
        labelPlacement="inside"
        className="w-full"
        label="minutes"
      />

      {/* Separador ":" */}
      <span className="text-2xl">:</span>

      {/* Input de Segundos */}
      <Input
        value={seconds}
        onValueChange={(val) => {
          setSeconds(val);
          validateSeconds(val);
        }}
        isInvalid={!isSecondsValid}
        type="number"
        placeholder="0"
        labelPlacement="inside"
        className="w-full"
        label="seconds"
      />

      {/* Separador ":" */}
      <span className="text-2xl">:</span>

      {/* Input de Milisegundos */}
      <Input
        value={miliseconds}
        onValueChange={(val) => {
          setMiliseconds(val);
          validateMiliseconds(val);
        }}
        isInvalid={!isMilisecondsValid}
        type="number"
        placeholder="0"
        labelPlacement="inside"
        className="w-full"
        label="miliseconds"
      />
    </div>
  );
};

export default TimeInput;
