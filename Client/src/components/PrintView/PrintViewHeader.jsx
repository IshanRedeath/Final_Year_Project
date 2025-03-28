//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import iconText from 'assets/logo/icontext.jpg';
import iconImage from 'assets/logo/logo.jpg';
import home from 'assets/icons/home.png';
import call from 'assets/icons/call.png';
import whatsapp from 'assets/icons/whatsapp.png';
import email from 'assets/icons/email.png';

export default function PrintViewHeader() {
  return (
    <div>
      <Box>
        <Box
          fullWidth
          sx={{
            height: 140,
            borderBottom: '2px solid #000',
          }}
        >
          <Stack direction="column" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
              <img src={iconImage} height={90} />
              <img src={iconText} height={70} />
            </Stack>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={home} style={{ marginRight: 4, marginLeft: 4, height: 18 }} />
              No. 532, Colombo Road, Mukalangamuwa, Seeduwa. |{' '}
              <img src={call} style={{ marginRight: 4, marginLeft: 4, height: 18 }} />
              011225999 | <img src={whatsapp} style={{ marginRight: 4, marginLeft: 4, height: 18 }} />
              0772259999 | <img src={email} style={{ marginRight: 4, marginLeft: 4, height: 18 }} />
              info@seeduwahospitals.lk
            </Typography>
          </Stack>
        </Box>{' '}
      </Box>
    </div>
  );
}
