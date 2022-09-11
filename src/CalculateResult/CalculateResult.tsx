import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Drawer,
  Typography,
} from '@mui/material';

export const DRAWER_WIDTH = 350;

type Props = {
  open: boolean;
  onClose: (isOpen: boolean) => void;
};

const CalculateResult = ({ open, onClose }: Props) => {
  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <Card sx={{ minWidth: DRAWER_WIDTH }}>
        <CardHeader title={<CalculateResultTitle />} />
        <CardContent>
          <Typography variant="h5" fontWeight={'bold'} textAlign="center">
            총 200000 원
          </Typography>
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default CalculateResult;

const CalculateResultTitle = () => {
  return (
    <>
      <Typography variant="h4" fontWeight={'bold'} sx={{ textAlign: 'center' }}>
        계산 결과
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};
