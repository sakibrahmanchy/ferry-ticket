import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AutoCompleteItem from './AutoCompleteItem';
import { portsFetch } from '../actions/TripSearchActions';
 
class AutoCompleteList extends Component {
    
    constructor(props) {
        super(props);
        console.disableYellowBox = true; 
    }

    componentWillMount() {
        this.props.portsFetch(this.props.searchText);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.props.portsFetch(this.props.searchText);
        this.createDataSource(nextProps);
    }

    createDataSource({ ports }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(ports);
    }

    renderRow(port) {
        return <AutoCompleteItem port={port} portType={this.props.portType} />;
    }

    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

const mapStateToProps = state => {
    const ports = _.map(state.ports, (city_name, address) => {
        return { ...city_name, address };
    });
    return { ports };
};

export default connect(mapStateToProps, { portsFetch })(AutoCompleteList);

