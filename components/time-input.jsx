import React, { useState } from 'react';
import {Input} from "@nextui-org/input"

const TimeInput = () => {
  // Estados para horas, minutos y segundos
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [miliseconds, setMiliseconds] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      {/* Input de Horas */}
      <Input
        value={minutes}
        onValueChange={setMinutes}
        isInvalid={minutes < 0}
        type="number"
        placeholder="0"
        labelPlacement="outside"
        className="w-20"
      />

      {/* Separador ":" */}
      <span className="text-2xl">:</span>

      {/* Input de Minutos */}
      <Input
        value={seconds}
        onValueChange={setSeconds}
        isInvalid={seconds < 0}
        type="number"
        placeholder="0"
        labelPlacement="outside"
        className="w-20"
      />

      {/* Separador ":" */}
      <span className="text-2xl">:</span>

      {/* Input de Segundos */}
      <Input
        value={miliseconds}
        onValueChange={setMiliseconds}
        isInvalid={miliseconds < 0}
        type="number"
        placeholder="0"
        labelPlacement="outside"
        className="w-20"
      />
    </div>
  );
};

export default TimeInput;
