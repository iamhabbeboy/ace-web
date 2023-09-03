import { Button, Container, Divider, Grid, Group, Tabs, createStyles } from "@mantine/core"
import ExamOption from "../../components/student/ExamOption";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuestionsWithFilter } from "../../store/thunks/question";
import { AppDispatch, RootState, persistor, store } from "../../store";
import { PaginatedQuestionState } from "../../store/collections/question";
import { IQuestion, ISubject } from "../../types/Type";
import { CountdownTimer } from '../../components/CountdownTimer';
import { logoutUser } from "../../store/collections/user";
import { Modal } from '@mantine/core';
import { createOrUpdateAnswer } from "../../store/thunks/answer";
import { convertTimeToTimestamp } from "../../util/common";
import spinner from "../../assets/spinner.svg"
import { Image } from "@mantine/core"

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

const SignOutModal = ({ status, setStatus }: { status: boolean, setStatus: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleSignOut = async () => {
        dispatch(logoutUser);
        persistor.purge().then(() => {
            sessionStorage.clear();
        });
        window.location.href = "/login"
    }
    return (
        <Modal centered size="sm" opened={status} onClose={function (): void {
            setStatus(false);
        }}>
            <div style={{ textAlign: "center" }}>
                <h2>Are you sure?</h2>
                <Button mb={5} size="xs" mr={3} color={"green"} onClick={handleSignOut}>Confirmed &nbsp;<IconCircleCheck /></Button>
                <Button mb={5} size="xs" ml={3} color={"red"} onClick={() => setStatus(false)}>Cancel &nbsp;<IconCircleX /></Button>
            </div>
        </Modal>
    )
}

const Exam = () => {
    const { classes } = useStyles();
    const [subject, setSubject] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [option, setOption] = useState("");
    const [status, setStatus] = useState(false);
    const [loader, setLoader] = useState(false);
    const [countdown, setCountdown] = useState(convertTimeToTimestamp({hours: 1, minutes: 30}));
    // console.log(countdown);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.account.user.data)
    const exam = useSelector((state: RootState) => state.account.question) as unknown as PaginatedQuestionState;
    let total: number = 0;

    const fetchQuestionData = useCallback(async () => {
        if (!exam.data?.data) {
            setLoader(true);
            const payload = {
                subject: subject,
                page: currentPage || 1,
            }
            payload.page = currentPage
            const resp = await store.dispatch(getQuestionsWithFilter(payload));
            if (resp.meta.requestStatus === "fulfilled") {
                setLoader(false);
            }
        }
    }, [currentPage, exam, subject]);

    const setCountdownHandler = (value: number) => {
        setCountdown(value);
    }

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    }

    // if (exam.data) {
    const payload = exam.data
    const data = payload.data
    total = payload.total
    // }
    const handleNextPage = () => {
        if (currentPage >= total) {
            setCurrentPage(total);
        } else {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePreSignOut = async () => {
        setStatus(true);
    }

    const handlePreviousPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleSubjectChange = (subj: ISubject) => {
        // if(subject === subj.slug) {
        //     return;
        // }
        setSubject(subj.slug);
        // console.log(subject)
        // console.log(subj.slug);
        console.log(subj)
    }

    const updateAnswer = useCallback(async () => {
        const answer = {
            qId: data.id,
            userId: user.id,
            examId: data.exam_id,
            opt: option,
            timestamp: countdown,
        };
        console.log(answer)
        await dispatch(createOrUpdateAnswer(answer));
    }, [countdown, data, dispatch, option, user.id]);

    useEffect(() => {
        fetchQuestionData();
        setSubject(user.subjects[0].slug)
        if (option) {
            updateAnswer();
        }
    }, [fetchQuestionData, option, updateAnswer, user.subjects])

    return (
        <Container size={"xl"}>
            <SignOutModal status={status} setStatus={setStatus} />
            <Group position="apart">
                <div>
                    <h1 style={{ color: "#666" }}>Ace Test</h1>
                    <Button mb={5} size="xs" color={"red"} onClick={handlePreSignOut}>Submit &nbsp;<IconCircleCheck /></Button>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p>Time Remaining {subject}</p>
                    <CountdownTimer timestamp={countdown} setCountdown={setCountdownHandler} />
                </div>
            </Group>
            <div className={classes.section}>
                <Tabs defaultValue={"english"}>
                    <Tabs.List>
                        {user && user.subjects.map((value: ISubject, idx: number) => {
                            return <Tabs.Tab value={value.slug} key={idx} onClick={() => handleSubjectChange(value)}>{value.title}</Tabs.Tab>
                        })}
                    </Tabs.List>
                    <Tabs.Panel value={"english"} pt="xs">
                        <Grid>
                            <Grid.Col span={8}>
                                <div style={{ overflowY: "scroll", height: "500px", color: "#666" }}>
                                    {loader
                                        ?
                                        <Group position="center" mt={40}>
                                            <Image width={"50px"} src={spinner} alt="Spinner animated image" />
                                            <p>We're preparing the question for you.</p>
                                        </Group>
                                        :
                                        <>
                                            <h3>({currentPage})</h3>
                                            <h1>{data && data.content}</h1>
                                        </>
                                    }
                                </div>
                            </Grid.Col>
                            <Grid.Col span={4} >
                                <div style={{ overflowY: "scroll", height: "500px", borderLeft: "1px solid #ccc" }}>
                                    {data && data.options.map((opt, idx) => {
                                        return (<ExamOption label={opt.label} content={opt.content} setOptionHandler={setOption} key={idx} status={opt.label === option} />)
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