import { Link, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent={'center'}
      alignItems="center"
      borderTop="1px solid gray"
      width="100%"
      p={2}
      mt="auto"
    >
      <Typography fontWeight={'bold'} sx={{ mr: 1 }}>
        제안/문의 :
      </Typography>
      <Link href="mailto:carpediem.mementomori.1984@gmail.com">
        carpediem.mementomori.1984@gmail.com
      </Link>
    </Stack>
  );
}

export default Footer;
