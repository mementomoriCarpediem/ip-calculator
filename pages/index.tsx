import { useState } from 'react';
import { Container, Divider, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import SingleSelector from '../src/components/SingleSelector';

type IPType = 'Patent' | 'Utility' | 'Design' | 'Trademark';
type ProcessCategory = 'Application' | 'Register';

interface States {
  ipType: IPType | '';
  processCategory: ProcessCategory | '';
}

const Home: NextPage = () => {
  const [states, setStates] = useState<States>({
    ipType: '',
    processCategory: '',
  });

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
          <SingleSelector
            title="지식재산권 선택"
            menuItemMapper={IP_TYPE_MAPPER}
            state={states.ipType}
            setState={(ipType: States['ipType']) =>
              setStates({ ...states, ipType })
            }
          />
          <SingleSelector
            title="진행절차 선택"
            menuItemMapper={PROCESS_CATEGORY_MAPPER}
            state={states.processCategory}
            setState={(processCategory: States['processCategory']) =>
              setStates({ ...states, processCategory })
            }
          />
        </Stack>

        <Divider sx={{ my: 3 }} />
      </Stack>
    </Container>
  );
};

export default Home;

const IP_TYPE_MAPPER: Record<IPType, string> = {
  Patent: '특허',
  Utility: '실용신안',
  Design: '디자인',
  Trademark: '상표',
};

const PROCESS_CATEGORY_MAPPER: Record<ProcessCategory, string> = {
  Application: '출원',
  Register: '등록',
};
