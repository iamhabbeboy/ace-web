import { Container, createStyles, rem, Grid, Navbar, getStylesRef, Badge } from '@mantine/core';
import MenuNavBar from "../../components/MenuNavBar"
import Footer from "../../components/Footer"
import AddQuestion from '../../components/AddQuestionTab';
import { useState } from 'react';
import SubjectTab from '../../components/SubjectTab';

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
    },
    link: {
        ...theme.fn.focusStyles(),
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },
}));

const NewQuestionPage = () => {
    const { classes } = useStyles();
    const [view, setView] = useState({component: "AddQuestion", props: {subject: ""}})
    const components = {
        "AddQuestion": AddQuestion,
        "Subject": SubjectTab
    }

    const handleView = (e: any, component: string, subject: string) => {
        e.preventDefault();
        setView({ component: component, props: {subject: subject}})
    }

    const renderTabView = () => {
        const Component = components[view.component as keyof typeof components]
        return <Component subject={view.props.subject}/>
    }

    return (
        <>
            <MenuNavBar />
            <Container size={"xl"} >
                <Grid>
                    <Grid.Col span={3}>
                        <Navbar height={700} width={{ sm: 300 }} p="md">
                            <Navbar.Section grow>
                                <h5>Subjects</h5>
                                <span className={classes.link} onClick={(event) => handleView(event, "AddQuestion", "")}>
                                    <span>Add Question</span> {" "}
                                </span>
                                <span className={classes.link} onClick={(event) =>  handleView(event, "Subject", "English")}>
                                    <span>English</span> {" "}
                                    <Badge>1</Badge>
                                </span>
                                <span className={classes.link} onClick={(event) => handleView(event, "Subject", "Mathematics")}>
                                    <span>Mathematics</span> {" "}
                                    <Badge>15</Badge>
                                </span>
                            </Navbar.Section>
                        </Navbar>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <div className={classes.section}>
                           {renderTabView()}
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default NewQuestionPage