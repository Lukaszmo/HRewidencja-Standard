import React from 'react';
import { Route, Switch } from "react-router-dom";

//import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import MainContainer from "./common/Main/MainContainer";
import HomeContainer from "./common/Home/HomeContainer";
import LoginContainer from "./features/Login/LoginContainer";
import HoursContainer from './features/Hours/HoursContainer';
import HoursListContainer from './features/HoursList/HoursListContainer';
import HoursDetailsContainer from './features/Hours/HoursDetailsContainer';
import HoursSummaryContainer from './features/HoursSummary/HoursSummaryContainer';
import VacationContainer from './features/Vacation/VacationContainer';
import VacationListContainer from './features/VacationList/VacationListContainer';
import VacationDetailsContainer from './features/Vacation/VacationDetailsContainer';
import MonthlyReportContainer from './features/Reports/MonthlyReportContainer';
import ProjectReportContainer from './features/Reports/ProjectReportContainer';
import UsersContainer from './features/Admin/Users/UsersContainer';
import UserListContainer from './features/Admin/UserList/UserListContainer';
import UserDetailsContainer from './features/Admin/Users/UserDetailsContainer';
import ClientsContainer from './features/Admin/Clients/ClientsContainer';
import ClientListContainer from './features/Admin/ClientList/ClientListContainer';
import ClientDetailsContainer from './features/Admin/Clients/ClientDetailsContainer';
import ProjectsContainer from './features/Admin/Projects/ProjectsContainer';
import ProjectListContainer from './features/Admin/ProjectList/ProjectListContainer';
import ProjectDetailsContainer from './features/Admin/Projects/ProjectDetailsContainer';
import ProjectUserAddContainer from './features/Admin/ProjectUsers/ProjectUserAddContainer';
import ProjectUsersListContainer from './features/Admin/ProjectUsersList/ProjectUsersListContainer.js';
import ProjectUserDetailsContainer from './features/Admin/ProjectUsers/ProjectUserDetailsContainer';
import TasksContainer from './features/Admin/Tasks/TasksContainer';
import TaskListContainer from './features/Admin/TaskList/TaskListContainer';
import TaskDetailsContainer from './features/Admin/Tasks/TaskDetailsContainer';
import ProjectTaskAddContainer from './features/Admin/ProjectTasks/ProjectTaskAddContainer';
import ProjectTasksListContainer from './features/Admin/ProjectTasksList/ProjectTasksListContainer';
import ProjectTaskDetailsContainer from './features/Admin/ProjectTasks/ProjectTaskDetailsContainer';
import AuthorizationContainer from './features/Admin/Authorization/AuthorizationContainer';
import AuthorizationListContainer from './features/Admin/AuthorizationList/AuthorizationListContainer';
import AuthorizationDetailsContainer from './features/Admin/AuthorizationList/AuthorizationDetailsContainer';
import PasswordChangeContainer from './features/Settings/PasswordChangeContainer';
import CanbanTableContainer from './features/TaskTable/CanbanTableContainer';
import TaskAssignContainer from './features/TaskTable/TaskAssignContainer';
import AssignedTaskDetailsContainer from './features/TaskTable/AssignedTaskDetailsContainer';

function App() {
    return (
        <div className="App">

            <Switch>

                <Route exact path='/login' component={LoginContainer} />
                <Route exact path='/' component={LoginContainer} />

                <Route exact path='/home'
                    component={(props) => <MainContainer content={<HomeContainer {...props} />} menuId={"HOME"} submenuId='HOME_SUB1' />} />

                <Route exact path='/czas-pracy/rejestracja'
                    component={(props) => <MainContainer content={<HoursContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_REGISTER' />} />

                <Route exact path='/czas-pracy/lista'
                    component={(props) => <MainContainer content={<HoursListContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_LIST' />} />

                <Route exact path='/czas-pracy/edycja'
                    component={(props) => <MainContainer content={<HoursDetailsContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_LIST' />} />

                <Route exact path='/czas-pracy/grafik'
                    component={(props) => <MainContainer content={"GRAFIK IN PROGRESS..."} menuId={"TIMESHEET"} submenuId='WORK_TIME_SCHEDULE' />} />

                <Route exact path='/czas-pracy/podsumowanie'
                    component={(props) => <MainContainer content={<HoursSummaryContainer {...props} />} menuId={"TIMESHEET"} submenuId='SUMMARY' />} />

                <Route exact path='/urlopy/dodaj-wniosek'
                    component={(props) => <MainContainer content={<VacationContainer {...props} />} menuId={"VACATION"} submenuId='VACATION_ADD' />} />

                <Route exact path='/urlopy/lista-wnioskow'
                    component={(props) => <MainContainer content={<VacationListContainer {...props} />} menuId={"VACATION"} submenuId='REQUEST_LIST' />} />

                <Route exact path='/urlopy/szczegoly-wniosku'
                    component={(props) => <MainContainer content={<VacationDetailsContainer {...props} />} menuId={"VACATION"} submenuId='REQUEST_LIST' />} />

                <Route exact path='/urlopy/planowanie'
                    component={(props) => <MainContainer content={"PLANOWANIE IN PROGRESS..."} menuId={"VACATION"} submenuId='VACATION_PLAN' />} />

                <Route exact path='/tablica-zadan/kanban'
                    component={(props) => <MainContainer content={<CanbanTableContainer {...props} />} menuId={"TASK_TABLE"} submenuId='CANBAN' />} />

                <Route exact path='/tablica-zadan/kanban/dodaj-zadanie'
                    component={(props) => <MainContainer content={<TaskAssignContainer {...props} />} menuId={"TASK_TABLE"} submenuId='TASK_ASSIGN' />} />

                <Route exact path='/tablica-zadan/kanban/edycja'
                    component={(props) => <MainContainer content={<AssignedTaskDetailsContainer {...props} />} menuId={"TASK_TABLE"} submenuId='CANBAN' />} />

                <Route exact path='/raporty/raport-miesieczny'
                    component={(props) => <MainContainer content={<MonthlyReportContainer {...props} />} menuId={"REPORTS"} submenuId='MONTHLY_REPORT' />} />

                <Route exact path='/raporty/raport-projekt'
                    component={(props) => <MainContainer content={<ProjectReportContainer {...props} />} menuId={"REPORTS"} submenuId='PROJECT_REPORT' />} />

                <Route exact path='/ustawienia/zmiana-hasla'
                    component={(props) => <MainContainer content={<PasswordChangeContainer {...props} />} menuId={"SETTINGS"} submenuId='PASSWORD_CHANGE' />} />

                <Route exact path='/panel-admina/dodaj-uzytkownika'
                    component={(props) => <MainContainer content={<UsersContainer {...props} />} menuId={"ADMIN"} submenuId='USERS' />} />

                <Route exact path='/panel-admina/uzytkownicy-lista'
                    component={(props) => <MainContainer content={<UserListContainer {...props} />} menuId={"ADMIN"} submenuId='USERS' />} />

                <Route exact path='/panel-admina/uzytkownicy-edycja'
                    component={(props) => <MainContainer content={<UserDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='USERS' />} />

                <Route exact path='/panel-admina/dodaj-klienta'
                    component={(props) => <MainContainer content={<ClientsContainer {...props} />} menuId={"ADMIN"} submenuId='CLIENTS' />} />

                <Route exact path='/panel-admina/klienci-lista'
                    component={(props) => <MainContainer content={<ClientListContainer {...props} />} menuId={"ADMIN"} submenuId='CLIENTS' />} />

                <Route exact path='/panel-admina/klienci-edycja'
                    component={(props) => <MainContainer content={<ClientDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='CLIENTS' />} />

                <Route exact path='/panel-admina/dodaj-projekt'
                    component={(props) => <MainContainer content={<ProjectsContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/projekty-lista'
                    component={(props) => <MainContainer content={<ProjectListContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/projekty-edycja'
                    component={(props) => <MainContainer content={<ProjectDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/dodaj-pracownika-do-projektu'
                    component={(props) => <MainContainer content={<ProjectUserAddContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/pracownicy-w-projektach-lista'
                    component={(props) => <MainContainer content={<ProjectUsersListContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/lista-pracownikow-w-projektach-edycja'
                    component={(props) => <MainContainer content={<ProjectUserDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/dodaj-zadanie'
                    component={(props) => <MainContainer content={<TasksContainer {...props} />} menuId={"ADMIN"} submenuId='TASKS' />} />

                <Route exact path='/panel-admina/zadania-lista'
                    component={(props) => <MainContainer content={<TaskListContainer {...props} />} menuId={"ADMIN"} submenuId='TASKS' />} />

                <Route exact path='/panel-admina/zadania-edycja'
                    component={(props) => <MainContainer content={<TaskDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='TASKS' />} />

                <Route exact path='/panel-admina/dodaj-zadania-do-projektu'
                    component={(props) => <MainContainer content={<ProjectTaskAddContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/zadania-w-projektach-lista'
                    component={(props) => <MainContainer content={<ProjectTasksListContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/zadania-w-projektach-edycja'
                    component={(props) => <MainContainer content={<ProjectTaskDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='PROJECTS' />} />

                <Route exact path='/panel-admina/nadaj-uprawnienia'
                    component={(props) => <MainContainer content={<AuthorizationContainer {...props} />} menuId={"ADMIN"} submenuId='ACCESS' />} />

                <Route exact path='/panel-admina/uprawnienia-lista'
                    component={(props) => <MainContainer content={<AuthorizationListContainer {...props} />} menuId={"ADMIN"} submenuId='ACCESS' />} />

                <Route exact path='/panel-admina/uprawnienia-edycja'
                    component={(props) => <MainContainer content={<AuthorizationDetailsContainer {...props} />} menuId={"ADMIN"} submenuId='ACCESS' />} />

                {/* z PrivateRoute nie działa
                <PrivateRoute exact path='/home' />
                component={(props) => <MainContainer {...props} content={"HELLO"} />} /> */}

            </Switch>
        </div>

    );
}

export default App;