using System;

namespace MA.API.Models
{
    public class ITRModel
    {
		public DateTime startDate { get; set; }
	public int? Zone { get; set; }
		public string? PlantCode { get; set; }
		public decimal? Moving { get; set; }
		public decimal? slow_moving { get; set; }
		public decimal? non_moving { get; set; }
		public decimal? salesValue { get; set; }
		public decimal? ITR { get; set; } 
		public decimal? totalValue { get; set; }

		public DateTime? CreatedDate { get; set; }

		public int Revision { get; set; }


	}
}
