using MatrixCalculatorService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace TheMatrix.Controllers
{
    public class HomeController : Controller
    {
        ICalculatorService Service;

        static HomeController()
        {            
            //matrix.MatrixArray = new double[3, 3] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };
        }

        public HomeController(ICalculatorService s)
        {
            Service = s;
        }

        public string GetData()
        {
            //var s = JsonConvert.SerializeObject(matrix.MatrixArray);
            return "";
        }

        public ActionResult GetMatrix(string mdata, int rank)
        {

            //StringBuilder matrixData = new StringBuilder("colModel : [");


            //for (int i = 1; i <= rank; i++)
            //{
            //    matrixData.Append("{index: " + i + ", editable: true, edittype: 'text', editrules: { number: true }},");


            //}

            //matrixData.Append("]");

            //var s = matrixData.ToString();

            //var result = new
            //{
            //    colNames = new[]
            //{
            //        "T1","T2","T3","T4","T5"
            //    },
            //    colModels = new[]
            //{
            //       new {
            //            index = "T1",
            //            name = "T1"
            //        },
            //            new {
            //            index = "T2",
            //            name = "T2"
            //        },
            //            new {
            //            index = "T3",
            //            name = "T3"
            //        },
            //            new {
            //            index = "T4",
            //            name = "T4"
            //        },
            //            new {
            //            index = "T5",
            //            name = "T5"
            //        }
            //    },
            //    data = new
            //    {
            //        rows = new[] {
            //                new{T1=rank,T2=rank,T3=rank,T4=rank,T5=rank},
            //                new{T1=123,T2=321,T3=333,T4=444,T5=555},
            //                new{T1=123,T2=321,T3=333,T4=444,T5=555},
            //                new{T1=123,T2=321,T3=333,T4=444,T5=555},
            //                new{T1=123,T2=321,T3=333,T4=444,T5=555}
            //            }
            //    }
            //};

            //var s = Json(result, JsonRequestBehavior.AllowGet);

            Matrix matrix = Service.GetIdentityMatrix(rank);


            var m = JsonConvert.SerializeObject(matrix.Array);
            var s = Json(JsonConvert.SerializeObject(matrix.Array), JsonRequestBehavior.AllowGet);
            //var s = Json(matrix.Array, JsonRequestBehavior.AllowGet);

            return s;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Grid()
        {
            ViewBag.Message = "Your grid page.";

            return View();
        }
    }
}