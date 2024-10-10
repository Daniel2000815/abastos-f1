'use client';
import ApexChart from "@/components/ApexChart";
import { useTime } from '@/components/TimeContext';
import { secondsToTimeString } from "@/utils/raceUtils";
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

export const ChartTest = () => {
  const { filteredTimes = [] } = useTime();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // 1. Extraer fechas únicas y convertirlas a objetos Date para poder ordenarlas
    const uniqueDates = [...new Set(filteredTimes.map(t => 
      t.date instanceof Date 
        ? t.date.toLocaleDateString() 
        : t.date?.toDate().toLocaleDateString()
    ))];

    // 2. Ordenar las fechas en orden ascendente
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));

    const bestTimes = {};

    // 3. Recorrer los registros para encontrar el mejor tiempo por usuario en cada fecha
    filteredTimes.forEach(record => {
      const date = record.date instanceof Date 
        ? record.date.toLocaleDateString() 
        : record.date?.toDate().toLocaleDateString();
      const user = record.user;
      const time = record.time;

      if (!bestTimes[date]) {
        bestTimes[date] = {};
      }

      if (!bestTimes[date][user] || time < bestTimes[date][user]) {
        bestTimes[date][user] = time;
      }
    });

    const users = [...new Set(filteredTimes.map(record => record.user))];
    const userResults = users.map(user => {
      const data = uniqueDates.map(date => {
        return bestTimes[date] && bestTimes[date][user] !== undefined 
          ? bestTimes[date][user] 
          : null; // Mantener null para indicar ausencia de tiempo
      });

      // Manejo de valores previos para conectar puntos
      const finalData = [];
      let lastValidTime = null;

      data.forEach((value, index) => {
        if (value !== null) {
          lastValidTime = value; // Guarda el último valor válido
          finalData[index] = value; // Usa el valor actual
        } else {
          finalData[index] = lastValidTime; // Usa el último valor válido
        }
      });

      return { name: user, data: finalData }; // Devuelve el resultado con los tiempos procesados
    });

    setSeries(userResults);
    setCategories(uniqueDates); // Guardar las fechas únicas ordenadas
  }, [filteredTimes]);

  return (<>
    <ApexChart
      options={{
        // markers: {
        //   size: 10,
        //   colors: undefined,
        //   strokeColors: '#fff',
        //   strokeWidth: 2,
        //   strokeOpacity: 0.9,
        //   strokeDashArray: 0,
        //   fillOpacity: 1,
        //   discrete: [],
        //   shape: "circle",
        //   offsetX: 0,
        //   offsetY: 0,
        //   showNullDataPoints: false, // Desactiva la visualización de puntos nulos
        //   hover: {
        //     size: undefined,
        //     sizeOffset: 3
        //   }
        // },
        chart: {
          height: 350,
          type: 'area',
          stacked: false,
          background: theme==="light" ? "#ffffff" : "#0"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: categories
        },
        yaxis: {
          min: 0,
          labels: {
            formatter: function (value) {
              return value === null ? "No registrado" : secondsToTimeString(value);
            }
          }
        },
        tooltip: {
          shared: true,
          formatter: function (value, { series, seriesIndex, dataPointIndex }) {
            return value[seriesIndex] !== null && value[seriesIndex] !== undefined 
              ? secondsToTimeString(value[seriesIndex]) 
              : ''; // Si no hay tiempo, no muestra nada
          }
        },
        theme: {
          mode: theme, 
      },
      
      }}
      series={series}
      type="area"
      width="100%"
    />
    </>
  )
}
