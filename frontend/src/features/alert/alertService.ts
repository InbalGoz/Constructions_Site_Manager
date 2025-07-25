import Swal from "sweetalert2";

export const showSuccessAlert = (message: string = "הפעולה בוצעה בהצלחה") => {
  return Swal.fire({
    icon: "success",
    title: "הצלחה",
    text: message,
  });
};

export const showErrorAlert = (message: string = "אירעה שגיאה. נסי שוב.") => {
  return Swal.fire({
    icon: "error",
    title: "שגיאה",
    text: message,
  });
};

export const showConfirmDelete = async (
  text: string = "לא ניתן יהיה לשחזר את הנתון הזה!"
) => {
  return Swal.fire({
    title: "האם את בטוחה?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "כן, מחקי",
    cancelButtonText: "בטלי",
  });
};
