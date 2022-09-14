import { Chip, Divider, Stack } from '@mui/material';
import React from 'react';
import { States, SUBMIT_FORM_TYPE_MAPPER, YES_OR_NO } from '../../pages';
import { InputField, RadioSelector } from '../components';

type Props = { states: States; setStates: (state: States) => void };

const DApplication = ({ states, setStates }: Props) => {
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Chip label="1 단계" />
      </Divider>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <RadioSelector<States['submitFormType']>
          title="서류제출 방법"
          state={states.submitFormType}
          setState={(submitFormType: States['submitFormType']) =>
            setStates({ ...states, submitFormType })
          }
          optionListMapper={SUBMIT_FORM_TYPE_MAPPER}
          row
        />

        <InputField<States['rightUnitCount']>
          label={'디자인 수'}
          state={states.rightUnitCount}
          setState={(rightUnitCount: States['rightUnitCount']) =>
            setStates({ ...states, rightUnitCount })
          }
          helperText="디자인 수"
        />
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Chip label="2 단계" />
      </Divider>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        {states.isRequestForExamination === 'yes' && (
          <RadioSelector<States['isPriorityExamination']>
            title="우선심사 여부"
            state={states.isPriorityExamination}
            setState={(
              isPriorityExamination: States['isPriorityExamination']
            ) => setStates({ ...states, isPriorityExamination })}
            optionListMapper={YES_OR_NO}
            row
          />
        )}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Chip label="3 단계" />
      </Divider>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <RadioSelector<States['isClaimForPriorityRight']>
          title="우선권 주장 여부"
          state={states.isClaimForPriorityRight}
          setState={(
            isClaimForPriorityRight: States['isClaimForPriorityRight']
          ) => setStates({ ...states, isClaimForPriorityRight })}
          optionListMapper={YES_OR_NO}
          row
        />
        {states.isClaimForPriorityRight === 'yes' && (
          <>
            <RadioSelector<States['claimForPriorityRightType']>
              title="우선권주장 서류 제출 방식"
              state={states.claimForPriorityRightType}
              setState={(
                claimForPriorityRightType: States['claimForPriorityRightType']
              ) => setStates({ ...states, claimForPriorityRightType })}
              optionListMapper={SUBMIT_FORM_TYPE_MAPPER}
              row
            />

            <InputField<States['claimForPriorityRightCount']>
              label={'우선권 주장 수'}
              state={states.claimForPriorityRightCount}
              setState={(
                claimForPriorityRightCount: States['claimForPriorityRightCount']
              ) => setStates({ ...states, claimForPriorityRightCount })}
              helperText={'우선권 주장 총 수'}
            />
          </>
        )}
      </Stack>
    </>
  );
};

export default DApplication;
