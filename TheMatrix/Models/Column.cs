using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheMatrix.Models
{
    public class Column
    {
        public int Index { get; set; }
        public bool Editable { get; set; }
        public string Edittype { get; set; }
        public List<Rule> Editrules { get; set; }

        public Column()
        {
            Editable = true;
            Edittype = "text";
            Editrules = new List<Rule>();
            var rule = new Rule();
            rule.RuleName = "number";
            rule.Value = "true";
            Editrules.Add(rule);
        }
    }

    public class Rule
    {
        public string RuleName { get; set; }
        public string Value { get; set; }
    }
}