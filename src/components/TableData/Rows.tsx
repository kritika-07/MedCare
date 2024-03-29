import { Tr, Td, Text, Button } from "@chakra-ui/react";
import useAuth from "hooks/useAuth";
import { Link } from "react-router-dom";
import { MedicineStatus } from "./types";
import PatientScheduleData from "types/PatientScheduleData";

const renderMedicineStatus = (status: MedicineStatus) => {
  const statusBg = status === "Menunggu pembayaran" ? "#F94C66" : "#53BF9D";

  return (
    <Text
      bg={statusBg}
      w="fit-content"
      p="4px 8px"
      color="white"
      borderRadius="8px"
    >
      {status}
    </Text>
  );
};

const handleDeleteEmr = (id: string, type: string) => {
  const deleteConfirmed = confirm(
    "Are you sure you want to delete this EMR data?"
  );
  if (deleteConfirmed) {
    fetch(`http://localhost:3001/${type}/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Successfully deleted EMR");
      window.location.reload();
    });
  }

  return;
};

const handleDeleteQueue = (data: PatientScheduleData) => {
  const deleteConfirmed = confirm(
    "Are you sure you want to delete this queue history?"
  );
  if (deleteConfirmed) {
    fetch(`http://localhost:3001/patients/${data.id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Successfully delete queue history");
      window.location.reload();
    });
  }
};

const handlePay = (data: PatientScheduleData) => {
  const paymentConfirmed = confirm(
    "Are you sure you want to complete the payment?"
  );
  if (paymentConfirmed) {
    fetch(`http://localhost:3001/patients/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Selesai",
      }),
    }).then(() => {
      alert("Successfully completed the payment!");
      window.location.reload();
    });
  }

  return;
};

const handleApprove = (data: PatientScheduleData) => {
  const approveConfirmed = confirm(
    "Are you sure you want to approve this reservation?"
  );
  if (approveConfirmed) {
    fetch(`http://localhost:3001/patients/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Dalam antrian",
      }),
    })
      .then(() => alert("Successfully agreed"))
      .then(() => window.location.reload());
  }

  return;
};

const handleReject = (data: PatientScheduleData) => {
  const rejectConfirmed = confirm(
    "Are you sure you want to reject this reservation?"
  );
  if (rejectConfirmed) {
    fetch(`http://localhost:3001/patients/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Ditolak",
      }),
    })
      .then(() => alert("Successfully refused"))
      .then(() => window.location.reload());
  }

  return;
};

const Rows = ({
  data,
  type,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  type: "emr" | "medicine" | "schedule" | "approval" | "reservationHistory";
}) => {
  let viewData = <></>;
  const { auth } = useAuth();

  if (!data || data?.length === 0) {
    return (
      <Tr>
        <Td colSpan={4} textAlign="center" h="2rem">
          <Text fontSize="xl" fontWeight="bold">
            Data not yet available
          </Text>
        </Td>
      </Tr>
    );
  }

  if (Array.isArray(data)) {
    if (type === "emr") {
      viewData = (
        <>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Text>{index + 1}</Text>
              </Td>
              <Td>
                <Text>{item.pasien}</Text>
              </Td>
              <Td>
                <Text>{item.examinationDate}</Text>
              </Td>
              <Td>
                <Text>{item.dokter}</Text>
              </Td>
              <Td>
                <Link to={`/emr-history/${item.id}`}>
                  <Button variant="dark" color="white" bg="blue.400" mr="1">
                    Detail
                  </Button>
                </Link>
                <Button
                  variant="dark"
                  color="white"
                  bg="red.400"
                  onClick={() => handleDeleteEmr(item.id, "emr")}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </>
      );
    }

    if (type === "emr" && auth.role === "patient") {
      viewData = (
        <>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Text>{index + 1}</Text>
              </Td>
              <Td>
                <Text>{item.examinationDate}</Text>
              </Td>
              <Td>
                <Text>{item.dokter}</Text>
              </Td>
              <Td>
                <Link to={`/my-emr/${item.id}`}>
                  <Button variant="dark" color="white" bg="blue.400" mr="1">
                    Detail
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </>
      );
    }

    if (type === "schedule") {
      viewData = (
        <>
          {data
            .filter((item) => item.status === "Dalam antrian")
            .map((item, index) => (
              <Tr key={index} bg={item.nama === auth.name ? "blue.50" : ""}>
                <Td>
                  <Text>{index + 1}</Text>
                </Td>
                <Td>
                  <Text>{item.nama}</Text>
                </Td>
                <Td>
                  <Text>{new Date(item.tanggal).toLocaleDateString()}</Text>
                </Td>
                <Td>
                  <Text>{item.jam}</Text>
                </Td>
                {auth.role === "doctor" ? (
                  ""
                ) : (
                  <Td>
                    <Text>{item.dokter}</Text>
                  </Td>
                )}
              </Tr>
            ))}
        </>
      );
    }

    if (type === "reservationHistory") {
      viewData = (
        <>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Text>{index + 1}</Text>
              </Td>
              <Td>
                <Text>{item.nama}</Text>
              </Td>
              <Td>
                <Text>{new Date(item.tanggal).toLocaleDateString()}</Text>
              </Td>
              <Td>
                <Text>{item.jam}</Text>
              </Td>
              <Td>
                <Text>{item.dokter}</Text>
              </Td>
              <Td>
                <Text>{item.status}</Text>
              </Td>
            </Tr>
          ))}
        </>
      );
    }

    if (type === "approval") {
      viewData = (
        <>
          {data
            .filter((item) => item.status === "Diperiksa")
            .map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Text>{index + 1}</Text>
                </Td>
                <Td>
                  <Text>{item.nama}</Text>
                </Td>
                <Td>
                  <Text>{new Date(item.tanggal).toLocaleDateString()}</Text>
                </Td>
                <Td>
                  <Text>{item.jam}</Text>
                </Td>
                <Td>
                  <Button
                    variant="dark"
                    color="white"
                    bg="blue.400"
                    mr="1"
                    onClick={() => handleApprove(item)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="dark"
                    color="white"
                    bg="red.400"
                    mr="1"
                    onClick={() => handleReject(item)}
                  >
                    Reject
                  </Button>
                </Td>
              </Tr>
            ))}
        </>
      );
    }

    if (type === "medicine") {
      viewData = (
        <>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Text>{index + 1}</Text>
              </Td>
              <Td>
                <Text>{item.nama}</Text>
              </Td>
              <Td>
                <Text>{renderMedicineStatus(item.status)}</Text>
              </Td>
              {item.status === "Menunggu pembayaran" ? (
                <Td>
                  <Button
                    variant="dark"
                    color="white"
                    bg="blue.400"
                    mr="1"
                    onClick={() => handlePay(item)}
                  >
                    Mark paid
                  </Button>
                </Td>
              ) : (
                <Td>
                  <Button
                    variant="dark"
                    color="white"
                    bg="red.400"
                    mr="1"
                    onClick={() => handleDeleteQueue(item)}
                  >
                    Delete history
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </>
      );
    }
  }

  return viewData;
};

export default Rows;
