import { useState } from 'react';
import { createStyles, Navbar, getStylesRef, rem, Container, Grid } from '@mantine/core';
import {
    IconSettings,
    IconSwitchHorizontal,
    IconUsersGroup,
    IconEdit,
    IconDatabaseExport,
    IconReportAnalytics,
} from '@tabler/icons-react';
import MenuNavBar from '../../components/MenuNavBar';
import Footer from '../../components/Footer';
import StudentView from '../../components/overview/Student';
import Overview from '../../components/overview/Overview';
import QuestionView from '../../components/overview/Question';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { selectExam } from '../../store/selectors';
import { IExam } from '../../types/Type';

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
    },
    section: {
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        backgroundColor: `#fff`,
        border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
    },

    link: {
        ...theme.fn.focusStyles(),
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

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}));

const data = [
    { link: '', label: 'Overview', icon: IconReportAnalytics, component: "Overview" },
    { link: '', label: 'Result', icon: IconDatabaseExport, component: "StudentView" },
    { link: '', label: 'Students', icon: IconUsersGroup, component: "StudentView" },
    { link: '', label: 'Questions', icon: IconEdit, component: "QuestionView" },
    { link: '', label: 'Other Settings', icon: IconSettings, component: "StudentView" },
];

const ExamOverviewPage = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');
    const link = '#';
    let { examId } = useParams();
    const navigation = useNavigate();
    const examState = useSelector((_state: RootState) => _state)
	const exam = selectExam(examState)
    // useState(() => {
        if(!examId || !exam.length) {
            navigation("/home")
        }
    // })

    const currentExam = exam.find((exam) => exam.id === examId)

    const [view, setView] = useState({component: "Overview", props: {}})
    const components = {
        "Overview": Overview,
        "StudentView": StudentView,
        "QuestionView": QuestionView,
    }

    const renderTabView = () => {
        const Component = components[view.component as keyof typeof components]
        return <Component exam={currentExam as IExam} />
    }


    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setView({ component: item.component, props: {}})
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <>
            <MenuNavBar />
            <Container size={"xl"}>
                <Grid>
                    <Grid.Col span={3}>
                        <Navbar height={700} width={{ sm: 300 }} p="md">
                            <Navbar.Section grow>
                                {links}
                            </Navbar.Section>
                            <Navbar.Section className={classes.footer}>
                                <a href={link} className={classes.link} onClick={(event) => event.preventDefault()}>
                                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                                    <span>Upgrade Account</span>
                                </a>
                            </Navbar.Section>
                        </Navbar>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        {renderTabView()}
                    </Grid.Col>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default ExamOverviewPage;