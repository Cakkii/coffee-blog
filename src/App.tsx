import Button from "@mui/material/Button";
import { getBlog } from "./utils/decryption-helper.ts";
import {
  Grid2 as Grid,
  TextField,
  Typography,
  Collapse,
  Stack,
  useColorScheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CafeBlog, CafeBlogData } from "./components/CafeBlog.tsx";
import { CoffeeBlog, CoffeeBlogData } from "./components/CoffeeBlog.tsx";
import CoffeeIcon from "@mui/icons-material/Coffee";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

function App() {
  const { setMode } = useColorScheme();

  setMode("system");
  const [password, setPassword] = useState("");
  const [failedPassword, setFailedPassword] = useState(false);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = (await response.text()).trim();
        if (data.length > 0 && data[0] === "<") return "";
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [jsonBlog, setJsonBlog] = useState("");

  type MixedType = CafeBlogData | CoffeeBlogData;
  const [data, setData] = useState<MixedType[]>([]);
  const isCafe = (obj: MixedType): obj is CafeBlogData => "cafeName" in obj;

  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      if (jsonBlog === "") {
        const data =
          (await fetchData(window.location.href + "/secrets/blog.json")) ?? "";
        setJsonBlog(data);
      } else {
        const json: MixedType[] = JSON.parse(jsonBlog);

        const sortedData = json.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        setData(sortedData);
      }
    };
    load();
  }, [jsonBlog]);

  return (
    <>
      <Grid container>
        <Grid
          size={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h5" sx={{ m: 2 }}>
            Cakkii Coffee Blog
          </Typography>
          <CoffeeIcon sx={{ m: 1, mr: 2 }} />
        </Grid>
        {jsonBlog === "" ? (
          <Grid size={12} display="flex" justifyContent="center">
            <Stack
              direction="column"
              spacing={1}
              sx={{
                justifyContent: "space-evenly",
                alignItems: "flex-end",
                m: 4,
              }}
            >
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                error={failedPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
              <Button
                variant="contained"
                onClick={async () => {
                  const encryptedBlog = await fetchData(
                    window.location.href + "/base64-enc",
                  );
                  if (encryptedBlog) {
                    try {
                      setJsonBlog(getBlog(encryptedBlog, password));
                    } catch {
                      setFailedPassword(true);
                    }
                  }
                }}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
        <Grid container size={12}>
          <div>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {data.map((blog, index) => (
                <TimelineItem
                  key={`${isCafe(blog) ? blog.cafeName : blog.coffeeName}-${index}`}
                  sx={{ ml: 3 }}
                >
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      {isCafe(blog) ? <TableBarIcon /> : <CoffeeIcon />}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent
                    sx={{ py: "2px", px: 2, cursor: "pointer" }}
                    onClick={() =>
                      selectedBlogs.includes(index)
                        ? setSelectedBlogs(
                            selectedBlogs.filter(
                              (selected) => selected !== index,
                            ),
                          )
                        : setSelectedBlogs([...selectedBlogs, index])
                    }
                  >
                    <Collapse in={selectedBlogs.includes(index)} timeout={300}>
                      {isCafe(blog) ? (
                        <CafeBlog {...blog} />
                      ) : (
                        <CoffeeBlog {...blog} />
                      )}
                    </Collapse>
                    <Collapse in={!selectedBlogs.includes(index)} timeout={200}>
                      <>
                        <Typography variant="h6" component="span">
                          {isCafe(blog) ? blog.cafeName : blog.coffeeName}
                        </Typography>
                        <Typography>
                          {new Date(blog.date).toLocaleDateString()}
                        </Typography>
                      </>
                    </Collapse>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Grid>
        <Grid size={12}></Grid>
      </Grid>
    </>
  );
}

export default App;
