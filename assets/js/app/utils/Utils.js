export function getFirstDayOfMonth(date) {

    /**
    * Params: 
    * - date: obiekt new Date
    * 
    * Return:
    * - firstDate: data - pierwszy dzień miesiąca w formacie ('YYYY-MM-DD')
    * */

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const firstDay = '01';

    const firstDate = year + '-' + month.pad(2) + '-' + firstDay;

    return firstDate;
}

export function getLastDayOfMonth(date) {

    /**
    * Params: 
    * - date: obiekt new Date
    * 
    * Return:
    * - lastDate: data - ostatni dzień miesiąca w formacie ('YYYY-MM-DD')
    * */

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString().slice(8, 10);

    const lastDate = year + '-' + month.pad(2) + '-' + lastDay;

    return lastDate;
}

export function timeToNumber(timeFormat) {

    /**
    * Params: 
    * - timeFormat: parametr w formacie hh:mm np. 08:00
    * 
    * Return:
    * - floatNumber: wartość w postaci liczby zmiennoprzecinkowej
    *    
    * */

    const time = timeFormat.split(':');
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]) / 60;
    const quantity = hours + minutes;

    return quantity;
}

export function numberToTime(numberFormat) {

    /**
    * Params: 
    * - numberFormat: parametr w formacie liczbowym np. 8.25
    * 
    * Return:
    * - timeFormat: wartość w formacie hh:mm
    *    
    * */

    const quantity = numberFormat.toString().split('.');
    const hours = quantity[0];
    let minutes = quantity[1] ? quantity[1] * 60 : '00';
    minutes = minutes.toString().substr(0, 2);
    const timeFormat = hours + ':' + minutes;

    return timeFormat;
}

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

export function groupBy(data, key) {

    //Funkcja grupuje tablicę po kluczu podanym w parametrze

    return data.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const parseObjectToString = (object) => {
    return JSON.stringify(Array.from(object.entries()));
}

export const parseStringToObject = (string) => {
    return JSON.parse(string);
}


