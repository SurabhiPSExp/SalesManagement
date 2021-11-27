using System;
using System.Collections.Generic;

namespace Sales_management.Models
{
    public partial class VisitTable
    {
        public int VisitId { get; set; }
        public string CustName { get; set; }
        public string ContactPerson { get; set; }
        public string InterestProduct { get; set; }
        public string VisitSubject { get; set; }
        public string Description { get; set; }
        public DateTime VisitDatetime { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsDeleted { get; set; }
        public int EmpId { get; set; }

        public virtual Employee Emp { get; set; }
    }
}
