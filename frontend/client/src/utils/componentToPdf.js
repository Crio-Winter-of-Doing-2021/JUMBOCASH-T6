import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const componentToPdf = (inputRef) => {
  html2canvas(inputRef.current).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF('p', 'mm','a4');

    // Multiple pages. Crdit: https://github.com/MrRio/jsPDF/issues/434
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    const imgheight = (canvas.height * 25.4) / 96; //px to mm
    const pagecount = Math.ceil(imgheight / pageHeight);

    doc.addImage(imgData, 'PNG', 2, 0, pageWidth - 4, 0);

    /* add extra pages if the div size is larger than a a4 size */
    if (pagecount > 0) {
      let j = 1;
      while (j !== pagecount) {
        doc.addPage('l', 'mm', 'a4');
        doc.addImage(imgData, 'PNG', 2, -(j * pageHeight), pageWidth - 4, 0);
        j++;
      }
    }
    doc.save('download.pdf');
  });

};

export default componentToPdf;
