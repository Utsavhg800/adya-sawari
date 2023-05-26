// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const doc = new PDFDocument();
// const writeStream = fs.createWriteStream('bill.pdf');
// doc.pipe(writeStream);
// doc.fontSize(16)
//     .text('Bill Details', { underline: true, align: 'center' })
//     .moveDown();

// doc.fontSize(12)
//     .text('Customer Name: John Doe', { indent: 20 })
//     .text('Billing Address: 1234 Elm Street, Springfield, IL', { indent: 20 })
//     .text('Invoice Number: #12345', { indent: 20 })
//     .text('Invoice Date: April 16, 2023', { indent: 20 })
//     .moveDown();

// doc.fontSize(14)
//     .text('Items:', { underline: true, indent: 20 })
//     .moveDown();

// // Add items to the bill
// const items = [
//     { name: 'Item 1', quantity: 2, price: 10 },
//     { name: 'Item 2', quantity: 1, price: 15 },
//     { name: 'Item 3', quantity: 3, price: 5 },
// ];

// doc.fontSize(12);
// let totalAmount = 0;

// items.forEach(item => {
//     const itemAmount = item.quantity * item.price;
//     totalAmount += itemAmount;
//     doc.text(`${item.name}: ${item.quantity} x $${item.price} = $${itemAmount}`, { indent: 40 });
// });

// doc.moveDown();

// doc.fontSize(14)
//     .text(`Total Amount: Rs. ${totalAmount}`, { indent: 20 })
//     .moveDown();

// // Finalize the PDF document
// doc.end();

// // Callback when the PDF generation is complete
// writeStream.on('finish', () => {
//     console.log('Bill PDF generated successfully!');
// });

// // Error handling
// doc.on('error', (err) => {
//     console.error(err);
// });