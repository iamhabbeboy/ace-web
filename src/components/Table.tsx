import { Table, Checkbox, ScrollArea, rem } from '@mantine/core';

// const useStyles = createStyles((theme) => ({
//   rowSelected: {
//     backgroundColor:
//       theme.colorScheme === 'dark'
//         ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
//         : theme.colors[theme.primaryColor][0],
//   },
// }));

const TableSelection = ({ data }: any) => {
  // const { classes, cx } = useStyles();
  // const [selection, setSelection] = useState(['1']);
  const rows: any = [], headers: any = [];
  for(let item in data){
    rows.push(Object.values(item))
    headers.push(Object.keys(item))
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                // onChange={toggleAll}
                // checked={selection.length === data.length}
                // indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            {headers[0].map((row: any, index: number) => {
              return (
                <th key={index}>{row.toUpperCase()}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, index: number) => {
            return (
              <tr>
                <td><Checkbox /></td>
                {Object.values(row).map((row: any, index: number) => {
                  return (
                    <td key={index}>{row}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableSelection;