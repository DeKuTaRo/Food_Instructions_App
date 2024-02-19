import React from 'react';
import QRCode from 'qrcode.react';

const MomoPaymentPage = () => {
  const momoQRCodeData = 'http://localhost:3000/history'; // Thay thế bằng dữ liệu mã QR thực tế của bạn

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Momo Payment</h1>
      <p>Scan the QR code to make the payment</p>

      {/* Hiển thị mã QR */}
      <QRCode value={momoQRCodeData} />

      <p>Or click the button below to open the Momo app:</p>
      <a href={momoQRCodeData} target="_blank" rel="noopener noreferrer">
        <button>Open Momo App</button>
      </a>
    </div>
  );
};

export default MomoPaymentPage;
