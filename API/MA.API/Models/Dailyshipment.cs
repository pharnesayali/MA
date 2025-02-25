using System;

namespace MA.API.Models
{
    public class Dailyshipment
    {
		public int Id { get; set; }
		public string PortNo { get; set; }
		public string Plant { get; set; }
		public DateTime PickupReqDate { get; set; }
		public string Forwarder { get; set; }
		public string ShipperName { get; set; }
		public string InvoiceNo { get; set; }
		public DateTime InvoiceDate { get; set; }
		public decimal InvoiceValue { get; set; }
		public string Packages { get; set; }
		public string WeightShipment { get; set; }
		public string MBL { get; set; }
		public string HBL { get; set; }
		public string CType { get; set; }
		public string Liner { get; set; }
		public string Container { get; set; }
		public DateTime ETD { get; set; }
		public DateTime ETAPort { get; set; }
		public int JOBNo { get; set; }
		public string Proceed { get; set; }
		public string IGM { get; set; }
		public string Inward { get; set; }
		public string CFS { get; set; }
		public string Fine { get; set; }
		public DateTime ChecklistDate { get; set; }
		public int BENo { get; set; }
		public DateTime BEDate { get; set; }
		public string Grms { get; set; }
		public string Ass { get; set; }
		public decimal DutyPayment { get; set; }
		public int OOC { get; set; }
		public string DO { get; set; }
		public string ClearedDt { get; set; }
		public string Status { get; set; }
		public string Remarks { get; set; }
		public DateTime createdon { get; set; }
		public DateTime last_modified_on { get; set; }
	}


}

