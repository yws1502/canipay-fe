export const PAGE_PATH = {
  root: '/',
  storeList: '/store-list',
  storeDetail: (storeId: string) => `/store-list/${storeId}`,
  reviewForm: (storeId: string) => `/store-list/${storeId}/review`,
  explorer: '/explorer',
  setting: '/setting',
  licenses: '/setting/licenses',
};

export const PAGE_TITLE_MAPPER: Record<string, string> = {
  '/setting': '설정',
  '/setting/licenses': '오픈소스 라이선스 이용고지',
};

export const QUERY_STRING = {
  search: 'search',
};
