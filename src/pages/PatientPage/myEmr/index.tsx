import { Thead, TableContainer, Table, Text, Tbody } from "@chakra-ui/react";

import SidebarWithHeader from "components/Sidebar";
import Headers from "components/TableData/Headers";
import Rows from "components/TableData/Rows";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import EmrHistoryData from "types/EmrHistoryData";

const MyEmr = () => {
  const [data, setData] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3001/emr?pasien=" + auth.name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.sort(
          (a: EmrHistoryData, b: EmrHistoryData) =>
            +new Date(a.examinationDate) - +new Date(b.examinationDate)
        );
        setData(data);
      });
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="xl" fontWeight="bold" mb="8px">
          Patient EMR History Register
        </Text>
        <TableContainer overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Headers
                headers={["No", "Inspection Date", "Doctor", "Action"]}
              />
            </Thead>
            <Tbody>
              <Rows data={data} type="emr" />
            </Tbody>
          </Table>
        </TableContainer>
      </SidebarWithHeader>
    </>
  );
};

export default MyEmr;
