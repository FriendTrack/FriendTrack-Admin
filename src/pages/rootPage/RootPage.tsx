import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { useState } from "react";
import AddQuestionDialog from "./AddQuestionDialog";

interface FIELD_TYPES_VALUES {
  fieldType: "ALL" | "RESPECT" | "COMMUNICATION" | "TRUST" | "EMPATHY" | "TIME";
  value: string;
}
const FIELD_TYPES_VALUES: FIELD_TYPES_VALUES[] = [
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
  const { data, isLoading } = useGetQuestions();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isOpen && (
        <AddQuestionDialog
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
      <div className="w-7/12 h-full flex flex-col">
        <Button
          className="bg-green-600 hover:bg-green-800 w-fit self-end"
          onClick={() => setIsOpen(true)}
        >
          Создать вопрос
        </Button>
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>Вопрос</TableHead>
              <TableHead className="text-right">Тип вопроса</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" h-1/2 overflow-auto">
            {data?.content.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-semibold">
                  {question.question}
                </TableCell>
                <TableCell>
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
