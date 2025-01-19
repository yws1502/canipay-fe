import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import useRegisterStore from '@/hooks/react-query/useRegisterStore';
import { useDelayLoading } from '@/hooks/useDelayLoading';
import { PaymentStatus, RequestRegisterStore, StoreInfo } from '@/types/store';
import Spinner from '../common/Spinner';
import Button from '../common/buttons/Button';

interface RegisterStoreProps {
  storeInfo: StoreInfo;
  updateStoreInfo: (storeInfo: StoreInfo) => void;
}

function RegisterStore({ storeInfo, updateStoreInfo }: RegisterStoreProps) {
  const queryClient = useQueryClient();

  const { mutate: registerMutate, isPending: isPendingRegister } = useRegisterStore();

  const isPending = useDelayLoading(1000, isPendingRegister);

  const handleRegisterStore = (paymentStatus: PaymentStatus) => {
    const storeForm: RequestRegisterStore = {
      ...storeInfo, // id, name, category, address, lon, lat
      paymentStatus,
    };

    registerMutate(storeForm, {
      onSuccess: (updatedStoreInfo) => {
        updateStoreInfo(updatedStoreInfo);

        // refetch search result, assign store and map marker
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteStoresProxy] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteStores] });
      },
      onError: console.error,
    });
  };

  return (
    <article>
      <span className='text-body-2 text-gray-950'>등록하기</span>
      <div className='mt-4 flex justify-center gap-3'>
        <Button disabled={isPendingRegister} onClick={() => handleRegisterStore('available')}>
          {isPending ? (
            <div className='w-[54px]'>
              <Spinner size='sm' color='white' />
            </div>
          ) : (
            '결제 가능'
          )}
        </Button>
        <Button
          color='red'
          disabled={isPendingRegister}
          onClick={() => handleRegisterStore('unavailable')}
        >
          {isPending ? (
            <div className='w-[67px]'>
              <Spinner size='sm' color='white' />
            </div>
          ) : (
            '결제 불가능'
          )}
        </Button>
      </div>
    </article>
  );
}

export default RegisterStore;
