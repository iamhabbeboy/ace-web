import { Card, createStyles, Group, Radio, rem, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react";

interface AccountTypeCardProps {
    label: string;
    description: string;
    onChecked: (checked: string) => void;
    status: string;
}

const useStyles = createStyles((theme) => ({
    ".mantine-Card-root": {
        cursor: "pointer",
    },
    card: {
        border: `${rem(2)} solid #eaeaea !important`,
    },
    checked: {
        border: `${rem(2)} solid ${theme.colors.blue[5]} !important`,
    },
    section: {
        padding: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
      },
}));

let checked = "0";

const AccountTypeCard = ({ label, description, onChecked, status }: AccountTypeCardProps) => {
    const { classes } = useStyles();
    const setCheckStatus = (status: string) => {
        onChecked(status);
        checked = status
    }

    return (
        <Card withBorder radius="md" p="md"
            className={status === checked ? classes.checked : classes.card}
            >
            <Card.Section mt="md" p={10}>
                <Group>
                    <Radio
                        label=""
                        checked={checked === status}
                        value={status}
                        onChange={(event) => setCheckStatus(event.currentTarget.value)}
                    />
                    <Text fz="lg" fw={500}>
                        {label}
                    </Text>
                </Group>
                <Text fz="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>
            <Card.Section>
        <Text mt="md" c="dimmed" className={classes.section}>
          <div><IconCheck /> Unlimited access to all tests</div>
          <div><IconCheck /> Unlimited access to all tests</div>
        </Text>
      </Card.Section>
        </Card>
    )
}

export default AccountTypeCard