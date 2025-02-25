using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public partial class MPlant
    {
        public MPlant()
        {
            Coverages = new HashSet<Coverage>();
            Grns = new HashSet<Grn>();
            Invoices = new HashSet<Invoice>();
            MMrps = new HashSet<MMrp>();
            MPlantItemSuppliers = new HashSet<MPlantItemSupplier>();
            Receipts = new HashSet<Receipt>();
            RrCalculations = new HashSet<RrCalculation>();
            Stocks = new HashSet<Stock>();
            TotalStocks = new HashSet<TotalStock>();
            UserRoles = new HashSet<UserRole>();
            ZlrStocks = new HashSet<ZlrStock>();
        }
        [Key]
        public int Id { get; set; }
        public string Zone { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
        public string PlantName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string? Remark { get; set; }

        public virtual ICollection<Coverage> Coverages { get; set; }
        public virtual ICollection<Grn> Grns { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<MMrp> MMrps { get; set; }
        public virtual ICollection<MPlantItemSupplier> MPlantItemSuppliers { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
        public virtual ICollection<RrCalculation> RrCalculations { get; set; }
        public virtual ICollection<Stock> Stocks { get; set; }
        public virtual ICollection<TotalStock> TotalStocks { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<ZlrStock> ZlrStocks { get; set; }
    }
}
