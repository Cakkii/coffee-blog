import Button from "@mui/material/Button";
import { getBlog } from "./utils/decryption-helper.ts";
import { TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const fetchData = async (url: string) => {
    try {
      console.log("Fetching from", url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();
        console.log(data);

        console.log(getBlog(data.trim(), password));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          fetchData(window.location.origin + "/base64-enc");
        }}
      >
        Submit
      </Button>
    </>
  );
}

export default App;
