import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Chat from '../pages/Chat';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import TaskManager from '../components/layouts/taskManager';
// import MainHeader from '../pages/AllTask';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <TaskManager />,
      // },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default routes;
