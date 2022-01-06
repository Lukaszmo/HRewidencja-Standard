
const SET_ACTIVE_SUBMENU_ITEM = 'SET_ACTIVE_SUBMENU_ITEM';
const SET_MENU_OPEN = 'SET_MENU_OPEN';

//actions

export function setActiveSubMenuItem(id) {
    return {
        type: SET_ACTIVE_SUBMENU_ITEM,
        payload: {
            activeSubMenuItem: id
        }
    }
}

export function setMenuOpen(isOpen) {
    return {
        type: SET_MENU_OPEN,
        payload: {
            open: isOpen
        }
    }
}

export const setActiveSubMenuItemId = (menuItemId) => {

    return (dispatch) => {
        dispatch(setActiveSubMenuItem(menuItemId));
    };

}

export const setMenuOpenFlag = (isOpen) => {

    return (dispatch) => {
        dispatch(setMenuOpen(isOpen));
    };

}

//przeniesc do konfiguracji

export const menuItems = [
    {
        id: "HOME",
        name: "Strona główna",
        redirect: "/home",
        className: "menu-item",
        icon: 'home',
        subMenu: []
    },
    {
        id: "TIMESHEET",
        name: "Czas pracy",
        redirect: "/czas-pracy/rejestracja",
        className: "menu-item",
        icon: 'clock',
        subMenu: [
            {
                id: 'TIMESHEET_REGISTER',
                name: "Rejestracja czasu",
                type: "MENU_ITEM",
                redirect: "/czas-pracy/rejestracja",
                icon: ''
            },
            {
                id: 'TIMESHEET_LIST',
                name: "Lista godzin",
                type: "MENU_ITEM",
                redirect: "/czas-pracy/lista",
                icon: ''
            },
            {
                id: 'SUMMARY',
                name: "Podsumowanie",
                type: "MENU_ITEM",
                redirect: "/czas-pracy/podsumowanie",
                icon: ''
            },
            {
                id: 'WORK_TIME_SCHEDULE',
                name: "Grafik",
                type: "MENU_ITEM",
                redirect: "/czas-pracy/grafik",
                icon: ''
            }
        ]
    },
    {
        id: "VACATION",
        name: "Urlopy",
        redirect: "/urlopy/dodaj-wniosek",
        className: "menu-item",
        icon: 'travel',
        subMenu: [
            {
                id: 'VACATION_ADD',
                name: "Dodaj wniosek",
                type: "MENU_ITEM",
                redirect: "/urlopy/dodaj-wniosek",
                icon: ''
            },
            {
                id: 'REQUEST_LIST',
                name: "Lista wniosków",
                type: "MENU_ITEM",
                redirect: "/urlopy/lista-wnioskow",
                icon: ''
            },
            {
                id: 'VACATION_PLAN',
                name: "Planowanie",
                type: "MENU_ITEM",
                redirect: "/urlopy/planowanie",
                icon: ''
            }
        ]
    },
    {
        id: "TASK_TABLE",
        name: "Tablica zadań",
        redirect: "/tablica-zadan/kanban",
        className: "menu-item",
        icon: 'table',
        subMenu: [
            {
                id: 'CANBAN',
                name: "Kanban",
                type: "MENU_ITEM",
                redirect: "/tablica-zadan/kanban",
                icon: ''
            },
            {
                id: 'TASK_ASSIGN',
                name: "Dodaj zadanie",
                type: "MENU_ITEM",
                redirect: "/tablica-zadan/kanban/dodaj-zadanie",
                icon: ''
            }


        ]
    },
    {
        id: "REPORTS",
        name: "Raporty",
        redirect: "/raporty/raport-miesieczny",
        className: "menu-item",
        icon: 'chart bar',
        subMenu: [
            {
                id: 'MONTHLY_REPORT',
                name: "Raport miesięczny",
                type: "MENU_ITEM",
                redirect: "/raporty/raport-miesieczny",
                icon: ''
            },
            {
                id: 'PROJECT_REPORT',
                name: "Raport projekt",
                type: "MENU_ITEM",
                redirect: "/raporty/raport-projekt",
                icon: ''
            }
        ]
    },
    {
        id: "SETTINGS",
        name: "Ustawienia",
        redirect: "/ustawienia/zmiana-hasla",
        className: "menu-item",
        icon: 'cogs',
        subMenu: [
            {
                id: 'PASSWORD_CHANGE',
                name: "Zmiana hasła",
                type: "MENU_ITEM",
                redirect: "/ustawienia/zmiana-hasla",
                icon: ''
            }
        ]
    },
    {
        id: "ADMIN",
        name: "Panel Admina",
        redirect: "/panel-admina/dodaj-uzytkownika",
        className: "menu-item",
        icon: '',
        subMenu: [
            {
                id: 'USERS',
                name: "Użytkownicy",
                type: "DROPDOWN",
                icon: '',
                dropdownItems: [
                    {
                        id: 'USER_ADD',
                        name: 'Dodaj nowego użytkownika',
                        redirect: "/panel-admina/dodaj-uzytkownika"
                    },
                    {
                        id: 'USER_LIST',
                        name: 'Lista użytkowników',
                        redirect: "/panel-admina/uzytkownicy-lista"
                    }
                ]
            },
            {
                id: 'CLIENTS',
                name: "Klienci",
                type: "DROPDOWN",
                redirect: "/panel-admina/dodaj-klienta",
                icon: '',
                dropdownItems: [
                    {
                        id: 'CLIENT_ADD',
                        name: 'Dodaj nowego klienta',
                        redirect: "/panel-admina/dodaj-klienta"
                    },
                    {
                        id: 'CLIENT_LIST',
                        name: 'Lista klientów',
                        redirect: "/panel-admina/klienci-lista"
                    }
                ]
            },
            {
                id: 'PROJECTS',
                name: "Projekty",
                type: "DROPDOWN",
                redirect: "/panel-admina/dodaj-projekt",
                icon: '',
                dropdownItems: [
                    {
                        id: 'PROJECT_ADD',
                        name: 'Dodaj nowy projekt',
                        redirect: "/panel-admina/dodaj-projekt"
                    },
                    {
                        id: 'PROJECT_LIST',
                        name: 'Lista projektów',
                        redirect: "/panel-admina/projekty-lista"
                    },
                    {
                        id: 'PROJECT_EMPLOYEE_ADD',
                        name: 'Dodaj pracownika do projektu',
                        redirect: "/panel-admina/dodaj-pracownika-do-projektu"
                    },
                    {
                        id: 'PROJECT_EMPLOYEE_LIST',
                        name: 'Lista pracowników w projektach',
                        redirect: "/panel-admina/pracownicy-w-projektach-lista"
                    },
                    {
                        id: 'PROJECT_TASK_ADD',
                        name: 'Dodaj zadania do projektu',
                        redirect: "/panel-admina/dodaj-zadania-do-projektu"
                    },
                    {
                        id: 'PROJECT_TASK_LIST',
                        name: 'Lista zadań w projektach',
                        redirect: "/panel-admina/zadania-w-projektach-lista"
                    },
                ]
            },
            {
                id: 'TASKS',
                name: "Zadania",
                type: "DROPDOWN",
                redirect: "/panel-admina/dodaj-zadanie",
                icon: '',
                dropdownItems: [
                    {
                        id: 'TASK_ADD',
                        name: 'Dodaj nowe zadanie',
                        redirect: "/panel-admina/dodaj-zadanie"
                    },
                    {
                        id: 'TASK_LIST',
                        name: 'Lista zadań',
                        redirect: "/panel-admina/zadania-lista"
                    },
                ]
            },
            {
                id: 'ACCESS',
                name: "Uprawnienia",
                type: "DROPDOWN",
                redirect: "/panel-admina/nadaj-uprawnienia",
                icon: '',
                dropdownItems: [
                    {
                        id: 'ACCESS_ADD',
                        name: 'Nadaj nowe uprawnienia',
                        redirect: "/panel-admina/nadaj-uprawnienia"
                    },
                    {
                        id: 'ACCESS_LIST',
                        name: 'Lista uprawnień',
                        redirect: "/panel-admina/uprawnienia-lista"
                    },
                ]
            },

        ]
    }
]





//zwraca Menu Główne aplikacji
export const setMenu = () => {

    return menuItems;
}

//zwraca subMenu w zaleznosci od elementu Menu
export const setSubMenu = (menuId) => {

    for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].id === menuId) {
            return menuItems[i];
        }
    }
}

const initialState = {
    activeSubMenuItem: '',
    open: false
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ACTIVE_SUBMENU_ITEM: {
            return { ...state, ...action.payload };
        }

        case SET_MENU_OPEN: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}