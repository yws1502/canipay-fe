export const EXCEPTION_MESSAGE = {
  environmentNotSet: (envName: string) => `"${envName}" 환경변수를 설정해주세요.`,
  variableNotSet: (variableName: string) => `"${variableName}" 변수가 설정되지 않았습니다.`,
  documentIdNotSet: (domID: string) => `"${domID}" document id가 설정되어 있지 않습니다.`,
};
