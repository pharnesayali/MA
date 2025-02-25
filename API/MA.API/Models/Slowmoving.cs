namespace MA.API.Models
{
    public class Slowmoving
    {
        public string ItemCode { get; set; }
        public string RatePerUnit { get; set; }
        public string total_stock { get; set; }
        public string total_value { get; set; }
        public string MRP_sixmon { get; set; }
        public string Moving { get; set; }
        public string slow_moving { get; set; }
        public string non_moving { get; set; }

        public string PlantCode { get; set; }
        public string moving_value { get; set; }
        public string slow_moving_value { get; set; }
        public string non_moving_value { get; set; }
        public string Unrestricted { get; set; }
        public string MakerPartNumber { get; set; }
        public string InTransitStock { get; set; }
        public string InQualityInsp { get; set; }

        public string Description { get; set; }

        public string SupplierCode { get; set; }

        public string SupplierName { get; set; }


    }
}
