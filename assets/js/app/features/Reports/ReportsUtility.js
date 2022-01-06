export function getMonths() {

    /**
    * 
    * Return:
    * - months: tablica z listą miesięcy
    *    
    * */

    const months = [
        { key: 1, text: "Styczeń", value: 1 },
        { key: 2, text: "Luty", value: 2 },
        { key: 3, text: "Marzec", value: 3 },
        { key: 4, text: "Kwiecień", value: 4 },
        { key: 5, text: "Maj", value: 5 },
        { key: 6, text: "Czerwiec", value: 6 },
        { key: 7, text: "Lipiec", value: 7 },
        { key: 8, text: "Sierpień", value: 8 },
        { key: 9, text: "Wrzesień", value: 9 },
        { key: 10, text: "Październik", value: 10 },
        { key: 11, text: "Listopad", value: 11 },
        { key: 12, text: "Grudzień", value: 12 }
    ]

    return months;
}


export function getDayOfWeek(year, month) {

    let dayOfWeek = [];

    for (var i = 1; i <= 31; i++) {
        let day = year + '-' + month + '-' + i;
        day = new Date(day);
        dayOfWeek[i] = day.getDay();
    }

    return dayOfWeek;

}