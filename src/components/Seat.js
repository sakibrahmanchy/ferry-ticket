import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

class Seat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            style: this.props.booked ? styles.disabledSeat : styles.defaultSeat,
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (!this.props.booked) {
                        if (this.props.seatPlanType === 1) {
                                if (this.state.selected) {
                                    this.setState({ selected: false, style: styles.defaultSeat });
                                    this.props.onRemoved(true);
                                } else {
                                    if (this.props.seatPlan.departureSeatRows.length < this.props.selectedNumberOfPassengers) {
                                        this.setState({ selected: true, style: styles.selectedSeat });
                                        this.props.onSelected(true);
                                    } else {
                                        const errorMessage = 'You can select maximum ' + this.props.selectedNumberOfPassengers + ' seats for departure';
                                        Alert.alert(
                                            'Errror',
                                            errorMessage
                                        );
                                    }
                                }
                            } else {
                                if (this.state.selected) {
                                    this.setState({ selected: false, style: styles.defaultSeat });
                                    this.props.onRemoved(true);
                                } else {
                                    if (this.props.seatPlan.returnSeatRows.length < this.props.selectedNumberOfPassengers) {
                                        this.setState({ selected: true, style: styles.selectedSeat });
                                        this.props.onSelected(true);
                                    } else {
                                        const errorMessage = 'You can select maximum ' + this.props.selectedNumberOfPassengers + ' seats for return';
                                        Alert.alert(
                                            'Errror',
                                            errorMessage
                                        );
                                    }
                                }
                            }  
                        } else {
                        this.setState({ booked: true, style: styles.disabledSeat });
                    }
                }
                }
            >
                <View
                    style={this.state.style}
                >
                    <Text style={{ color: 'black', alignItems: 'center', textAlign: 'center' }}>{this.props.seat_number}</Text>
                </View>

            </TouchableOpacity>
        );
    }

}

const styles = {
    defaultSeat:
        {
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            margin: 5
        },
    disabledSeat:
        {
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 1,
            margin: 5
        },
    selectedSeat:
        {
            width: 40,
            height: 40,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
            margin: 5
        }
};

const mapStateToProps = state => {
    return {
        selectedNumberOfPassengers: state.selectedNumberOfPassengers,
        seatPlan: state.seatPlan
    };
};

export default connect(mapStateToProps, {})(Seat);
