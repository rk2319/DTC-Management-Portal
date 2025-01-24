import React from 'react';
import { AreaChart, BarChart, Card, Title, Text } from '@tremor/react';

const performanceData = [
  {
    date: '2024-03-01',
    'On-Time Performance': 92,
    'Passenger Count': 12500,
    'Fuel Efficiency': 85
  },
  {
    date: '2024-03-02',
    'On-Time Performance': 94,
    'Passenger Count': 13200,
    'Fuel Efficiency': 87
  },
  {
    date: '2024-03-03',
    'On-Time Performance': 91,
    'Passenger Count': 11800,
    'Fuel Efficiency': 84
  },
  {
    date: '2024-03-04',
    'On-Time Performance': 95,
    'Passenger Count': 14100,
    'Fuel Efficiency': 88
  },
  {
    date: '2024-03-05',
    'On-Time Performance': 93,
    'Passenger Count': 13500,
    'Fuel Efficiency': 86
  }
];

const routePerformance = [
  {
    route: 'Route 7A',
    passengers: 4500,
    performance: 95
  },
  {
    route: 'Route 12B',
    passengers: 3800,
    performance: 88
  },
  {
    route: 'Route 15C',
    passengers: 3200,
    performance: 92
  },
  {
    route: 'Route 8D',
    passengers: 4100,
    performance: 90
  }
];

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Performance metrics and operational insights</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <Title>Performance Trends</Title>
          <Text>Daily metrics for the past week</Text>
          <AreaChart
            className="h-72 mt-4"
            data={performanceData}
            index="date"
            categories={['On-Time Performance', 'Fuel Efficiency']}
            colors={['blue', 'green']}
            valueFormatter={(number: number) => `${number}%`}
          />
        </Card>

        <Card>
          <Title>Passenger Count Trends</Title>
          <Text>Daily passenger volume</Text>
          <AreaChart
            className="h-72 mt-4"
            data={performanceData}
            index="date"
            categories={['Passenger Count']}
            colors={['purple']}
            valueFormatter={(number: number) => number.toLocaleString()}
          />
        </Card>

        <Card>
          <Title>Route Performance</Title>
          <Text>Performance metrics by route</Text>
          <BarChart
            className="h-72 mt-4"
            data={routePerformance}
            index="route"
            categories={['passengers', 'performance']}
            colors={['blue', 'green']}
            valueFormatter={(number: number) => number.toLocaleString()}
          />
        </Card>
      </div>
    </div>
  );
};

export default Analytics;