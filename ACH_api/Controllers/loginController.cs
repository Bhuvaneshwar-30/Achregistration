using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using WebApplication1.models;


namespace WebApplication1.Controllers
{
  [Route("api")]
  [ApiController]
  
  public class loginController : Controller 
  {
    private readonly string _connectionString;

    public loginController(IConfiguration configuration)
    {
      _connectionString = configuration.GetConnectionString("ACHConnection")!;
    }

    private SqlConnection GetConnection()
    {
      return new SqlConnection(_connectionString);
    }


    [HttpPost("insert")]
    public IActionResult ACHloginSavedData([FromBody] ACHrequestDto aCHrequestDto)
    {
      using var connection = GetConnection();
      using var command = new SqlCommand("sp_ACHloginSavedData", connection)
      {
        CommandType = CommandType.StoredProcedure
      };



      command.Parameters.AddWithValue("@Asflag", aCHrequestDto.Asflag);


      command.Parameters.AddWithValue("@customerID", aCHrequestDto.customerID);



      if (aCHrequestDto.Asflag == "save")
      {
        command.Parameters.AddWithValue("@investorname", aCHrequestDto.investorname);
        command.Parameters.AddWithValue("@execute_through_poa", aCHrequestDto.execute_through_poa);
        command.Parameters.AddWithValue("@bankname", aCHrequestDto.bankname);
        command.Parameters.AddWithValue("@accountnumber", aCHrequestDto.accountnumber);
        command.Parameters.AddWithValue("@branchname", aCHrequestDto.branchname);
        command.Parameters.AddWithValue("@accounttype", aCHrequestDto.accounttype);
        command.Parameters.AddWithValue("@re_enteraccountnumber", aCHrequestDto.re_enteraccountnumber);
        command.Parameters.AddWithValue("@micrnumber", aCHrequestDto.micrnumber);
        command.Parameters.AddWithValue("@ifsccode", aCHrequestDto.ifsccode);
        command.Parameters.AddWithValue("@bankholdername", aCHrequestDto.bankholdername);
        command.Parameters.AddWithValue("@bankholdername1", aCHrequestDto.bankholdername1);
        command.Parameters.AddWithValue("@bankholdername2", aCHrequestDto.bankholdername2);
        command.Parameters.AddWithValue("@achamount", aCHrequestDto.achamount);
        command.Parameters.AddWithValue("@achfromdate", aCHrequestDto.achfromdate);
        command.Parameters.AddWithValue("@achtodate", aCHrequestDto.achtodate);
        command.Parameters.AddWithValue("@mode_of_holder", aCHrequestDto.mode_of_holder);
        command.Parameters.AddWithValue("@dummy3", aCHrequestDto.dummy3);
        command.Parameters.AddWithValue("@dummy4", aCHrequestDto.dummy4);
        command.Parameters.AddWithValue("@dummy5", aCHrequestDto.dummy5);
        command.Parameters.AddWithValue("@dummy6", aCHrequestDto.dummy6);
        command.Parameters.AddWithValue("@dummy7", aCHrequestDto.dummy7);
        command.Parameters.AddWithValue("@dummy8", aCHrequestDto.dummy8);
        command.Parameters.AddWithValue("@dummy9", aCHrequestDto.dummy9);
        command.Parameters.AddWithValue("@dummy10", aCHrequestDto.dummy10);
        command.Parameters.AddWithValue("@dummy11", aCHrequestDto.dummy11);
        command.Parameters.AddWithValue("@dummy12", aCHrequestDto.dummy12);
        command.Parameters.AddWithValue("@dummy13", aCHrequestDto.dummy13);
        command.Parameters.AddWithValue("@dummy14", aCHrequestDto.dummy14);
        command.Parameters.AddWithValue("@dummy15", aCHrequestDto.dummy15);
        command.Parameters.AddWithValue("@dummy16", aCHrequestDto.dummy16);
        command.Parameters.AddWithValue("@dummy17", aCHrequestDto.dummy17);
        command.Parameters.AddWithValue("@dummy18", aCHrequestDto.dummy18);
        command.Parameters.AddWithValue("@dummy19", aCHrequestDto.dummy19);
        command.Parameters.AddWithValue("@dummy20", aCHrequestDto.dummy20);
      }

      connection.Open();
      command.ExecuteNonQuery();
      return Ok();

    }

    [HttpPost("get")]
    public IActionResult ACHloginGetData([FromBody] ACHresponseDto.Getdata getdata)
    {
      using var connection = GetConnection();
      using var command = new SqlCommand("sp_ACHloginSavedData", connection)
      {
        CommandType = CommandType.StoredProcedure
      };

      if (getdata.flag == "Locate")
      {
        command.Parameters.AddWithValue("@Asflag", "Locate");
      }
      else if(getdata.flag == "save")
      {
        command.Parameters.AddWithValue("@Asflag", "save");
      }

        
      command.Parameters.AddWithValue("@customerID", getdata.custid);

      SqlDataAdapter adapter = new SqlDataAdapter(command);
      DataTable dt = new DataTable();

      adapter.Fill(dt);

      if (dt.Rows.Count == 0 && getdata.flag == "Locate")
      {
        return Ok(new List<object>());
      }
       

      var resultList = new List<object>();

      foreach (DataRow row in dt.Rows)
      {
        var record = new
        {
          customerID = row["customerID"]?.ToString(),
          investorname = row["investorname"]?.ToString(),
          bankname = row["bankname"]?.ToString(),
          accountnumber = row["accountnumber"]?.ToString(),
          branchname = row["branchname"]?.ToString(),
          accounttype = row["accounttype"]?.ToString(),
          re_enteraccountnumber = row["re_enteraccountnumber"]?.ToString(),
          micrnumber = row["micrnumber"]?.ToString(),
          ifsccode = row["ifsccode"]?.ToString(),
          bankholdername = row["bankholdername"]?.ToString(),
          bankholdername1 = row["bankholdername1"]?.ToString(),
          bankholdername2 = row["bankholdername2"]?.ToString(),
          achamount = row["achamount"]?.ToString(),
          achfromdate = row["achfromdate"] != DBNull.Value
        ? Convert.ToDateTime(row["achfromdate"]).ToString("yyyy-MM-dd")
        : null,
          achtodate = row["achtodate"] != DBNull.Value
        ? Convert.ToDateTime(row["achtodate"]).ToString("yyyy-MM-dd")
        : null,
          mode_of_holder = row["mode_of_holder"]?.ToString()
        };


        resultList.Add(record);
      }

      return Ok(resultList);
    }

    [HttpPost ("Edit")]
    public IActionResult ACHloginEditData([FromBody] ACHEditDto aCHEditDto)
    {
      using var connection = GetConnection();
      using var command = new SqlCommand("sp_ACHloginSavedData", connection)
      {
        CommandType = CommandType.StoredProcedure
      };
      command.Parameters.AddWithValue("@Asflag", "Edit");
      command.Parameters.AddWithValue("@customerID", aCHEditDto.customerID);


      command.Parameters.AddWithValue("@investorname", aCHEditDto.investorname);
      command.Parameters.AddWithValue("@execute_through_poa", aCHEditDto.execute_through_poa);
      command.Parameters.AddWithValue("@bankname", aCHEditDto.bankname);
      command.Parameters.AddWithValue("@accountnumber", aCHEditDto.accountnumber);
      command.Parameters.AddWithValue("@branchname", aCHEditDto.branchname);
      command.Parameters.AddWithValue("@accounttype", aCHEditDto.accounttype);
      command.Parameters.AddWithValue("@re_enteraccountnumber", aCHEditDto.re_enteraccountnumber);
      command.Parameters.AddWithValue("@micrnumber", aCHEditDto.micrnumber);
      command.Parameters.AddWithValue("@ifsccode", aCHEditDto.ifsccode);
      command.Parameters.AddWithValue("@bankholdername", aCHEditDto.bankholdername);
      command.Parameters.AddWithValue("@bankholdername1", aCHEditDto.bankholdername1);
      command.Parameters.AddWithValue("@bankholdername2", aCHEditDto.bankholdername2);
      command.Parameters.AddWithValue("@achamount", aCHEditDto.achamount);
      command.Parameters.AddWithValue("@achfromdate", aCHEditDto.achfromdate);
      command.Parameters.AddWithValue("@achtodate", aCHEditDto.achtodate);
      command.Parameters.AddWithValue("@mode_of_holder", aCHEditDto.mode_of_holder);

      connection.Open();
      command.ExecuteNonQuery();
      return Ok(new { status = "success", message = "Data updated successfully", customerID = aCHEditDto.customerID });


    }


      

  }
}

  


      
    

