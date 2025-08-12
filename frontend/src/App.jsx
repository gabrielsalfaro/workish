import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import JobListingsCreate from './components/JobListingsCreate/JobListingsCreate';

function Layout() {
  return (<div><Outlet /></div>)
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/jobs/new',
        element: <JobListingsCreate />
      },
    ]
  }
])
function App() {
  // return <h1> Hello from App </h1>;
  return <RouterProvider router={router} />
}

export default App;
