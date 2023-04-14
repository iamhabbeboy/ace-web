import { Group, Radio } from "@mantine/core"

interface ExamOptionProps {
    label: string;
    content: string;
}
const ExamOption = ({ label, content }: ExamOptionProps ) => {
    return (
        <div style={{ borderBottom: "1px solid #ccc", padding: "30px 8px" }}>
            <Group position="left">
                <b>({label})</b>
                <Radio label={content} />
            </Group>
        </div>
    )
}

export default ExamOption