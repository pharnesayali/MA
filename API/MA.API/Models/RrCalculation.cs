using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class RrCalculation
    {
        public long Id { get; set; }
        public string PlantCode { get; set; } = null!;
        public string ItemCode { get; set; } = null!;
        public int LeadTimeMonth { get; set; }
        public int LeadTimeWeek { get; set; }
        public int Demand { get; set; }
        public int DemandPerWeek { get; set; }
        public int PitchTimeWeek { get; set; }
        public int PitchTimeConsumption { get; set; }
        public int MinimumOrderQuantity { get; set; }
        public int RevisedPitchTime { get; set; }
        public int NewPitchTimeWeek { get; set; }
        public int NewPitchTimeConsumption { get; set; }
        public int NptcInMoq { get; set; }
        public int BufferStock { get; set; }
        public int SafetyStock { get; set; }
        public int MaxInventory { get; set; }
        public int AverageInventory { get; set; }
        public decimal MaxValue { get; set; }
        public decimal AverageValue { get; set; }
        public decimal CurrentValue { get; set; }
        public string Model { get; set; } = null!;
        public int ActualMaxLevel { get; set; }
        public int ActualAverageLevel { get; set; }
        public decimal ActualAverageValue { get; set; }
        public decimal DailyCostCurrent { get; set; }
        public decimal DailyCostFuture { get; set; }
        public int MaxNumberOfDayFuture { get; set; }
        public string Buyer { get; set; } = null!;
        public string Supplier { get; set; } = null!;

        public virtual MItem ItemCodeNavigation { get; set; } = null!;
        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
    }
}
