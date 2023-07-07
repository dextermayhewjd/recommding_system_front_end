import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from './pages/Home';
import ConsentPage from './pages/Consent';
import MainPage from './App';
import InstructionPage from './pages/Instruction';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/consent', element: <ConsentPage /> },
  { path: '/instruction', element: <InstructionPage /> },
  { path: '/mainpage', element: <MainPage /> },
]);

const Bpp = () => {
  return <RouterProvider router={router} />;
};

export default Bpp;
