import { useMutation } from '@tanstack/react-query';
import { reportReview } from '@/apis/review';

const useReportReview = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => reportReview(id),
  });

  return mutation;
};

export default useReportReview;
