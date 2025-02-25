namespace MA.API.Models
{
    public class MitemExt: MItem
    {
        
        public string? OldSupplierName { get; set; }

        public string? OldSupplierCode { get; set; }
        public string? SupplierCode { get; set; } = null!;

        public string? SupplierName { get; set; } = null!;

        public string? SourceChangedate { get; set; } = null!;

        
    }
}
