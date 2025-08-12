import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import JobListingsCreate from './components/JobListingsCreate/JobListingsCreate';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <>
          <h1>Welcome!</h1>
          <NavLink to='/jobs/new'>create a job listing!</NavLink>
        </>
      },
      {
        path: '/jobs/new',
        element: <JobListingsCreate />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;