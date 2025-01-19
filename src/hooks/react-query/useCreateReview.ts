import { useMutation } from '@tanstack/react-query';
import { createReview } from '@/apis/review';
import { RequestCreateReview } from '@/types/review';

const useCreateReview = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RequestCreateReview }) =>
      createReview(id, payload),
  });

  return mutation;
};

export default useCreateReview;
