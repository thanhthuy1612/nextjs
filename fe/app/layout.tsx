import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: '#388087',
              colorBorderBg: '#388087',
              colorIcon: '#388087',
              colorBgTextHover: '#6FB3B8',
              colorTextBase: '#388087',
              colorError: '#FF6961',
              colorTextPlaceholder: '#E5E1DA',

              // Alias Token
              colorBgContainer: '#FBF9F1',
            },
          }}
        >
          <body className="bg-primaryWhite">{children}</body>
        </ConfigProvider>
      </StoreProvider>
    </html>
  );
}
