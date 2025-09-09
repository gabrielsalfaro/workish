import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import JobListingsCreate from './components/JobListingsCreate/JobListingsCreate';
import Home from './components/Home/Home';
import JobListingsManage from './components/JobListingsManage/JobListingsManage';
import JobListingDetails from './components/JobListingDetails';
import UserProfile from './components/UserProfile/UserProfile';
import JobListingEdit from './components/JobListingEdit/JobListingEdit';
import ApplicationsCreate from './components/ApplicationsCreate/ApplicationsCreate';
import ApplicationsSubmitted from './components/ApplicationsSubmitted/ApplicationsSubmitted';
import ApplicationDetails from './components/ApplicationDetails/ApplicationDetails';
import ApplicationsReview from './components/ApplicationsReview/ApplicationsReview';
import Watchlist from './components/Watchlist/Watchlist';
import MyCompany from './components/MyCompany/MyCompany';

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
        element: <Home />
      },
      {
        path: '/jobs/new',
        element: <JobListingsCreate />
      },
      {
        path: '/jobs/my-jobs',
        element: <JobListingsManage />
      },
      {
        path: '/jobs/:jobId/details',
        element: <JobListingDetails />
      },
      {
        path: '/jobs/:jobId/edit',
        element: <JobListingEdit />
      },
      {
        path: '/jobs/:jobId/apply',
        element: <ApplicationsCreate />
      },
      {
        path: '/applications',
        element: <ApplicationsSubmitted />
      },
      {
        path: '/applications/:applicationId/details',
        element: <ApplicationDetails />
      },
      {
        path: '/jobs/:jobId/applications',
        element: <ApplicationsReview />
      },
      {
        path: '/companies/my-company',
        element: <MyCompany />
      },
      {
        path: '/watchlist',
        element: <Watchlist />
      },
      {
        path: '/users/:userId',
        element: <UserProfile />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;