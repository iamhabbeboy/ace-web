import { Button, Text, Container, createStyles, Input, rem, Group, Textarea, UnstyledButton } from '@mantine/core';
import MenuNavBar from "../../components/MenuNavBar"
import Footer from "../../components/Footer"
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../../store/thunks/exam';
import { store } from '../../store';
import { useState } from 'react';
import { hyphinize } from '../../util/string';
import { showNotification } from "@mantine/notifications";
import { Subjects } from '../../types/Type';

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
    // const [opened, { open, close }] = useDisclosure(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [courseList, setCourseList] = useState<Subjects[]>([]);

    // const user = useSelector((state: RootState) => state.account.user)

    const navigate = useNavigate();
    const handleSubmitAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const courses = courseList.map((course) => {title: course.title, slug: hyphinize(course.slug), duration: course.duration});
        // const response = await store.dispatch(createExam({
        //     name: name,
        //     description: description,
        //     subject_slugs: courses,
        // }));

        // if (createExam.fulfilled.match(response)) {
        //     navigate(`/projects/${response.payload.id}`);
        //     return;
        // }
        // if (createExam.rejected.match(response)) {
        //     showNotification({
        //         title: 'Error Occured',
        //         message: response.payload as string,
        //         color: 'red',
        //         icon: <IconX />
        //     });
        //     return;
        // }
    }

    const handleCancel = () => {
        return navigate("/home")
    }

    const handleCourseInput = (index: number, course: string) => {
        const updatedCourseList = [...courseList];
        // updatedCourseList[index] = course;
        setCourseList(updatedCourseList)
    }

    const handleAddCourse = () => {
        // if (courseList.includes("")) {
        //     showNotification({
        //         title: 'Validation',
        //         message: 'Course title is missing',
        //         color: 'red',
        //         icon: <IconX />
        //     });
        //     return;
        // };
        // setCourseList([...courseList, '']);
    }

    // const handleNewSubject = () => {
    //     store.dispatch(addSubject({
    //         id: user.data.id,
    //         subject_slugs: [hyphinize(newSubject)],
    //     }));
    //     showNotification({
    //         title: 'Successful',
    //         message: 'New subject added',
    //         color: 'green',
    //         icon: <IconCheck />
    //     });
    //     close();
    // }

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
                            {courseList.map((c, idx) => {
                                return (
                                    <div key={idx}>
                                        <Group position={"apart"} >
                                            <Text size={"sm"} >Add course({idx + 1})</Text>
                                            {idx === 0 && <UnstyledButton style={{ "fontSize": "13px", "color": "#666", "textDecoration": "underline" }} onClick={handleAddCourse}>[+ Add course]</UnstyledButton>}
                                        </Group>
                                        <Input
                                            required={true}
                                            placeholder="Enter course title here" radius="md" mb={"md"} size={"md"}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCourseInput(idx, event.target.value)} />
                                    </div>
                                )
                            })}
                            {/* <Select
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
                            /> */}
                            {/* <Group position={"apart"}>
                                <Text size={"sm"}>Select Subject </Text>
                                <UnstyledButton style={{ "fontSize": "13px", "color": "#666", "textDecoration": "underline" }} onClick={open}>[Add subject]</UnstyledButton>
                            </Group> */}
                            {/* <MultiSelect
                                placeholder="Subject name"
                                searchable
                                mb={"md"}
                                size={"md"}
                                nothingFound="No subject found"
                                data={subjectData}
                                onChange={(value: string[]) => handleSubjectSelection(value)}
                            /> */}

                        </div>
                        <Group position="right">
                            <Button mt={"md"} size={"md"} variant="outline" onClick={handleCancel}><IconChevronLeft />Cancel </Button>
                            <Button mt={"md"} size={"md"} type="submit">Create Project <IconChevronRight /></Button>
                        </Group>
                    </form>
                </div>
                {/* <ModalView opened={opened} close={close} title="Add Subject">
                    <Input placeholder="Enter subject Name here" radius="md" mb={"md"} size={"md"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSubject(e.target.value)} />
                    <Button onClick={handleNewSubject}>Continue <IconChevronRight /></Button>
                </ModalView> */}
            </Container>
            <Footer />
        </>
    )
}

export default NewProjectPage