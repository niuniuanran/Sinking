import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

export default function PeopleTable({peopleRecord}) {
    const tableHeadings = peopleRecord && peopleRecord[0] && Object.keys(peopleRecord[0].fields);
    console.log(tableHeadings);
    return <Card>
        <CardContent>
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
        </CardContent>
    </Card>
}