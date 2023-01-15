import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import Header from "./components/Header/Header";
import "./App.css";
import Layout from "./components/Layout/Layout";
import useLocalStorage from "./hooks/useLocalStorage";
import HtmlMapper from "./parser/HTMLMapper";
import { welcomeMarkdownData } from "./constants";
import SideBar from "../src/components/SideBar/SideBar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function App() {
  const [latestDoc, setLatestDoc] = useLocalStorage("latestDocument");
  const [documents, setDocuments] = useLocalStorage("documents");
  const [isSaved, setSaved] = useState(latestDoc === null ? false : true);
  const [previewData, setPreviewData] = useState();
  const [markdownData, setMarkdownData] = useState();
  const [fileName, setFileName] = useState();
  const [markdownOpen, setMarkdownOpen] = useState(true);
  const firstRender = useRef(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const greaterThantabletWidth = useMediaQuery("(min-width:768px)");

  console.log("dosss", documents);

  const toggleDrawer = (event) => {
    console.log("drawer");
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setDrawerOpen(!drawerOpen);
  };

  const updateMarkdownAndPreviewData = () => {
    if (latestDoc === null) {
      setFileName("welcome.md");

      const textData = welcomeMarkdownData
        .split("\n")
        .filter((element) => element != "");

      let mapper = new HtmlMapper(textData);
      setMarkdownData(welcomeMarkdownData);
      setPreviewData(mapper.mapTextArrayToHtml());
    } else {
      setFileName(latestDoc);

      setMarkdownData(documents[latestDoc].markdownData);
      setPreviewData(documents[latestDoc].previewData);
    }
  };

  const onFileNameChange = (name) => {
    setFileName(name);
    updateSaveStatus(false);
  };

  useEffect(() => {
    if (isSaved && !firstRender.current) {
      setLatestDoc(fileName);

      setDocuments({
        ...documents,
        [fileName]: { previewData, markdownData, date: new Date() },
      });
    } else if (firstRender) {
      firstRender.current = false;
    }
  }, [isSaved]);

  useEffect(() => {
    updateMarkdownAndPreviewData();
  }, [latestDoc]);

  const updateSaveStatus = (value) => {
    setSaved(value);
  };
  return (
    <ThemeProvider theme={Theme}>
      {
        <>
          <Box
            sx={{
              flexGrow: 1,
              width: drawerOpen ? "80%" : "100%",
              position: drawerOpen ? "absolute" : "static",
              left: drawerOpen && greaterThantabletWidth ? "20%" : "0%",
            }}
          >
            <Header
              updateSaveStatus={updateSaveStatus}
              onFileNameChange={onFileNameChange}
              isSaved={isSaved}
              fileName={fileName}
              onDelete={(fileName) => {
                setLatestDoc(null);
                updateSaveStatus(false);
                const docs = { ...documents };
                delete docs[[fileName]];
                console.log("docs", docs);
                setDocuments(docs);
              }}
              docExists={latestDoc === null ? false : true}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
            <Layout
              markdownData={markdownData}
              setPreviewData={setPreviewData}
              setMarkdownData={setMarkdownData}
              previewData={previewData}
              updateSaveStatus={updateSaveStatus}
              markdownOpen={markdownOpen}
              toggleMarkdown={setMarkdownOpen}
            />
          </Box>
          {drawerOpen && (
            <SideBar
              updateLatestDoc={(fileName) => setLatestDoc(fileName)}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
          )}
        </>
      }
    </ThemeProvider>
  );
}
