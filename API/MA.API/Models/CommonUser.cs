using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MA.API.Models
{
    public class CommonUser
    {
        [Key]
        public string? FirstName { get; set; } 
        public string? LastName { get; set; } 
        public string? Email { get; set; } 
        public string? UserID { get; set; } 
        public string? EmployeeCode { get; set; } 
        public string? Department { get; set; } 
        public string? Location { get; set; } 
    }
}
