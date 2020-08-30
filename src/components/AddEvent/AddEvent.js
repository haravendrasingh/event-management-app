import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import s from './AddEvent.module.scss';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

export default function AddEvent(props) {
    const initialValue ={
        eventName:'',
        description:'',
        venue: '',
        price: '',
        discount: ''
    }
    const [formData, setFormData] = React.useState(initialValue);
    const [submitState, setSumbitState] = React.useState(false);

    const handleChange =(event) => {
        const {id, value}=event.target;
        if(id === 'discount' && Number(value)<=100){
            setFormData({ ...formData, [id]: value });
        }else if(id !== 'discount'){
            setFormData({ ...formData, [id]: value });
        }
      };
    
    const handleClear=()=>{
        setSumbitState(false);
        setFormData(initialValue)
    }

    const handleSubmit=()=>{
        if(formData.eventName !== '' && formData.venue !== '' && formData.price !== '' ){
            setSumbitState(false);
            props.addEvent({...formData,price:Number(formData.price), discount:formData.discount?Number(formData.discount):0});
            props.handleCloseForm();
            setFormData(initialValue)
        }else{
            setSumbitState(true);
        }
    }
    const handleCloseForm =()=>{
        setSumbitState(false);
        setFormData(initialValue)
        props.handleCloseForm();
    }
    const classes = useStyles();
    return (
        <div className={s.addEvent}>
            <Dialog fullWidth={true} open={props.open} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText> */}
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            error={submitState && !formData.eventName}
                            required
                            fullWidth
                            id="eventName"
                            label="Event name"
                            value={formData.eventName}
                            onChange={handleChange}
                            helperText={submitState && !formData.eventName?"Required":''}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                          <TextField
                           error={submitState && !formData.venue}
                            required
                            fullWidth
                            id="venue"
                            label="Venue"
                            value={formData.venue}
                            onChange={handleChange}
                            helperText={submitState && !formData.venue?"Required":''}
                        />
                        <TextField
                         error={submitState && !formData.price}
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            helperText={submitState && !formData.price?"Required":''}
                        />
                         <TextField
                            fullWidth
                            id="discount"
                            label="Discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}               
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClear} color="primary">
                        Clear
            </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}