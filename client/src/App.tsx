import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import MealPlans from './pages/meal-plans';
import NewMealPlan from './pages/addMealPlan';
import UpdateBook from './pages/updateBook';
import ShowMealPlan from './pages/ShowMealPlan';
import AddUser from './pages/signup';
import LoginUser from './pages/login';
import ShowUser from './pages/showUser';
import UpdateUser from './pages/updateUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { User, UserContext, UserContextProps } from './UserContext';
import { config } from './config/config';

const URL = config.url;
console.log('URL shown in App.js', URL);
console.log('What environment has been detected? :)', process.env.NODE_ENV);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('id');

    if (id !== null) {
      console.log('condition true');
      fetch(`${URL}/user/show/${id}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  const value: UserContextProps = useMemo(
    () => ({ user, setUser: setUser as Dispatch<SetStateAction<User | null>> }),
    [user, setUser]
  );

  return (
    <Router>
      <UserContext.Provider value={value}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal-plans" element={<MealPlans />} />
            <Route path="/mealplan/show/:id" element={<ShowMealPlan />} />
            <Route path="/signup" element={<AddUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/new-mealplan" element={<NewMealPlan />} />
              <Route path="/book/update/:id" element={<UpdateBook />} />
              <Route path="/user/show/:id" element={<ShowUser />} />
              <Route path="/user/update/:id" element={<UpdateUser />} />
            </Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;