import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import TableComponent from '../../../common/Table/TableComponent';



class AuthorizationListComponent extends Component {

    /* handleChange(e, data, setFieldValue) {
 
         setFieldValue(data.name, data.value);
     }
 
     onSubmit(values) {
 
     } */

    headers = [
        {
            id: "1",
            columnName: "Id",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Rola",
            className: "width15",
            dataField: 'role',
            subField: 'code',
            type: "data"
        },
        {
            id: "3",
            columnName: "Item",
            className: "width15",
            dataField: 'item',
            subField: 'code',
            type: "data"
        },
        {
            id: "4",
            columnName: "Dostęp",
            className: "width15",
            dataField: 'accessString',
            type: "data"
        },
        {
            id: "5",
            columnName: "",
            className: "width5",
            dataField: '',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        }
    ]

    render() {

        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Lista uprawnień</Header>
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

export default AuthorizationListComponent;