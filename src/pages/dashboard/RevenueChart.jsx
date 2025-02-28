import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
    const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (USD)',
                data: revenueData,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(34, 197, 94, 1)');
                    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.3)');
                    return gradient;
                },
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
                hoverBorderColor: 'rgba(16, 185, 129, 1)',
                hoverBorderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#374151', // Dark grey text
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: 'Monthly Revenue',
                color: '#1F2937',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(209, 213, 219, 0.3)',
                },
                ticks: {
                    color: '#1F2937',
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#1F2937',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Monthly Revenue
            </h2>
            <div className="relative h-[400px] w-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueChart;