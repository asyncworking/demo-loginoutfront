import React, { useReducer } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';
import AvailableEmployee from './components/AvailableEmployee/AvailableEmployee';
import useStyles from './AvailableEmployeesList.style';

interface Props {
  ids: any,
  setIds: Function,
  employeeInfo: Employee[],
}

interface Employee {
  id: number,
  name: string,
  title: string,
  email: string
}

const AvailableEmployeesList = ({ ids, setIds, employeeInfo }: Props) => {
  const rows = employeeInfo;
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const onCheck = (event: any) => {
    const found = ids.some((e: any) => e.id === event.target.value);
    if (!found) {
      setIds([
        ...ids,
        {
          id: event.target.value,
          checked: true,
        },
      ]);
    } else {
      const tempIds = ids;
      const idx = tempIds.findIndex((e: any) => e.id === event.target.value);
      if (idx !== -1) {
        const tempChecd = tempIds[idx].checked;
        tempIds[idx].checked = !tempChecd;
      }
      setIds(tempIds);
    }
    forceUpdate();
  };

  const handleChecked = (id: any) => {
    const checkedId = id.toString();
    const result = ids.findIndex((e: any) => e.id === checkedId);
    if (result !== -1) {
      return ids[result].checked;
    }
    return false;
  };

  return (
    <TableContainer className={classes.content}>
      <Table>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className={classes.row}>
                <AvailableEmployee employee={row} />
              </TableCell>
              <TableCell className={classes.row}>
                <Checkbox data-testid="checkBox" onChange={onCheck} checked={handleChecked(row.id)} color="primary" className={classes.checkbox} value={row.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvailableEmployeesList;
