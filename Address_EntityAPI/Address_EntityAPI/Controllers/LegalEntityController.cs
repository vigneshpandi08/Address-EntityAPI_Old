using Address_EntityAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Address_EntityAPI.Controllers
{
    public class LegalEntityController : Controller
    {
        // GET: LegalEntity
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Get_AllEntity()
        {
            using (SampleEntities Obj = new SampleEntities())
            {
                List<LegalEntity> Emp = Obj.LegalEntities.ToList();
                return Json(Emp, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string Insert_Entity(LegalEntity entity)
        {
            if (entity != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    Obj.LegalEntities.Add(entity);
                    Obj.SaveChanges();
                    return "Entity Added Successfully";
                }
            }
            else
            {
                return "Entity Not Inserted! Try Again";
            }
        }
        [HttpPost]
        public string Delete_Entity(LegalEntity entity)
        {
            if (entity != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    var Emp_ = Obj.Entry(entity);
                    if (Emp_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.LegalEntities.Attach(entity);
                        Obj.LegalEntities.Remove(entity);
                    }
                    Obj.SaveChanges();
                    return "Entity Deleted Successfully";
                }
            }
            else
            {
                return "Entity Not Deleted! Try Again";
            }
        }
        [HttpPost]
        public string Update_Entity(LegalEntity entity)
        {
            if (entity != null)
            {
                using (SampleEntities Obj = new SampleEntities())
                {
                    var entity_ = Obj.Entry(entity);
                    LegalEntity EmpObj = Obj.LegalEntities.Where(x => x.EntityId == entity.EntityId).FirstOrDefault();
                    EmpObj.EntityName = entity.EntityName;
                    EmpObj.Abbreviation = entity.Abbreviation;
                    Obj.SaveChanges();
                    return "Entity Updated Successfully";
                }
            }
            else
            {
                return "Entity Not Updated! Try Again";
            }
        }
    }
}