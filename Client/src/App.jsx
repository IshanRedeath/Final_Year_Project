import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { MenuProvider } from './context/dashboardMenuContext';
import ThemeCustomization from 'themes';
function App() {
  return (
    <div>
      <ThemeCustomization>
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </ThemeCustomization>
    </div>
  );
}

export default App;
