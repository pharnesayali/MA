using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class ConsumptionReport
    {
        public long Id { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public string DocumentNo { get; set; } = null!;
        public string MRPController { get; set; } = null!;
        public string MRPControllerName { get; set; } = null!;
        public DateTime PostingDate { get; set; }
        public int BaseQuantity { get; set; }
        public int ConvertedQuantity { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public string MaterialDescription { get; set; }
        public string BaseUnit { get; set; }
        public string ConversionUnit { get; set; }
        public string MaterialGroup { get; set; }
        public string MaterialGroupDescr { get; set; }
        public string Message { get; set; }
    }
}
