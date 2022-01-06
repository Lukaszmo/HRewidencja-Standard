import { ROOT, API_ROOT } from './config.js';

//API
export const GENERATE = API_ROOT + 'token/generate';
export const USERS = API_ROOT + 'users';
export const HOUR_TYPES = API_ROOT + 'hour_types';
export const PROJECTS = API_ROOT + 'projects';
export const TASKS = API_ROOT + 'tasks';
export const TASK_TYPES = API_ROOT + 'task_types';
export const HOURS = API_ROOT + 'hours';
export const VACREQUEST = API_ROOT + 'vacation_requests';
export const VACREQ_TYPES = API_ROOT + 'vacreq_types';
export const ROLES = API_ROOT + 'roles';
export const CLIENTS = API_ROOT + 'clients';
export const PROJECT_USERS = API_ROOT + 'project_user_rels';
export const PROJECT_TASKS_API = API_ROOT + 'project_task_rels';
export const ROLE_ACCESS_LIST = API_ROOT + 'roles_accesses';
export const ASSIGNED_TASKS = API_ROOT + 'assigned_tasks';

//Services
export const VACATION_REQUEST_MAIL = ROOT + 'vacation_requests/mail';
export const USER_PROJECTS = ROOT + 'user_projects';
export const PROJECT_TASKS = ROOT + 'project_tasks';
export const PROJECT_TASKS_ADD = ROOT + 'project/task_add';
export const HOURS_BY_TYPE = ROOT + 'hours/by_type';
export const HOURS_BY_PROJECT = ROOT + 'hours/by_project';
export const HOURS_BY_TASK = ROOT + 'hours/by_task';
export const HOURS_BY_TASK_TYPE = ROOT + 'hours/project_report';
export const HOURS_RANGE = ROOT + 'hours/range';
export const HOURS_MONTHLY_REPORT = ROOT + 'hours/monthly_report';
export const USER = ROOT + 'user';