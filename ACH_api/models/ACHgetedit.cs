using System.Text.Json.Serialization;

namespace ACH_api.models
{
  public class ACHgetedit
  {
    [JsonPropertyName("bankname")]
    public required string bankname { get; set; }

    [JsonPropertyName("branchname")]
    public required string branchname { get; set; }

    [JsonPropertyName("accounttype")]
    public required string accounttype { get; set; }

    [JsonPropertyName("ifsccode")]
    public required string ifsccode { get; set; }

    [JsonPropertyName("micrnumber")]
    public decimal? micrnumber { get; set; }

    [JsonPropertyName("bankholdername")]
    public required string bankholdername { get; set; }

    [JsonPropertyName("accountnumber")]
    public decimal? accountnumber { get; set; }

    [JsonPropertyName("bankcode")]
    public required string bankcode { get; set; }

    [JsonPropertyName("achamount")]
    public decimal achamount { get; set; }

    [JsonPropertyName("achfromdate")]
    public DateTime? achfromdate { get; set; }

    [JsonPropertyName("achtodate")]
    public DateTime? achtodate { get; set; }

    [JsonPropertyName("bankholdername1")]

    public required string bankholdername1 { get; set; }

    [JsonPropertyName("bankholdername2")]

    public required string bankholdername2 { get; set; }
  }
}
