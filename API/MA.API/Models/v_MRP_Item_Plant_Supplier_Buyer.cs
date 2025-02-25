using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class v_MRP_Item_Plant_Supplier_Buyer
    {
        [Key]
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public int Year { get; set; }
        public decimal M1 { get; set; }
        public decimal M2 { get; set; }
        public decimal M3 { get; set; }
        public decimal M4 { get; set; }
        public decimal M5 { get; set; }
        public decimal M6 { get; set; }
        public decimal M7 { get; set; }
        public decimal M8 { get; set; }
        public decimal M9 { get; set; }
        public decimal M10 { get; set; }
        public decimal M11 { get; set; }
        public decimal M12 { get; set; }


    }
}
