export const PAGE_PATH = {
  root: '/',
  storeList: '/store-list',
  storeDetail: (storeId: string) => `/store-list/${storeId}`,
  reviewForm: (storeId: string) => `/store-list/${storeId}/review`,
  explorer: '/explorer',
  setting: '/setting',
  licenses: '/setting/licenses',
};

export const QUERY_STRING = {
  search: 'search',
};
