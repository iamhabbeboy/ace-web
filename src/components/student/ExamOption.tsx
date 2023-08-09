import { Group, Radio } from "@mantine/core"

interface ExamOptionProps {
    label: string;
    content: string;
    status: boolean;
    setOptionHandler: (opt: string) => void;
}

const ExamOption = ({ label, content, status, setOptionHandler }: ExamOptionProps) => {
    const handleSelection = (event: any) => {
        setOptionHandler(event.target.value)
    }
    const style = {
        borderBottom: "1px solid #ccc",
        padding: "30px 8px",
        color: "#333",
        backgroundColor: "",
    }

    if (status) {
        style.backgroundColor = "#5B9A8B"
        style.color = "#FFF"
    }
    return (
        <div style={style}>
            <Group position="left">
                <b>({label})</b>
                <Radio label={content} sx={{
                    "& .mantine-Radio-label": { color: style.color},
                }} name="option" color="violet" onClick={(event) => handleSelection(event)} value={label} />
            </Group>
        </div>
    )
}

export default ExamOption