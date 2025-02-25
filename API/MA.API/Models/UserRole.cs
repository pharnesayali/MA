using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class UserRole
    {
        public UserRole()
        {
            MMrps = new HashSet<MMrp>();
        }

        public int Id { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string? PlantCode { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Department { get; set; } = null!;
        public string RoleCode { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Location { get; set; } = null!;
        public bool? IsActive { get; set; }

        public virtual MPlant PlantCodeNavigation { get; set; } = null!;
        public virtual ICollection<MMrp> MMrps { get; set; }
    }
}
