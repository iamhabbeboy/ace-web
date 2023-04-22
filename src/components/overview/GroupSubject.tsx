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
                    <Accordion.Item value="customization" key={index}>
                        <Accordion.Control><b style={{ textTransform: 'uppercase', fontSize: '12px' }}>{subject} ({exam?.questions?.length || 0})</b></Accordion.Control>
                        <Accordion.Panel>
                            {!exam?.questions && <div style={{ textAlign: 'center', padding: '10px' }}>No Questions</div>}
                            {exam?.questions?.length &&
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
                                            {exam.questions.map((question: IQuestion, idx) => {
                                                // if(question.subject !== subject) return null;
                                                return (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
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
                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}
export default GroupSubject