import { Card, createStyles, rem, Divider, Group, Switch } from '@mantine/core';
import TableSelection from '../Table';
import { IconCopy } from '@tabler/icons-react';
const useStyles = createStyles((theme) => ({
    section: {
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        backgroundColor: `#fff`,
        border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

const Overview = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.section}>
            <Group position="apart">
                <h3>Overview</h3>
                <div>
                    <Switch
                        label="Exam Mode"
                    />
                    <p style={{fontSize: "12px", color: "gray",  cursor: "pointer", textAlign: "right"}}>
                        <IconCopy size={13}/> http://bashlabs.acetest.com/c4kefjksdfkcuks</p>
                </div>
            </Group>
            <Card withBorder radius="md" mb={20}>
                <b>Data</b>
                <Divider />
                <Card.Section>
                    dfsdf
                </Card.Section>
            </Card>

            <div>
                <b>User Logs</b>
                <Divider />
                <TableSelection
                    data={[{
                        id: "123",
                        name: "John Doe",
                        time: "12:00",
                        questionAnswered: "10",
                    }, {
                        id: "1234",
                        name: "John Doe",
                        time: "12:00",
                        questionAnswered: "10"
                    }]}
                />
            </div>
        </div >
    )
}

export default Overview