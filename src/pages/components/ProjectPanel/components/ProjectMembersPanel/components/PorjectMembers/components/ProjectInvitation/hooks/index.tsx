import { useState } from 'react';

const useEmployeesSelection = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    description: '',
  });
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeList: [],
  });
  const [ids, setIds] = useState<any[]>([]);
  const { employeeList } = employeeInfo;
  const selectAll = () => {
    if (employeeList.length > 0) {
      const mapEmployees = employeeList.map((key: any) => (
        {
          id: key.id.toString(),
          checked: true,
        }
      ));
      setIds(mapEmployees);
    }
  };

  const selectNone = () => {
    const deSelectEmployees = ids.map((key: any) => (
      {
        id: key.id.toString(),
        checked: false,
      }
    ));
    setIds(deSelectEmployees);
  };

  return { companyInfo, setCompanyInfo, employeeInfo, setEmployeeInfo, selectAll, selectNone, ids, setIds };
};

export default useEmployeesSelection;
