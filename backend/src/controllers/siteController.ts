import { Request, Response } from "express";
import { ResService } from "../services/resService";
import {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
  getAllSite_Statuses,
} from "../services/siteService";

export async function getListOfSites(req: Request, res: Response) {
  try {
    const filters = {
      status_id: req.query.status_id ? Number(req.query.status_id) : undefined,
      search: req.query.search?.toString(),
      location: req.query.location?.toString(),
    };
    const sites = await getAllSites(filters);
    ResService.handleSuccess(res, sites);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function getSiteStatuses(req: Request, res: Response) {
  try {
    const sites = await getAllSite_Statuses();
    ResService.handleSuccess(res, sites);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function getSite(req: Request, res: Response) {
  const id = req.params.id; // UUID = string, אין צורך ב-Number()

  try {
    const site = await getSiteById(id);

    if (!site) {
      return ResService.handleErr(res, new Error("Site not found"));
    }

    ResService.handleSuccess(res, site);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function createSiteController(req: Request, res: Response) {
  try {
    const newSite = await createSite(req.body); //מצפה לקבל מידע מגוף הבקשה
    ResService.handleSuccess(res, newSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function updateSiteController(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const updatedSite = await updateSite(id, req.body);
    ResService.handleSuccess(res, updatedSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function deleteSiteController(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const deletedId = await deleteSite(id);
    ResService.handleSuccess(res, deletedId);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
