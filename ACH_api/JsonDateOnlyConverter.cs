using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class JsonDateOnlyConverter : JsonConverter<DateTime>
{
  private const string Format = "yyyy-MM-dd";

  public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
      => DateTime.ParseExact(reader.GetString()!, Format, null);

  public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
      => writer.WriteStringValue(value.ToString(Format));
}
