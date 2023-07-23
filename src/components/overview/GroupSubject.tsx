import { Accordion, ScrollArea, Table } from '@mantine/core';
import { IExam, IOptions, IQuestion } from '../../types/Type';
import { getQuestion } from '../../store/thunks/question';
import { store } from '../../store';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

interface GroupSubjectProps {
    exam: IExam;
}

const TableRow = ({ question, idx }: { question: IQuestion, idx: number }) => {
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
}

const GroupSubject = ({ exam }: GroupSubjectProps) => {
    const axios = useAxios();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    // const router = useNavigate();
    // if(!exam.id) {
    //     return router("/home")
    // }
 
    useEffect(() => {
        const loadQuestions = async () => {
            const qtn = await store.dispatch(getQuestion({axios, id: exam.id}));
            const result = qtn.payload as IQuestion[];
            setQuestions(result);
        };
        loadQuestions();
    }, [axios, exam])
    return (
        <Accordion defaultValue="q-0">
            {exam.subject_slugs.map((subject, index) => {
                return (
                    <Accordion.Item value={`q-${index}`} key={index}>
                        <Accordion.Control><b style={{ textTransform: 'uppercase', fontSize: '12px' }}>{subject}
                            &nbsp;({questions.length && questions?.filter((question) => question.subject_slug === subject).length})
                        </b>
                        </Accordion.Control>
                        <Accordion.Panel>
                            {questions?.length > 0 ?
                                <ScrollArea>
                                    <Table verticalSpacing="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style={{ width: "40%" }}>Question</th>
                                                <th>Options</th>
                                                <th>Answer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questions.map((question: IQuestion, idx) =>
                                                question.subject_slug === subject && <TableRow question={question} idx={idx} key={idx} />
                                            )}
                                        </tbody>
                                    </Table>
                                </ScrollArea>
                                : null}
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}
export default GroupSubject