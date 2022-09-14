import { Chip, Divider, Stack } from '@mui/material';
import React from 'react';
import {
  States,
  SUBMIT_FORM_LANGUAGE,
  SUBMIT_FORM_TYPE_MAPPER,
  YES_OR_NO,
} from '../../pages';
import { InputField, RadioSelector } from '../components';

type Props = {
  states: States;
  setStates: (state: States) => void;
};

function PUApplication({ states, setStates }: Props) {
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

        <>
          <RadioSelector<States['language']>
            title="제출서류 언어"
            state={states.language}
            setState={(language: States['language']) =>
              setStates({ ...states, language })
            }
            optionListMapper={SUBMIT_FORM_LANGUAGE}
            row
          />

          {/* <Divider orientation="vertical" flexItem /> */}
          {states.submitFormType === 'paper' && (
            <InputField<States['pageCount']>
              label={'페이지 수'}
              state={states.pageCount}
              setState={(pageCount: States['pageCount']) =>
                setStates({ ...states, pageCount })
              }
              helperText="명세서, 도면 및 요약서의 총 페이지 수"
            />
          )}
        </>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Chip label="2 단계" />
      </Divider>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <RadioSelector<States['isRequestForExamination']>
          title="심사청구 여부"
          state={states.isRequestForExamination}
          setState={(
            isRequestForExamination: States['isRequestForExamination']
          ) => setStates({ ...states, isRequestForExamination })}
          optionListMapper={YES_OR_NO}
          row
        />

        {states.isRequestForExamination === 'yes' && (
          <>
            <InputField<States['rightUnitCount']>
              label={'청구항 수'}
              state={states.rightUnitCount}
              setState={(claimCount: States['rightUnitCount']) =>
                setStates({ ...states, rightUnitCount: claimCount })
              }
              helperText="청구항 총 수"
            />

            <RadioSelector<States['isPriorityExamination']>
              title="우선심사 여부"
              state={states.isPriorityExamination}
              setState={(
                isPriorityExamination: States['isPriorityExamination']
              ) => setStates({ ...states, isPriorityExamination })}
              optionListMapper={YES_OR_NO}
              row
            />
          </>
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
}

export default PUApplication;
