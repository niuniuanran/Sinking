import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Toolbar,
    Paper,
    Tooltip,
    IconButton,
    Typography
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

import style from './content.module.css'

export default function PeopleTable({peopleRecord}) {
    const tableHeadings = peopleRecord && peopleRecord[0] && Object.keys(peopleRecord[0].fields);
    console.log(tableHeadings);
    return <Paper>
        <PeopleToolBar/>
        {tableHeadings && <Table>
            <TableHead>
                <TableRow>
                    {tableHeadings.map((key, i) => <TableCell key={`heading_${i}`}>{key}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    peopleRecord.map((data) => <TableRow key={data.recordid}>
                        {Object.values(data.fields).map((d, i) => <TableCell key={`cell_${i}`}>{d}</TableCell>)}
                    </TableRow>)
                }
            </TableBody>
        </Table>}
    </Paper>
}

function PeopleToolBar() {
    return <Toolbar>
        <Typography variant="h5" id="tableTitle" component="div" style={{flex: "1 1 100%"}}>
            People on Titanic
        </Typography>

        <Tooltip title="Filter People">
            <IconButton aria-label="filter people" size={'medium'} className={style.button}>
                <FilterListIcon/>
            </IconButton>
        </Tooltip>
    </Toolbar>
}