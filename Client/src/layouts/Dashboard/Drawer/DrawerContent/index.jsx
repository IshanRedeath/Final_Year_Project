// project import
import Navigation from './Navigation';
import SimpleBarScroll from 'components/Common/SimpleScrollBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBarScroll>
        <Navigation />
      </SimpleBarScroll>
    </>
  );
}
