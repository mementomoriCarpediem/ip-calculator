import { useEffect, useState } from 'react';
import { Chip, Container, Divider, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { InputField, RadioSelector, SingleSelector } from '../src/components';

type IPType = 'patent' | 'utility' | 'design' | 'trademark';
type ProcessCategory = 'application' | 'register';
type SubmitFormType = 'paper' | 'online';
type Language = 'korean' | 'foriegn';

interface States {
  ipType: IPType | '';
  processCategory: ProcessCategory | '';
  submitFormType?: SubmitFormType;
  language?: Language;
  pageCount?: number;
  isRequestForExamination?: boolean;
  claimCount?: number;
  isPriorityExamination?: boolean;
  isClaimForPriorityRight?: boolean;
  claimForPriorityRightType?: SubmitFormType;
  claimForPriorityRightCount?: number;
}

const Home: NextPage = () => {
  const [states, setStates] = useState<States>({
    ipType: '',
    processCategory: '',
    submitFormType: 'online',
    language: 'korean',
    pageCount: 20,
    isRequestForExamination: true,
    claimCount: 1,
    isPriorityExamination: false,
    claimForPriorityRightType: 'online',
    claimForPriorityRightCount: 1,
  });

  //TODO: delete after test
  useEffect(() => {
    console.log(states);
  }, [states]);

  return (
    <Container maxWidth="lg">
      <Stack justifyContent={'center'}>
        <Typography
          variant="h3"
          fontWeight={600}
          gutterBottom
          textAlign={'center'}
          p={2}
        >
          지식재산권 비용(관납료) 계산기
        </Typography>

        {/* <Link href="/about" color="secondary">
          Go to the about page
        </Link> */}

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
          <SingleSelector<States['ipType']>
            title="지식재산권 선택"
            menuItemMapper={IP_TYPE_MAPPER}
            state={states.ipType}
            setState={(ipType: States['ipType']) =>
              setStates({ ...states, ipType })
            }
          />
          <SingleSelector<typeof states.processCategory>
            title="진행절차 선택"
            menuItemMapper={PROCESS_CATEGORY_MAPPER}
            state={states.processCategory}
            setState={(processCategory: States['processCategory']) =>
              setStates({ ...states, processCategory })
            }
          />
        </Stack>

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
          <InputField<States['pageCount']>
            label={'페이지 수'}
            state={states.pageCount}
            setState={(pageCount: States['pageCount']) =>
              setStates({ ...states, pageCount })
            }
            helperText="명세서, 도면 및 요약서의 총 페이지 수"
          />
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
          <InputField<States['claimCount']>
            label={'청구항 수'}
            state={states.claimCount}
            setState={(claimCount: States['claimCount']) =>
              setStates({ ...states, claimCount })
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
          <RadioSelector<States['claimForPriorityRightType']>
            title="우선권주장 서류 제출 방식"
            state={states.claimForPriorityRightType}
            setState={(
              claimForPriorityRightType: States['claimForPriorityRightType']
            ) => setStates({ ...states, claimForPriorityRightType })}
            optionListMapper={SUBMIT_FORM_LANGUAGE}
            row
          />
          <InputField<States['claimForPriorityRightCount']>
            label={'우선권 주장 수'}
            state={states.claimForPriorityRightCount}
            setState={(
              claimForPriorityRightCount: States['claimForPriorityRightCount']
            ) => setStates({ ...states, claimForPriorityRightCount })}
            helperText="우선권 주장 총 수"
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;

const IP_TYPE_MAPPER: Record<IPType, string> = {
  patent: '특허',
  utility: '실용신안',
  design: '디자인',
  trademark: '상표',
};

const PROCESS_CATEGORY_MAPPER: Record<ProcessCategory, string> = {
  application: '출원',
  register: '등록',
};

const SUBMIT_FORM_TYPE_MAPPER: Record<SubmitFormType, string> = {
  paper: '서면',
  online: '전자',
};

const SUBMIT_FORM_LANGUAGE: Record<Language, string> = {
  korean: '국어',
  foriegn: '외국어',
};

const YES_OR_NO = { true: 'Yes', false: 'No' };
