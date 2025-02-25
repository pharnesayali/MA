using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class MMrp
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string Zone { get; set; } = null!;
        public short Revision { get; set; }
        public string PlantCode { get; set; } = null!;
        public string ItemCode { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string BuyerCode { get; set; } = null!;
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal Demand { get; set; }
        public string? Project { get; set; }
        public string? Customer { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
       // public JObject? Plants { get; set; }

        public virtual UserRole BuyerCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
