import { $api } from "@/lib/api/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuestions = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => $api.delete(`question/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      onSuccessCallback();
    },
  });
  return { mutate, isPending };
};
