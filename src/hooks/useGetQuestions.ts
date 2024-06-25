import { $api } from "@/lib/api/instance";
import { QuestionType } from "@/pages/rootPage/AddQuestionDialog";
import { useQuery } from "@tanstack/react-query";

export interface Question {
  id: string;
  question: string;
  fieldType: QuestionType;
}

export interface GetQuestionResponse {
  page: number;
  size: number;
  totalPages: number;
  content: Question[];
}

export const useGetQuestions = () => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      $api.get<GetQuestionResponse>("question", {
        params: {
          size: 10000,
        },
      }),
    queryKey: ["questions"],
    select: (data) => data.data,
  });

  return { data, isLoading };
};
