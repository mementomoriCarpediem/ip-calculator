import React from 'react';
import { Divider, Stack } from '@mui/material';
import { States, TRADEMARK_REGISTER_TYPE_MAPPER } from '../../pages';
import { InputField, SingleSelector } from '../components';

type Props = { states: States; setStates: (state: States) => void };

function TRegister({ states, setStates }: Props) {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <SingleSelector<States['trademarkRegisterType']>
          title="등록유형 선택"
          menuItemMapper={TRADEMARK_REGISTER_TYPE_MAPPER}
          state={states.trademarkRegisterType}
          setState={(
            trademarkRegisterType: States['trademarkRegisterType']
          ) => {
            setStates({ ...states, trademarkRegisterType });
          }}
        />

        <InputField<States['rightUnitCount']>
          label={'상품류구분 수'}
          state={states.rightUnitCount}
          setState={(rightUnitCount: States['rightUnitCount']) =>
            setStates({ ...states, rightUnitCount })
          }
          helperText="상품류구분 수"
        />

        <InputField<States['trademark']['designatedItemCount']>
          label={'지정상품 수'}
          state={states.trademark.designatedItemCount}
          setState={(
            designatedItemCount: States['trademark']['designatedItemCount']
          ) =>
            setStates({
              ...states,
              trademark: { ...states.trademark, designatedItemCount },
            })
          }
          helperText="지정상품 수(20개 초과시 가산금(2000원/개) 발생)"
        />
      </Stack>
    </>
  );
}

export default TRegister;
