namespace MA.API.Models
{
    public class MBuyerSupplierEXT:M_BuyerSupplier
    {
        public int Id { get; set; }
        public string SupplierName { get; set; } = null!;

        public string PlantCode { get; set; } = null!;

    }
}
