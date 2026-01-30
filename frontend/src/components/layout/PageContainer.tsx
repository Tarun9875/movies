import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}
export default function PageContainer({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
