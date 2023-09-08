import "@fontsource/inter";
import "@fontsource/lato";
import type { Metadata } from 'next';
import './globals.css';
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style

export const metadata: Metadata = {
  title: 'BlueX Trade',
  description: 'Welcome to BlueX',
}

// keep root layout empty because we do not know what language is being used when renderering it
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return( <>{children}</>)
}
