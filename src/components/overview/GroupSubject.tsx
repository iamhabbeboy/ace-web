import { Accordion, ScrollArea, Table } from '@mantine/core';
import { IExam, IOptions, IQuestion } from '../../types/Type';
import { getQuestion } from '../../store/thunks/question';
import { store } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

interface GroupSubjectProps {
    exam: IExam;
}

const TableRow = ({ question, idx }: { question: IQuestion, idx: number }) => {
    return (
        <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{question.content}</td>
            {/* {JSON.stringify(question)} */}
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
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    // const router = useNavigate();
    // if(!exam.id) {
    //     return router("/home")
    // }
    const loadQuestions = async () => {
        const qtn = await store.dispatch(getQuestion(exam.id))
        setQuestions(qtn.payload as IQuestion[])
    };
    useEffect(() => {
        loadQuestions();
    }, [])
    return (
        <Accordion defaultValue="customization">
            {exam.subject_slugs.map((subject, index) => {
                return (
                    <Accordion.Item value="customization" key={index}>
                        <Accordion.Control><b style={{ textTransform: 'uppercase', fontSize: '12px' }}>{subject}
                            ({questions.map((question) => question.subject_slug === subject).length})</b>
                        </Accordion.Control>
                        <Accordion.Panel>
                            {/* {!exam?.questions && <div style={{ textAlign: 'center', padding: '10px' }}>No Questions</div>} */}
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
                                                question.subject_slug === subject && <TableRow question={question} idx={idx} />
                                                // return (
                                                //     <TableRow question={question} idx={idx}/>
                                                //     )
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