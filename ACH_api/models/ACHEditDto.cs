  using System.Text.Json.Serialization;

  namespace WebApplication1.models
  {
    public class ACHEditDto
    {
      #region Properties



      [JsonPropertyName("Asflag")]
      public required string Asflag { get; set; }

      [JsonPropertyName("customerId")]
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

      [JsonPropertyName("bankcode")]
      public required string bankcode { get; set; }

    #endregion
  }
}


