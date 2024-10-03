document.getElementById('invoiceForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // หยุดการส่งแบบฟอร์มแบบปกติ

    // ดึงข้อมูลจากฟอร์ม
    const customerName = document.getElementById('customerName').value;
    const items = document.getElementById('items').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const email = document.getElementById('email').value;

    // สร้างข้อมูลที่ต้องการส่ง
    const invoiceData = {
        customer_name: customerName,
        items: items,
        total_amount: totalAmount,
        email: email
    };

    try {
        const response = await fetch('https://3zpor4z27e.execute-api.ap-southeast-1.amazonaws.com/dev/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'เกิดข้อผิดพลาดในการสร้างใบแจ้งหนี้';
    }
});
