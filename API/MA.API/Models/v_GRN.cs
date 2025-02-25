using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class v_GRN
    {
        [Key]
        public DateTime Entry_Date { get; set; } 
        public string? MaterialDocument { get; set; }
        public DateTime PostingDate { get; set; }
        public string? Reference { get; set; }
        public string? Document_Date { get; set; }
        public string? Plant { get; set; }
        public string? Name_1 { get; set; }
        public string? Storage_location { get; set; }
        public int? Movement_Type { get; set; }
        public string? Vendor { get; set; }
        public string? Material { get; set; }
        public string? Material_Description { get; set; }
        public string? Subnumber { get; set; }
        public int? Quantity { get; set; }
        public decimal? AmountInLC { get; set; }
        public string? Purchase_Order { get; set; }
        public string? Special_Stock { get; set; }
        public string? Goods_Receipt_Issue_Slip { get; set; }
        public string? Trans_Event_type { get; set; }
        public string? Time_of_Entry { get; set; }
        public string? Username { get; set; }
        public string? Movement_Type_Text { get; set; }
        public string? Material_Doc_Item { get; set; }
        public string? Qty_In_Un_Of_Entry { get; set; }
        public string? unit_of_entry { get; set; }
        public string? Routing_number_for_operations { get; set; }
        public string? Document_Header_Text { get; set; }
        public string? Qty_in_OPUn { get; set; }
        public string? Order_price_unit { get; set; }
        public string? Order_unit { get; set; }
        public string? Qty_In_order_unit { get; set; }
        public string? Batch { get; set; }
        public string? Smart_Number { get; set; }
        public string? Item { get; set; }
        public string? Movement_Indicator { get; set; }
        public string? Counsumption { get; set; }
        public string? Receipt_Indicator { get; set; }
        public string? Base_unit_of_measure { get; set; }
        public int? Material_Doc_Year { get; set; }
        public string? Network { get; set; }
        public string? Operation_Activity { get; set; }
        public string? WBS_Element { get; set; }
        public string? Debit_credit_Ind { get; set; }
        public string? Currency { get; set; }
        public string? Original_line_item { get; set; }
        public string? Multiple_Account_Assignment { get; set; }
        public string? ItemCode { get; set; }
        public string? SupplierCode { get; set; }
        public string? PlantCode { get; set; }
        public string? BuyerCode { get; set; }
    }
}
