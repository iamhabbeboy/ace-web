import { Group, Text, UnstyledButton } from "@mantine/core";
import QuestionRichTextEditor from "./QuestionRichTextEditor";
import { IconTrash } from "@tabler/icons-react";

interface OptionProps {
    label: string;
}

const Option = ({ label }: OptionProps) => {
    return (
        <div style={{ marginTop: "15px" }}>
            <Group mt={5}>
                <Text>({label})</Text>
            </Group>
            {/* <QuestionRichTextEditor content="" /> */}
            <UnstyledButton><IconTrash size={"1rem"} style={{ color: "#993300" }} /></UnstyledButton>
        </div>
    )
}
export default Option;