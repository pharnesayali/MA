using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class MPlantItemSupplier
    {
        public long Id { get; set; }
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string SupplierName { get; set; } = null!;
        public string? Location { get; set; }
        public string Distance { get; set; } = null!;
        public double? PitchTime { get; set; } 
        public double? TransitLeadTime { get; set; }
        public double? SupplierLeadTime { get; set; }
        public double? VariationInSupply { get; set; }
        public double? InternalLeadTime { get; set; }
        public decimal? SOB { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
