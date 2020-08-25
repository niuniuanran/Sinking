import React, {useState} from "react";
import {
    Table, TableCell, TableRow, TableBody, TableHead,
    Toolbar,
    Paper,
    Tooltip,
    IconButton,
    Typography, Dialog,
    TablePagination,
    TableSortLabel, Checkbox
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

import style from './content.module.css'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default function PeopleTable({peopleRecord}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState({});

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
        <PeopleTableTitle handleFilterChange={f => setFilter(f)}/>
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
const embarkPort = {"Q": "Queenstown", "C": "Cherbourg", "S": "Southampton"};
const ticketFare = price => price < 20 ? "cheap" : (price > 100 ? "expensive" : "regular");

const headCells = [
    {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'sex', numeric: false, disablePadding: false, label: 'Gender', options: ["Male", "Female"]},
    // show passengers based upon where they embarked
    {id: 'embarked', numeric: true, disablePadding: false, label: 'Port of Embarkation', options: embarkPort.values},
    {id: 'fare', numeric: true, disablePadding: false, label: 'Fare', options: ["Cheap", "Regular", "Expensive"]},
    //show passengers that did or did not survive
    {id: 'survived', numeric: true, disablePadding: false, label: 'Survived', options: ["Yes", "No"]}
];


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

function PeopleTableTitle({handleFilterChange}) {
    const [filterOn, setFilterOn] = useState(false);
    return <><Toolbar>
        <Typography variant="h5" id="tableTitle" component="div" style={{flex: "1 1 100%"}}>
            Passengers on Titanic
        </Typography>

        <Tooltip title="Filter Passengers">
            <IconButton aria-label="filter passengers" size={'medium'} className={style.button}
                        onClick={() => setFilterOn(true)}>
                <FilterListIcon/>
            </IconButton>
        </Tooltip>
    </Toolbar>
        <FilterDialog open={filterOn} onClose={() => setFilterOn(false)}
                      onOk={(filter) => {
                          handleFilterChange(filter);
                          setFilterOn(false)
                      }}/>
    </>
}

function FilterDialog({onOk, open, onClose}) {
    const filterFullOptions = headCells.filter(c => c.options);
    const [filter, setFilter] = useState(filterFullOptions);
    console.log(filter);
    const handleFilterChange = (event, group) => {
        const changedOption = event.target.name;
        const checked = event.target.checked;
        const updatedFilter = filter.map(criteria => {
            if (criteria.label !== group.label) return criteria;
            return {
                ...criteria,
                options:(checked ?
                    [...criteria.options, changedOption]
                    :
                    criteria.options.filter(o => o !== changedOption))
            }
        });
        setFilter(() => updatedFilter);
    };
    return <Dialog
        aria-labelledby="filter-dialog"
        onClose={onClose}
        open={open}
    >
        <DialogTitle id="filter-dialog-title">
            Filter Passengers
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={3}>
                {
                    filterFullOptions.map((criteria, criteriaIndex) =>
                        <Grid item xs={12} container key={criteriaIndex}>
                            <Grid xs={12} item>
                                <Typography variant="h6">
                                    {criteria.label}
                                </Typography>
                            </Grid>
                            {criteria.options.map((option, optionIndex) =>
                                <Grid item md={2} xs={12 / criteria.options.length} key={optionIndex}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={filter[criteriaIndex].options.includes(option)}
                                                      name={option} onChange={event=>handleFilterChange(event, criteria)}/>}
                                        label={option}
                                    />
                                </Grid>)
                            }
                        </Grid>
                    )
                }
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button onClick={() => onOk(filter)}>
                Filter
            </Button>
        </DialogActions>
    </Dialog>
}