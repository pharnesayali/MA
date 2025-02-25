using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class OrderDetail
    {
        [Key]
        public string? ItemCode { get; set; }
        public string? MakerPartNumber { get; set; }
        public string? Description { get; set; }
        public string? UOM { get; set; }
        public string? SupplierCode { get; set; }
        public string? SupplierName { get; set; }
        public string? BuyerCode { get; set; }
        public string? BuyerName { get; set; }
        public int? MOQ { get; set; }
        public Decimal? RatePerUnit { get; set; }
        public int? LTW { get; set; }
        public int? TotalOrder { get; set; }
        public int? AirOrder { get; set; }
        public int? BoatOrder { get; set; }
        public Decimal? OrderValue { get; set; }
        public int? Week1 { get; set; }
        public Decimal? Week1Quantity { get; set; }
        public int? Week2 { get; set; }
        public Decimal? Week2Quantity { get; set; }
        public int? Week3 { get; set; }
        public Decimal? Week3Quantity { get; set; }
        public int? Week4 { get; set; }
        public Decimal? Week4Quantity { get; set; }
        public int? AirQuantityN { get; set; }
        public int? AirQuantityN1 { get; set; }
        public int? AirQuantityN2 { get; set; }
        public string? OtherPlantOrder { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public int OrderId { get; set; }

    }
}


    