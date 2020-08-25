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
import TableSortLabel from "@material-ui/core/TableSortLabel";

import style from './content.module.css'
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";


export default function PeopleTable({peopleRecord}) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <Paper className={style.paper}>
        <PeopleTableTitle/>
        <Table
            aria-labelledby="peopleTableTitle"
            size={rowsPerPage < 6 ? 'medium' : 'small'}
            aria-label="passenger table"
        >
            <PeopleTableHead orderBy={orderBy}
                             order={order}
                             onRequestSort={handleRequestSort}
                             rowCount={peopleRecord.length}/>
            <TableBody>
                {stableSort(peopleRecord, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((personRecord, index) => <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={personRecord.recordid}>
                            <TableCell align="left">
                                {personRecord.fields.name}
                            </TableCell>
                            <TableCell align="left">
                                {personRecord.fields.sex}
                            </TableCell>
                            <TableCell align="left">
                                {embarkPort[personRecord.fields.embarked] || "No Record"}
                            </TableCell>
                            <TableCell align="left">
                                {ticketFare(personRecord.fields.fare)}
                            </TableCell>
                            <TableCell align="left">
                                {personRecord.fields.survived}
                            </TableCell>
                        </TableRow>
                    )}
            </TableBody>

        </Table>

        <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={peopleRecord.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />

    </Paper>
}

const headCells = [
    {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'sex', numeric: false, disablePadding: false, label: 'Gender'},
    // show passengers based upon where they embarked
    {id: 'embarked', numeric: true, disablePadding: false, label: 'Port of Embarkation'},
    {id: 'fare', numeric: true, disablePadding: false, label: 'Fare'},
    //show passengers that did or did not survive
    {id: 'survived', numeric: true, disablePadding: false, label: 'Survived'}
];

const embarkPort = {"Q": "Queenstown", "C": "Cherbourg", "S": "Southampton"};
const ticketFare = price => price < 20 ? "cheap" : (price > 100 ? "expensive" : "regular");

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b.fields[orderBy] < a.fields[orderBy]) {
        return -1;
    }
    if (b.fields[orderBy] > a.fields[orderBy]) {
        return 1;
    }
    return 0;
}

function PeopleTableHead({order, orderBy, onRequestSort}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={style.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>;
}

function PeopleTableTitle() {
    return <Toolbar>
        <Typography variant="h5" id="tableTitle" component="div" style={{flex: "1 1 100%"}}>
            Passengers on Titanic
        </Typography>

        <Tooltip title="Filter People">
            <IconButton aria-label="filter people" size={'medium'} className={style.button}>
                <FilterListIcon/>
            </IconButton>
        </Tooltip>
    </Toolbar>
}