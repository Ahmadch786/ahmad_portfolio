import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThreeBackground from "@/components/ThreeBackground";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const metadata = {
  title: "Ahmad Nadeem • Full Stack Engineer",
  description: "A beautiful, interactive portfolio showcasing modern full stack web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-custom-bg text-custom-text antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <SmoothScroll>
            <Preloader />
            <CustomCursor />
            <ThreeBackground />
            <Navbar />
            <main className="flex-grow z-10 relative">
              {children}
            </main>
            <Chatbot />
            <ThemeSwitcher />
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
