import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Deposit from './pages/Deposit';
import Balance from './pages/Balance';
import Transfer from './pages/Transfer';
import Loan from './pages/Loan';
import Dashhome from './pages/Dashhome';
import Withdraw from './pages/Withdraw';
import Home from './pages/Home';
import Close from './pages/Close';
import Usersettings from './pages/Usersettings';
import Security from './pages/Security';
import Loanpolicy from './pages/Loanpolicy';
import Costumerservice from './pages/Customerservice';
import Contact from './pages/Contact';
import Forgotpassword from './pages/Forgotpassword';
import Changefp from './pages/Change';
import Trasnferstatments from './pages/Transferstatements';
import Adminpage from './Admin/Adminpage';
import Adminbalance from './Admin/Adminbalance';
import Admindeposit from './Admin/Admindeposit';
import Admintransfer from './Admin/Admintransfer';
import Adminwithdraw from './Admin/Adminwithdraw';
import Adminloan from './Admin/Adminloan';
import Admintrasnferstatments from './Admin/Admintransferstatements';
import Adminsettings from './Admin/Adminsettings';
import Bankusers from './Admin/Bankusers';
import Admisstatments from './Admin/Adminstatements';

function App() {
  return (
    <div className='app-container d-flex'>
      <div className='App'>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/security' element={<Security />} />
            <Route path='/loanpolicy' element={<Loanpolicy />} />
            <Route path='/costumer' element={<Costumerservice />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/forgot' element={<Forgotpassword />} />
            <Route path='/au/:id' element={<Bankusers />} />
            <Route path='/admin/:id' element={<Adminpage />} />
            <Route path='/adminbalance/:id' element={<Adminbalance />} />
            <Route path='/admindeposit/:id' element={<Admindeposit />} />
            <Route path='/admintransfer/:id' element={<Admintransfer />} />
            <Route path='/adminwithdraw/:id' element={<Adminwithdraw />} />
            <Route path='/admintransferstatment/:id' element={<Admintrasnferstatments />} />
            <Route path='/adminstatment/:id' element={<Admisstatments />} />
            <Route path='/admins/:id' element={<Adminsettings />} />
            <Route path='/adminloan/:id' element={<Adminloan />} />
            <Route path='/change/:id' element={<Changefp />} />
            <Route path='/dashhome/:id' element={<Dashhome />} />
            <Route path='/balance/:id' element={<Balance />} />
            <Route path='/deposit/:id' element={<Deposit />} />
            <Route path='/transfer/:id' element={<Transfer />} />
            <Route path='/loan/:id' element={<Loan />} />
            <Route path='/withdraw/:id' element={<Withdraw/>}/>
            <Route path='/dashhome' element={<Dashhome />} />
            <Route path='/close/:id' element={<Close />} />
            <Route path='/usersettings/:id' element={<Usersettings />} />
            <Route path='/transferstatment/:id' element={<Trasnferstatments />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;