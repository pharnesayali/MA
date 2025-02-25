namespace MA.API.Models
{
    public class M_BuyerSupplierDTO:M_BuyerSupplier
    {
        public int Id { get; set; }
        public string SupplierName { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;


    }
}
