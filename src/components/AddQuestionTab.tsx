import { Select, Group, Button, Text } from "@mantine/core"
import { IconChevronLeft, IconChevronRight, IconCirclePlus } from "@tabler/icons-react"
import { useState } from "react";
import QuestionRichTextEditor from "./QuestionRichTextEditor"
import Option from '../components/Option';

interface QuestionProps {
	subject?: string;
}
const AddQuestionTab = ({ subject }: QuestionProps) => {
	const [options, setOptions] = useState(1);
	const handleCreateOption = () => {
		setOptions(options + 1);
	}

	return (
		<>
			<div>
				<h3>Add Questions </h3>
				<Text size={"sm"} mt={15} weight="bold">Subject</Text>
				<Select
					data={[{
						label: "English",
						value: "English"
					}, {
						label: "Mathematics",
						value: "Mathematics"
					}]}
				/>
				<Text size={"sm"} mt={15} weight="bold">Question</Text>
				<QuestionRichTextEditor content="" />
				<Text size={"sm"} mt={15} weight="bold">Options </Text>
				<Group position="apart" mt={0}>
					<div>&nbsp;</div>
					<Button size={"xs"} onClick={handleCreateOption}>Add New <IconCirclePlus /></Button>
				</Group>
				{Array.from(Array(options), (option, index) => {
					return <Option label={index + "_A"} />
				})}

				<Select
					mt={15}
					label="Select Correct Answer"
					data={[{
						label: "A",
						value: "A"
					}]}
				/>
			</div>
			<Group position="right">
				<Button mt={"md"} size={"md"} variant="outline"><IconChevronLeft />Cancel </Button>
				<Button mt={"md"} size={"md"}>Submit <IconChevronRight /></Button>
			</Group>
		</>
	)
}
export default AddQuestionTab