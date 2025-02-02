export const EXCEPTION_MESSAGE = {
  environmentNotSet: (envName: string) => `"${envName}" 환경변수를 설정해주세요.`,
  variableNotSet: (variableName: string) => `"${variableName}" 변수가 설정되지 않았습니다.`,
  documentIdNotSet: (domID: string) => `"${domID}" document id가 설정되어 있지 않습니다.`,
  localStorageKeyNotSet: 'local storage key 값이 설정되어 있지 않습니다.',
  setLocalStorage: 'local storage에 데이터 저장 중 오류가 발생했습니다.',
  hookException: (hook: string, provider: string) =>
    `${hook} hook은 ${provider} 안에서만 사용할 수 있습니다.`,
};
