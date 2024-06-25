import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question, useGetQuestions } from "@/hooks/useGetQuestions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddQuestionDialog, { QuestionType } from "./AddQuestionDialog";
import EditQuestionDialog from "./EditQuestionDialog";

interface FieldTypeValue {
  fieldType: "ALL" | "RESPECT" | "COMMUNICATION" | "TRUST" | "EMPATHY" | "TIME";
  value: string;
}
const FIELD_TYPES_VALUES: FieldTypeValue[] = [
  {
    fieldType: "ALL",
    value: "Общий",
  },
  {
    fieldType: "COMMUNICATION",
    value: "Коммуникация",
  },
  {
    fieldType: "EMPATHY",
    value: "Эмпатия",
  },
  {
    fieldType: "RESPECT",
    value: "Уважение",
  },
  {
    fieldType: "TIME",
    value: "Времяпрепровождение",
  },
  {
    fieldType: "TRUST",
    value: "Доверие",
  },
];

const RootPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null);
  const [questionSearchTerm, setQuestionSearchTerm] = useState("");
  const [questionSearchType, setQuestionSearchType] =
    useState<QuestionType | null>(null);
  const { data, isLoading } = useGetQuestions();
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isOpen && (
        <AddQuestionDialog
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
      {editedQuestion && (
        <EditQuestionDialog
          open={editedQuestion !== null}
          onOpenChange={() => setEditedQuestion(null)}
          question={editedQuestion}
        />
      )}
      <div className="w-7/12 h-full flex flex-col">
        <Card className="w-full">
          <CardContent className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="question">Вопрос</Label>
              <Input
                type="text"
                id="question"
                value={questionSearchTerm}
                onChange={(e) => setQuestionSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="question_type">Тип вопроса</Label>
              <Select
                onValueChange={(v: QuestionType) => setQuestionSearchType(v)}
              >
                <SelectTrigger>
                  <SelectValue id="question_type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FIELD_TYPES_VALUES.map((item, index) => (
                      <SelectItem key={index} value={item.fieldType}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-800 w-fit self-end"
              onClick={() => setIsOpen(true)}
            >
              Создать вопрос
            </Button>
          </CardContent>
        </Card>

        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>Вопрос</TableHead>
              <TableHead className="text-right">Тип вопроса</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" h-1/2 overflow-auto">
            {data?.content
              .filter((question) =>
                question.question
                  .toLowerCase()
                  .includes(questionSearchTerm.toLowerCase())
              )
              .filter(
                (q) =>
                  (questionSearchType !== null &&
                    questionSearchType === q.fieldType) ||
                  questionSearchType === null
              )
              .map((question) => (
                <TableRow
                  key={question.id}
                  onClick={() => setEditedQuestion(question)}
                >
                  <TableCell>
                    {question.question.split(" ").map((letter, index) => (
                      <span
                        key={index}
                        className={cn(
                          questionSearchTerm
                            .toLowerCase()
                            .split(" ")
                            .includes(letter.toLowerCase()) &&
                            "font-bold text-red-400"
                        )}
                      >
                        {letter + " "}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="ml-auto text-end">
                    {
                      FIELD_TYPES_VALUES.find(
                        (v) => v.fieldType === question.fieldType
                      )?.value
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RootPage;
