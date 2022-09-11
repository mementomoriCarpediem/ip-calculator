import { States } from '../pages';

export const getTotalFee = (inputStates: States): number => {
  let totalFee = 0;

  const {
    ipType,
    processCategory,
    submitFormType,
    language,
    pageCount,
    isRequestForExamination,
    claimCount,
    isPriorityExamination,
    isClaimForPriorityRight,
    claimForPriorityRightType,
    claimForPriorityRightCount,
  } = inputStates;

  const isPatent = ipType === 'patent';
  const isUtility = ipType === 'utility';

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
        if (claimCount && claimCount > 0) totalFee += 44000 * claimCount;
      }
      if (isPriorityExamination === 'yes') totalFee += 200000;
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
        if (claimCount && claimCount > 0) totalFee += 19000 * claimCount;
      }
      if (isPriorityExamination === 'yes') totalFee += 100000;
    }

    if (isClaimForPriorityRight === 'yes' && claimForPriorityRightCount) {
      totalFee +=
        claimForPriorityRightType === 'online'
          ? 2 * 18000 * claimForPriorityRightCount
          : 2 * 20000 * claimForPriorityRightCount;
    }
  }

  return totalFee;
};
