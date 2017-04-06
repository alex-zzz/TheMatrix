using MatrixCalculatorService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using TheMatrix.Utils;

namespace TheMatrix.Controllers
{
    public class HomeController : Controller
    {
        ICalculatorService Service;

        //static HomeController()
        //{
        //    //matrix.MatrixArray = new double[3, 3] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };
        //}

        public HomeController(ICalculatorService s)
        {
            Service = s;
        }

        public Matrix GetMatrixFromData(string m)
        {
            var collection = (Newtonsoft.Json.Linq.JContainer)JsonConvert.DeserializeObject(m);
            int rank = collection.Count;

            double[,] data = new double[rank, rank];

            int i = 0, j = 0;

            try
            {
                foreach (var rows in collection)
                {
                    foreach (var row in rows)
                    {
                        j = 0;
                        foreach (var cell in row)
                        {
                            data[i, j] = double.Parse((((Newtonsoft.Json.Linq.JProperty)cell).Value.ToString()), CultureInfo.InvariantCulture);
                            j++;
                        }
                    }

                    i++;
                }

                return new Matrix(data);
            }
            catch { throw; };
        }

        JsonResult GetJSon(Matrix m)
        {
            return Json(new { success = true, responseData = JsonConvert.SerializeObject(m.Array) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetIdentityMatrix(int rank)
        {
            try
            {
                return GetJSon(Service.GetIdentityMatrix(rank));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult GetZeroMatrix(int rank)
        {
            try
            {
                return GetJSon(Service.GetZeroMatrix(rank));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult AddMatrix(string mdataA, string mdataB)
        {
            try
            {
                return GetJSon(Service.Add(GetMatrixFromData(mdataA), GetMatrixFromData(mdataB)));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult SubtractMatrix(string mdataA, string mdataB)
        {
            try
            {
                return GetJSon(Service.Subtract(GetMatrixFromData(mdataA), GetMatrixFromData(mdataB)));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult MultMatrix(string mdataA, string mdataB)
        {
            try
            {
                return GetJSon(Service.Mult(GetMatrixFromData(mdataA), GetMatrixFromData(mdataB)));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult DivideMatrix(string mdataA, string mdataB)
        {
            try
            {
                Matrix matrixB = GetMatrixFromData(mdataB);
                if (matrixB.Det == 0)
                {
                    return Json(new { success = false, responseData = "The determinant of the matrix B is 0!" }, JsonRequestBehavior.AllowGet);
                }

                return GetJSon(Service.Divide(GetMatrixFromData(mdataA), matrixB));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult MultByMatrix(string mdata, double factor)
        {
            try
            {
                return GetJSon(Service.MultBy(GetMatrixFromData(mdata), factor));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult DivideByMatrix(string mdata, double num)
        {
            try
            {
                return GetJSon(Service.DivideBy(GetMatrixFromData(mdata), num));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult TransposingMatrix(string mdata)
        {
            try
            {
                return GetJSon(Service.Transposing(GetMatrixFromData(mdata)));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult ReverseMatrix(string mdata, int rank)
        {
            try
            {
                Matrix matrixA = GetMatrixFromData(mdata);
                if (matrixA.Det == 0)
                {
                    return Json(new { success = false, responseData = "The determinant of the matrix is 0!" }, JsonRequestBehavior.AllowGet);
                }

                return GetJSon(Service.Reverse(matrixA));
            }
            catch
            {
                return Json(new { success = false, responseData = "There are incorrect data in the matrix!" }, JsonRequestBehavior.AllowGet);
            };
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}