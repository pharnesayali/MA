using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class M_BuyerSupplier
    {
        [Key]
        public long Id { get; set; } 
        public string SupplierCode { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }

    }
}
