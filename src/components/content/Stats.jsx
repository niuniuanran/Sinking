import React from "react";
import {CardContent, CardHeader, Card, Paper, Grid} from "@material-ui/core";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import style from './content.module.css';
import {convertRawToDisplay} from "./PeopleTable";

export default function Stats({peopleRecord}) {

    const countByFilter = (filter) => {
        return peopleRecord.reduce((count, p) => {
            const passFilter = Object.keys(filter).reduce((pass, criteria) =>
                pass && (convertRawToDisplay(p, criteria) === filter[criteria]), true);
            return passFilter ? (count + 1) : count
        }, 0);
    };
    const colourSurvive="#70a9db";
    const colourNotSurvive="#888888";

    const surviveByGender = [
        {
            "Gender": 'Male', "Survived": countByFilter({sex: "Male", survived: "Yes"}),
            "Not Survived": countByFilter({sex: "Male", survived: "No"}),
        },
        {
            "Gender": 'Female', "Survived": countByFilter({sex: "Female", survived: "Yes"}),
            "Not Survived": countByFilter({sex: "Female", survived: "No"})
        },
    ];
    const surviveByFare = [
        {
            "Fare": 'Cheap (< $20)', "Survived": countByFilter({fare: "Cheap", survived: "Yes"}),
            "Not Survived": countByFilter({fare: "Cheap", survived: "No"}),
        },
        {
            "Fare": 'Regular',
            "Survived": countByFilter({fare: "Regular", survived: "Yes"}),
            "Not Survived": countByFilter({fare: "Regular", survived: "No"}),
        },
        {
            "Fare": 'Expensive (> $100)',
            "Survived": countByFilter({fare: "Expensive", survived: "Yes"}),
            "Not Survived": countByFilter({fare: "Expensive", survived: "No"}),
        },

    ];

    return <Paper className={style.paper}>
        <Grid container>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Survival by Gender"/>
                    <CardContent>
                        <BarChart
                            width={500}
                            height={300}
                            data={surviveByGender}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Gender"/>
                            <YAxis/>r
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="Survived" stackId="a" fill={colourSurvive}/>
                            <Bar dataKey="Not Survived" stackId="a" fill={colourNotSurvive}/>
                        </BarChart>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Survival by Fare"/>
                    <CardContent>
                        <BarChart
                            width={500}
                            height={300}
                            data={surviveByFare}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Fare"/>
                            <YAxis/>r
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="Survived" stackId="a" fill={colourSurvive}/>
                            <Bar dataKey="Not Survived" stackId="a" fill={colourNotSurvive}/>
                        </BarChart>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Paper>
}

