import { Table, Checkbox, ScrollArea, rem } from '@mantine/core';

const TableSelection = ({ hasCheckbox, data }: any) => {
  // const { classes, cx } = useStyles();
  // const [selection, setSelection] = useState(['1']);
  const rows: any = [], headers: any = [];
  for (let item of data) {
    rows.push(Object.values(item))
    headers.push(Object.keys(item))
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            {hasCheckbox &&
              <th style={{ width: rem(40) }}>
                <Checkbox />
              </th>}
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
              <tr key={index}>
                {hasCheckbox && <td><Checkbox /></td>}
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