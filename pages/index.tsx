import { useEffect, useState } from 'react';
import {
  Chip,
  Container,
  Divider,
  Fab,
  Stack,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { InputField, RadioSelector, SingleSelector } from '../src/components';
import CalculateResult, {
  DRAWER_WIDTH,
} from '../src/CalculateResult/CalculateResult';
import { getTotalFee } from '../utils';

type IPType =
  | 'patent'
  | 'utility'
  | 'design-part-exam'
  | 'design-all-exam'
  | 'trademark';
type ProcessCategory = 'application';
// | 'register';
type SubmitFormType = 'paper' | 'online';
type Language = 'korean' | 'foriegn';

export interface States {
  ipType: IPType | '';
  processCategory: ProcessCategory | '';
  submitFormType?: SubmitFormType;
  language?: Language;
  pageCount?: number;
  isRequestForExamination?: keyof typeof YES_OR_NO;
  //특허와 실용신안은 청구항, 디자인은 디자인, 상품은 상품류가 unit
  rightUnitCount?: number;
  trademark: {
    designatedItemCount?: number;
    isAllDesignatedItemsFromPublishedItems?: keyof typeof YES_OR_NO;
  };
  isPriorityExamination?: keyof typeof YES_OR_NO;
  isClaimForPriorityRight?: keyof typeof YES_OR_NO;
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
    isRequestForExamination: 'yes',
    rightUnitCount: 1,
    trademark: {
      designatedItemCount: 20,
      isAllDesignatedItemsFromPublishedItems: 'yes',
    },
    isPriorityExamination: 'no',
    isClaimForPriorityRight: 'no',
    claimForPriorityRightType: 'online',
    claimForPriorityRightCount: 1,
  });

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

  const [calculatedResult, setCalculatedResult] = useState<number>(0);

  //TODO: delete after test
  useEffect(() => {
    console.log(1, states);
  }, [calculatedResult, states]);

  useEffect(() => {
    setCalculatedResult(getTotalFee(states));
  }, [states]);

  const isPatentOrUtility =
    states.ipType === 'patent' || states.ipType === 'utility';
  const isDesign =
    states.ipType === 'design-all-exam' || states.ipType === 'design-part-exam';
  const isTradeMark = states.ipType === 'trademark';

  return (
    <Container maxWidth="lg">
      <Stack
        justifyContent={'center'}
        sx={{ mr: isResultOpen ? `${DRAWER_WIDTH}px` : 0 }}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          gutterBottom
          textAlign={'center'}
          p={5}
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
          {isPatentOrUtility && (
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
              <InputField<States['pageCount']>
                label={'페이지 수'}
                state={states.pageCount}
                setState={(pageCount: States['pageCount']) =>
                  setStates({ ...states, pageCount })
                }
                helperText="명세서, 도면 및 요약서의 총 페이지 수"
              />
            </>
          )}
          {isDesign && (
            <InputField<States['rightUnitCount']>
              label={'디자인 수'}
              state={states.rightUnitCount}
              setState={(rightUnitCount: States['rightUnitCount']) =>
                setStates({ ...states, rightUnitCount })
              }
              helperText="디자인 수"
            />
          )}
          {isTradeMark && (
            <>
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
                helperText="지정상품 수(20개 초과시 가산금 발생)"
              />
              <RadioSelector<
                States['trademark']['isAllDesignatedItemsFromPublishedItems']
              >
                title="모든 지정상품 고시명칭 해당 여부"
                state={states.trademark.isAllDesignatedItemsFromPublishedItems}
                setState={(
                  isAllDesignatedItemsFromPublishedItems: States['trademark']['isAllDesignatedItemsFromPublishedItems']
                ) =>
                  setStates({
                    ...states,
                    trademark: {
                      ...states.trademark,
                      isAllDesignatedItemsFromPublishedItems,
                    },
                  })
                }
                optionListMapper={YES_OR_NO}
                row
              />
            </>
          )}
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Chip label="2 단계" />
        </Divider>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
          {isPatentOrUtility && (
            <RadioSelector<States['isRequestForExamination']>
              title="심사청구 여부"
              state={states.isRequestForExamination}
              setState={(
                isRequestForExamination: States['isRequestForExamination']
              ) => setStates({ ...states, isRequestForExamination })}
              optionListMapper={YES_OR_NO}
              row
            />
          )}

          {states.isRequestForExamination === 'yes' && (
            <>
              {isPatentOrUtility && (
                <InputField<States['rightUnitCount']>
                  label={'청구항 수'}
                  state={states.rightUnitCount}
                  setState={(claimCount: States['rightUnitCount']) =>
                    setStates({ ...states, rightUnitCount: claimCount })
                  }
                  helperText="청구항 총 수"
                />
              )}

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
                helperText={
                  isTradeMark ? ' 우선권 주장 상품류 수' : '우선권 주장 총 수'
                }
              />
            </>
          )}
        </Stack>

        {/* <Divider sx={{ my: 3 }}>
          <Chip label="4 단계 - 감면사유" />
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
        </Stack> */}
      </Stack>

      {/* <Fab
        variant="extended"
        color="primary"
        sx={{ left: '50%', bottom: 0, transform: 'translate(-50%)', mt: 5 }}
        onClick={() => setCalculatedResult(getTotalFee(states))}
      >
        계산결과 확인
      </Fab> */}

      <Typography variant="h3" fontWeight="bold" textAlign="center" mt={10}>
        총 금액: {calculatedResult?.toLocaleString()} 원
      </Typography>

      {/* <CalculateResult
        open={isResultOpen}
        onClose={() => setIsResultOpen(false)}
      /> */}
    </Container>
  );
};

export default Home;

const IP_TYPE_MAPPER: Record<IPType, string> = {
  patent: '특허',
  utility: '실용신안',
  'design-part-exam': '디자인-일부심사',
  'design-all-exam': '디자인-심사',
  trademark: '상표',
};

const PROCESS_CATEGORY_MAPPER: Record<ProcessCategory, string> = {
  application: '출원',
  // register: '등록',
};

const SUBMIT_FORM_TYPE_MAPPER: Record<SubmitFormType, string> = {
  paper: '서면',
  online: '전자',
};

const SUBMIT_FORM_LANGUAGE: Record<Language, string> = {
  korean: '국어',
  foriegn: '외국어',
};

const YES_OR_NO = { yes: 'Yes', no: 'No' } as const;
