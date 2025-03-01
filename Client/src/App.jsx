import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { MenuProvider } from './context/dashboardMenuContext';
import ThemeCustomization from 'themes';
import Loading from 'components/Loading';
function App() {
  return (
    <div>
      {' '}
      <Loading loadingState={true} />
      <ThemeCustomization>
        {' '}
        <MenuProvider>
          {' '}
          <RouterProvider router={router} />
        </MenuProvider>
      </ThemeCustomization>
    </div>
  );
}

export default App;
