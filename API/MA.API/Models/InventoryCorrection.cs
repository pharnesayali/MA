namespace MA.API.Models
{
    public class InventoryCorrection
    {
		public int Id { get; set; }
		public DateTime PostingDate { get; set; }
		public string ItemCode { get; set; }

		public string Description { get; set; }
		

		public string PlantCode { get; set; }
		public string DocumentNo { get; set; }
		public string SLOC { get; set; }
		public string Mvt { get; set; }
		public decimal Quantity { get; set; }
		public decimal EUn { get; set; }
		public decimal AmountLLC { get; set; }
		public DateTime CreatedOn { get; set; }
		public DateTime LastModifiedOn { get; set; }
	}
}
