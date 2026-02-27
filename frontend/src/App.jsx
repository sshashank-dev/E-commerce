import Footer from './components/common/Footer';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-20">
        <AppRoutes />
      </main>
      {/* <Footer />  */}

    </div>
  );
}