import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  visible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;

}
