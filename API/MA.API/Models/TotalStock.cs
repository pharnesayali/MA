using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class TotalStock
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string ItemCode { get; set; } = null!;
        public string PlantCode { get; set; } = null!;
       // public int CurrentStock { get; set; }
        public int StoreStock { get; set; }
        public int InTransitStock { get; set; }
        
        public string SLOC { get; set; }
        //public int Zlrtrack { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public int? Unrestricted { get; set; }
        public int? InQualityInsp { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
