using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class ZlrStock
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public int Quantity { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
