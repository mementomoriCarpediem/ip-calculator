import { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Container,
  Divider,
  Fab,
  Stack,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { Footer, SingleSelector } from '../src/components';
import CalculateResult, {
  DRAWER_WIDTH,
} from '../src/CalculateResult/CalculateResult';
import { getTotalFee } from '../utils';
import { NextSeo } from 'next-seo';
import PUApplication from '../src/PatentAndUtility/PUApplication';
import DApplication from '../src/Design/DApplication';
import TApplication from '../src/Trademark/TApplication';
import PURegister from '../src/PatentAndUtility/PURegister';
import DRegister from '../src/Design/DRegister';

export type IPType =
  | 'patent'
  | 'utility'
  | 'design-part-exam'
  | 'design-all-exam'
  | 'trademark';
type ProcessCategory = 'application' | 'register';
type SubmitFormType = 'paper' | 'online';
type Language = 'korean' | 'foriegn';
type TrademarkRegisterType =
  | 'normal'
  | 'designatedItemAdd'
  | 'extendValidationPeriod';

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
  examptionCases?: string;

  registerYearTypeTopay?: typeof YearTypeToPay[number];
  trademarkRegisterType?: TrademarkRegisterType;
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
    examptionCases: '',
    registerYearTypeTopay: '1~3',
    trademarkRegisterType: 'normal',
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

  const isIPtypeAndProcessCategory =
    states.ipType.length > 0 && states.processCategory.length > 0;

  const isPatent = states.ipType === 'patent';
  const isUtility = states.ipType === 'utility';

  const isPatentOrUtility = isPatent || isUtility;
  const isDesign =
    states.ipType === 'design-all-exam' || states.ipType === 'design-part-exam';
  const isTradeMark = states.ipType === 'trademark';

  const isApplication = states.processCategory === 'application';
  const isRegister = states.processCategory === 'register';

  return (
    <Container maxWidth="lg">
      <NextSeo
        title="지식재산권(ip) 비용 계산기"
        description="특허(실용신안), 상표, 디자인권의 출원/등록 비용을 계산할 수 있습니다."
        additionalMetaTags={[
          {
            property: 'dc:creator',
            content: 'Zorba',
          },
          {
            name: 'application-name',
            content: '지식재산권 비용 계산기(IP-calculator)',
          },
        ]}
      />

      <Stack
        justifyContent={'center'}
        sx={{ mr: isResultOpen ? `${DRAWER_WIDTH}px` : 0 }}
      >
        <Box
          bgcolor={'paleturquoise'}
          sx={{ m: 3, p: 3, borderRadius: '1rem' }}
        >
          <Typography variant="h4" fontWeight={600} textAlign={'center'}>
            지식재산권 비용(관납료) 계산기
          </Typography>
        </Box>

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

        {isApplication && isPatentOrUtility && (
          <PUApplication states={states} setStates={setStates} />
        )}

        {isApplication && isDesign && (
          <DApplication states={states} setStates={setStates} />
        )}

        {isApplication && isTradeMark && (
          <TApplication states={states} setStates={setStates} />
        )}

        {isRegister && isPatentOrUtility && (
          <PURegister states={states} setStates={setStates} />
        )}

        {isRegister && isDesign && (
          <DRegister states={states} setStates={setStates} />
        )}

        {isIPtypeAndProcessCategory ? (
          <>
            <Divider sx={{ my: 3 }}>
              <Chip label="4 단계 - 감면사유" />
            </Divider>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
              <SingleSelector<States['examptionCases']>
                title="감면사유 선택 - 출원인/권리자"
                menuItemMapper={EXEMPTION_CASES}
                state={states.examptionCases}
                setState={(examptionCases: States['examptionCases']) =>
                  setStates({ ...states, examptionCases })
                }
              />
            </Stack>
          </>
        ) : (
          <Box flex={1}>
            <Typography
              textAlign={'center'}
              variant="h5"
              fontWeight="bold"
              sx={{ my: 10 }}
            >
              지식재산권 종류와 진행절차를 선택해주세요.
            </Typography>
          </Box>
        )}
      </Stack>

      {/* <Fab
        variant="extended"
        color="primary"
        sx={{ left: '50%', bottom: 0, transform: 'translate(-50%)', mt: 5 }}
        onClick={() => setCalculatedResult(getTotalFee(states))}
      >
        계산결과 확인
      </Fab> */}

      <Typography variant={'h3'} fontWeight="bold" textAlign="center" my={10}>
        총 금액: {calculatedResult?.toLocaleString()} 원
      </Typography>

      {/* <CalculateResult
        open={isResultOpen}
        onClose={() => setIsResultOpen(false)}
      /> */}
      <Footer />
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

export const PROCESS_CATEGORY_MAPPER: Record<ProcessCategory, string> = {
  application: '출원',
  register: '등록',
};

export const SUBMIT_FORM_TYPE_MAPPER: Record<SubmitFormType, string> = {
  paper: '서면',
  online: '전자',
};

export const SUBMIT_FORM_LANGUAGE: Record<Language, string> = {
  korean: '국어',
  foriegn: '외국어',
};

export const YES_OR_NO = { yes: 'Yes', no: 'No' } as const;

export const EXEMPTION_CASES = {
  '100-1': '국민기초생활보장법상 의료급여 수급자',
  '100-2':
    '국가유공자와 유족 및 가족, 5·18민주유공자와 유족 및 가족, 고엽제후유증환자·고엽제후유의증환자 및 고엽제후유증 2세환자, 특수임무유공자와 유족, 독립유공자와 유족 및 가족, 참전유공자(본인)',
  '100-3': '장애인복지법상 등록 장애인',
  '100-4': '학생[초·중·고의 재학생에 한함]',
  '100-5': '만 6세 이상 만 19세 미만인 자',
  '100-6': '군복무중인 일반사병, 사회복무요원, 예술·체육요원, 전환복무수행자',

  '85-1': '만 19세 이상 만30세 미만인 자',
  '85-2': '만 65세 이상인 자',
  '70-1': '개인',
  '70-2': '중소기업',

  '50-1': '중소기업과의 공동연구결과물 출원',
  '50-2':
    ' 공공연구 기관(기술의 이전 및 사업화 촉진에 관한 법률에 따른 공공연구기관)',
  '50-3':
    '전담조직(기술의 이전 및 사업화 촉진에 관한 법률 제11조 제1항에 따른 전담조직)',
  '50-4': '지방자치단체',

  '30-1':
    '중견기업(중견기업 성장촉진 및 경쟁력강화에 관한 특별법에 따른 중견기업)',
};

export const YearTypeToPay = ['1~3', '4~6', '7~9', '10~12', '13~'] as const;

export const YEARS_TYPE_TO_PAY_MAPPER: Record<
  typeof YearTypeToPay[number],
  string
> = {
  '1~3': '최초 등록시',
  '4~6': '4 ~ 6년차',
  '7~9': '7 ~ 9 년차',
  '10~12': '10 ~ 12 년차',
  '13~': '13년차 이후',
};
