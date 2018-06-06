using Address_EntityAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Address_EntityAPI.Controllers
{
    public class AddressController : Controller
    {
        // GET: Address
        public ActionResult GooglePlaces()
        {
            return View();
        }
        public ActionResult AddAddress()
        {
            return View();
        }
        public ActionResult UpdateAddress()
        {
            return View();
        }
        public JsonResult Get_AllAddress()
        {
            using (SampleEntities Obj = new SampleEntities())
            {
                List<Address> Emp = Obj.Addresses.ToList();
                return Json(Emp, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string Insert_Address(Address address)
        {
            if (address != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    Obj.Addresses.Add(address);
                    Obj.SaveChanges();
                    return "Address Added Successfully";
                }
            }
            else
            {
                return "Address Not Inserted! Try Again";
            }
        }
        [HttpPost]
        public string Delete_Address(Address address)
        {
            if (address != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    var Emp_ = Obj.Entry(address);
                    if (Emp_.State == System.Data.Entity.EntityState.Detached)
                    {
                        
                        Obj.Addresses.Attach(address);
                        Obj.Addresses.Remove(address);
                    }
                    Obj.SaveChanges();
                    return "Address Deleted Successfully";
                }
            }
            else
            {
                return "Address Not Deleted! Try Again";
            }
        }
        [HttpPost]
        public string Update_Address(Address address)
        {
            if (address != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    var addr_ = Obj.Entry(address);
                    Address EmpObj = Obj.Addresses.Where(x => x.AddressId == address.AddressId).FirstOrDefault();
                    EmpObj.AddressLine1 = address.AddressLine1;
                    EmpObj.City = address.City;
                    EmpObj.State = address.State;
                    EmpObj.Country = address.Country;
                    EmpObj.Zipcode = address.Zipcode;
                    Obj.SaveChanges();
                    return "Address Updated Successfully";
                }
            }
            else
            {
                return "Address Not Updated! Try Again";
            }
        }
    }
}