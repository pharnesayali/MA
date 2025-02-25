using System;

namespace MA.API.Models
{
    public class Order_Maturity_Tracking
    {
	public int Id	{ get; set; }
	public string? SupplierCode { get; set; }
	public string? PlantCode { get; set; } 
	public 	string? ItemCode	{ get; set; } 
	public string?  InvoiceNumber { get; set; } 
	public int  PurchaseOrderNo { get; set; } 
	public DateTime  ETDConfirmation	{ get; set; }
	public  int PartNo	{get;set;}
	public string? Description {get;set;} 
	public int OrderQty	{get;set; } 
	public DateTime OrderMaturityDate{get;set; } 
	public string?  OrderStatus	{get;set; } 
	public DateTime OrderDate{get;set; } 
	public DateTime? CreatedOn	{get;set; }
	public DateTime?  LastModifiedOn {get;set; } 
	public string?  Material_Description { get;set; }
    }
}
