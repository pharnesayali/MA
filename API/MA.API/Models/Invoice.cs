using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class Invoice
    {
        public long Id { get; set; }
        public string PlantCode { get; set; } = null!;
        public string ItemCode { get; set; } = null!;

        public string Description { get; set; } = null!;

        
        public string SupplierCode { get; set; } = null!;
        public string PONumber { get; set; } = null!;
        public string InvoiceNumber { get; set; } = null!;
        public DateTime InvoiceDate { get; set; }
        public string? JobNumber { get; set; }
        public string? BLNumber { get; set; }
        public string? OrderName { get; set; }
        public string? Mode { get; set; }
        public string? MPNNumber { get; set; }
        public int Quantity { get; set; }
        public decimal PartValue { get; set; }
        public DateTime ExpectedArrivalAtFactory { get; set; }
        public int WeekNumber { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public DateTime ExpectedArrivalDateAtPort { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; } = null!;
        public long? GRNId { get; set; }
        public bool IsFullyDelivered { get; set; }

        public virtual Grn? Grn { get; set; }
        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
