import { Divider, Stack } from '@mui/material';
import React from 'react';
import { States, YEARS_TYPE_TO_PAY_MAPPER, YearTypeToPay } from '../../pages';
import { InputField, SingleSelector } from '../components';

type Props = {
  states: States;
  setStates: (state: States) => void;
};

function PURegister({ states, setStates }: Props) {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <SingleSelector<States['registerYearTypeTopay']>
          title="등록료 납부연차(출원일로부터, 최초 등록시 => 3년 일괄, 이외 년차 => 1년 단위 납부)"
          menuItemMapper={YEARS_TYPE_TO_PAY_MAPPER}
          state={states.registerYearTypeTopay}
          setState={(
            registerYearTypeTopay: States['registerYearTypeTopay']
          ) => {
            setStates({ ...states, registerYearTypeTopay });
          }}
        />
        <InputField<States['rightUnitCount']>
          label={'청구항 수'}
          state={states.rightUnitCount}
          setState={(claimCount: States['rightUnitCount']) =>
            setStates({ ...states, rightUnitCount: claimCount })
          }
          helperText="청구항 총 수"
        />
      </Stack>
    </>
  );
}

export default PURegister;
