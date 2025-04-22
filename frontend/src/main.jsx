import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransactionPage from './pages/TransactionsPage';
import TransferPage from './pages/TransferPage';
import Layout from './components/Layout';



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: '/', element: <LoginPage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/register', element: <RegisterPage/>},
      {path: '/home', element: <DashboardPage/>},
      {path: '/deposit', element: <DepositPage/>},
      {path: '/withdraw', element: <WithdrawPage/>},
      {path: '/transactions', element: <TransactionPage/>},
      {path: '/transfer', element: <TransferPage/>},
  
      {path: "*", element: <NotFoundPage/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
      <StrictMode>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </StrictMode>,
)