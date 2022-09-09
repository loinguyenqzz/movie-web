import 'swiper/css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'

import './App.scss';
import Header from './components/header'
import Footer from './components/footer'
import RoutesConfig from './routes/RoutesConfig'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  const location = useLocation()
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <RoutesConfig />
      </div>
      <Footer />
    </>
  );
}

export default App;
