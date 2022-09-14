import { IPType, States, YearTypeToPay } from '../pages';

export const getTotalFee = (inputStates: States): number => {
  let totalFee = 0;

  const {
    ipType,
    processCategory,
    submitFormType,
    language,
    pageCount,
    isRequestForExamination,
    rightUnitCount,
    trademark,
    isPriorityExamination,
    isClaimForPriorityRight,
    claimForPriorityRightType,
    claimForPriorityRightCount,
    examptionCases,
    registerYearTypeTopay,
  } = inputStates;
  const { designatedItemCount, isAllDesignatedItemsFromPublishedItems } =
    trademark;

  const isPatent = ipType === 'patent';
  const isUtility = ipType === 'utility';
  const isDesignPartExam = ipType === 'design-part-exam';
  const isDesignAllExam = ipType === 'design-all-exam';
  const isTradeMark = ipType === 'trademark';

  const exemptionRate =
    examptionCases && examptionCases.length > 0
      ? Number(examptionCases?.split('-')[0]) === 100
        ? 0
        : Number(examptionCases?.split('-')[0]) / 100
      : 1;

  //1. 특허 또는 실용신안 && 출원 비용 경우
  if ((isPatent || isUtility) && processCategory === 'application') {
    const isOnlineSubmit = submitFormType === 'online';
    const isKoreanSubmit = language === 'korean';

    if (isPatent) {
      // 출원 기본료
      if (isOnlineSubmit) totalFee += isKoreanSubmit ? 46000 : 73000;
      else totalFee += isKoreanSubmit ? 66000 : 93000;
      // 출원 가산료
      if (pageCount && pageCount > 20) totalFee += (pageCount - 20) * 1000;

      //심사청구료
      if (isRequestForExamination === 'yes') {
        totalFee += 143000;
        if (rightUnitCount && rightUnitCount > 0)
          totalFee += 44000 * rightUnitCount;
      }
      if (isPriorityExamination === 'yes') totalFee += 200000;

      totalFee = totalFee * exemptionRate;
    }

    if (isUtility) {
      // 출원 기본료
      if (isOnlineSubmit) totalFee += isKoreanSubmit ? 20000 : 32000;
      else totalFee += isKoreanSubmit ? 30000 : 42000;
      // 출원 가산료
      if (pageCount && pageCount > 20) totalFee += (pageCount - 20) * 1000;
      //심사청구료
      if (isRequestForExamination === 'yes') {
        totalFee += 71000;
        if (rightUnitCount && rightUnitCount > 0)
          totalFee += 19000 * rightUnitCount;
      }
      if (isPriorityExamination === 'yes') totalFee += 100000;

      totalFee = totalFee * exemptionRate;
    }

    if (isClaimForPriorityRight === 'yes' && claimForPriorityRightCount) {
      totalFee +=
        claimForPriorityRightType === 'online'
          ? 2 * 18000 * claimForPriorityRightCount
          : 2 * 20000 * claimForPriorityRightCount;
    }
  }

  //2. 디자인 && 출원 비용 경우
  if (
    (isDesignAllExam || isDesignPartExam) &&
    processCategory === 'application' &&
    rightUnitCount
  ) {
    const isOnlineSubmit = submitFormType === 'online';
    if (isDesignAllExam)
      totalFee += isOnlineSubmit
        ? 94000 * rightUnitCount
        : 104000 * rightUnitCount;

    if (isDesignPartExam)
      totalFee += isOnlineSubmit
        ? 45000 * rightUnitCount
        : 55000 * rightUnitCount;

    if (isPriorityExamination === 'yes') totalFee += 70000 * rightUnitCount;

    totalFee = totalFee * exemptionRate;

    if (isClaimForPriorityRight === 'yes' && claimForPriorityRightCount) {
      totalFee +=
        claimForPriorityRightType === 'online'
          ? 18000 * claimForPriorityRightCount
          : 20000 * claimForPriorityRightCount;
    }
  }

  //3. 상표 && 출원 비용 경우
  if (
    isTradeMark &&
    processCategory === 'application' &&
    rightUnitCount &&
    designatedItemCount
  ) {
    const isOnlineSubmit = submitFormType === 'online';

    const multiplier = isOnlineSubmit
      ? isAllDesignatedItemsFromPublishedItems === 'yes'
        ? 56000
        : 62000
      : isAllDesignatedItemsFromPublishedItems === 'yes'
      ? 66000
      : 72000;

    totalFee += multiplier * rightUnitCount;

    const additionalFee =
      designatedItemCount > 20 ? (designatedItemCount - 20) * 2000 : 0;
    totalFee += additionalFee;

    if (isPriorityExamination === 'yes') totalFee += 160000 * rightUnitCount;

    if (isClaimForPriorityRight === 'yes' && claimForPriorityRightCount) {
      totalFee +=
        claimForPriorityRightType === 'online'
          ? 18000 * claimForPriorityRightCount
          : 20000 * claimForPriorityRightCount;
    }
  }

  //4. 등록 경우
  if (processCategory === 'register') {
    if (isTradeMark) {
    }

    if (
      (isPatent || isUtility || isDesignAllExam || isDesignPartExam) &&
      rightUnitCount &&
      registerYearTypeTopay
    ) {
      const feeArray = getFeeArrayByIPtypeAndYearToPay(ipType);

      if (feeArray) {
        const feeUnit = feeArray[registerYearTypeTopay];

        if (isPatent || isUtility)
          if (registerYearTypeTopay === '1~3') {
            totalFee += (feeUnit[0] + feeUnit[1] * rightUnitCount) * 3;
          } else {
            totalFee += feeUnit[0] + feeUnit[1] * rightUnitCount;
          }

        if (isDesignAllExam || isDesignPartExam)
          if (registerYearTypeTopay === '1~3') {
            totalFee += feeUnit[0] * rightUnitCount * 3;
          } else {
            totalFee += feeUnit[0] * rightUnitCount;
          }
      }
      totalFee = totalFee * exemptionRate;
    }
  }

  return totalFee;
};

const getFeeArrayByIPtypeAndYearToPay = (
  ipType: IPType
): Record<typeof YearTypeToPay[number], number[]> | undefined => {
  switch (ipType) {
    case 'patent':
      return {
        '1~3': [15000, 13000],
        '4~6': [40000, 22000],
        '7~9': [100000, 38000],
        '10~12': [240000, 55000],
        '13~': [360000, 55000],
      };
    case 'utility':
      return {
        '1~3': [12000, 4000],
        '4~6': [25000, 9000],
        '7~9': [60000, 14000],
        '10~12': [160000, 20000],
        '13~': [240000, 20000],
      };
    case 'design-all-exam':
      return {
        '1~3': [25000],
        '4~6': [35000],
        '7~9': [70000],
        '10~12': [140000],
        '13~': [210000],
      };
    case 'design-part-exam':
      return {
        '1~3': [25000],
        '4~6': [34000],
        '7~9': [34000],
        '10~12': [34000],
        '13~': [34000],
      };
    default:
      console.error(
        'getFeeArrayByIPtypeAndYearToPay Error: there is no matched iptype'
      );
      break;
  }
};
