'use client'
import ApexChart from "@/components/ApexChart";
import { useTime } from '@/components/TimeContext';
import { users } from "@/config/static-data";
import { secondsToTimeString } from "@/utils/raceUtils";
import { useState, useEffect } from 'react';

export const ChartTest = () => {
  const { times = [] } = useTime();
  const [series, setSeries] = useState([]);

  // Recalcula las series cada vez que cambie 'times'
  useEffect(() => {
    const newSeries = users.map(u => ({
      name: u.label,
      data: times.filter(t => t.user === u.label).map(tu => tu.time)
    })).filter(e => e.data.length !== 0);

    setSeries(newSeries);
  }, [times]); // El efecto se ejecutará cada vez que cambie 'times'

  return (
    <ApexChart
      options={{
        markers: {
          size: 10,
          colors: undefined,
          strokeColors: '#fff',
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        chart: {
          height: 350,
          type: 'area',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: times.map(t => t.date instanceof Date ? t.date.toLocaleDateString() : t.date?.toDate().toLocaleDateString())
        },
        yaxis: {
          min: 0,
          labels: {
            formatter: function (value) {
              return secondsToTimeString(value);
            }
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }}
      series={series}  // Usamos la serie generada en el useEffect
      type="area"
      width="100%"
    />
  )
}
