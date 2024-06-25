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
  const { mutate, isPending } = usePutQuestion(() => props.onOpenChange());
  const [question, setQuestion] = useState(openedQuestion.question);
  const [questionType, setQuestionType] = useState<QuestionType>(
    openedQuestion.fieldType
  );
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
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
          <Button type="submit" className="w-full bg-green-500 mt-6">
            {isPending ? "Создание..." : "Создать"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
