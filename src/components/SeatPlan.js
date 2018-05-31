import React from 'react';
import { ScrollView, View, Text } from 'react-native';

const SeatPlan = ({ numRows, numCols, bookedList }) => {
    const rows = [
    ];
    for (let i = 1; i <= numRows; i++) {
        rows.push({ key: i, numSeats: numCols });
    }


    return (

        <View style={{ borderColor: 'black', borderWidth: 1, padding: 20 }}>
            <ScrollView horizontal>
                <ScrollView>
                    {
                        rows.map((row) => {
                            return (
                                <View key={row.key} style={{ flexDirection: 'row' }}>
                                    {Array(row.numSeats).fill(null).map((x, index) => {
                                        // 
                                        if (index !== 0) {
                                            let booked = false;
                                            for (const aBookedTicket of bookedList) {
                                                if (row.key === aBookedTicket.row && index === aBookedTicket.column) {
                                                    console.log(aBookedTicket.row, aBookedTicket.column);
                                                    booked = true;
                                                }
                                            }

                                            return (<View key={index} style={booked ? styles.disabledSeat : styles.defaultSeat}> 
                                                    <Text style={{ color: 'black' }}>{index}</Text> 
                                                </View>);
                                        }
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
};

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


};


export default SeatPlan;
