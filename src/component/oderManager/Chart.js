import React, {Component, useState} from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function Chart(props) {
    const data = props.data;

    return (
        <>
            <div>
                <ResponsiveContainer className="chart" height={300}>
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="Money" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="Orders" style={{display: 'none'}} stroke="#82ca9d"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Chart;
