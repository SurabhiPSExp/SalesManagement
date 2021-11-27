using System;
using System.Collections.Generic;

namespace Sales_management.Models
{
    public partial class Login
    {
        public Login()
        {
            Employee = new HashSet<Employee>();
        }

        public int LId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int UserTypeId { get; set; }

        public virtual UserTypes UserType { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
    }
}
