import './globals.css';
import "../devlink/global.css";
import { DevLinkProvider } from '../devlink/DevLinkProvider';
import swal from 'sweetalert';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DevLinkProvider>{children}</DevLinkProvider>
      </body>
    </html>
  );
}
