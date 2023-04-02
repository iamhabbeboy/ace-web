import { useState } from 'react';
import { createStyles, Navbar, getStylesRef, rem, Container, Grid } from '@mantine/core';
import {
    IconSettings,
    IconSwitchHorizontal,
    IconLogout,
    IconUsersGroup,
    IconEdit,
    IconDatabaseExport,
    IconReportAnalytics,
} from '@tabler/icons-react';
import MenuNavBar from '../../components/MenuNavBar';
import Footer from '../../components/Footer';
import TableSelection from '../../components/Table';

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
    { link: '', label: 'Overview', icon: IconReportAnalytics },
    { link: '', label: 'Result', icon: IconDatabaseExport },
    { link: '', label: 'Students', icon: IconUsersGroup },
    { link: '', label: 'Questions', icon: IconEdit },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

const ExamOverviewPage = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
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
            <Container size={"xl"} >
                <Grid>
                    <Grid.Col span={3}>
                        <Navbar height={700} width={{ sm: 300 }} p="md">
                            <Navbar.Section grow>
                                {links}
                            </Navbar.Section>
                            <Navbar.Section className={classes.footer}>
                                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                                    <span>Upgrade Account</span>
                                </a>

                                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                                    <span>Logout</span>
                                </a>
                            </Navbar.Section>
                        </Navbar>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <div className={classes.section}>
                            <h3>Students</h3>
                            <TableSelection
                            data={[{
                                name: "John Doe",
                                job: "Web Developer",
                                id: "1234",
                                email: "john.doe@gmail.com",
                                avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                            }]}
                            />
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default ExamOverviewPage;