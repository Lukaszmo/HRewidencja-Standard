import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import TableComponent from '../../../common/Table/TableComponent';
import '../Clients/Client.css';



class ClientListComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

    }

    headers = [
        {
            id: "1",
            columnName: "Id klienta",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Kod klienta",
            className: "width15",
            dataField: 'code',
            type: "data"
        },
        {
            id: "3",
            columnName: "Nazwa klienta",
            className: "width15",
            dataField: 'description',
            type: "data"
        },
        {
            id: "4",
            columnName: "",
            className: "width5",
            dataField: '',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "5",
            columnName: "",
            className: "width5",
            dataField: '',
            type: "button",
            action: "delete",
            iconName: "trash alternate"
        }
    ]

    render() {

        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Lista klientów</Header>
                <Divider></Divider>

                <TableComponent
                    headers={this.headers}
                    data={this.props.data}
                    onTableChange={this.props.onTableChange}
                    rowsPerPage={10}
                    pagination={true} />
            </Segment >
        );
    }
}

export default ClientListComponent;