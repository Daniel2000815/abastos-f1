import React from 'react';
import { useTime } from '@/components/TimeContext';

const TimeTable = () => {
  const { times } = useTime();  // Obtener los tiempos del contexto

  // Verificar si los tiempos se están pasando correctamente
  console.log("Tiempos en TimeTable: ", times);

  if (times.length === 0) {
    return <div>No hay tiempos para mostrar.</div>;
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Usuario</th>
          <th className="py-2">Circuito</th>
          <th className="py-2">Modo</th>
          <th className="py-2">Tiempo</th>
          <th className="py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time.id}>
            <td className="border px-4 py-2">{time.user}</td>
            <td className="border px-4 py-2">{time.track}</td>
            <td className="border px-4 py-2">{time.mode}</td>
            <td className="border px-4 py-2">{time.time}</td>
            <td className="border px-4 py-2">{time.date?.toDate().toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
