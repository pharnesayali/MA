namespace MA.API.Models
{
    public class GRNDTO:Grn
    {
        public string Reference { get; set; } = null!;
        public string StorageLocation { get; set; } = null!;
        public string MovementType { get; set; } = null!;
        public string Vendor { get; set; } = null!;
        public string Material { get; set; } = null!;
        public string PurchaseOrder { get; set; } = null!;
    }
}
