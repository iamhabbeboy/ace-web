import { Alert, Badge, Container, Text, Group, ScrollArea, Table, createStyles, Checkbox, Button, Divider } from "@mantine/core"
import { IconChevronRight, IconInfoCircle, IconPower } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
    const { classes } = useStyles();
    const data = [
        {
            name: "English",
            role: "Manager"
        }
    ];
    // const user = useSelector((state: RootState) => state.account.user)
    const navigation = useNavigate();
    const handleStart = () => {
        return navigation("/exam")
    }
    const rows = data.map((item) => (
        <tr key={item.name}>
            <td>
                <Checkbox />
            </td>
            <td>
                <Group spacing="sm">
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>30mins</td>
            <td>05mins 30secs</td>
            <td>
                <Badge color="primary">
                    Pending
                </Badge>
            </td>
        </tr>
    ));
    return (
        <Container>
            <br /><br /><br />
            <div className={classes.section}>
                <h1>Quiz Overview</h1>
                <Alert><IconInfoCircle size={"1rem"} /> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam praesentium, quisquam quos unde tempora itaque delectus doloribus ad, impedit vero ratione, rem quidem numquam adipisci accusantium culpa! Obcaecati, excepturi vitae.</p></Alert>
                <h3>Course(s)</h3>
                <ScrollArea>
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
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
                <Divider></Divider>
                {/* <Group position="right"> */}
                <Button size="md" mt="smd" color="red">Sign Out <IconPower /></Button> &nbsp; &nbsp;
                <Button size="md" mt="lg" onClick={handleStart}>Start <IconChevronRight /></Button>
                {/* </Group> */}
            </div>
        </Container>
    )
}

export default Overview