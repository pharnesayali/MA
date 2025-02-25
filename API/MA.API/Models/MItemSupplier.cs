using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class MItemSupplier
    {
        public int Id { get; set; }
        public string ItemCode { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string? SupplierName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
    }
}
