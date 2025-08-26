import Header from './Header';
import Footer from './Footer';

interface StaticPageLayoutProps {
  children: React.ReactNode;
}

export default function StaticPageLayout({ children }: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-5 md:px-0 py-10">
        <Header />
        <main className="flex-1 px-4 py-12 container mx-auto max-w-4xl overflow-y-auto hide-scrollbar flex flex-col gap-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
