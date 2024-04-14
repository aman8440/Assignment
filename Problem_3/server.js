import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import fetch from "node-fetch";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("we are connected");
});

const blockSchema = new mongoose.Schema({
  number: Number,
  timestamp: Number,
  transactions: Number,
  gasPrice: Number,
});

const Block = mongoose.model("Block", blockSchema);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Backend" });
});

// Fetch JSON data from provided
async function fetchData() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/realchoubey/25132ad140df2fffd683db85650e0847/raw/f5bc65516829a183820db2ee010abaedddbcd65e/json-schema.json"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const responseText = await response.text();
    const jsonData = JSON.parse(responseText);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
// GET API to get all tables from JSON structure
app.get("/tables", async (req, res) => {
  try {
    const jsonData = await fetchData();
    if (!jsonData || !jsonData.__schema || !jsonData.__schema.types) {
      return res.status(500).json({ error: "Invalid JSON structure" });
    }

    const tables = jsonData.__schema.types
      .filter(
        (type) =>
          type.entityDefinition.fields !== null &&
          type.entityDefinition.fields !== "" &&
          type.entityDefinition.fields !== undefined &&
          type.entityDefinition.fields.length > 0 &&
          ![
            "max priority fee per gas",
            "status",
            "max fee per gas",
            "nonce",
            "gas used",
          ].includes(type.entityDefinition.name.toLowerCase()) &&
          !type.entityDefinition.name.startsWith("_")
      )
      .map((type) => type.entityDefinition.name);

    res.json({ tables });
  } catch (error) {
    console.error("Error getting tables:", error);
    res.status(500).json({ error: "Failed to get tables" });
  }
});

async function fetchUrl() {
  try {
    const response = await fetch(
      "https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const responseText = await response.text();
    const jsonData = JSON.parse(responseText);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
app.get("/averageGasPriceOfDay", async (req, res) => {
  try {
    const jsonData = await fetchUrl();
    if (!jsonData) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const transactions = jsonData;

    const transactionsByDay = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.Timestamp);
      const day = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (!transactionsByDay[day]) {
        transactionsByDay[day] = [];
      }
      transactionsByDay[day].push(transaction.Count);
    });

    const averageGasPriceOfDay = {};
    for (const day in transactionsByDay) {
      const gasPrices = transactionsByDay[day];
      const averageGasPrice =
        gasPrices.reduce((total, price) => total + price, 0) / gasPrices.length;
      averageGasPriceOfDay[day] = averageGasPrice;
    }

    res.json({ averageGasPriceOfDay });
  } catch (error) {
    console.error("Error fetching block details:", error);
    res.status(500).json({ error });
  }
});

// GET API to get number of transactions per block
app.get("/transactionsPerBlock", async (req, res) => {
  try {
    const jsonData = await fetchUrl();
    if (!jsonData || !Array.isArray(jsonData)) {
      return res.status(500).json({ error: "Invalid data structure" });
    }
    
    const transactionsPerBlock = jsonData.map((item) => ({
      blockNumber: item.Timestamp,
      transactionsCount: item.Count,
    }));


    res.json({ transactionsPerBlock });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// PUT API to transform current structure and return recent 10 transactions
app.put("/transformData", async (req, res) => {
  try {
    const jsonData = await fetchUrl();
    if (!jsonData || !Array.isArray(jsonData)) {
      return res.status(500).json({ error: "Invalid data structure" });
    }
    const transformedData = jsonData.slice(0, 10).map((item) => {
      const {
        Timestamp,
        BlockHash,
        GasPrice,
        BlockNumber,
        Value,
        Gas,
        From,
        To,
        TransactionHash,
      } = item;
      return {
        Timestamp,
        BlockHash,
        GasPrice,
        BlockNumber,
        Value,
        Gas,
        From,
        To,
        TransactionHash,
      };
    });

    res.json({ transformedData });
  } catch (error) {
    console.error("Error transforming data:", error);
    res.status(500).json({ error: "Failed to transform data" });
  }
});

// GET API to get the block details
app.get("/blockDetails", async (req, res) => {
  try {
    const jsonData = await fetchUrl();
    if (!jsonData || !Array.isArray(jsonData)) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or data format is incorrect" });
    }

    const blockDetails = jsonData.map((block) => {
      const transactionsCount = block.transactions
        ? block.transactions.length
        : 0;
      const totalGasPrice = block.transactions
        ? block.transactions.reduce(
            (acc, transaction) => acc + transaction.gasPrice,
            0
          )
        : 0;
      const averageGasPrice =
        transactionsCount > 0 ? totalGasPrice / transactionsCount : 0;

      return {
        blockNumber: block.number,
        timestamp: block.timestamp,
        averageGasPrice,
        transactionsCount,
      };
    });

    res.json({ blockDetails });
  } catch (error) {
    console.error("Error fetching block details:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data or data format is incorrect" });
  }
});

// GET API to get timestamp and number of transactions for a given block number
app.get("/block/:number", async (req, res) => {
  try {
    const { number } = req.params;
    const blockNumber = parseInt(number);
    const jsonData = await fetchUrl();
    if (!jsonData || !Array.isArray(jsonData)) {
      return res
        .status(500)
        .json({ error: "Failed to fetch data or data format is incorrect" });
    }
    const block = jsonData.find((block) => block.Number === blockNumber);
    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }
    const timestamp = block.Timestamp;
    const transactionsCount = block.Count;
    res.json({ blockNumber, timestamp, transactionsCount });
  } catch (error) {
    console.error("Error fetching block details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
