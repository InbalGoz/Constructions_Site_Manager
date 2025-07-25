import type { Res } from "../../models/res";
import { showSuccessAlert, showErrorAlert } from "../alert/alertService";

export const resService = {
  handleErr,
  handleSuccess,
};

function handleErr(res: Res) {
  console.error("שגיאת שרת:", res);
  showErrorAlert(String(res.data.error ?? "אירעה שגיאה לא צפויה"));
}

function handleSuccess<T>(res: Res, message?: string): T {
  if (message) {
    showSuccessAlert(message);
  }
  return res.data.data as T;
}
