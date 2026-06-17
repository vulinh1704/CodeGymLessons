import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeGym Lessons",
  description: "Hệ thống bài giảng CodeGym theo module và slide",
  icons: {
    icon: "https://james.codegym.vn/pluginfile.php/1/theme_remui/logomini/1737014283/icon-small.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
