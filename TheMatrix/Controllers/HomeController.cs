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

        public Matrix GetMatrixFromData(string m)
        {
            Matrix matrix = null;
            return matrix;
        }

        JsonResult GetJSon(Matrix m)
        {
            return Json(JsonConvert.SerializeObject(m.Array), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetIdentityMatrix(int rank)
        {
            Matrix matrix = Service.GetIdentityMatrix(rank);
            return GetJSon(matrix);
        }

        public ActionResult GetZeroMatrix(int rank)
        {
            Matrix matrix = Service.GetZeroMatrix(rank);
            return GetJSon(matrix);
        }

        public ActionResult AddMatrix(string mA, string mB)
        {
            Matrix matrix = Service.Add(GetMatrixFromData(mA), GetMatrixFromData(mB));
            return GetJSon(matrix);
        }

        public ActionResult SubtractMatrix(string mA, string mB)
        {
            Matrix matrix = Service.Subtract(GetMatrixFromData(mA), GetMatrixFromData(mB));
            return GetJSon(matrix);
        }

        public ActionResult MultMatrix(string mA, string mB)
        {
            Matrix matrix = Service.Mult(GetMatrixFromData(mA), GetMatrixFromData(mB));
            return GetJSon(matrix);
        }

        public ActionResult DivideMatrix(string mA, string mB)
        {
            double det = 0;
            Matrix matrix = Service.Divide(GetMatrixFromData(mA), GetMatrixFromData(mB), out det);
            return GetJSon(matrix);
        }

        public ActionResult MultByMatrix(string mA, double num)
        {
            Matrix matrix = Service.MultBy(GetMatrixFromData(mA), num);
            return GetJSon(matrix);
        }

        public ActionResult DivideByMatrix(string mA, double num)
        {
            Matrix matrix = Service.DivideBy(GetMatrixFromData(mA), num);
            return GetJSon(matrix);
        }

        public ActionResult TransposingMatrix(string mdata)
        {
            Matrix matrix = Service.Transposing(GetMatrixFromData(mdata));
            return GetJSon(matrix);
        }

        public ActionResult ReverseMatrix(string mdata, int rank)
        {
            double det = 0;
            Matrix matrix = Service.Reverse(GetMatrixFromData(mdata), out det);
            return GetJSon(matrix);
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