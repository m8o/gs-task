import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Viewer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import RoundButon from "../UI/RoundButton/RoundButon";

const Viewer = (props) => {
  const [pageNumbers, setPageNumbers] = useState({
    firstSide: 1,
    secondSide: 2,
  });
  const [scale, setScale] = useState(1);

  function scalehandler(action) {
    switch (action) {
      case "enlarge":
        setScale((currentScale) => +(currentScale + 0.1).toFixed(1));
        break;

      default:
        if (scale > 0.1) {
          setScale((currentScale) => +(currentScale - 0.1).toFixed(1));
        }
        break;
    }
  }

  function pageSwitchHandler(action) {
    switch (action) {
      case "foward":
        if (props.pageCount > pageNumbers.secondSide + 2) {
          setPageNumbers((currentPages) => ({
            firstSide: currentPages.firstSide + 2,
            secondSide: currentPages.secondSide + 2,
          }));
        } else if (props.pageCount >= pageNumbers.secondSide + 1) {
          setPageNumbers((currentPages) => {
            return {
              firstSide: currentPages.firstSide + 1,
              secondSide: currentPages.secondSide + 1,
            };
          });
        }
        break;

      default:
        if (pageNumbers.firstSide - 2 > 0) {
          setPageNumbers((currentPages) => {
            return {
              firstSide: currentPages.firstSide - 2,
              secondSide: currentPages.secondSide - 2,
            };
          });
        } else if (pageNumbers.firstSide - 1 > 0) {
          setPageNumbers((currentPages) => {
            return {
              firstSide: currentPages.firstSide - 1,
              secondSide: currentPages.secondSide - 1,
            };
          });
        }
        break;
    }
  }

  useEffect(() => {
    if (typeof props.pageCount === "number") {
      if (props.pageCount === 1) {
        setPageNumbers({
          firstSide: 1,
          secondSide: null,
        });
      } else {
        setPageNumbers({
          firstSide: 1,
          secondSide: 2,
        });
      }
    }

    return () => {};
  }, [props.pageCount, props.pdfFile]);

  if (!props.pdfFile) {
    return <div className="gs_task--status">No PDFs loaded</div>;
  } else {
    return (
      <div className="gs_task_viewer">
        <div className={"gs_task_viewer--document-header"}>
          <RoundButon
            onClick={() => {
              scalehandler("");
            }}
          >
            –
          </RoundButon>
          {(scale * 100).toFixed(0)}%
          <RoundButon
            onClick={() => {
              scalehandler("enlarge");
            }}
          >
            +
          </RoundButon>
        </div>
        <Document
          className={"gs_task_viewer--document "}
          file={props.pdfFile}
          onLoadSuccess={props.onLoadSuccess}
        >
          {props.pageCount && (
            <>
              <Page
                scale={scale}
                className={"gs_task_viewer--document--page"}
                pageNumber={pageNumbers.firstSide}
              />
              {pageNumbers.secondSide && (
                <Page
                  scale={scale}
                  className={"gs_task_viewer--document--page"}
                  pageNumber={pageNumbers.secondSide}
                />
              )}
            </>
          )}
        </Document>
        {props.pageCount && (
          <div className="gs_task_viewer--document_footer">
            {pageNumbers.secondSide && (
              <RoundButon
                onClick={() => {
                  pageSwitchHandler("back");
                }}
              >
                {"<"}
              </RoundButon>
            )}
            {pageNumbers.firstSide}{" "}
            {pageNumbers.secondSide && " - " + pageNumbers.secondSide} /
            {props.pageCount}
            {pageNumbers.secondSide && (
              <RoundButon
                onClick={() => {
                  pageSwitchHandler("foward");
                }}
              >
                {">"}
              </RoundButon>
            )}
          </div>
        )}
      </div>
    );
  }
};

Viewer.propTypes = {
  pdfFile: PropTypes.string,
  onLoadSuccess: PropTypes.func,
  pageCount: PropTypes.number,
};

export default Viewer;
