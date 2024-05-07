import React, { useState, useEffect } from 'react';

import {Chart as ChartJS} from 'chart.js/auto';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-date-fns';

import { enUS } from 'date-fns/locale';

const TimeSeriesPlot = ({ data, concept }) => {
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        setChartData(data);
    }, [data]);

    const chartRef = React.createRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chart = new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: chartData.map(item => item.end),
                datasets: [{
                    label: concept,
                    data: chartData.map(item => item.val),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }]
            },
            options: {
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
                    x: {
                        type: 'time',
                        ticks: {
                            source: 'auto',
                        },
                        time: {
                            unit: 'quarter',
                            displayFormats: {
                                quarter: 'yyyy'
                            }
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date',
                        },
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: concept,
                        },
                    },
                },
            }
        });

        return () => {
            chart.destroy();
        };
    }, [chartData, concept]);

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );

    // const chartRef = React.createRef();

    // useEffect(() => {
    //     const ctx = chartRef.current.getContext('2d');
    //     const chart = new ChartJS(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: data.map(item => item.end),
    //             datasets: [{
    //                 label: concept,
    //                 data: data.map(item => item.val),
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 tension: 0.1,
    //             }]
    //         },
    //         options: {
    //             maintainAspectRatio: false,
    //             legend: {
    //                 display: true,
    //                 position: 'bottom',
    //             },
    //             title: {
    //                 display: true,
    //                 text: `Time Series Plot for ${concept} over Time`,
    //             },
    //             scales: {
    //                 x: {
    //                     type: 'time',
    //                     ticks: {
    //                         source: 'auto',
    //                     },
    //                     time: {
    //                         unit: 'quarter',
    //                         displayFormats: {
    //                             quarter: 'MMM YYYY'
    //                         }
    //                     },
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: 'Date',
    //                     },
    //                 },
    //                 y: {
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: concept,
    //                     },
    //                 },
    //             },
    //         }
    //     });

    //     return () => {
    //         chart.destroy();
    //     };
    // }, [data, concept]);

    // return (
    //     <div>
    //         <canvas ref={chartRef} />
    //     </div>
    // );
};

export default TimeSeriesPlot;
