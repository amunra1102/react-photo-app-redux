/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';

import productApi from 'api/product-api';
import { getMe } from 'app/user-slice';

import SignIn from 'features/auth/pages/sign-in';

import Header from 'components/header';
import NotFound from 'components/not-found';

import './App.scss';

// Lazy load - Code splitting
const Photo = lazy(() => import('features/photo'));

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10
      };
      const response = await productApi.getAll(params);
      setProducts(response.data);
      console.log('response', response);
    } catch (error) {
      console.log(`Failed to fetch product list: ${error}`);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Handle firebase auth changed
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return;
      }
      // Get me when signed in
      // const action = getMe();
      try {
        const actionResult = await dispatch(getMe());
        const currentUser = unwrapResult(actionResult);
        console.log('Logged in user: ', currentUser);
      } catch (error) {
        console.log('Failed to login ', error.message);
        // show toast error
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header/>

          <Switch>
            <Redirect exact from='/' to='/photos' />
            <Route path='/photos' component={Photo} />
            <Route path='/sign-in' component={SignIn} />
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
