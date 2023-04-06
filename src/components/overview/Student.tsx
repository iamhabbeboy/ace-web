import { createStyles, rem } from '@mantine/core';
import TableSelection from '../../components/Table';
const useStyles = createStyles((theme) => ({
    section: {
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        backgroundColor: `#fff`,
        border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

const StudentView = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.section}>
            <h3>Students</h3>
            <TableSelection
                data={[{
                    name: "John Doe",
                    id: "1234",
                    email: "john.doe@gmail.com"
                }]}
            />
        </div>
    )
}

export default StudentView