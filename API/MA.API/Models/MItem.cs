using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class MItem
    {
        public MItem()
        {
            Coverages = new HashSet<Coverage>();
            Grns = new HashSet<Grn>();
            Invoices = new HashSet<Invoice>();
            MItemSuppliers = new HashSet<MItemSupplier>();
            MPlantItemSuppliers = new HashSet<MPlantItemSupplier>();
            Receipts = new HashSet<Receipt>();
            RrCalculations = new HashSet<RrCalculation>();
            Stocks = new HashSet<Stock>();
            TotalStocks = new HashSet<TotalStock>();
            ZlrStocks = new HashSet<ZlrStock>();
        }

        public int Id { get; set; }
        public string ItemCode { get; set; } = null!;
        public string TPartNumber { get; set; }
        public string? ParentPart { get; set; }
        public string Description { get; set; } = null!;
        public string Source { get; set; } = null!;
        public string Maker { get; set; } = null!;
        public string MakerPartNumber { get; set; } = null!;
        public string Commodity { get; set; } = null!;
        public decimal Price { get; set; }
        public string Currency { get; set; } = null!;
        public decimal RatePerUnit { get; set; }
        public string UOM { get; set; } = null!;
        public int MOQ { get; set; }
        public int SPQ { get; set; }
        public decimal LeadTime { get; set; }
        public string IncoTerm { get; set; } = null!;
        public string? UnitWeight { get; set; }
        public string DispatchLocation { get; set; } = null!;
        public string OriginCountry { get; set; } = null!;
        
        public string PaymentTerms { get; set; } = null!;
        public string? CostApproval { get; set; }
        public string? Remarks { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Coverage> Coverages { get; set; }
        public virtual ICollection<Grn> Grns { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<MItemSupplier> MItemSuppliers { get; set; }
        public virtual ICollection<MPlantItemSupplier> MPlantItemSuppliers { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
        public virtual ICollection<RrCalculation> RrCalculations { get; set; }
        public virtual ICollection<Stock> Stocks { get; set; }
        public virtual ICollection<TotalStock> TotalStocks { get; set; }
        public virtual ICollection<ZlrStock> ZlrStocks { get; set; }
    }
}
