using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class Receipt
    {
        public long Id { get; set; }
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public int Year { get; set; }
        public int Month { get; set; }
        public int WeeklyDemand { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public int WeekNumber { get; set; }
        public string? UOM { get; set; }
        public string? Stock_item_type { get; set; }
        public string? Supplier { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
