
import MuiAlert from "@material-ui/lab/Alert";


export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export const getTodayDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const debounceFunction = (func, delay) => {
  let debounceTimer;
  return () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(), delay);
  };
};
