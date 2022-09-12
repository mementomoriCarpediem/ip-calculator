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
    rightUnitCount,
    trademark,
    isPriorityExamination,
    isClaimForPriorityRight,
    claimForPriorityRightType,
    claimForPriorityRightCount,
  } = inputStates;
  const { designatedItemCount, isAllDesignatedItemsFromPublishedItems } =
    trademark;

  const isPatent = ipType === 'patent';
  const isUtility = ipType === 'utility';
  const isDesignPartExam = ipType === 'design-part-exam';
  const isDesignAllExam = ipType === 'design-all-exam';
  const isTradeMark = ipType === 'trademark';

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

  return totalFee;
};
