using System.Text.Json.Serialization;

namespace WebApplication1.models
{
  public class ACHrequestDto
  {
    #region Properties



    [JsonPropertyName("Asflag")]
    public required string Asflag { get; set; }

    [JsonPropertyName("customerID")]
    public int customerID { get; set; }

    [JsonPropertyName("investorname")]
    public required string investorname { get; set; }

    [JsonPropertyName("execute_through_poa")]
    public required string execute_through_poa { get; set; }

    [JsonPropertyName("bankname")]
    public required string bankname { get; set; }

    [JsonPropertyName("accountnumber")]
    public decimal? accountnumber { get; set; }

    [JsonPropertyName("branchname")]
    public required string branchname { get; set; }

    [JsonPropertyName("accounttype")]
    public required string accounttype { get; set; }

    [JsonPropertyName("re_enteraccountnumber")]
    public decimal? re_enteraccountnumber { get; set; }
    

    [JsonPropertyName("micrnumber")]
    public decimal? micrnumber { get; set; }

    [JsonPropertyName("ifsccode")]
    public required string ifsccode { get; set; }

    [JsonPropertyName("bankholdername")]
    public required string bankholdername { get; set; }

    [JsonPropertyName("bankholdername1")]
    public required string bankholdername1 { get; set; }

    [JsonPropertyName("bankholdername2")]
    public required string bankholdername2 { get; set; }

    [JsonPropertyName("achamount")]
    public decimal? achamount { get; set; }


    [JsonPropertyName("achfromdate")]
    public DateTime? achfromdate { get; set; }

    [JsonPropertyName("achtodate")]
    public DateTime? achtodate { get; set; }

    [JsonPropertyName("mode_of_holder")]
    public required string mode_of_holder { get; set; }

    //[JsonPropertyName("dummy3")]
    //public required string dummy3 { get; set; }

    //[JsonPropertyName("dummy4")]
    //public required string dummy4 { get; set; }

    //[JsonPropertyName("dummy5")]
    //public required string dummy5 { get; set; }

    //[JsonPropertyName("dummy6")]
    //public required string dummy6 { get; set; }

    //[JsonPropertyName("dummy7")]
    //public required string dummy7 { get; set; }

    //[JsonPropertyName("dummy8")]
    //public required string dummy8 { get; set; }

    //[JsonPropertyName("dummy9")]
    //public required string dummy9 { get; set; }

    //[JsonPropertyName("dummy10")]
    //public required string dummy10 { get; set; }

    //[JsonPropertyName("dummy11")]
    //public required string dummy11 { get; set; }

    //[JsonPropertyName("dummy12")]
    //public required string dummy12 { get; set; }

    //[JsonPropertyName("dummy13")]
    //public required string dummy13 { get; set; }

    //[JsonPropertyName("dummy14")]
    //public required string dummy14 { get; set; }

    //[JsonPropertyName("dummy15")]
    //public required string dummy15 { get; set; }

    //[JsonPropertyName("dummy16")]
    //public required string dummy16 { get; set; }

    //[JsonPropertyName("dummy17")]
    //public required string dummy17 { get; set; }

    //[JsonPropertyName("dummy18")]
    //public required string dummy18 { get; set; }

    //[JsonPropertyName("dummy19")]
    //public required string dummy19 { get; set; }

    //[JsonPropertyName("dummy20")]

    //public required string dummy20 { get; set; }

    [JsonPropertyName("bankcode")]
    public required string bankcode { get; set; }

    #endregion
  }
}
