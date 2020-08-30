import React from 'react';
import s from './EventList.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddEvent from '../AddEvent/AddEvent';

const filterArr = ['All', 'Free', 'Discount', 'No Discount']

const getFilteredList = (events, selectedIndex) => {
    if (selectedIndex === 1) { // for Free
        return events.filter((item) => item.price === 0 || item.discount === 100)
    } else if (selectedIndex === 2) { // for Discount
        return events.filter((item) => item.discount > 0)
    } else if (selectedIndex === 3) { // for No Discount
        return events.filter((item) => item.discount === 0)
    }
    else { //for All
        return events;
    }
}

const EventList = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleOpenForm = () => {
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };
    const filteredList = getFilteredList(props.events, selectedIndex);
    return (
        <div className={s.eventList}>
            <Paper>
                <div className={s.flexCon}>
                    <Tooltip title="Filter list" aria-controls="filter-list" aria-haspopup="true" onClick={handleClick}>
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add" aria-controls="add" aria-haspopup="true" onClick={handleOpenForm}>
                        <IconButton aria-label="Add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell>Event Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Venue</TableCell>
                                <TableCell>Price(₹)</TableCell>
                                <TableCell>Discount(%)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.length > 0 ? filteredList.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.eventName}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.venue}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.discount + '%'}</TableCell>
                                </TableRow>
                            )) :
                            // <div className={s.noRecord}>{'No record present'}</div>
                            <TableRow >
                                    <TableCell>{'No record present'}</TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Menu
                id="filter-list"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {filterArr.map((item, index) => (
                    <MenuItem
                        key={item}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Menu>
            <AddEvent
                {...props}
                open={open}
                handleCloseForm={handleCloseForm}
            />
        </div>
    );
}

export default EventList;