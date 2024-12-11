import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';

import image1 from './assets/1527071.jpg';
import image2 from './assets/6141935.jpg';
import { router } from './routes/router';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
