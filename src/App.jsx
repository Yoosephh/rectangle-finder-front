import axios from 'axios';
import { useEffect, useState } from 'react'
import styled from 'styled-components';

function App() {
  const initialTableData = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"]
];
  const [area, setArea] = useState(null);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  const [tableData, setTableData] = useState(initialTableData);


  function handleAddRow() {
    setRows(rows + 1);
    setTableData([...tableData, Array(cols).fill("0")]);
  }

  function handleRemoveRow() {
    if (rows > 1) {
      setRows(rows - 1);
      setTableData(tableData.slice(0, -1));
    }
  }

  function handleAddCol() {
    setCols(cols + 1);
    setTableData(tableData.map(row => [...row, "0"]));
  }
console.log(tableData)
  function handleRemoveCol() {
    if (cols > 1) {
      setCols(cols - 1);
      setTableData(tableData.map(row => row.slice(0, -1)));
    }
  }

  function handleChange ( rowIndex, colIndex, value) {
  if (value === "" || value === "0" || value === "1") {
      const newData = [...tableData];
      newData[rowIndex][colIndex] = value;
      setTableData(newData);
    }

  }

  async function handleSubmit() {
    try {
      const response = await axios.post("https://rectangle-finder-back.onrender.com/rectangle", tableData)
      setArea(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Body>
      <Title>Rectangle Finder</Title>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <TbInput
                    type="text"
                    value={cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    maxLength={1}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <BtnContainer>
        <Button4 onClick={handleAddRow}>Adicionar Linha</Button4>
        <Button4 onClick={handleRemoveRow}>Remover Linha</Button4>
        <Button4 onClick={handleAddCol}>Adicionar Coluna</Button4>
        <Button4 onClick={handleRemoveCol}>Remover Coluna</Button4>
      </BtnContainer>
      <Area>
      {area && "Retângulo de maior área: " +  area}
      </Area>
      <SubmitBtn onClick={handleSubmit}>
        Calcular maior retângulo
      </SubmitBtn>
    </Body>
  )
}
const Body = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`
const TbInput = styled.input`
width: 35px;
text-align: center;`


const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`
const Title = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-weight: 400;
  font-style: normal;`

const Button4 = styled.button`
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  &:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

  &:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

  &:focus {
  outline: 1px transparent;
}

  &:before {
  display: none;
}

  &:-webkit-details-marker {
  display: none;
}
`
const SubmitBtn = styled.button`
`
const Area = styled.div`
`
export default App
