import { $api } from "@/lib/api/instance";
import { QuestionType } from "@/pages/rootPage/AddQuestionDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PutQuestionBody {
  id: string;
  question: string;
  fieldType: QuestionType;
}

export const usePutQuestion = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PutQuestionBody) =>
      $api.put(`question/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      onSuccessCallback();
    },
  });
  return { mutate, isPending };
};
