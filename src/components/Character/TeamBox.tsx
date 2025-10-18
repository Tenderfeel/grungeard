import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 100,
  height: 167,
  padding: 0,
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function TeamBox() {
  return (
    <StyledPaper>
      <AddIcon fontSize="large" color="disabled" />
    </StyledPaper>
  );
}
