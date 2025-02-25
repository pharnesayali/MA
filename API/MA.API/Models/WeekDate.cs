using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MA.API.Models
{
    
    public partial class WeekDate
    {
        
        public long Id { get; set; }
        public int Year { get; set; }
        public int WeekNumber { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
