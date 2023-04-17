import { Select, Group, Button, Text, createStyles, rem, Tabs } from "@mantine/core"
import { IconChevronRight, IconCirclePlus, IconX } from "@tabler/icons-react"
import { useState } from "react";
import QuestionRichTextEditor from "../QuestionRichTextEditor"
import Option from '../Option';
import { useSelector } from "react-redux";
import { RootState, store } from "../../store";
import { selectCustomSubject } from "../../store/selectors";
import { showNotification } from "@mantine/notifications";
import { updateExam } from "../../store/thunks/exam";
import { IExam, IOptions } from "../../types/Type";
import GroupSubject from "./GroupSubject";
interface QuestionProps {
	subject?: string;
	exam: IExam;
}
const useStyles = createStyles((theme) => ({
	section: {
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		backgroundColor: `#fff`,
		border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
		overflowY: "scroll",
		height: "700px"
	},
}));

const AddQuestionTab = ({ subject, exam }: QuestionProps) => {
	const { classes } = useStyles();
	const [options, setOptions] = useState(1);
	const [labelAdded, setLabelAdded] = useState<string[]>(["A"]);
	const optionLabels = ["A", "B", "C", "D", "E", "F"];

	const [subjectData, setSubjectData] = useState("");
	const [question, setQuestion] = useState({ content: '', contentHTML: '' });
	const [opts, setOpts] = useState('');
	const [optionsData, setOptionsData] = useState<string[]>([]);
	const [correctAnswer, setCorrectAnswer] = useState("");

	const labels = labelAdded.map((label) => {
		return { label, value: label }
	})

	const state = useSelector((_state: RootState) => _state)
	const subjects = selectCustomSubject(state)

	const handleCreateOption = () => {
		if (opts === "") {
			showNotification({
				title: "Error",
				message: "Option Field cannot be empty",
				color: "red",
				icon: <IconX />
			})
			return;
		}
		if (options >= optionLabels.length) {
			showNotification({
				title: "Error",
				message: "You can only add 6 options",
				color: "red",
				icon: <IconX />
			})
			return;
		}
		setLabelAdded([...labelAdded, optionLabels[options]])
		setOptionsData([...optionsData, opts])
		setOptions(options + 1);
		setOpts('')
	}

	const handleAddQuestion = () => {
		if (subjectData === "") {
			showNotification({
				title: "Error",
				message: "Subject Field cannot be empty",
				color: "red",
				icon: <IconX />
			})
			return;
		}

		if (question.content === "") {
			showNotification({
				title: "Error",
				message: "Question Field cannot be empty",
				color: "red",
				icon: <IconX />
			})
			return;
		}

		if (opts === "") {
			showNotification({
				title: "Error",
				message: "Option Field cannot be empty",
				color: "red",
				icon: <IconX />
			})
			return;
		}

		if (correctAnswer === "") {
			showNotification({
				title: "Error",
				message: "Correct Answer Field cannot be empty",
				color: "red",
				icon: <IconX />
			})
			return;
		}
		const optimum = optionsData.concat(opts)

		const opt: IOptions[] = optimum.map((option, index) => {
			return {
				label: optionLabels[index],
				content: option,
			}
		});

		const qtn = {
			id: exam.id,
			questions: [{
				content: question.content,
				options: opt,
				answer: correctAnswer,
				subject: subjectData,
				content_html: question.content
			}]
		};

		store.dispatch(updateExam(qtn as IExam));
	}

	return (
		<>
			<div className={classes.section}>
				<h3>Questions </h3>
				<Tabs defaultValue="first">
					<Tabs.List>
						<Tabs.Tab value="first">Contents</Tabs.Tab>
						<Tabs.Tab value="second">Add</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="first">
						<GroupSubject exam={exam} />
					</Tabs.Panel>
					<Tabs.Panel value="second">
						<h3>Students</h3>
						<Text size={"sm"} mt={15} weight="bold">Subject</Text>
						<Select
							searchable
							data={subjects}
							onChange={(value) => setSubjectData(value as string)}
						/>
						<Text size={"sm"} mt={15} weight="bold">Question</Text>
						<QuestionRichTextEditor onSetValue={setQuestion} />
						<Text size={"sm"} mt={15} weight="bold">Options </Text>
						<Group position="apart" mt={0}>
							<div>&nbsp;</div>
							<Button size={"xs"} onClick={handleCreateOption}>Add New <IconCirclePlus /></Button>
						</Group>
						{Array.from(Array(options), (option, index) => {
							return <Option key={index} label={labelAdded[index]} onSetOptions={setOpts} />
						})}
						<Select
							mt={15}
							label="Select Correct Answer"
							data={labels}
							onChange={(value) => setCorrectAnswer(value as string)}
						/>
						<Button mt={"md"} size={"md"} onClick={handleAddQuestion}>Submit <IconChevronRight /></Button>
					</Tabs.Panel>
				</Tabs>

			</div>
		</>
	)
}
export default AddQuestionTab