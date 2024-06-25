import { $api } from "@/lib/api/instance";
import { useQuery } from "@tanstack/react-query";

export interface Question {
  id: string;
  question: string;
  fieldType: "ALL" | "RESPECT" | "COMMUNICATION" | "TRUST" | "EMPATHY" | "TIME";
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
          size: 100,
        },
      }),
    queryKey: ["questions"],
    select: (data) => data.data,
  });

  return { data, isLoading };
};
