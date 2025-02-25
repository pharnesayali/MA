using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class Coverage
    {
        public long Id { get; set; }
        public string PlantCode { get; set; } = null!;
        public string ItemCode { get; set; } = null!;
        public DateTime Date { get; set; }
        public int WeekNo { get; set; }
        public int Mrp { get; set; }
        public int Receipt { get; set; }
        public int ClosingStock1 { get; set; }
        public int ActualClosing { get; set; }
        public int ClosingStock2 { get; set; }
        public decimal Coverage1 { get; set; }
        public int AirOrderReceipt { get; set; }
        public decimal Coverage2 { get; set; }
        public decimal Value { get; set; }

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
