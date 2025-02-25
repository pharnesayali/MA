using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class MRP
    {
        [Key]
        //public string ItemCode { get; set; } = null!;
        //public string PlantCode { get; set; } = null!;
        //public string SupplierCode { get; set; } = null!;
        //public string BuyerCode { get; set; } = null!;
        //public int Year { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        


    }
}
