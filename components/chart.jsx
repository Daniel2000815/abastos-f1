'use client';
import ApexChart from "@/components/ApexChart";
import { useTime } from '@/components/TimeContext';
import { secondsToTimeString } from "@/utils/raceUtils";
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { users } from "@/config/static-data";
export const ChartTest = () => {
  const { filteredTimes = [] } = useTime();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [range, setRange] = useState([0,150])
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Extraer fechas únicas y convertirlas a objetos Date para ordenarlas
    let uniqueDates = [...new Set(filteredTimes.map(t =>
      t.date instanceof Date
        ? t.date
        : t.date?.toDate()
    ).sort((a, b) => a - b).map(d => d.toLocaleDateString()))];

    const bestTimes = {};

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

    const usersKeys = [...new Set(filteredTimes.map(record => record.user))];

    const userResults = usersKeys.map(user => {
      const data = uniqueDates.map(date => {
        return bestTimes[date] && bestTimes[date][user] !== undefined
          ? bestTimes[date][user]
          : null;
      });

      const finalData = [];
      let lastValidTime = null;

      data.forEach((value, index) => {
        if (value !== null) {
          lastValidTime = value;
          finalData[index] = value;
        } else {
          finalData[index] = lastValidTime;
        }
      });

      // Si el usuario solo tiene un tiempo y es el último, asignar ese valor al penúltimo
      // if (finalData.filter(val => val !== null).length === 1 && finalData[finalData.length - 1] !== null) {
      //   finalData[finalData.length - 2] = finalData[finalData.length - 1];
      // }

      return {
        name: users.find(u => u.key===user)?.label,
        data: finalData,
        type: finalData.filter(u => u).length > 1 ? "area" : "bar"
      };
    });

    let flatTimes = userResults.map(u => u.data).flat().filter(u => u);

    setRange([Math.min.apply(Math, flatTimes) - 0.5, Math.max.apply(Math, flatTimes) + 0.5]);
    setSeries(userResults);
    setCategories(uniqueDates);
  }, [filteredTimes]);

  return (
    <>
      <ApexChart
        options={{
          chart: {
            height: 350,
            stacked: false,
            background: theme === "light" ? "#ffffff" : "#0",
            type: "line" // Cambia a "line" para permitir gráficos mixtos
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            lineCap: "butt",
            width: 6 // Ajusta el grosor del borde del área (3px en este caso)
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: theme,
              type: "vertical", // Define el gradiente como vertical
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.9, // Transparencia en la parte superior
              opacityTo: 0.5, // Transparencia cerca del eje X
              stops: [40, 100]
            }
          },
          xaxis: {
            categories: categories
          },
          yaxis: {
            min: range[0],
            max: range[1],
            labels: {
              formatter: function (value) {
                return value === null ? "No registrado" : secondsToTimeString(value);
              }
            }
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          theme: {
            mode: theme,
          },
          title: {
            text: "Best times",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: true
          }
        }}
        series={series}
        type="line"
        width="100%"
      />
    </>
  );
};