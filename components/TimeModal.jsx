import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import TimeInput from "@/components/time-input";
import { users, tracks, modes } from "@/config/static-data";
import {Spinner} from "@nextui-org/react";
import {addTime} from "@/utils/dbUtils";
import React from "react";
import { useTime } from '@/components/TimeContext';
import {DateInput} from "@nextui-org/react";
import {DateValue, parseDate, getLocalTimeZone, today} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";


export default function App() {
  const { times, addNewTime } = useTime();  // Obtener los tiempos del contexto

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = React.useState("");
  const [track, setTrack] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [time, setTime] = React.useState(-1);
  const [date, setDate] = React.useState(parseDate((new Date()).toISOString().slice(0,10))); // Inicializa DateValue correctamente

  let formatter = useDateFormatter({dateStyle: "full"});
  const [isSaving, setIsSaving] = React.useState(false); // Estado para controlar la subida de datos

  // Función para manejar la acción de guardar
  const handleSave = async (onClose) => {
    setIsSaving(true); // Cambiar el estado a "guardando"

    try {
      // await uploadData(); // Subir los datos de manera asíncrona
      await addNewTime(time, user, track, mode, date.toDate());
      onClose(); // Cerrar el modal al finalizar la subida
    } catch (error) {
      console.error("Error al subir los datos:", error);
    } finally {
      setIsSaving(false); // Restablecer el estado del botón
    }
  };

  return (
    <>
      <Button className="bg-foreground text-background" endContent={<PlusIcon />} size="sm" onPress={onOpen}>
        Add Time
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New time</ModalHeader>
              <ModalBody>
                <TimeInput onTimeChange={setTime} />

                {/* Dropdown para seleccionar el piloto */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {user === "" ? "Select pilot" : users.find(u => u.key === user).label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dynamic Actions"
                    onAction={(key, val) => setUser(val.value.key)}
                    items={users}
                  >
                    {(item) => (
                      <DropdownItem key={item.key} color={item.key === "delete" ? "danger" : "default"}>
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>

                {/* Dropdown para seleccionar el circuito */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {track === "" ? "Select circuit" : tracks.find(t => t.key === track).label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dynamic Actions"
                    onAction={(key, val) => setTrack(val.value.key)}
                    items={tracks}
                  >
                    {(item) => (
                      <DropdownItem key={item.key} color={item.key === "delete" ? "danger" : "default"}>
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>

                {/* Dropdown para seleccionar el modo */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {mode === "" ? "Select mode" : modes.find(m => m.key === mode).label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dynamic Actions"
                    onAction={(key, val) => setMode(val.value.key)}
                    items={modes}
                  >
                    {(item) => (
                      <DropdownItem key={item.key} color={item.key === "delete" ? "danger" : "default"}>
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>

                <DateInput label="Date" value={date} onChange={setDate} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSave(onClose)}
                  // isDisabled={user === "" || track === "" || mode === "" || time < 0}
                  isDisabled={false}
                >
                  {isSaving ? <Spinner color="warning"/> : "Save"} {/* Cambia el texto cuando está guardando */}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
