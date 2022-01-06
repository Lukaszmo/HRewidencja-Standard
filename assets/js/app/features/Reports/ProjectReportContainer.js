import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import './Reports.css';
import ProjectReportComponent from './ProjectReportComponent';
import { fetchHoursByTaskType } from '../Hours/Hours';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { getAllProjects, generateProjectListForDropdown } from '../Admin/Projects/Project';
import { checkItemAccess } from '../../utils/AuthService';


class ProjectReportContainer extends Component {

    state = {
        datefrom: getFirstDayOfMonth(new Date()),
        dateto: getLastDayOfMonth(new Date()),
        showReport: false
    }

    componentDidMount() {

        checkItemAccess("REPORTS")
            .then(() => this.props.getAllProjects());
    }

    onSubmit = (values) => {

        let filters = {
            datefrom: values.datefrom,
            dateto: values.dateto,
            projectId: values.project
        }

        fetchHoursByTaskType(filters).then(resp => this.setState({ data: resp.data }));
        this.setState({ showReport: true });
    }

    render() {

        return (
            <Container className='reports'>
                <ProjectReportComponent
                    showReport={this.state.showReport}
                    onSubmit={this.onSubmit}
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    reportData={this.state.data}
                    datefrom={this.state.datefrom}
                    dateto={this.state.dateto}>
                </ProjectReportComponent>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.project.records
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectReportContainer);

