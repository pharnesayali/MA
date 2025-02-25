using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class NewMRP
    {
        [Key]
        public string ItemCode { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string SupplierName { get; set; } = null!;
        public string Unit { get; set; } = null!;
        public string Map { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public string BuyerName { get; set; } = null!;
        public string Project { get; set; } = null!;
        public string Customer { get; set; } = null!;
        
        public JObject? Plants { get; set; }
    }
}
