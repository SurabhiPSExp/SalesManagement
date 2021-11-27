using System;
using System.Collections.Generic;

namespace Sales_management.Models
{
    public partial class Employee
    {
        public Employee()
        {
            VisitTable = new HashSet<VisitTable>();
        }

        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public decimal PhoneNo { get; set; }
        public int LId { get; set; }
        public bool IsActive { get; set; }

        public virtual Login L { get; set; }
        public virtual ICollection<VisitTable> VisitTable { get; set; }
    }
}
