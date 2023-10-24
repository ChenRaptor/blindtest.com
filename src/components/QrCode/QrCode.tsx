import QRCode from 'react-qr-code';
// import { v4 as uuidv4 } from 'uuid';

function SocketQRCode({url}: {url: string}) {
  // const socketURL = `${process.env.NEXT_PUBLIC_SITE_URL}/room/${uuidv4()}`;

  return (
    <div>
      <QRCode value={url} />
    </div>
  );
}

export default SocketQRCode;