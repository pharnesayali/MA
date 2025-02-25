using Microsoft.Data.SqlClient;
using System.Runtime.Serialization;

namespace MA.API.Models
{
    public class Paging
    {
        public class PagingCriteria
        {
            [DataMember]
            public int PageNumberToFetch
            {
                get;
                set;
            }

            [DataMember]
            public int PageSize
            {
                get;
                set;
            }

            [DataMember]
            public SortOrder SortOrder
            {
                get;
                set;
            }

            [DataMember]
            public string SortColumn
            {
                get;
                set;
            }
        }
    }
}

