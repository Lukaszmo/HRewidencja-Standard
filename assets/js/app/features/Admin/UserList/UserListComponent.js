import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import TableComponent from '../../../common/Table/TableComponent';



class UserListComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

    }

    headers = [
        {
            id: "1",
            columnName: "Id użytkownika",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Nazwa użytkownika",
            className: "width15",
            dataField: 'username',
            type: "data"
        },
        {
            id: "3",
            columnName: "Imię",
            className: "width15",
            dataField: 'firstname',
            type: "data"
        },
        {
            id: "4",
            columnName: "Nazwisko",
            className: "width15",
            dataField: 'lastname',
            type: "data"
        },
        {
            id: "5",
            columnName: "Numer ewidencyjny",
            className: "width5",
            dataField: 'regnum',
            type: "data"
        },
        {
            id: "6",
            columnName: "Email",
            className: "width15",
            dataField: 'email',
            type: "data"
        },
        {
            id: "7",
            columnName: "Stanowisko",
            className: "width15",
            dataField: 'position',
            type: "data"
        },
        {
            id: "8",
            columnName: "Id przełożonego",
            className: "width5",
            dataField: 'managerid',
            type: "data"
        },
        {
            id: "9",
            columnName: "Rola",
            className: "width15",
            dataField: 'role',
            type: "data"
        },
        {
            id: "10",
            columnName: "Aktywy",
            className: "width5",
            dataField: 'activeString',
            type: "data"
        },
        {
            id: "11",
            columnName: "",
            className: "width5",
            dataField: '',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        }
    ]

    render() {
        console.log(this.props);

        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Lista użytkowników</Header>
                <Divider></Divider>

                <TableComponent
                    headers={this.headers}
                    data={this.props.data}
                    onTableChange={this.props.onTableChange}
                    rowsPerPage={10}
                    pagination={true}
                >
                </TableComponent>

            </Segment >


        )
    }
}

export default UserListComponent;