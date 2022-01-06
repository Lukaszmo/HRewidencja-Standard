import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import TableComponent from '../../../common/Table/TableComponent';


class ProjectTasksListComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

    }

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
            columnName: "Nazwa zadania",
            className: "width5",
            dataField: 'task',
            subField: 'description',
            type: "data"
        },
        {
            id: "3",
            columnName: "Projekt",
            className: "width5",
            dataField: 'project',
            subField: 'description',
            type: "data"
        },
        {
            id: "4",
            columnName: "Aktywny",
            className: "width5",
            dataField: 'activeString',
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
        },
        {
            id: "6",
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
                <Header size='medium'>Lista zadań w projektach</Header>
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

export default ProjectTasksListComponent;