using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class Order
    {
        [Key]
        
        public int ID { get; set; }
        public DateTime OrderDate { get; set; }
        public string CreatedBy { get; set; }
        public string OrderNumber { get; set; }
        public int WeekNumber { get; set; }
        public string OrderType { get; set; }
        public string? PlantLocationMapping { get; set; }
        public string? Status { get; set; }

        public string? BuyerCode { get; set; }
    }
}
