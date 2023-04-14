import { Group, Text, Textarea, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface OptionProps {
    label: string;
    onSetOptions: (value: string) => void;
}

const Option = ({ label, onSetOptions }: OptionProps) => {
    const setOption = (value: string) => {
        onSetOptions(value);
    }

    return (
        <div style={{ marginTop: "15px" }}>
            <Group mt={5}>
                <Text>({label})</Text>
            </Group>
            {/* <QuestionRichTextEditor onSetValue={setOption} /> */}
            <Textarea onChange={(e) => setOption(e.target.value)}></Textarea>
            <UnstyledButton><IconTrash size={"1rem"} style={{ color: "#993300" }} /></UnstyledButton>
        </div>
    )
}
export default Option;