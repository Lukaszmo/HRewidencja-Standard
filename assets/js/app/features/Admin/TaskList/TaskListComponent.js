import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import TableComponent from '../../../common/Table/TableComponent';


class TaskListComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

    }

    headers = [
        {
            id: "1",
            columnName: "Id zadania",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Kod zadania",
            className: "width15",
            dataField: 'code',
            type: "data"
        },
        {
            id: "3",
            columnName: "Nazwa zadania",
            className: "width15",
            dataField: 'description',
            type: "data"
        },
        {
            id: "4",
            columnName: "Typ zadania",
            className: "width15",
            dataField: 'type',
            subField: 'description',
            type: "data"
        },
        {
            id: "5",
            columnName: "Aktywny",
            className: "width5",
            dataField: 'activeString',
            type: "data"
        },
        {
            id: "6",
            columnName: "",
            className: "width5",
            dataField: '',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "7",
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
                <Header size='medium'>Lista zadań</Header>
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

export default TaskListComponent;