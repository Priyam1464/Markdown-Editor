import * as React from "react";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Markdown from "../Markdown/Markdown";
import Preview from "../Preview/Preview";
import HtmlMapper from "../../parser/HTMLMapper";
import Tile from "../Tile/Tile";
import EyeOpen from "../../icons/eye-open.svg";
import EyeClosed from "../../icons/eye-close.svg";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Layout({
  updateSaveStatus,
  setPreviewData,
  setMarkdownData,
  markdownData,
  previewData,
  markdownOpen,
  toggleMarkdown,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const onDataChange = (data) => {
    setMarkdownData(data);
    updateSaveStatus(false);
    const textData = data.split("\n").filter((element) => element != "");
    console.log(
      "hh",
      data.split("\n").filter((element) => element != "")
    );
    let htmlMapper = new HtmlMapper(textData);
    setPreviewData(htmlMapper.mapTextArrayToHtml(data));
  };

  return (
    <Grid container>
      {markdownOpen && (
        <Grid item xs={12} sm>
          <Tile title={"MARKDOWN"}>
            {!matches && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleMarkdown(!markdownOpen)}
              >
                <EyeOpen />
              </IconButton>
            )}
          </Tile>
          <Markdown markdownData={markdownData} onDataChange={onDataChange} />
        </Grid>
      )}

      {markdownOpen && matches && (
        <Divider
          orientation="vertical"
          sx={{ height: "auto", minHeight: "100vh" }}
          flexItem
        ></Divider>
      )}
      <Grid item xs={12} sm>
        <Tile title="PREVIEW">
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleMarkdown(!markdownOpen)}
          >
            {markdownOpen ? <EyeOpen /> : <EyeClosed />}
          </IconButton>
        </Tile>
        {previewData && (matches || (!matches && !markdownOpen)) && (
          <>
            <Preview>
              <div dangerouslySetInnerHTML={{ __html: previewData }}></div>
            </Preview>
          </>
        )}
      </Grid>
    </Grid>
  );
}
