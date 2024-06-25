import { $api } from "@/lib/api/instance";
import { QuestionType } from "@/pages/rootPage/AddQuestionDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostQuestionBody {
  question: string;
  fieldType: QuestionType;
}

export const usePostQuestion = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: PostQuestionBody) => $api.post("question", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      onSuccessCallback();
    },
  });
  return { mutate, isPending, isError };
};
