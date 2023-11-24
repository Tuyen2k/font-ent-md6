import React, {Component, useState} from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function Chart(props) {
    const data = props.data;

    return (
        <>
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
                <h4 style={{marginTop: '30px', color: 'rgb(129 120 120)'}}>Chart statistics</h4>
                <b/>
            </div>
            <div style={{marginBottom: '20px'}}>
                <ResponsiveContainer className="chart" height={450}>
                    <LineChart
                        width={600}
                        height={500}
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
