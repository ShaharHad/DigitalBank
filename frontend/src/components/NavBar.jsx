import {AppBar, Toolbar, Typography, Button, Icon, Container} from '@mui/material';
import {useNavigate} from "react-router-dom";

import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {

  const navigate = useNavigate();

  const { token, logout } = useAuth();
  
  return (
      <Container maxWidth="false" disableGutters>
        <AppBar position="sticky">
          <Toolbar>

            <Typography variant="h5" sx={{flexGrow: 1, color: 'inherit'}}>
              {"Digital bank"}
              <Typography sx={{flexGrow: 1}}>
                Because your money worth more
              </Typography>
            </Typography>

            {token !== null ? (
                <>
                <Button
                    data-test="home"
                    color="inherit"
                    onClick={() => navigate('/home')}>
                  Home
                </Button>
                <Button
                    data-test="deposit"
                    color="inherit"
                    onClick={() => navigate('/deposit')}>
                  Deposit
                </Button>
                <Button
                    data-test="withdraw"
                    color="inherit"
                    onClick={() => navigate('/withdraw')}>
              Withdraw
              </Button>
            <Button
                data-test="transfer"
                color="inherit"
                onClick={() => navigate('/transfer')}>
              Transfer
            </Button>
            <Button
                data-test="transactions"
                color="inherit"
                onClick={() => navigate('/transactions')}>
              Transactions
            </Button>

            <Button data-test="logout" color="inherit" onClick={() => {

            logout();
            navigate('/login');
          }}>
            Logout
          </Button>
                </>
              )
            : (
                <>
                  <Button
                      data-test="login"
                      color="inherit"
                      onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button
                      data-test="register"
                      color="inherit"
                      onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </>
                )}

          </Toolbar>
        </AppBar>
      </Container>
  );
}

export default NavBar