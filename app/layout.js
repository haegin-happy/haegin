export const metadata = {
  title: 'HAEGIN',
  description: 'HAEGIN Stitch export running in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
