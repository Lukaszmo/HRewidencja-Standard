import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { VACATION_REQUEST_MAIL, VACREQUEST, VACREQ_TYPES, USERS } from '../../../routes';
import history from '../../../history';

import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import FontsBase24 from '../../fonts/fontsPDF.js';

export const validationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Pole wymagane'),
    datefrom: Yup.date()
        .required('Pole wymagane')
        .max(Yup.ref('dateto'), ({ max }) => `Data nie może być większa od ${formatDate(max)}`),
    dateto: Yup.date()
        .required('Pole wymagane')
});

//action types
const SET_VACREQ_TYPES = 'SET_VACREQ_TYPES';
const SET_VACREQUESTS = 'SET_VACREQUESTS';
const UPDATE_VACREQUEST = 'UPDATE_VACREQUEST';


//actions
export function setVacReqTypes(types) {
    return {
        type: SET_VACREQ_TYPES,
        payload: {
            types: types
        }
    }
}

export function setVacRequests(records) {
    return {
        type: SET_VACREQUESTS,
        payload: {
            records: records
        }
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_VACREQUEST,
        payload: {
            updatedRecord: record
        }
    }
}

function formatDate(date) {

    return new Date(date).toLocaleDateString();
}

export const addHolidayRequest = (object) => {

    axios.post(VACREQUEST, object)
        .then(function (response) {
            sendMail(object, response.data.id);
        });
}

function sendMail(object, recordId) {

    axios.post(VACATION_REQUEST_MAIL, object)
        .then(function (response) {
            setVacRequestState(recordId);
            toastr.success('Wniosek został wysłany');
        });
}

export const generatePDF = (data) => {

    generateVacationRequestPDF(data);

}

function generateVacationRequestPDF(data) {

    const employeeName = data.user.firstname + ' ' + data.user.lastname;
    const datefrom = data.datefrom.substr(0, 10);
    const dateto = data.dateto.substr(0, 10);
    const timestampDate = data.timestamp.substr(0, 10);
    const timestampTime = data.timestamp.substr(11, 8);

    const doc = new jsPDF({ orientation: "p", lineHeight: 1.8 });

    //ustawienia
    const customFont = FontsBase24.lato;
    doc.addFileToVFS('Lato-Regular.ttf', customFont);
    doc.addFont('Lato-Regular.ttf', "custom", "normal");
    doc.setFont("custom");
    doc.setFontSize(12);
    const pageWidth = doc.internal.pageSize.width;

    //dane do pdf
    doc.text('Nazwa firmy', 30, 20);
    doc.text('Wniosek urlopowy nr: ' + data.id, pageWidth / 2, 40, 'center');
    doc.text('Imię i nazwisko:', 30, 60);
    doc.text(employeeName, 80, 60);
    doc.text('Stanowisko/Dział:', 30, 70);
    doc.text(data.user.position, 80, 70);
    doc.text('Rodzaj wniosku:', 30, 80);
    doc.text(data.type.description, 80, 80);
    doc.text('Zakres urlopu:', 30, 90);
    doc.text(datefrom + ' do ' + dateto, 80, 90);
    doc.text('Liczba dni:', 30, 100);
    doc.text(data.quantity.toString(), 80, 100);
    doc.text('Komentarz:', 30, 110);
    doc.text(data.comment, 80, 110);
    doc.text('Data Akceptacji:', 30, 120);
    doc.text(timestampDate + ' ' + timestampTime, 80, 120);

    doc.output('dataurlnewwindow');
}

/*function generateFromHTML(data) {
 
    const opt = {
        margin: 1,
        filename: 'wniosek_urlopowy.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 7 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
 
    html2pdf(data, opt);
} */


function setVacRequestState(id) {

    // do wyniesienia do konfiguracji
    const headers = {
        'Content-Type': 'application/json'
    }

    const state = 2; //status: 2 czeka na akceptację

    axios.put(VACREQUEST + '/' + id, { state: state }, {
        headers: headers
    }).then((response) => {
        //history.push('/urlopy-lista-wnioskow');
    });



}

export const fetchVacRequestTypes = () => {

    return (dispatch) => {
        axios.get(VACREQ_TYPES).then(response => {

            const types = response.data['hydra:member'].map(function (object) {
                return ({
                    'key': object.id,
                    'text': object.description,
                    'value': object.id
                })
            })
            dispatch(setVacReqTypes(types));
        })
    }
}

export const fetchAllRecords = (userId, filters) => {

    const datefrom = filters.dateFrom;
    const dateto = filters.dateTo

    return (dispatch) => {
        axios.get(USERS + '/' + userId + '/' + 'vacation_requests' + '?datefrom[after]=' + datefrom + '&datefrom[before]=' + dateto).then(response => {

            const records = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    //ekstrakt daty ponieważ API zwraca format DateTime
                    'datefrom': object.datefrom.substr(0, 10),
                    'dateto': object.dateto.substr(0, 10)

                })
            })
            dispatch(setVacRequests(records));
        })

    }
}

export const updateRecord = (id, newStatus, msg) => {

    const params = { state: newStatus };

    return (dispatch) => {
        return axios.put(VACREQUEST + '/' + id, params)
            .then((response) => {
                toastr.success(msg);
                dispatch(updateRecords(response.data));
                //history.push('/urlopy-lista-wnioskow');
            });
    }
}

const initialState = {
    types: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_VACREQ_TYPES: {
            return action.payload;
        }

        case SET_VACREQUESTS: {
            return { ...state, ...action.payload };
        }

        case UPDATE_VACREQUEST: {
            return { ...state, ...action.payload };
        }


        default: return state;
    }
}
