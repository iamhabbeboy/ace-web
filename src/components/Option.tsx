import { Group, Radio, Text } from "@mantine/core";
import QuestionRichTextEditor from "./QuestionRichTextEditor";

interface OptionProps {
    label: string;
}

const Option = ({ label }: OptionProps) => {
    return (
        <Group mt={10}>
            <Text>({label})</Text>
            <Radio label="" />
            <QuestionRichTextEditor content="" />
        </Group>
    )
}
export default Option;