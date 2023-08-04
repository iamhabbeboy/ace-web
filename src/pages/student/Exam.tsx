import { Button, Container, Divider, Grid, Group, Tabs, createStyles } from "@mantine/core"
import ExamOption from "../../components/student/ExamOption";
import { IconCircleCheck } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getQuestionsWithFilter } from "../../store/thunks/question";
import { AppDispatch, RootState } from "../../store";
import { QuestionState } from "../../store/collections/question";
import { IQuestion } from "../../types/Type";

const useStyles = createStyles((theme) => ({
    section: {
        background: '#FFF',
        padding: theme.spacing.xl,
        paddingBottom: '50px',
        borderRadius: theme.radius.md,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        'input': {
            color: '#666'
        }
    }
}));

const Exam = () => {
    const { classes } = useStyles();
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [subject, setSubject] = useState("english");
    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch<AppDispatch>();
    const questions: QuestionState = useSelector((state: RootState) => state.account.question);
    // const filter = questions.data.filter((data) => data);
    const question = questions.data[0] as any;
    const data = question["data"][0] as IQuestion
    const total = question["total"];
    console.log(data);
    const fetchQuestionData = useCallback(async () => {
        const payload = {
            subject: subject,
            next_cursor: "",
            prev_cursor: "",
        }
        if (next) {
            payload.next_cursor = next
        }
        if (prev) {
            payload.prev_cursor = prev
        }
        await dispatch(getQuestionsWithFilter(payload));
    }, [dispatch, next, prev, subject]);

    useEffect(() => {
        fetchQuestionData();
    }, [fetchQuestionData])

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    }

    const handleNextPage = () => {
        if (currentPage >= total) {
            setCurrentPage(total);
        } else {
            setCurrentPage(currentPage + 1)
            setNext("234234");
        }
    }

    const handlePreviousPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage - 1)
            setPrev("234234");
        }
    }
    return (
        <Container size={"xl"}>
            <Group position="apart">
                <div>
                    <h1 style={{ color: "#666" }}>Ace Test</h1>
                    <Button mb={5} size="xs" color={"red"}>Submit &nbsp;<IconCircleCheck /></Button>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p>Time Remaining</p>
                    <h2>1:00:00</h2>
                </div>
            </Group>
            <div className={classes.section}>
                <Tabs defaultValue="gallery">
                    <Tabs.List>
                        <Tabs.Tab value="gallery">English</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery" pt="xs">
                        <Grid>
                            <Grid.Col span={8}>
                                <div style={{ overflowY: "scroll", height: "500px", color: "#666" }}>
                                    <h3>({currentPage})</h3>
                                    <h1>{data.content}</h1>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={4} >
                                <div style={{ overflowY: "scroll", height: "500px", borderLeft: "1px solid #ccc" }}>
                                    {data && data.options.map((option, idx) => {
                                        return (<ExamOption label={option.label} content={option.content} key={idx} />)
                                    })}
                                </div>
                            </Grid.Col>
                        </Grid>
                        <Divider mt={5} mb={5} />
                        <Group position="apart" mt={10}>
                            <div>
                                <Button mt={5} variant="outline" onClick={handlePreviousPage}>Previous</Button>
                                <Button mt={5} ml={5} color="indigo" onClick={handleNextPage}>Next </Button>
                            </div>
                            <div>
                                {data && (() => {
                                    const items = [];
                                    for (let i = 1; i <= total; i++) {
                                        items.push(<Button mt={5} ml={5} color="indigo" onClick={() => handlePagination(i)}>{i}</Button>);
                                    }
                                    return items;
                                })()}
                            </div>
                        </Group>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </Container>
    )
}
export default Exam