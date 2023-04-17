import { Accordion, ScrollArea, Table } from '@mantine/core';
import { IExam, IOptions, IQuestion } from "../../types/Type"

interface GroupSubjectProps {
    exam: IExam;
}

const GroupSubject = ({ exam }: GroupSubjectProps) => {
    return (
        <Accordion defaultValue="customization">
            {exam.subject_slugs.map((subject, index) => {
                return (
                    <Accordion.Item value="customization">
                        <Accordion.Control><b style={{textTransform: 'uppercase', fontSize: '12px'}}>{subject}</b></Accordion.Control>
                        <Accordion.Panel>
                            <ScrollArea>
                                <Table verticalSpacing="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Question</th>
                                            <th>Options</th>
                                            <th>Answer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exam.questions.map((question: IQuestion, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{question.content}</td>
                                                    <td>{question.options.map((option: IOptions, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <b>{option.label}.</b> {option.content}
                                                            </div>
                                                        )
                                                    })}</td>
                                                    <td>{question.answer}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}
export default GroupSubject