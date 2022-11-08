import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { Route, Routes } from 'react-router';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import AccountPage from './routes/AccountPage';
import axios from 'axios'
import CoinPage from './routes/CoinPage';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      //console.log(response.data)
    });
  }, [url]);

  return (
  <ThemeProvider>
    <AuthContextProvider>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home coins={coins} />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/AccountPage' element={<AccountPage />} />
        <Route path='/coin/:coinId' element={<CoinPage />}>
          <Route path=':coinId' />
        </Route>
      </Routes>
      <Footer />
    </AuthContextProvider>
  </ThemeProvider>
  );
}

export default App;
