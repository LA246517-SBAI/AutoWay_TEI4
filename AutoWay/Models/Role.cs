using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoWay.Models
{
    public class RoleUtilisateur
    {
        public int Role{ get; set; }
        public string RoleNom { get; set; }
    }
}