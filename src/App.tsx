import Button from "@mui/material/Button";
import { getBlog } from "./utils/decryption-helper.ts";
import { Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CafeBlog, CafeBlogData } from "./components/CafeBlog.tsx";
import { CoffeeBlog, CoffeeBlogData } from "./components/CoffeeBlog.tsx";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FlareIcon from "@mui/icons-material/Flare";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

function App() {
  const [password, setPassword] = useState("");

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
  const isCoffee = (obj: MixedType): obj is CoffeeBlogData =>
    "coffeeName" in obj;

  useEffect(() => {
    const load = async () => {
      if (jsonBlog === "") {
        const data =
          (await fetchData(window.location.origin + "/secrets/blog.json")) ??
          "";
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
      <Grid container spacing={2}>
        <Grid size={12} display="flex" justifyContent="center">
          <Typography variant="h2">Cakkii Coffee Blog</Typography>
        </Grid>
        <Grid size={1}></Grid>
        <Grid container size={10}>
          <div>
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
              onClick={async () => {
                const encryptedBlog = await fetchData(
                  window.location.origin + "/base64-enc",
                );
                if (encryptedBlog) {
                  setJsonBlog(getBlog(encryptedBlog, password));
                }
              }}
            >
              Submit
            </Button>
          </div>
          <div>
            <Timeline position="alternate">
              {data.map((blog, index) => (
                <TimelineItem
                  key={`${isCafe(blog) ? blog.cafeName : blog.coffeeName}-${index}`}
                >
                  <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {isCafe(blog) ? blog.cafeName : blog.coffeeName}
                    </Typography>
                    <Typography>
                      {isCafe(blog) ? blog.order : blog.coffeeType}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      {isCafe(blog) ? (
                        <FlareIcon sx={{ color: "#39e75f" }} />
                      ) : (
                        <CoffeeIcon sx={{ color: "#563618" }} />
                      )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent color="text.secondary" sx={{ m: "auto 0" }}>
                    {new Date(blog.date).toLocaleDateString()}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
          <div>
            {data.map((item, index) => (
              <div>
                {isCafe(item) && (
                  <CafeBlog key={`${item.cafeName}-${index}`} {...item} />
                )}
                {isCoffee(item) && (
                  <CoffeeBlog key={`${item.coffeeName}-${index}`} {...item} />
                )}
              </div>
            ))}
          </div>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1">
            This is the footer and a second test commit!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
