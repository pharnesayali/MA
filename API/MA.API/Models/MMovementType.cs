using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class MMovementType
    {
        public MMovementType()
        {
            Grns = new HashSet<Grn>();
        }

        public int Id { get; set; }
        public string TypeCode { get; set; } = null!;
        public string Description { get; set; } = null!;

        public virtual ICollection<Grn> Grns { get; set; }
    }
}
