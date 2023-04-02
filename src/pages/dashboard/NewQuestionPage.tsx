import { Button, Text, Container, createStyles, Input, rem, Group, Select } from '@mantine/core';
import MenuNavBar from "../../components/MenuNavBar"
import Footer from "../../components/Footer"
import { IconChevronLeft, IconChevronRight, IconCirclePlus } from '@tabler/icons-react';
import ModalView from '../../components/Modal';
import { useDisclosure } from '@mantine/hooks';
import QuestionRichTextEditor from '../../components/QuestionRichTextEditor';
import Option from '../../components/Option';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    section: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
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

const NewQuestionPage = () => {
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const [options, setOptions] = useState(1);

    const handleCreateOption = () => {
        setOptions(options + 1);
    }

    return (
        <>
            <MenuNavBar />
            <Container size={"sm"}>
                {/* <UnstyledButton><IconArrowLeft /> <span>Back</UnstyledButton> */}
                <div className={classes.section}>
                    <h1>Add Questions </h1>

                    <Text size={"sm"} mt={15} weight="bold">Subject</Text>
                    <Select
                        data={[{
                            label: "English",
                            value: "English"
                        }, {
                            label: "Mathematics",
                            value: "Mathematics"
                        }]}
                    />
                    <Text size={"sm"} mt={15} weight="bold">Question</Text>
                    <QuestionRichTextEditor content="" />
                    <Text size={"sm"} mt={15} weight="bold">Options </Text>
                    <Group position="apart" mt={0}>
                        <Select
                            label="Select Correct Answer"
                            data={[{
                                label: "A",
                                value: "A"
                            }]}
                        />
                        <Button size={"xs"} onClick={handleCreateOption}>Add New <IconCirclePlus /></Button>
                    </Group>
                    {Array.from(Array(options), (option, index) => {
                        return <Option label={index + "_A"} />
                    })}

                </div>
                <Group position="right">
                    <Button mt={"md"} size={"md"} variant="outline"><IconChevronLeft />Cancel </Button>
                    <Button mt={"md"} size={"md"}>Submit <IconChevronRight /></Button>
                </Group>
                <ModalView opened={opened} close={close} title="Add Subject">
                    <Input placeholder="Enter subject Name here" radius="md" mb={"md"} size={"md"} />
                    {/* <Group position="right"> */}
                    <Button>Continue <IconChevronRight /></Button>
                    {/* </Group> */}
                </ModalView>
            </Container>
            <Footer />
        </>
    )
}

export default NewQuestionPage