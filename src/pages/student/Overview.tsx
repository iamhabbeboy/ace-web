import { Alert, Badge, Container, Text, Group, ScrollArea, Table, createStyles, Checkbox, Button, Divider } from "@mantine/core"
import { IconChevronRight, IconInfoCircle, IconPower } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudentInfo } from "../../store/thunks/user";
import { AppDispatch, RootState, persistor } from "../../store";
import { useCallback, useEffect } from "react";
import { convertToHMS } from "../../util/common";
import { logoutUser } from "../../store/collections/user";

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


const Overview = () => {
    // store.dispatch(getStudentInfo());
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.account.user.data)
    const fetchUser = useCallback(async () => {
        await dispatch(getStudentInfo());
    }, [dispatch]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const { classes } = useStyles();
    const navigation = useNavigate();
    const handleStart = () => {
        return navigation("/exam")
    }

    const handleSignOut = async () => {
        await dispatch(logoutUser);
        persistor.purge().then(() => {
            sessionStorage.clear();
        });
        window.location.href =  "/login"
    }

    return (
        <Container>
            <br /><br /><br />
            <div className={classes.section}>
                <h1>Quiz Overview</h1>
                <Alert><IconInfoCircle size={"1rem"} /> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam praesentium, quisquam quos unde tempora itaque delectus doloribus ad, impedit vero ratione, rem quidem numquam adipisci accusantium culpa! Obcaecati, excepturi vitae.</p></Alert>
                <h3>Course(s)</h3>
                <ScrollArea>
                    {user && user?.assigned_subjects &&
                        <Table miw={800} verticalSpacing="sm">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Title</th>
                                    <th>Duration</th>
                                    <th>Time spent</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.subjects.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <Checkbox />
                                        </td>
                                        <td>
                                            <Group spacing="sm">
                                                <div>
                                                    <Text fz="sm" fw={500}>
                                                        {item.title}
                                                    </Text>
                                                </div>
                                            </Group>
                                        </td>
                                        <td>{convertToHMS(item.duration)}</td>
                                        <td>0</td>
                                        <td>
                                            <Badge color="primary">
                                                Pending
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </ScrollArea>
                <Divider></Divider>
                {/* <Group position="right"> */}
                <Button size="md" mt="smd" color="red" onClick={handleSignOut}>Sign Out <IconPower /></Button> &nbsp; &nbsp;
                <Button size="md" mt="lg" onClick={handleStart}>Start <IconChevronRight /></Button>
                {/* </Group> */}
            </div>
        </Container>
    )
}

export default Overview