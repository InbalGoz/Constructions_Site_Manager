import { Router } from "express";
import sitesRouter from "./siteRoutes";
import imageRouter from "./imageRoute";
//import employeeRouter from "./employeeRoutes";
//import siteStageRouter from "./siteStageRoutes";
//import stageRouter from "./stageRouter";
//import workHoursRouter from "./workHourRouter";
//import StageStatusRouter from "./stageStatusRouter";
//import LoginRouter from "./authRoutes";

const router = Router();

router.use("/sites", sitesRouter);
router.use("/", imageRouter);

//router.use("/site/:id/siteStages", siteStageRouter);
//router.use("/stages", stageRouter);
//router.use("/stageStatuses", StageStatusRouter);
//router.use("/employees", employeeRouter);
//router.use("/workHours", workHoursRouter);
//router.use("/login", LoginRouter);

export default router;
