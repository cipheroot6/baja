import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "vite_react_shadcn_ts",
  description: "Created with Lovable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
