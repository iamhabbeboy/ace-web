import QuestionList from "./QuestionList";
import { UnstyledButton, createStyles } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	size: {
		fontSize: theme.fontSizes.sm,
	}
}));

interface SubjectProps {
	subject?: string;
}

const SubjectTab = ({ subject }: SubjectProps) => {
	const { classes } = useStyles();
	// const [options, setOptions] = useState(1);
	// const handleCreateOption = () => {
	// 	setOptions(options + 1);
	// }

	return (
		<>
			<h3>{subject} </h3>
			<div style={{ marginTop: "3px" }}>
				<UnstyledButton className={classes.size}><IconEdit stroke={1.5} size="1rem" /></UnstyledButton>
				<UnstyledButton className={classes.size} ml={4}><IconTrash stroke={1.5} size="1rem" /></UnstyledButton>
			</div>
			<QuestionList content="What is a noun?"
				index="1"
				answer="A"
				options={[{
					label: "A",
					content: "A noun is a name of any person, place, thing, or idea."
				}, {
					label: "B",
					content: "A noun is a name of any person, place, thing, or idea."
				}]}
			/>

			<QuestionList content="What is a noun?"
				answer="A"
				index="2"
				options={[{
					label: "A",
					content: "A noun is a name of any person, place, thing, or idea."
				}, {
					label: "B",
					content: "A noun is a name of any person, place, thing, or idea."
				}]}
			/>

		</>
	)
}
export default SubjectTab