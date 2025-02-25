using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class Grn
    {
        public Grn()
        {
            Invoices = new HashSet<Invoice>();
        }

        public long Id { get; set; }
        public string PlantCode { get; set; } = null!;
        public string ItemCode { get; set; } = null!;
        public int MovementTypeId { get; set; }
        public DateTime EntryDate { get; set; }
        public string MaterialDocument { get; set; } = null!;
        public DateTime PostingDate { get; set; }
        public string InvoiceNumber { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal AmountInLc { get; set; }
        public string Ponumber { get; set; } = null!;
        public string Grnnumber { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MMovementType MovementType { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
