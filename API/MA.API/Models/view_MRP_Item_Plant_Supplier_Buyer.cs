using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class view_MRP_Item_Plant_Supplier_Buyer
    {
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public int Year { get; set; }
        public decimal? P2012_Jan_22 { get; set; }
    }
}
