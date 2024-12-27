// project import
//import NavCard from './NavCard';
import Navigation from './Navigation';
//import SimpleBar from 'components/third-party/SimpleBar';
import SimpleBarScroll from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBarScroll
        sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}
      >
        <Navigation />
        {/* <NavCard /> */}
      </SimpleBarScroll>
    </>
  );
}
