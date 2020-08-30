import { connect } from 'react-redux';
import EventList from './EventList';
import {addEvent} from '../../store/actions/eventActions';

const mapStateToProps = state => ({
        ...state.eventReducer
});

const mapDispatchToProps={
    addEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);