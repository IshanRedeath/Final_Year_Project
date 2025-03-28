import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PrintViewHeader from 'components/PrintView/PrintViewHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export default function PrintView(props) {
  const { name, data } = props;
  // const data = [
  //   {
  //     id: 'EMP1005',
  //     Username: 'Damith',
  //     Email: 'dami@gmail.com',
  //     Roles: 'admin, pharmacist',
  //     Status: 'active',
  //     'Registered Date': '2025-03-22',
  //   },
  // ];
  const today = new Date().toISOString().split('T')[0];
  const contentRef = useRef(null);

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const content = contentRef.current;

    if (!content) {
      console.error('Print area not found!');
      return;
    }

    doc.html(content, {
      callback: function (doc) {
        // Generate a blob of the PDF
        const pdfBlob = doc.output('blob');

        // Create a URL for the blob
        const blobURL = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(blobURL, '_blank');
      },
      x: 6,
      y: 6,
      width: 200,
      windowWidth: 700,
    });
  };

  return (
    <div>
      {/* The HTML content to be converted into a PDF */}
      <div ref={contentRef} id="print-area">
        <PrintViewHeader />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2, mb: 2 }}>
          <Typography variant="h4">{`${name} Information`}</Typography>
          <Typography>{today}</Typography>
        </Box>

        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {data && Array.isArray(data)
              ? data.map((dataObj, index) => {
                  return (
                    <>
                      <tr style={{ backgroundColor: 'lightblue' }}>
                        <td colSpan="2">{`Item ${index + 1}`}</td>
                      </tr>
                      {Object.entries(dataObj).map(([key, value]) => (
                        <tr key={key}>
                          <td style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2', width: '30%' }}>
                            {key}
                          </td>
                          <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                        </tr>
                      ))}
                    </>
                  );
                })
              : Object.entries(data).map(([key, value]) => (
                  <>
                    <tr key={key}>
                      <td style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2', width: '30%' }}>{key}</td>
                      <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                    </tr>
                  </>
                ))}
          </tbody>
        </table>
      </div>
      <Button
        sx={{ mt: 5, justifySelf: 'flex-end', display: 'flex' }}
        variant="contained"
        onClick={handlePrint}
      >
        <PictureAsPdfIcon sx={{ mr: 2 }} /> Print PDF
      </Button>
    </div>
  );
}
