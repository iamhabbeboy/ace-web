import { Button, Text, Container, createStyles, Input, rem, Group, Textarea, Slider, Divider, Select, UnstyledButton } from '@mantine/core';
import MenuNavBar from "../../components/MenuNavBar"
import Footer from "../../components/Footer"
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import ModalView from '../../components/Modal';
import { useDisclosure } from '@mantine/hooks';

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

    return (
        <>
            <MenuNavBar />
            <Container size={"sm"}>
                <div className={classes.section}>
                    <Text size={"sm"} >Project name</Text>
                    <Input placeholder="Enter project Name here" radius="md" mb={"md"} size={"md"} />
                    <Text size={"sm"} >Project description</Text>
                    <Textarea
                        placeholder="Enter project description here"
                        label=""
                        autosize
                        radius={"md"}
                        minRows={2}
                        mb={"md"}
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
                    />
                    <Group position={"apart"}>
                        <Text  size={"sm"}>Select Subject </Text>
                        <UnstyledButton style={{"fontSize": "13px", "color": "#666", "textDecoration": "underline"}} onClick={open}>[Add subject]</UnstyledButton>
                    </Group>
                    <Select
                        placeholder="Subject name"
                        searchable
                        mb={"md"}
                        size={"md"}
                        nothingFound="No subject found"
                        data={['React', 'Angular', 'Svelte', 'Vue']}
                    />

                </div>
                <Group position="right">
                    <Button mt={"md"} size={"md"} variant="outline"><IconChevronLeft />Cancel </Button>
                    <Button mt={"md"} size={"md"}>Create Project <IconChevronRight /></Button>
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

export default NewProjectPage