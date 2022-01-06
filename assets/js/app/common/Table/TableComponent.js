import React, { Component } from "react";
import { Icon, Table, Pagination, Button, ButtonContent, Confirm, Label } from 'semantic-ui-react';
import CustomMessage from '../CustomMessage/CustomMessage';
import './Table.css';


/**
 * Params: 
 * - data: array that contains data which will be shown in the table (required)
 * - onTableChange: function which will be fired when table change occurs(cell modification, row removal)
 * - rowsPerPage: number of rows displayed per page  
 * - headers: array of header objects (required)
 * 
 * Header object fields:
 * - id: identifier (required)
 * - columName: column name 
 * - className: css class defined in TableStyle.css ("width10" , "min-width50")
 * - dataField: name of the field in the object in data array from which value will be shown in the table (required for link, label and input types)
 * - type: type of field (link, label, input, button) (required)
 * - action: action that will be fired when given object is clicked. User has acces to row. Example (row) => console.log(row) (required for button and link types)
 * - iconName: name of the icon to be displayed on the button, full list available here https://react.semantic-ui.com/elements/icon/ (required for button)
 * - dropdown: names and values of Dropdown content, full list available here https://react.semantic-ui.com/modules/dropdown/

Usage example

    headers = [
        {
            id: "1",
            columnName: "id",
            className: "width20",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "date",
            className: "width20",
            dataField: 'date',
            type: "data"
        },
        {
            id: "3",
            columnName: "type",
            className: "width20",
            dataField: 'type',
            type: "data"
        },
        {
            id: "4",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "5",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "delete",
            iconName: "trash alternate"
        }
    ]
*/


class TableComponent extends Component {

    constructor(props) {
        super(props);

        const rowsPerPage = this.props.rowsPerPage ? this.props.rowsPerPage : 5;
        const pagination = this.props.pagination ? this.props.pagination : false;

        this.state = {
            activePage: 1,
            open: false,
            selectedId: null,
            rowsPerPage: rowsPerPage,
            pagination: pagination
        }

    }

    onPageChange = (e, data) => {

        this.setState({ activePage: data.activePage })
    }

    handleCancel = () => {

        this.setState({ open: false });
    }

    handleConfirm = () => {

        this.setState({ open: false });

        // Remove record
        this.props.onTableChange(this.state.action, this.state.selectedId);
    }

    handleButtonClick = (rowAction, rowId) => {

        if (rowAction === "DELETE") { this.setState({ open: true }) };
        if (rowAction === "EDIT") {
            this.setState({ open: false })
            this.props.onTableChange(rowAction, rowId);
        };

        this.setState({ selectedId: rowId });
        this.setState({ action: rowAction });
    }

    render() {


        //no results were found
        if ((!this.props.data) || (this.props.data.length === 0)) {
            return (

                <CustomMessage
                    type='info'
                    text='Brak wyników'
                    icon={true}
                />
            )
        }

        return (
            <Table celled >
                <Headers headers={this.props.headers}> </Headers>
                <TableBody
                    headers={this.props.headers}
                    data={this.props.data}
                    activePage={this.state.activePage}
                    rowsPerPage={this.state.rowsPerPage}
                    rowAction={this.rowAction}
                    tableState={this.state}
                    handleButtonClick={this.handleButtonClick}
                    handleCancel={this.handleCancel}
                    handleConfirm={this.handleConfirm}
                    deleteDisabled={this.props.deleteDisabled ? this.props.deleteDisabled : false}
                />
                <Table.Footer>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell colSpan={this.props.headers.length}>
                            {this.props.data && this.state.pagination ? <Pagination size="small" className="pagina" onPageChange={(e, data) => this.onPageChange(e, data)} defaultActivePage={this.state.activePage} totalPages={Math.ceil(this.props.data.length / this.state.rowsPerPage)} /> : null}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

//Nagłówki tabeli
const Headers = ({ headers }) => {
    const header = headers.map((header, index) => (<Table.HeaderCell key={header.id}>{header.columnName}</Table.HeaderCell>));
    return (
        <Table.Header>
            <Table.Row textAlign="center">{header}</Table.Row>
        </Table.Header>
    );
};

//Body tabeli
const TableBody = ({ headers, data, activePage, rowsPerPage, rowAction, tableState, handleButtonClick, handleCancel, handleConfirm, deleteDisabled }) => {

    let tableData = data;

    if (tableData === undefined) return null;

    const tableBody = tableData.map(function (row, rowNumber) {

        if ((rowNumber >= (activePage - 1) * rowsPerPage) && (rowNumber <= (activePage * rowsPerPage) - 1)) {

            return <Row
                headers={headers}
                singleRow={row}
                key={rowNumber}
                rowNumber={rowNumber}
                rowAction={rowAction}
                tableState={tableState}
                handleButtonClick={handleButtonClick}
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
                deleteDisabled={deleteDisabled}
            />
        }
    })

    return (
        <Table.Body>{tableBody}</Table.Body>
    );
};

//Wiersz
const Row = ({ headers, singleRow, rowNumber, rowAction, tableState, handleButtonClick, handleCancel, handleConfirm, deleteDisabled }) => {
    const row = headers.map(header => {

        //Jeśli header.dataField nie ma wartości ustaw value na null
        let value = header.dataField ? singleRow[header.dataField] : null;
        value = header.subField ? value[header.subField] : value;
        const action = header.action ? header.action : null;
        const id = header.id + rowNumber;

        return <Cell
            header={header}
            value={value}
            key={id}
            action={action}
            rowAction={rowAction}
            rowObject={singleRow}
            tableState={tableState}
            handleButtonClick={handleButtonClick}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            deleteDisabled={deleteDisabled}
        />
    });

    const rowClass = singleRow.class ? singleRow.class : 'tableRow';

    return (
        <Table.Row textAlign="center" className={rowClass}>{row}</Table.Row>
    );
};

//Komórki
const Cell = ({ header, value, action, rowAction, rowObject, tableState, handleButtonClick, handleCancel, handleConfirm, deleteDisabled }) => {

    let type = header.type.toUpperCase();
    let actionType = action ? action.toUpperCase() : null;
    let iconName = header.iconName;

    if (type === 'DATA') {

        let label = rowObject.label && (header.dataField === rowObject.label.dataField) ? rowObject.label : null;
        let cellLabel = null;

        if (label) {
            cellLabel = <Label className={label.class}>{label.msg}</Label>
        }

        return <Table.Cell className={header.className}>{value}{cellLabel}</Table.Cell>;
    }


    if (type === 'BUTTON') {

        return <Table.Cell className={header.className}>

            <Button size="small"
                className="tableButton"
                title={header.action}
                onClick={() => handleButtonClick(actionType, rowObject.id)}
                disabled={actionType === 'DELETE' ? deleteDisabled : false}>
                <ButtonContent>
                    <Icon className="tableIcon" name={iconName} size="large" ></Icon>
                </ButtonContent>
            </Button >

            <Confirm
                className="del-confirm"
                header="Usuwanie rekordu"
                content="Czy na pewno chcesz usunąć rekord?"
                open={tableState.open}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                cancelButton='Anuluj'
                confirmButton='Usuń'
            />

        </Table.Cell >

    }

};


export default TableComponent;