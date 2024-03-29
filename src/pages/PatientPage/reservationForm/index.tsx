import { Text } from "@chakra-ui/react";
import ReservationForm from "components/organisms/ReservationForm";
import SidebarWithHeader from "components/Sidebar";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import ModalDialogue from "components/ModalDialogue";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormRegister = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      tanggal: "",
      jam: "",
      idPasien: auth.id,
      nama: auth.name,
      status: "Diperiksa",
      dokter: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:3001/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setShow(true);
    },
  });

  const handleCloseModal = () => {
    setShow(false);
    navigate("/reservation-history");
  };

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="xl" fontWeight="bold" mb="8px">
          Reservation Form
        </Text>

        <ReservationForm
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
          tanggal={formik.values.tanggal}
          jam={formik.values.jam}
          dokter={formik.values.dokter}
        />
      </SidebarWithHeader>
      {show ? (
        <ModalDialogue
          title="Reservation successful!"
          message="Please wait for approval from the clinic.
          Please check the Reservation History page to monitor the reservation status."
          onClose={handleCloseModal}
        />
      ) : null}
    </>
  );
};

export default FormRegister;
