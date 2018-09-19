import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Seat from './Seat';
import { connect } from 'react-redux';
import {
    selectDepartureSeat,
    selectReturnSeat,
    removeDepartureSeat,
    removeReturnSeat
} from '../actions/SeatPlanActions';


class SeatPlan extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    onSelectSeat(row, column) {
        const seatPlanType = this.props.seatPlanType;
        if (seatPlanType === 1) {
            this.props.selectDepartureSeat(row, column);
        } else {
             this.props.selectReturnSeat(row, column);
        }
    }

    onRemoveSeat(row, column) {
        const seatPlanType = this.props.seatPlanType;
        if (seatPlanType === 1) {
            const departureRows = this.props.seatPlan.departureSeatRows;
            const departureColumns = this.props.seatPlan.departureSeatColumns;
            let index = null;
            for (let i = 0; i < departureRows.length; i++) {
                if (departureRows[i] === row && departureColumns[i] === column) {
                    index = i;
                    break;
                }
            }
            this.props.removeDepartureSeat(index);
        } else {
            const returnRows = this.props.seatPlan.returnSeatRows;
            const returnColumns = this.props.seatPlan.returnSeatColumns;
            let index = null;
            for (let i = 0; i < returnRows.length; i++) {
                if (returnRows[i] === row && returnColumns[i] === column) {
                    index = i;
                    break;
                }
            }
            this.props.removeReturnSeat(index);
        }
    }

    render() {
        const rows = [
        ];

        for (let i = 1; i <= this.props.numCols; i++) {
            rows.push({ key: i, numSeats: this.props.numRows });
        }
        return (
            <View style={{ borderColor: 'black', borderWidth: 1, padding: 20 }}>
                <ScrollView horizontal>
                    <ScrollView>
                        {
                            rows.map((row) => {
                                return (
                                    <View key={row.key} style={{ flexDirection: 'row' }}>
                                        {Array(row.numSeats + 1).fill(0, 1, row.numSeats + 1).map((x, index) => {

                                            let booked = false;
                                            for (const aBookedTicket of this.props.bookedList) {
                                                if (row.key === aBookedTicket.row && index === aBookedTicket.column) {
                                                    booked = true;
                                                }
                                            }

                                            return (<Seat
                                                key={index}
                                                seat_number={index}
                                                booked={booked}
                                                row={row.key}
                                                column={index}
                                                onSelected={() => this.onSelectSeat(row.key, index)}
                                                onRemoved={() => this.onRemoveSeat(row.key, index)}
                                                seatPlanType={this.props.seatPlanType}
                                            />);
                                        }

                                        )}
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedDeparturePort: state.selecteDeparturePort,
        selectedDestinationPort: state.selecteDestinationPort,
        selectedDepartureDate: state.selectedDepartureDate,
        selectedReturnDate: state.selectedReturnDate,
        selectedTripType: state.selectedTripType,
        selectedNumberOfPassengers: state.selectedNumberOfPassengers,
        tripSearchResult: state.tripSearchResult,
        selectedDepartureTrip: state.selectedTrips.departureTrip,
        selectedReturnTrip: state.selectedTrips.returnTrip,
        tripInfo: state.tripInfo.tripInfo,
        passengers: state.passengers,
        ticketCollectorInfo: state.ticketCollector,
        seatPlan: state.seatPlan
    };
};

export default connect(mapStateToProps, {
    selectDepartureSeat,
    selectReturnSeat,
    removeDepartureSeat,
    removeReturnSeat
})(SeatPlan);
