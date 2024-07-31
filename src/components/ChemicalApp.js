import React, { useState } from "react";
import { Container, Input, ListGroupItem, Button, ListGroup } from "reactstrap";
export default function ChemicalApp() {
const [text, setText] = useState("")
const [isEdit,setIsEdit] =useState(false)
const [list, setList] = useState([
    { id: 1, name: "Hydrochloric Acid", formula: "HCl" },
    { id: 2, name: "Sodium Chloride", formula: "NaCl" },
    { id: 3, name: "Sulfuric Acid", formula: "H2SO4" },
    { id: 4, name: "Ammonia", formula: "NH3" },
    { id: 5, name: "Ethanol", formula: "C2H5OH" },
  ]);
  const deleteById = (id) => {
    setList(list.filter((chemical) => chemical.id !== id));
  };
  const reChecked = (id) => {
    let newList = list.map((chemical) =>
      chemical.id === id ? { ...chemical, checked: !chemical.checked } : chemical
    );
    setList(newList);
  };
  const renameChemical = (id, name) => {
    let newList = list.map((chemical) =>
      chemical.id === id ? { ...chemical, name: name } : chemical
    );
    setList(newList);
  };
  const addNewChemical = (name) => {
    let idMax = list.reduce(
      (max_value, chemical) => Math.max(max_value, chemical.id),
      -Infinity
    );
    setList([...list, { id: list.length == 0 ? 1 : idMax + 1, name: name }]);
  };
  return (
    <div>
      <Container className="w-50 text-center p-5 my-5">
        <h1>Chemical List</h1>
        <Input
          className="my-2 px-4 "
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
                addNewChemical(text);
                setText("");
            }
          }}
        />
        <ListGroup>
        {list.map((item, index) =>(
      <ListGroupItem key={index} className="chemical-item">
        <div>

        {
            !isEdit?<p onDoubleClick={()=>setIsEdit(true)}>{item.name}</p>:
            <Input
                value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{
                    if(e.key=="Enter"){
                        setIsEdit(false)
                        renameChemical(item.id,text)
                    }
                }}
            />
        }
        </div>
        <Button color="danger" onClick={()=>(deleteById(item.id))}><i className="fa-solid fa-close"></i> Xoa Hop Chat</Button>
    
      </ListGroupItem>
      ))}
      </ListGroup>
      </Container>
      
    </div>
  );
}
