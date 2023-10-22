import React, { useEffect, useState } from "react";
import "./PredictionBox.css";
import { TwitterEmbed } from "react-social-media-embed";
import Loader from "../Loader/Loader";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PredictionBox = ({ tweet, index }) => {
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tweet) {
      setIsLoading(true);
      const data = {
        user_data: tweet.full_text,
        index: index,
      };
      axios
        .post("http://127.0.0.1:8000/api/get-traits/", data)
        .then((res) => {
          console.log(res.data);
          setPredictions(res.data.response);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
    }
  }, [tweet]);
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="tweet-container">
        <TwitterEmbed url={`${tweet.url}`} width={325} />
      </div>
      <div className="tweet-analysis">
        {isLoading && <Loader />}
        {predictions && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Trait</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Probability</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictions?.map((prediction, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prediction.trait}
                    </TableCell>
                    <TableCell align="right">{prediction.category}</TableCell>
                    <TableCell align="right">
                      {prediction.probability}
                    </TableCell>
                    <TableCell align="right">{prediction.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default PredictionBox;
