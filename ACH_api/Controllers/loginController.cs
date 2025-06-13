        using System.Data;
        using ACH_api.models;
        using Microsoft.AspNetCore.Mvc;
        using Microsoft.Data.SqlClient;
        using WebApplication1.models;
        using System.Text.Json;




    namespace WebApplication1.Controllers
    {
      [Route("api")]
      [ApiController]

      public class LoginController : Controller
      {
        private readonly string _connectionString;

        public LoginController(IConfiguration configuration)
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
          Console.WriteLine("ACHloginSavedData called at: " + DateTime.Now);
          Console.WriteLine("Payload: " + JsonSerializer.Serialize(aCHrequestDto));

          using var connection = GetConnection();
          using var command = new SqlCommand("sp_ACHloginSavedData", connection)
          {
            CommandType = CommandType.StoredProcedure
          };



          command.Parameters.AddWithValue("@Asflag", aCHrequestDto.Asflag ?? (object)DBNull.Value);


          command.Parameters.Add("@customerID", SqlDbType.Int).Value = aCHrequestDto.customerID;




          if (aCHrequestDto.Asflag == "save")
          {
            command.Parameters.AddWithValue("@investorname", aCHrequestDto.investorname ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@execute_through_poa", aCHrequestDto.execute_through_poa ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@bankname", aCHrequestDto.bankname ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@accountnumber", aCHrequestDto.accountnumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@branchname", aCHrequestDto.branchname ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@accounttype", aCHrequestDto.accounttype ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@re_enteraccountnumber", aCHrequestDto.re_enteraccountnumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@micrnumber", aCHrequestDto.micrnumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@ifsccode", aCHrequestDto.ifsccode ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@bankholdername", aCHrequestDto.bankholdername ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@bankholdername1", aCHrequestDto.bankholdername1 ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@bankholdername2", aCHrequestDto.bankholdername2 ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@achamount", aCHrequestDto.achamount ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@achfromdate", aCHrequestDto.achfromdate ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@achtodate", aCHrequestDto.achtodate ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@mode_of_holder", aCHrequestDto.mode_of_holder ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy3", aCHrequestDto.dummy3 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy4", aCHrequestDto.dummy4 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy5", aCHrequestDto.dummy5 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy6", aCHrequestDto.dummy6 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy7", aCHrequestDto.dummy7 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy8", aCHrequestDto.dummy8 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy9", aCHrequestDto.dummy9 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy10", aCHrequestDto.dummy10 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy11", aCHrequestDto.dummy11 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy12", aCHrequestDto.dummy12 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy13", aCHrequestDto.dummy13 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy14", aCHrequestDto.dummy14 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy15", aCHrequestDto.dummy15 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy16", aCHrequestDto.dummy16 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy17", aCHrequestDto.dummy17 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy18", aCHrequestDto.dummy18 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy19", aCHrequestDto.dummy19 ?? (object)DBNull.Value);
            //command.Parameters.AddWithValue("@dummy20", aCHrequestDto.dummy20 ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@bankcode", aCHrequestDto.bankcode ?? (object)DBNull.Value);
          }

          connection.Open();
          Console.WriteLine("Saving ACH with parameters:");
          foreach (SqlParameter p in command.Parameters)
          {
            Console.WriteLine($"{p.ParameterName}: {p.Value}");
          }

          command.ExecuteNonQuery();
          return Ok();

        }

        [HttpPost("get")]
        public IActionResult ACHloginGetData([FromBody] ACHresponseDto.Getdata getdata)
        {
          using var connection = GetConnection();
          connection.Open();

          using var command = new SqlCommand("sp_ACHloginSavedData", connection);
          command.CommandType = CommandType.StoredProcedure;
          command.Parameters.AddWithValue("@Asflag", getdata.flag);
          command.Parameters.AddWithValue("@customerID", getdata.custid);

          using var reader = command.ExecuteReader();

          if (string.Equals(getdata.flag, "Locate", StringComparison.OrdinalIgnoreCase))
          {
            // First result set: achlogin
            var achloginList = new List<object>();
            while (reader.Read())
            {
              achloginList.Add(new
              {
                customerID = reader["customerID"]?.ToString() ?? "",
                investorname = reader["investorname"]?.ToString() ?? "",
                mode_of_holder = reader["mode_of_holder"]?.ToString() ?? "",
                execute_through_poa = reader["execute_through_poa"]?.ToString() ?? "",
                //re_enteraccountnumber = reader["re_enteraccountnumber"]?.ToString() ?? "",
              });
            }

            // Move to next result set: bank_details
            reader.NextResult();
            var bankDetailsList = new List<object>();
            while (reader.Read())
            {
              bankDetailsList.Add(new
              {
                customerID = reader["customerID"]?.ToString() ?? "",
                bankcode = reader["bankcode"]?.ToString() ?? "",
                bankname = reader["bankname"]?.ToString() ?? "",
                accountnumber = reader["accountnumber"]?.ToString() ?? "",
                branchname = reader["branchname"]?.ToString() ?? "",
                accounttype = reader["accounttype"]?.ToString() ?? "",
                micrnumber = reader["micrnumber"]?.ToString() ?? "",
                ifsccode = reader["ifsccode"]?.ToString() ?? "",
                bankholdername = reader["bankholdername"]?.ToString() ?? "",
                bankholdername1 = reader["bankholdername1"]?.ToString() ?? "",
                bankholdername2 = reader["bankholdername2"]?.ToString() ?? "",
                achamount = reader["achamount"]?.ToString() ?? "",
                achfromdate = reader["achfromdate"] != DBNull.Value ? Convert.ToDateTime(reader["achfromdate"]).ToString("yyyy-MM-dd") : null,
                achtodate = reader["achtodate"] != DBNull.Value ? Convert.ToDateTime(reader["achtodate"]).ToString("yyyy-MM-dd") : null
              });
            }

            // Move to next result set: bank master
            reader.NextResult();
            var bankMasterList = new List<object>();
            while (reader.Read())
            {
              bankMasterList.Add(new
              {
                bankcode = reader["bankcode"]?.ToString() ?? "",
                master_bankname = reader["master_bankname"]?.ToString() ?? ""
              });
                }
            if (!achloginList.Any() && !bankDetailsList.Any() && !bankMasterList.Any())
            {
              return NotFound(new { message = "Customer ID not found or no data available." });
            }

            return Ok(new
                {
                  achlogin = achloginList,  
                  bankDetails = bankDetailsList,
                  bankMaster = bankMasterList
                });
            }
            else
            {
                // Handle other flags (like "save") accordingly
            return BadRequest("Invalid flag value.");
            }
        }


        [HttpPost("Edit")]
        public IActionResult ACHloginEditData([FromBody] ACHEditDto aCHEditDto)
        {
          if (string.IsNullOrWhiteSpace(aCHEditDto.Asflag))
          {
            return BadRequest("Flag parameter is required.");
          }


          using var connection = GetConnection();
          connection.Open();

          // 1. Execute Edit operation
          using (var editCommand = new SqlCommand("sp_ACHloginSavedData", connection))
          {
            editCommand.CommandType = CommandType.StoredProcedure;

            editCommand.Parameters.AddWithValue("@Asflag", "Edit");
            editCommand.Parameters.AddWithValue("@customerID", aCHEditDto.customerID);
            editCommand.Parameters.AddWithValue("@investorname", (object?)aCHEditDto.investorname ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@execute_through_poa", (object?)aCHEditDto.execute_through_poa ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@bankname", (object?)aCHEditDto.bankname ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@accountnumber", (object?)aCHEditDto.accountnumber ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@branchname", (object?)aCHEditDto.branchname ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@accounttype", (object?)aCHEditDto.accounttype ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@re_enteraccountnumber", (object?)aCHEditDto.re_enteraccountnumber ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@micrnumber", (object?)aCHEditDto.micrnumber ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@ifsccode", (object?)aCHEditDto.ifsccode ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@bankholdername", (object?)aCHEditDto.bankholdername ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@bankholdername1", (object?)aCHEditDto.bankholdername1 ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@bankholdername2", (object?)aCHEditDto.bankholdername2 ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@achamount", (object?)aCHEditDto.achamount ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@achfromdate", (object?)aCHEditDto.achfromdate ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@achtodate", (object?)aCHEditDto.achtodate ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@mode_of_holder", (object?)aCHEditDto.mode_of_holder ?? DBNull.Value);
            editCommand.Parameters.AddWithValue("@bankcode", (object?)aCHEditDto.bankcode ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy3", (object?)aCHEditDto.dummy3 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy4", (object?)aCHEditDto.dummy4 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy5", (object?)aCHEditDto.dummy5 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy6", (object?)aCHEditDto.dummy6 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy7", (object?)aCHEditDto.dummy7 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy8", (object?)aCHEditDto.dummy8 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy9", (object?)aCHEditDto.dummy9 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy10", (object?)aCHEditDto.dummy10 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy11", (object?)aCHEditDto.dummy11 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy12", (object?)aCHEditDto.dummy12 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy13", (object?)aCHEditDto.dummy13 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy14", (object?)aCHEditDto.dummy14 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy15", (object?)aCHEditDto.dummy15 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy16", (object?)aCHEditDto.dummy16 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy17", (object?)aCHEditDto.dummy17 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy18", (object?)aCHEditDto.dummy18 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy19", (object?)aCHEditDto.dummy19 ?? DBNull.Value);
        //editCommand.Parameters.AddWithValue("@dummy20", (object?)aCHEditDto.dummy20 ?? DBNull.Value);



        editCommand.ExecuteNonQuery();
          }

          // 2. Execute Locate operation to get updated data
          using (var locateCommand = new SqlCommand("sp_ACHloginSavedData", connection))
          {
            locateCommand.CommandType = CommandType.StoredProcedure;
            locateCommand.Parameters.AddWithValue("@Asflag", "Locate");
            locateCommand.Parameters.AddWithValue("@customerID", aCHEditDto.customerID);
            using (var reader = locateCommand.ExecuteReader())
            {
              // ---- 1st Result: ACH Login Info ----
              DataTable achLoginTable = new DataTable();
              achLoginTable.Load(reader);

              if (achLoginTable.Rows.Count == 0)
              {
                return NotFound(new { status = "fail", message = "Customer not found after update" });
              }

              var achRow = achLoginTable.Rows[0];

              var achInfo = new
              {
                customerID = achRow["customerID"]?.ToString(),
                investorname = achRow["investorname"]?.ToString(),
                execute_through_poa = achRow["execute_through_poa"]?.ToString(),
                mode_of_holder = achRow["mode_of_holder"]?.ToString(),
                //re_enteraccountnumber = achRow["re_enteraccountnumber"]?.ToString(),
                //dummy3 = achRow["dummy3"]?.ToString(),
                //dummy4 = achRow["dummy4"]?.ToString(),
                //dummy5 = achRow["dummy5"]?.ToString(),
                //dummy6 = achRow["dummy6"]?.ToString(),
                //dummy7 = achRow["dummy7"]?.ToString(),
                //dummy8 = achRow["dummy8"]?.ToString(),
                //dummy9 = achRow["dummy9"]?.ToString(),
                //dummy10 = achRow["dummy10"]?.ToString(),
                //dummy11 = achRow["dummy11"]?.ToString(),
                //dummy12 = achRow["dummy12"]?.ToString(),
                //dummy13 = achRow["dummy13"]?.ToString(),
                //dummy14 = achRow["dummy14"]?.ToString(),
                //dummy15 = achRow["dummy15"]?.ToString(),
                //dummy16 = achRow["dummy16"]?.ToString(),
                //dummy17 = achRow["dummy17"]?.ToString(),
                //dummy18 = achRow["dummy18"]?.ToString(),
                //dummy19 = achRow["dummy19"]?.ToString(),
                //dummy20 = achRow["dummy20"]?.ToString(),
              };

          
              // ---- 2nd Result: Bank Details (can be multiple) ----
              DataTable bankDetailsTable = new DataTable();

                bankDetailsTable.Load(reader);
          

              var bankDetailsList = new List<object>();
              foreach (DataRow row in bankDetailsTable.Rows)
              {
                bankDetailsList.Add(new
                {
                  bankcode = row["bankcode"]?.ToString(),
                  bankname = row["bankname"]?.ToString(),
                  accountnumber = row["accountnumber"]?.ToString(),
                  branchname = row["branchname"]?.ToString(),
                  accounttype = row["accounttype"]?.ToString(),
                  micrnumber = row["micrnumber"]?.ToString(),
                  ifsccode = row["ifsccode"]?.ToString(),
                  bankholdername = row["bankholdername"]?.ToString(),
                  bankholdername1 = row["bankholdername1"]?.ToString(),
                  bankholdername2 = row["bankholdername2"]?.ToString(),
                  achamount = row["achamount"]?.ToString(),
                  achfromdate = row["achfromdate"] != DBNull.Value ? Convert.ToDateTime(row["achfromdate"]).ToString("yyyy-MM-dd") : null,
                  achtodate = row["achtodate"] != DBNull.Value ? Convert.ToDateTime(row["achtodate"]).ToString("yyyy-MM-dd") : null,
                });
              }

              // ---- 3rd Result: Bank Master Info (Optional) ----
              DataTable bankMasterTable = new DataTable();
              bankMasterTable.Load(reader);

              var bankMasterList = new List<object>();
              foreach (DataRow row in bankMasterTable.Rows)
              {
                bankMasterList.Add(new
                {
                  bankcode = row["bankcode"]?.ToString(),
                  master_bankname = row["master_bankname"]?.ToString()
                });
              }

              // ---- Return final combined response ----
              return Ok(new
              {
                status = "success",
                message = "Data located successfully",
                achlogin = new[] { achInfo },
                bankDetails = bankDetailsList,
                bankMaster = bankMasterList
              });
            }
          }
        }


        [HttpGet("bankdetails/{customerId}")]
        public async Task<IActionResult> GetBankDetailsByCustomerIdAsync(int customerId)
        {
          using var connection = GetConnection();

          const string query = @"  
                       SELECT   
                    ISNULL(bankname, '') AS bankname,  
                    ISNULL(branchname, '') AS branchname,  
                    ISNULL(accounttype, '') AS accounttype,  
                    ISNULL(ifsccode, '') AS ifsccode,  
                    ISNULL(micrnumber, 0) AS micrnumber,  
                    ISNULL(bankholdername, '') AS bankholdername,  
                    ISNULL(accountnumber, 0) AS accountnumber,
                    ISNULL(bankcode, '') AS bankcode,
                    ISNULL(achamount, 0) AS achamount,
                    ISNULL(bankholdername1, '') AS bankholdername1,
                    ISNULL(bankholdername2, '') AS bankholdername2,
                    achfromdate,
                    achtodate   
                    FROM bank_details
                    WHERE customerID = @customerId";

          using var command = new SqlCommand(query, connection);
          command.Parameters.AddWithValue("@customerId", customerId);

          await connection.OpenAsync();

          var bankDetailsList = new List<ACHgetedit>();

          using var reader = await command.ExecuteReaderAsync();
          while (await reader.ReadAsync())
          {
            bankDetailsList.Add(new ACHgetedit
            {
              bankname = reader["bankname"].ToString()!,
              branchname = reader["branchname"].ToString()!,
              accounttype = reader["accounttype"].ToString()!,
              ifsccode = reader["ifsccode"].ToString()!,
              micrnumber = reader["micrnumber"] != DBNull.Value ? Convert.ToDecimal(reader["micrnumber"]) : (decimal?)null,
              bankholdername = reader["bankholdername"].ToString()!,
              accountnumber = reader["accountnumber"] != DBNull.Value ? Convert.ToDecimal(reader["accountnumber"]) : (decimal?)null,
              bankcode = reader["bankcode"].ToString()!,
              achamount = reader["achamount"] != DBNull.Value ? (decimal)Convert.ToDecimal(reader["achamount"]) : 0m,
              achfromdate = reader["achfromdate"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(reader["achfromdate"]) : null,
              achtodate = reader["achtodate"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(reader["achtodate"]) : null,
              bankholdername1 = reader["bankholdername1"].ToString()!,
              bankholdername2 = reader["bankholdername2"].ToString()!


            });
          }

          if (bankDetailsList.Count == 0)
            return NotFound($"No bank details found for customer ID {customerId}.");

          return Ok(bankDetailsList);
        }



        [HttpGet("GetBankList")]
          public async Task<IActionResult> GetBankList()
          {
            using var connection = GetConnection();
            const string query = @"SELECT bankname, accountnumber, bankcode FROM bank";

            using var command = new SqlCommand(query, connection);
            await connection.OpenAsync();

            var bankList = new List<Bankinfo>();

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
              bankList.Add(new Bankinfo
              {
                bankcode = reader["bankcode"] == DBNull.Value ? string.Empty : reader["bankcode"].ToString()!,
                bankname = reader["bankname"] == DBNull.Value ? string.Empty : reader["bankname"].ToString()!,
                accountnumber = reader["accountnumber"]! == DBNull.Value ? (decimal?)null : Convert.ToDecimal(reader["accountnumber"]),
              });
            }

            return Ok(bankList);
          }










      }
    }

  


      
    

