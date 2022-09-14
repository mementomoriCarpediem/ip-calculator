import { Link, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      my={2}
      py={2}
      borderTop="1px solid gray"
      position={'absolute'}
      bottom={0}
      left={0}
      width="100%"
    >
      <Typography fontWeight={'bold'} sx={{ mr: 1 }}>
        제안/문의 :{' '}
      </Typography>
      <Link href="mailto:carpediem.mementomori.1984@gmail.com">
        carpediem.mementomori.1984@gmail.com
      </Link>
    </Stack>
  );
}

export default Footer;
