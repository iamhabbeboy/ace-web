import { Button, Container, createStyles, Image, rem } from "@mantine/core"
import MenuNavBar from "../../components/MenuNavBar"
import emptyImage from "../../assets/empty-exam-image.svg"
import Footer from "../../components/Footer"
import { useNavigate, useRoutes } from "react-router-dom"

const useStyles = createStyles((theme) => ({
    section: {
        padding: theme.spacing.md,
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

const DashboardHomePage = () => {
    const { classes } = useStyles();
    // const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const handleNewProject = () => {
        navigate("/exams/new")
    }

    return (
        <>
            <MenuNavBar />
            <Container size={"xl"} className={classes.section}>
                <div className={classes.noexam}>
                    <Image width={"600px"} src={emptyImage} alt="Random image" />
                    <h3>You currently have no exams</h3>
                    <p>Your list of exam projects appear here.</p>
                    <Button mt={"md"} size={"lg"} onClick={handleNewProject}>Setup Exam Project</Button>
                </div>
                {/* <ModalView opened={opened} close={close} title="Create New Exam">
                    <h1>Modal Content</h1>
                </ModalView> */}
            </Container>
            <Footer />
        </>
    )
}

export default DashboardHomePage