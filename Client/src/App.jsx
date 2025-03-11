import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { MenuProvider } from './context/dashboardMenuContext';
import { ApiFeedbackProvider } from 'context/feedbackContext';
import ThemeCustomization from 'themes';
import Loading from 'components/Loading';

function App() {
  return (
    <div>
      <ThemeCustomization>
        {' '}
        <ApiFeedbackProvider>
          <MenuProvider>
            <RouterProvider router={router} />
          </MenuProvider>
        </ApiFeedbackProvider>
      </ThemeCustomization>
    </div>
  );
}

export default App;
