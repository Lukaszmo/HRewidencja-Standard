import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

export const generatePDF = () => {

    generateMonthlyReport();

}

function generateMonthlyReport() {

    //ustawienia
    var opt = {
        margin: 1,
        filename: 'raport001.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'landscape', precision: 1 }
    };

    var element = document.getElementById('monthly-report');

    html2pdf().set(opt).from(element).toPdf().save();

}