import "./globals.css";

export const metadata = {
  title: "Projeto de CRUD completo",
  description: "Projeto de CRUD completo utilizando Next.js 13, React, Axios e CSS Modules",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
