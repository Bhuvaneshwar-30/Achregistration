namespace ACH_api.models
{
  public class Bankinfo
  {
    public required string bankname { get; set; }
    public decimal? accountnumber { get; set; }

    public required string bankcode { get; set; }
  }
}
