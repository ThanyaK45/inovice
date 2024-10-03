document.getElementById('invoiceForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // หยุดการส่งแบบฟอร์มแบบปกติ

    // ดึงข้อมูลจากฟอร์ม
    const customerName = document.getElementById('customerName').value;
    const items = document.getElementById('items').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // สร้างข้อมูลที่ต้องการส่ง
    const invoiceData = {
        customer_name: customerName,
        items: items,
        total_amount: totalAmount,
        email: email,
        phone: phone
    };

    try {
        const response = await fetch('https://3zpor4z27e.execute-api.ap-southeast-1.amazonaws.com/dev/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '6RzavpfIoE5SvvuN1u9WrapRNbp5GLuc5R6B6xTK'
            },
            body: JSON.stringify(invoiceData),
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = 'สร้างใบแจ้งหนี้สำเร็จ';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'เกิดข้อผิดพลาดในการสร้างใบแจ้งหนี้';
    }
});

// สำหรับแสดงข้อมูลจาก DynamoDB
document.getElementById('showDataButton').addEventListener('click', async function() {
    try {
        const response = await fetch('https://3zpor4z27e.execute-api.ap-southeast-1.amazonaws.com/dev/invoice', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': '6RzavpfIoE5SvvuN1u9WrapRNbp5GLuc5R6B6xTK'
            }
        });

        const result = await response.json();
        const invoiceDataDiv = document.getElementById('invoiceData');

        // แปลง body จาก string เป็น JSON
        const data = JSON.parse(result.body); 

        if (data.invoices && data.invoices.length > 0) {
            invoiceDataDiv.innerHTML = '';
            data.invoices.forEach(invoice => {
                invoiceDataDiv.innerHTML += `
                    <div class="invoice">
                        <p><strong>Invoice ID:</strong> ${invoice.InvoiceID}</p>
                        <p><strong>Customer Name:</strong> ${invoice.CustomerName}</p>
                        <p><strong>Items:</strong> ${invoice.Items}</p>
                        <p><strong>Total Amount:</strong> ${invoice.TotalAmount}</p>
                        <p><strong>PhoneNumber:</strong> ${invoice.PhoneNumber}</p>
                        <p><strong>Status:</strong> ${invoice.Status}</p>
                        <hr>
                    </div>
                `;
            });
        } else {
            invoiceDataDiv.innerHTML = '<p>ไม่พบข้อมูลใบแจ้งหนี้</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('invoiceData').innerText = 'เกิดข้อผิดพลาดในการดึงข้อมูลใบแจ้งหนี้';
    }
});
