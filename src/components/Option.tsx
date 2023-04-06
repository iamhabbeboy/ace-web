import { Group, Radio, Text } from "@mantine/core";
import QuestionRichTextEditor from "./QuestionRichTextEditor";

interface OptionProps {
    label: string;
}

const Option = ({ label }: OptionProps) => {
    return (
        <div style={{ marginTop: "15px" }}>
            <Group mt={5}>
                <Text>({label})</Text>
            </Group>
            <QuestionRichTextEditor content="" />
        </div>
    )
}
export default Option;