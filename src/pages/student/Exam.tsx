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
    const [subject, setSubject] = useState("english");
    const [currentPage, setCurrentPage] = useState(1)
    const [option, setOption] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const fetchQuestionData = useCallback(async () => {
        const payload = {
            subject: subject,
            page: 1,
        }
        payload.page = currentPage
        await dispatch(getQuestionsWithFilter(payload));
    }, [currentPage, dispatch, subject]);

    useEffect(() => {
        fetchQuestionData();
    }, [fetchQuestionData, option])

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    }

    const questions: QuestionState = useSelector((state: RootState) => state.account.question);
    const question = questions["data"][0] as any;
    const data = question["data"][0] as IQuestion
    const total = question["total"] as number;

    const handleNextPage = () => {
        if (currentPage >= total) {
            setCurrentPage(total);
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage - 1)
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
                                    {data && data.options.map((opt, idx) => {
                                        return (<ExamOption label={opt.label} content={opt.content} setOptionHandler={setOption} key={idx} status={opt.label === option } />)
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
                                        items.push(<Button mt={5} ml={5} key={i} color={i === currentPage ? "orange" : "indigo"} onClick={() => handlePagination(i)}>{i}</Button>);
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