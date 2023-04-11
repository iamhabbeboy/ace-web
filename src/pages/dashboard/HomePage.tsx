import { Alert, Button, Container, createStyles, Image, rem, Table } from "@mantine/core"
import MenuNavBar from "../../components/MenuNavBar"
import emptyImage from "../../assets/empty-exam-image.svg"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"
import { IconAlertCircle } from "@tabler/icons-react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { IExam } from '../../types/Type';

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


const TableLayout = ({ data }: any) => {
    const rows = data.map((exam: IExam) => (
        <tr key={exam.id}>
            <td>#</td>
            <td>{exam.name}</td>
            <td>{exam.description}</td>
            <td>{exam.student_count}</td>
            <td>{exam.created_at}</td>
            <td>button</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Total Student</th>
                    <th>Date</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

const NoExam = () => {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const handleNewProject = async () => {
        navigate("/exams/new")
    }
    return (
        <div className={classes.noexam}>
            <Image width={"600px"} src={emptyImage} alt="Random image" />
            <h3>You currently have no exams</h3>
            <p>Your list of exam projects appear here.</p>
            <Button mt={"md"} size={"lg"} onClick={handleNewProject}>Setup Exam Project</Button>
        </div>
    )
}

const DashboardHomePage = () => {
    const { classes } = useStyles();
    // const [opened, { open, close }] = useDisclosure(false);

    const exams = useSelector((state: RootState) => state.account.exam)
    const examData = exams.data;
    const hasExamData = examData.length;

    return (
        <>
            <MenuNavBar />
            <Container size={"xl"} mt={20}>
                <Alert mb={10} icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="blue">
                    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
                </Alert>
                <div className={classes.section}>
                    {hasExamData ? <TableLayout data={examData} /> : null}
                    {!hasExamData && <NoExam />}
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default DashboardHomePage