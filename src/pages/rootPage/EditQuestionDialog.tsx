import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteQuestions } from "@/hooks/useDeleteQuestions";
import { Question } from "@/hooks/useGetQuestions";
import { usePutQuestion } from "@/hooks/usePutQuestion";
import { useState } from "react";
import { QuestionType } from "./AddQuestionDialog";

interface EditQuestionDialogProps {
  open: boolean;
  onOpenChange: () => void;
  question: Question;
}
const QUESTION_VALUES = [
  "Уважение",
  "Коммуникация",
  "Доверие",
  "Эмпатия",
  "Времяпрепровождение",
];
const QUESTION_TYPES = [
  "RESPECT",
  "COMMUNICATION",
  "TRUST",
  "EMPATHY",
  "TIME",
] as const;

const EditQuestionDialog = ({
  question: openedQuestion,
  ...props
}: EditQuestionDialogProps) => {
  const { mutate: putQ, isPending: isPendingQ } = usePutQuestion(() =>
    props.onOpenChange()
  );
  const { mutate: deleteQ, isPending: isDeletingQ } = useDeleteQuestions(() =>
    props.onOpenChange()
  );
  const [question, setQuestion] = useState(openedQuestion.question);
  const [questionType, setQuestionType] = useState<QuestionType>(
    openedQuestion.fieldType
  );
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    putQ({
      id: openedQuestion.id,
      question: question,
      fieldType: questionType,
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование вопроса</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => onSubmit(e)}>
          <Label htmlFor="question" className="block p-1">
            Вопрос
          </Label>
          <Input
            placeholder="Введите вопрос"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Label htmlFor="question_type" className="block mt-3 p-1">
            Тип вопроса
          </Label>
          <Select
            onValueChange={(v: QuestionType) => setQuestionType(v)}
            defaultValue={openedQuestion.fieldType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип вопроса" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {QUESTION_TYPES.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {QUESTION_VALUES[index]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full bg-green-500 mt-6 hover:bg-green-800"
          >
            {isPendingQ ? "Создание..." : "Создать"}
          </Button>
          <Button
            type="button"
            className="w-full bg-red-500 mt-2 hover:bg-red-800"
            onClick={() => {
              deleteQ(openedQuestion.id);
            }}
          >
            {isDeletingQ ? "Удаление..." : "Удалить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
