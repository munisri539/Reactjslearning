import React from "react";

const arObj =[
    {id:18,name:"Bhanu",city:"alwal"},
    {id:5,name:"Teja",city:"alwal"},
    {id:8,name:"Joanna",city:"alwal"},
];

class ArrayMap extends React.Component{
    render(){
        return(
            <div>
               { arObj.map((item) => (
                    <li>
                        {item.id}-{item.name}-{item.city}
                    </li>
                ))}
            </div>
        )
    }
}
export default ArrayMap