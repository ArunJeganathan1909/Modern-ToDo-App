import "./globals.css";

export const metadata = {
  title: "Modern Todo App",
  description: "Built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
