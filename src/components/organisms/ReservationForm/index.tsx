import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ReservationFormProps } from "./types";

function ReservationForm({
  onSubmit,
  onChange,
  tanggal,
  dokter,
  jam,
}: ReservationFormProps) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/schedule?_expand=user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Date
        </FormLabel>
        <Input
          id="tanggal"
          name="tanggal"
          variant="outline"
          fontSize="sm"
          ms="4px"
          type="date"
          mb="24px"
          size="lg"
          value={tanggal}
          onChange={onChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Date
        </FormLabel>
        <Select
          name="dokter"
          id="dokter"
          mb="24px"
          onChange={onChange}
          value={dokter}
          placeholder="Choose a Doctor"
        >
          {doctors.map((item: any, index) => (
            <option key={index} value={item.user.name}>
              {item.user.name} / {item.jadwal_praktek}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb="24px">
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Hours
        </FormLabel>
        <Input
          id="jam"
          name="jam"
          variant="outline"
          fontSize="sm"
          ms="4px"
          type="time"
          size="lg"
          value={jam}
          onChange={onChange}
        />
        <FormHelperText>
          Make sure the hours match the doctor&apos;s practice hours!
        </FormHelperText>
      </FormControl>

      <Button variant="dark" h="45" color="white" bg="blue.300" type="submit">
        Register
      </Button>
    </form>
  );
}

export default ReservationForm;
