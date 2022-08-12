let aStyle = {
  textDecoration: "none",
  color: "#000",
};
function WaredTabelTR({ row }: { row: any }) {
  return (
    <tr>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.doc_num}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.doc_dept_num}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.subject}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.doc_date?.replace(/T.*/, "")}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.Wared_Officers?.map((officer: any) => {
            return (
              <>
                {officer.name}
                <br />
              </>
            );
          })}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.branches?.map((branch: any) => {
            return (
              <>
                {branch.name}
                <br />
              </>
            );
          })}
        </a>
      </td>

      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.gehaa?.name}
        </a>
      </td>
      <td>
        <a
          href={`/wared/${row.id}`}
          style={aStyle}
          target={"_blank"}
          rel="noreferrer"
        >
          {row.docDeadline ? row.docDeadline.replace(/T.*/, "") : "لا يوجد"}
        </a>
      </td>
    </tr>
  );
}
export { WaredTabelTR };
