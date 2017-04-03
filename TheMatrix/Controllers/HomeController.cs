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
        static List<Book> books = new List<Book>();

        static HomeController()
        {
            books.Add(new Book { Id = 1, Name = "Война и мир", Author = "Л. Толстой", Year = 1863, Price = 220 });
            books.Add(new Book { Id = 2, Name = "Отцы и дети", Author = "И. Тургенев", Year = 1862, Price = 195 });
            books.Add(new Book { Id = 3, Name = "Чайка", Author = "А. Чехов", Year = 1895, Price = 158 });
            books.Add(new Book { Id = 4, Name = "Подросток", Author = "Ф. Достоевский", Year = 1875, Price = 210 });
        }

        public string GetData()
        {
            var s = JsonConvert.SerializeObject(books);
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