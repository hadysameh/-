import { dbConnection } from "../db";
// import dateFormat from 'date-format'
class WaredRepo {
  public static async getById(id: string | number): Promise<any> {
    const sqlStatment = "";

    return new Promise((resolve: any, reject: any) => {
      dbConnection.execute(
        "SELECT * FROM `wared` WHERE `id` = ? ",
        [id],
        function (err, results, fields) {
          console.log({ results });
          resolve(results);
          if (err) {
            reject(err);
          }
        }
      );
    });

    // return [rows, fields]
  }

  public static async get(pageNum: any, numOfRecords: any): Promise<any> {
    // limit=skip=10
    // const sqlStatment = `
    // SELECT *
    // FROM wared
    // inner JOIN wared_officers
    // WHERE wared.id=wared_officers.wared_id

    // ORDER BY wared.doc_date DESC
    // limit ${numOfRecords} OFFSET ${pageNum*numOfRecords}
    // `;
    const sqlStatment = `
    SELECT a.id,a.doc_num, a.doc_dept_num ,a.deliver_date, a.register_date, a.doc_date , a.subject ,
    g.name as gehaaName,  a.deadline  
    FROM wared a , gehaa g 
    WHERE a.gehaa_id = g.id 
    ORDER BY a.register_date DESC
    limit ${numOfRecords} OFFSET ${pageNum * numOfRecords}
    `;
    // const sqlStatment3 = `
    // SELECT g.name
    // FROM gehaa g
    // limit ${limit} OFFSET ${skip}

    // `;
    // console.log({ sqlStatment2 });
    return new Promise((resolve: any, reject: any) => {
      dbConnection.execute(
        sqlStatment,

        function (err, results, fields) {
          // console.log({ results });
          resolve(results);
          if (err) {
            reject(err);
          }
        }
      );
    });

    // return [rows, fields]
  }

  public static async getSearchOptions(
    searchParams: any | null = null
  ): Promise<any> {
    let getGehaatSqlStatment = `select id,name from gehaa order by id`;
    let getBranchesSqlStatment = `select id, name from branches order by id`;
    let getOfficersSqlStatment = `select id,name from officers order by id`;
    const getGehaat = async () => {
      return new Promise((resolve: any, reject: any) => {
        dbConnection.execute(getGehaatSqlStatment, function (
          err,
          results,
          fields
        ) {
          // console.log({ results });
          resolve(results);
          if (err) {
            reject(err);
          }
        });
      });
    };
    const getBranches = async () => {
      return new Promise((resolve: any, reject: any) => {
        dbConnection.execute(getBranchesSqlStatment, function (
          err,
          results,
          fields
        ) {
          // console.log({ results });
          resolve(results);
          if (err) {
            reject(err);
          }
        });
      });
    };
    const getOfficers = async () => {
      return new Promise((resolve: any, reject: any) => {
        dbConnection.execute(getOfficersSqlStatment, function (
          err,
          results,
          fields
        ) {
          // console.log({ results });
          resolve(results);
          if (err) {
            reject(err);
          }
        });
      });
    };
    return new Promise((resolve: any, reject: any) => {
      Promise.all([getGehaat(), getBranches(), getOfficers()])
        .then((values) => {
          let result = {
            gehaat: values[0],
            branches: values[1],
            officers: values[2],
          };
          // console.log(values);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  public static async getWithParams(searchParams: any): Promise<any> {
    const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
    let numberOfRecords = 20;
    let numberOfOffsetRecords = 0;
    console.log({ searchParams });
    const addDaysToDate = (date: string, numOfDays: any) => {
      let tempDate = new Date(date);
      tempDate.setDate(tempDate.getDate() + Number(numOfDays));
      console.log(
        new Date(tempDate).toISOString().slice(0, 19).replace(/T.*/, ""),
        {
          date,
          numOfDays,
        }
      );
      let result = new Date(tempDate)
        .toISOString()
        .slice(0, 19)
        .replace(/T.*/, "");
      console.log({ result });
      return result;
    };
    return new Promise((resolve: any, reject: any) => {
      let querySearchParams: string[] = [];

      if (searchParams.docNum) {
        querySearchParams.push(`w.doc_num = ${searchParams.docNum}`);
      }
      if (searchParams.docDeptNum) {
        querySearchParams.push(`w.doc_dept_num = ${searchParams.docDeptNum}`);
      }
      if (searchParams.gehaaId) {
        querySearchParams.push(`w.gehaa_id = ${searchParams.gehaaId}`);
      }
      if (searchParams.subject) {
        querySearchParams.push(`w.subject LIKE '%${searchParams.subject}%' `);
      }
      if (searchParams.branchId) {
        querySearchParams.push(`wb.branches_id = ${searchParams.branchId}`);
      }
      if (searchParams.officerId) {
        querySearchParams.push(`wo.officers_id = ${searchParams.officerId}`);
      }
      if (searchParams.mokatbaDate) {
        querySearchParams.push(`w.doc_date = '${searchParams.mokatbaDate}'`);
      }

      if (searchParams.withinExcutionTimeType == "1") {
        if (searchParams.DaysBeforeExecution) {
          querySearchParams.push(
            `w.docDeadline <= '${addDaysToDate(
              todaysDate,
              searchParams.DaysBeforeExecution
            )}' AND w.closedSader_id is NULL AND w.known = 0`
          );
        }
      } else if (searchParams.withinExcutionTimeType == "2") {
        if (searchParams.DaysBeforeExecution) {
          querySearchParams.push(
            // `w.docDeadline > '${todaysDate}' AND w.closedSader_id is NULL`

            `w.docDeadline > '${addDaysToDate(
              todaysDate,
              searchParams.DaysBeforeExecution
            )}' AND w.closedSader_id is NULL`
          );
        }
      }
      //TODO
      // if(searchParams.withinExcutionTimeType!=='0'){
      //   querySearchParams.push(`ORDER BY w.docDeadline DESC`);
      // }
      // else {
      //   querySearchParams.push(`ORDER BY w.docDeadline DESC`);

      // }

      if (searchParams.numOfRecords) {
        numberOfRecords = Number(searchParams.numOfRecords);
        if (searchParams.pageNum) {
          numberOfOffsetRecords =
            Number(searchParams.numOfRecords) * Number(searchParams.pageNum);
        }
      }
      const getOrderByComlumn = () => {
        console.log(searchParams.withinExcutionTimeType)
        if (searchParams.withinExcutionTimeType !== "0") {
          return `ORDER BY w.docDeadline DESC`
        }
        else {
          return  `ORDER BY w.register_date DESC`

        }
      };
      let sqlStatment2 = `
      SELECT DISTINCT 
      w.id,w.doc_num, w.doc_dept_num ,w.deliver_date, w.register_date, w.doc_date ,
      w.subject , g.name as gehaaName, w.docDeadline 
      FROM wared w 
      left JOIN gehaa g ON g.id = w.gehaa_id 
      left JOIN wared_branches wb ON w.id = wb.wared_id 
      left JOIN wared_officers wo ON w.id = wo.wared_id
      
      ${
        querySearchParams.length > 0
          ? "WHERE " + querySearchParams.join(" AND ")
          : " "
      }

      ${getOrderByComlumn()}
      limit ${numberOfRecords}  offset ${numberOfOffsetRecords}
    `;

      console.log(sqlStatment2);
      dbConnection.execute(sqlStatment2, function (err, results, fields) {
        resolve(results);
        if (err) {
          reject(err);
        }
      });
    });
  }
}
export default WaredRepo;
