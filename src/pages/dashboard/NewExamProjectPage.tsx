import { Button, Text, Container, createStyles, Input, rem, Group, Textarea, Select, UnstyledButton, MultiSelect } from '@mantine/core';
import MenuNavBar from "../../components/MenuNavBar"
import Footer from "../../components/Footer"
import { IconCheck, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import ModalView from '../../components/Modal';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../../store/thunks/exam';
import { RootState, store } from '../../store';
import { useState } from 'react';
import { hyphinize } from '../../util/string';
import { showNotification } from "@mantine/notifications";
import { useSelector } from 'react-redux';
import { addSubject } from '../../store/collections/user';

const useStyles = createStyles((theme) => ({
    section: {
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        backgroundColor: `#fff`,
        border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
    noexam: {
        paddingTop: `30px`,
        paddingBottom: `30px`,
        marginLeft: "auto",
        display: "grid",
        placeItems: "center",
    }
}));

const NewProjectPage = () => {
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [studentCount, setStudentCount] = useState<string>("0-50");
    const [subjects, setSubjects] = useState<string[]>([]);
    const [newSubject, setNewSubject] = useState<string>("");
    
    const user = useSelector((state: RootState) => state.account.user)
    const subjectState = user.data.subject_slugs || [];
    const subjectData = subjectState.map((subject: any) => {
        return { value: hyphinize(subject), label: subject }
    })

    const navigate = useNavigate();
    const handleSubmitAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await store.dispatch(createExam({
            name: name,
            description: description,
            student_count: studentCount,
            subject_slugs: subjects,
        }));

        if (createExam.fulfilled.match(response)) {
            navigate(`/exams/${response.payload.id}`);
            return;
        }
        if (createExam.rejected.match(response)) {
            showNotification({
                title: 'Error Occured',
                message: response.payload as string,
                color: 'red',
                icon: <IconX />
            });
            return;
        }
    }

    const handleSubjectSelection = (value: string[]) => {
        const subjects: string[] = value.map((item) => {
            return hyphinize(item)
        })
        setSubjects(subjects);
    }

    const handleCancel = () => {
        return navigate("/home")
    }

    const handleNewSubject = () => {
        store.dispatch(addSubject({
            id: user.data.id,
            subject_slugs: [hyphinize(newSubject)],
        }));
        showNotification({
            title: 'Successful',
            message: 'New subject added',
            color: 'green',
            icon: <IconCheck />
        });
        close();
    }

    return (
        <>
            <MenuNavBar />
            <Container size={"sm"}>
                <div>
                    <form onSubmit={handleSubmitAction}>
                        <div className={classes.section}>
                            <h1>Setup Exam Project </h1>
                            <Text size={"sm"} >Project name</Text>
                            <Input
                                required={true}
                                placeholder="Enter project Name here" radius="md" mb={"md"} size={"md"}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                            <Text size={"sm"} >Project description</Text>
                            <Textarea
                                placeholder="Enter project description here"
                                label=""
                                autosize
                                radius={"md"}
                                minRows={2}
                                mb={"md"}
                                required={true}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
                            />
                            <Text size={"sm"} >Estimated No. of Student ?</Text>
                            <Select
                                placeholder="Select range of total student"
                                mb={"md"}
                                size={"md"}
                                data={[
                                    { value: '0-50', label: '0-50' },
                                    { value: '50-100', label: '50-100' },
                                    { value: '100-200', label: '100-200' },
                                    { value: '200-500', label: '200-500' },
                                    { value: '500-1k', label: '500-1k' },
                                    { value: '1k+', label: '1k+' },
                                ]}
                                value={studentCount}
                                onChange={(value: any) => setStudentCount(value)}
                            />
                            <Group position={"apart"}>
                                <Text size={"sm"}>Select Subject </Text>
                                <UnstyledButton style={{ "fontSize": "13px", "color": "#666", "textDecoration": "underline" }} onClick={open}>[Add subject]</UnstyledButton>
                            </Group>
                            <MultiSelect
                                placeholder="Subject name"
                                searchable
                                mb={"md"}
                                size={"md"}
                                nothingFound="No subject found"
                                data={subjectData}
                                onChange={(value: string[]) => handleSubjectSelection(value)}
                            />

                        </div>
                        <Group position="right">
                            <Button mt={"md"} size={"md"} variant="outline" onClick={handleCancel}><IconChevronLeft />Cancel </Button>
                            <Button mt={"md"} size={"md"} type="submit">Create Project <IconChevronRight /></Button>
                        </Group>
                    </form>
                </div>
                <ModalView opened={opened} close={close} title="Add Subject">
                    <Input placeholder="Enter subject Name here" radius="md" mb={"md"} size={"md"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSubject(e.target.value)} />
                    {/* <Group position="right"> */}
                    <Button onClick={handleNewSubject}>Continue <IconChevronRight /></Button>
                    {/* </Group> */}
                </ModalView>
                {/* <Notify title="Subject Added" body="New subject has been added" /> */}
            </Container>
            <Footer />
        </>
    )
}

export default NewProjectPage