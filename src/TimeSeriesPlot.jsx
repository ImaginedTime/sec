import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const TimeSeriesPlot = ({ data, concept }) => {
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        setChartData(data);
    }, [data]);

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: `Time Series Plot for ${concept} over Time`,
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'quarter',
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date',
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: concept,
                },
            }],
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TimeSeriesPlot;
