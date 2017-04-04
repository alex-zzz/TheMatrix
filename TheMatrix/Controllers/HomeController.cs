using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TheMatrix.Models;

namespace TheMatrix.Controllers
{
    public class HomeController : Controller
    {
        static Matrix matrix = new Matrix();

        static HomeController()
        {
            matrix.MatrixArray = new double[3, 3] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };
        }

        public string GetData()
        {
            var s = JsonConvert.SerializeObject(matrix.MatrixArray);
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