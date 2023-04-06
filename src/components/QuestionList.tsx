import { createStyles, Text, Group, Card, Checkbox } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    size: {
        fontSize: theme.fontSizes.sm,
    }
}));

interface OptionType {
    label: string;
    content: string;
}

interface SubjectInfoProps {
    index: string;
    answer: string;
    content: string;
    options: OptionType[];
}

const QuestionList = ({ index, answer, content, options }: SubjectInfoProps) => {
    const { classes } = useStyles();
    return (
        <Card withBorder radius="md" mb={7}>
            <Group noWrap>
                <div><Checkbox /></div>
                <div>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Answer: {answer}
                    </Text>

                    <Text fz="lg" fw={500} className={classes.name}>
                        {content}
                    </Text>

                    {options.map((option: OptionType, index: Number) => {
                        return (
                            <Group noWrap spacing={10} mt={3}>
                                <IconEdit stroke={1.5} size="1rem" className={classes.icon} />
                                <Text fz="xs" c="dimmed">
                                    <b>{option.label}</b> {option.content}
                                </Text>
                            </Group>
                        )
                    })}
                </div>
            </Group>
        </Card>
    );
}

export default QuestionList;