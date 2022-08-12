let aStyle = {
  textDecoration: "none",
  color: "#000",
};
function SaderTabelTR({ row }: { row: any }) {
  return (
    <tr>
      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.doc_num}
        </a>
      </td>
      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.doc_date.replace(/T.*/,'')}
        </a>
      </td>
      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.subject}
        </a>
      </td>
      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.gehaas.map((gehaa:any)=>{return (<>{gehaa.name}<br/></>)})}

        </a>
      </td>
      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.SaderOfficer.name}
        </a>
      </td>

      <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.branch.name}
        </a>
      </td>
      
      
      <td>
        <a href={`/wared/${row?.wared?.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          
          {row.wared?row.wared.doc_num:"لايوجد"}
        </a>
      </td>
      
      {/* <td>
        <a href={`/sader/${row.id}`} style={aStyle} target={"_blank"} rel="noreferrer">
          {row.gehaa.name}
        </a>
      </td> */}
       
    </tr>
  );
}
export { SaderTabelTR };
